import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card, Form, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  const quiz = quizzes.find((quiz: any) => quiz._id === qid);
  const questions = quiz?.questions || [];

  // Calculate score and results
  const results = useMemo(() => {
    if (!submitted || questions.length === 0) return null;

    let correctCount = 0;
    const questionResults = questions.map((question: any, index: number) => {
      const userAnswer = answers[index];
      let isCorrect = false;

      if (question.type === "MULTIPLE-CHOICE" || question.type === "TRUE-FALSE") {
        isCorrect = userAnswer === question.answers[0];
      } else if (question.type === "FILL-IN") {
        // Check if user answer matches any of the possible correct answers (case insensitive)
        isCorrect = question.answers.some((correctAnswer: string) => 
          correctAnswer.toLowerCase().trim() === userAnswer?.toLowerCase().trim()
        );
      }

      if (isCorrect) correctCount++;

      return {
        questionIndex: index,
        userAnswer,
        correctAnswer: question.answers[0],
        isCorrect,
        points: isCorrect ? (question.points || 1) : 0,
        maxPoints: question.points || 1
      };
    });

    const totalPoints = questionResults.reduce((sum: number, result: any) => sum + result.points, 0);
    const maxTotalPoints = questionResults.reduce((sum: number, result: any) => sum + result.maxPoints, 0);
    const percentage = maxTotalPoints > 0 ? Math.round((totalPoints / maxTotalPoints) * 100) : 0;

    return {
      correctCount,
      totalQuestions: questions.length,
      totalPoints,
      maxTotalPoints,
      percentage,
      questionResults
    };
  }, [submitted, answers, questions]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (window.confirm("Are you sure you want to submit your quiz? You cannot change your answers after submission.")) {
      setSubmitted(true);
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  // Don't show quiz to students if not published
  if (isStudent && !quiz?.published) {
    return (
      <div className="container mt-5">
        <Alert variant="warning" className="text-center">
          <h4>Quiz Not Available</h4>
          <p>This quiz is not currently published and available to students.</p>
          <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
            <Button variant="primary">Back to Quizzes</Button>
          </Link>
        </Alert>
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="container mt-5">
        <Alert variant="info" className="text-center">
          <h4>No Questions Available</h4>
          <p>This quiz doesn't have any questions yet.</p>
          {isFaculty && (
            <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/QuizQuestions`}>
              <Button variant="primary">Add Questions</Button>
            </Link>
          )}
          <Link to={`/Kambaz/Courses/${cid}/Quizzes`} className="ms-2">
            <Button variant="secondary">Back to Quizzes</Button>
          </Link>
        </Alert>
      </div>
    );
  }

  // Results view after submission
  if (submitted && results) {
    return (
      <div className="container mt-4">
        <Card>
          <Card.Header className="bg-primary text-white">
            <h3 className="mb-0">Quiz Results: {quiz.title}</h3>
          </Card.Header>
          <Card.Body>
            <div className="text-center mb-4">
              <h2 className="text-primary">Score: {results.totalPoints}/{results.maxTotalPoints} ({results.percentage}%)</h2>
              <p className="lead">
                You answered {results.correctCount} out of {results.totalQuestions} questions correctly.
              </p>
            </div>

            <h4>Question Review:</h4>
            {questions.map((question: any, index: number) => {
              const result = results.questionResults[index];
              return (
                <Card key={index} className={`mb-3 ${result.isCorrect ? 'border-success' : 'border-danger'}`}>
                  <Card.Header className={`${result.isCorrect ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                    <div className="d-flex justify-content-between">
                      <span>Question {index + 1}: {question.title}</span>
                      <span>{result.points}/{result.maxPoints} points</span>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div dangerouslySetInnerHTML={{ __html: question.description || question.title }} />
                    
                    {question.type === "MULTIPLE-CHOICE" && (
                      <div className="mt-3">
                        {question.choices.map((choice: string, choiceIndex: number) => (
                          <div key={choiceIndex} className="mb-2">
                            <Form.Check
                              type="radio"
                              name={`result_question_${index}`}
                              label={choice}
                              checked={result.userAnswer === choice}
                              readOnly
                              className={
                                choice === result.correctAnswer ? 'text-success fw-bold' :
                                choice === result.userAnswer && !result.isCorrect ? 'text-danger' : ''
                              }
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {question.type === "TRUE-FALSE" && (
                      <div className="mt-3">
                        <div className={`mb-2 ${result.userAnswer === 'true' ? (result.isCorrect ? 'text-success fw-bold' : 'text-danger') : ''}`}>
                          <Form.Check type="radio" label="True" checked={result.userAnswer === 'true'} readOnly />
                        </div>
                        <div className={`mb-2 ${result.userAnswer === 'false' ? (result.isCorrect ? 'text-success fw-bold' : 'text-danger') : ''}`}>
                          <Form.Check type="radio" label="False" checked={result.userAnswer === 'false'} readOnly />
                        </div>
                      </div>
                    )}

                    {question.type === "FILL-IN" && (
                      <div className="mt-3">
                        <p><strong>Your Answer:</strong> <span className={result.isCorrect ? 'text-success' : 'text-danger'}>{result.userAnswer || '(No answer)'}</span></p>
                        <p><strong>Correct Answer(s):</strong> <span className="text-success">{question.answers.join(', ')}</span></p>
                      </div>
                    )}

                    {!result.isCorrect && (
                      <Alert variant="danger" className="mt-2 mb-0">
                        <strong>Incorrect.</strong> The correct answer is: {result.correctAnswer}
                      </Alert>
                    )}
                  </Card.Body>
                </Card>
              );
            })}

            <div className="text-center mt-4">
              {isFaculty && (
                <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/QuizQuestions`} className="me-3">
                  <Button variant="primary">Edit Quiz</Button>
                </Link>
              )}
              <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
                <Button variant="secondary">Back to Quizzes</Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }

  // Quiz taking view
  return (
    <div className="container mt-4">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h3 className="mb-0">{quiz.title} {isFaculty && '(Preview)'}</h3>
          <div>
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </Card.Header>
        <Card.Body>
          {/* Question Navigation */}
          <div className="mb-4">
            <h6>Questions:</h6>
            <div className="d-flex flex-wrap gap-1">
              {questions.map((_: any, index: number) => (
                <Button
                  key={index}
                  variant={answers[index] ? "success" : "outline-secondary"}
                  size="sm"
                  onClick={() => goToQuestion(index)}
                  className={currentQuestionIndex === index ? "border-primary" : ""}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>

          {/* Current Question */}
          <Card className="mb-4">
            <Card.Header>
              <h5>Question {currentQuestionIndex + 1} ({currentQuestion.points || 1} points)</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div dangerouslySetInnerHTML={{ __html: currentQuestion.description || currentQuestion.title }} />
              </div>

              {/* Multiple Choice */}
              {currentQuestion.type === "MULTIPLE-CHOICE" && (
                <div>
                  {currentQuestion.choices.map((choice: string, choiceIndex: number) => (
                    <div key={choiceIndex} className="mb-2">
                      <Form.Check
                        type="radio"
                        name={`question_${currentQuestionIndex}`}
                        label={choice}
                        checked={answers[currentQuestionIndex] === choice}
                        onChange={() => handleAnswerChange(currentQuestionIndex, choice)}
                        disabled={submitted}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* True/False */}
              {currentQuestion.type === "TRUE-FALSE" && (
                <div>
                  <Form.Check
                    type="radio"
                    name={`question_${currentQuestionIndex}`}
                    label="True"
                    checked={answers[currentQuestionIndex] === "true"}
                    onChange={() => handleAnswerChange(currentQuestionIndex, "true")}
                    disabled={submitted}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    name={`question_${currentQuestionIndex}`}
                    label="False"
                    checked={answers[currentQuestionIndex] === "false"}
                    onChange={() => handleAnswerChange(currentQuestionIndex, "false")}
                    disabled={submitted}
                  />
                </div>
              )}

              {/* Fill in the Blank */}
              {currentQuestion.type === "FILL-IN" && (
                <div>
                  <Form.Control
                    type="text"
                    placeholder="Enter your answer"
                    value={answers[currentQuestionIndex] || ""}
                    onChange={(e) => handleAnswerChange(currentQuestionIndex, e.target.value)}
                    disabled={submitted}
                  />
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between align-items-center">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>

            <div className="d-flex gap-2">
              {currentQuestionIndex < questions.length - 1 ? (
                <Button
                  variant="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="success"
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length === 0}
                >
                  Submit Quiz
                </Button>
              )}
            </div>
          </div>

          {/* Progress Info */}
          <div className="mt-3 text-center text-muted">
            <small>
              Answered: {Object.keys(answers).length} of {questions.length} questions
            </small>
          </div>
        </Card.Body>
      </Card>

      {/* Faculty Edit Button */}
      {isFaculty && (
        <div className="text-center mt-3">
          <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/QuizQuestions`}>
            <Button variant="outline-primary">Edit Quiz</Button>
          </Link>
        </div>
      )}
    </div>
  );
}