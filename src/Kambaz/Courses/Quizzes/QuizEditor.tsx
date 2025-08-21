import { useEffect, useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { addQuiz, setQuizzes, updateQuiz } from "./reducer";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillBlankEditor from "./FillBlankEditor";
import * as client from "./client";

export type QuestionInfo = {
  title: string,
  description: string,
  type: string,
  points: number,
  answers: string[],
  choices: string[]
};

export type QuestionEditorProps = {
  index: number;
  handleUpdateQuestion: (index: number, questionInfo: QuestionInfo) => void;
};

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const navigate = useNavigate();

  const currentQuiz = quizzes.find((quiz: any) => quiz._id === qid);

  const quizTitle = currentQuiz?.title || "";
  const description = currentQuiz?.description || "";
  const assignTo = currentQuiz?.assignTo || 100;
  const points = currentQuiz?.points || 100;
  const assignmentGroup = currentQuiz?.group || "quizzes";
  const shuffleAnswer = currentQuiz?.shuffle || true;
  const timeLimit = currentQuiz?.time || 20;
  const multipleAttempts = currentQuiz?.attempts || false;
  const howManyAttempts = currentQuiz?.howManyAttempts || 1;
  const correctAnswer = currentQuiz?.showCorrectAnswer || false;
  const accessCode = currentQuiz?.code || "";
  const oneQuestion = currentQuiz?.oneQuestion || true;
  const webcamRequired = currentQuiz?.webcam || false;
  const lockQuestions = currentQuiz?.lock || false;
  const dueDate = currentQuiz?.due || "";
  const availableDate = currentQuiz?.from || "";
  const untilDate = currentQuiz?.until || "";
  const questionType = currentQuiz?.questionType || "";

  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzes = await client.getQuizzes(cid!)
      dispatch(setQuizzes(quizzes));
    };

    fetchQuizzes();
  }, [cid, dispatch]);

  const handleSave = async () => {
    const newQuiz = {
      title: quizTitle,
      description,
      assignTo,
      points,
      assignmentGroup,
      shuffleAnswer,
      timeLimit,
      multipleAttempts,
      howManyAttempts,
      correctAnswer,
      accessCode,
      oneQuestion,
      webcamRequired,
      lockQuestions,
      dueDate,
      availableDate,
      untilDate,
      questions: currentQuiz?.questions,
      course: cid!,
      published: false,
      from: availableDate,
      to: untilDate,
      due: dueDate,
      showCorrectAnswer: correctAnswer
    };
    if (qid === "New") {
      await client.saveQuiz(newQuiz);
      dispatch(addQuiz(newQuiz));
      navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    } else {
      const quiz = { _id: qid!, ...newQuiz }
      await client.updateQuiz(quiz);
      dispatch(updateQuiz(quiz));
      navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    }
  };

  const handleUpdateQuestion = async (index: number, questionInfo: QuestionInfo) => {
    const updatedQuizQuestions = (currentQuiz?.questions || []).map((value: any, i: any) =>
      i === index ? { ...value, ...questionInfo } : value
    );
    const updatedQuiz = { ...currentQuiz, questions: updatedQuizQuestions };
    await client.updateQuiz(updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAddQuestion = async () => {
    try {
      const newQuestion = {
        _id: `question_${Date.now()}`,
        type: "MULTIPLE-CHOICE",
        title: "New Question",
        description: "",
        answers: ["Option 1", "Option 2", "Option 3", "Option 4"],
        points: 1,
        choices: ["Option 1", "Option 2", "Option 3", "Option 4"]
      };
      
      const updatedQuestions = [...(currentQuiz?.questions || []), newQuestion];
      const updatedQuiz = { _id: qid!, questions: updatedQuestions };
      
      await client.updateQuiz(updatedQuiz);
      dispatch(updateQuiz(updatedQuiz));
      
      console.log("Question added successfully");
    } catch (error) {
      console.error("Failed to add question:", error);
      alert("Failed to add question. Please try again.");
    }
  };

  const handleDeleteQuestion = async (questionIndex: number) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        const updatedQuestions = (currentQuiz?.questions || []).filter((_: any, index: number) => index !== questionIndex);
        const updatedQuiz = { _id: qid!, questions: updatedQuestions };
        
        await client.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(updatedQuiz));
      } catch (error) {
        console.error("Failed to delete question:", error);
        alert("Failed to delete question. Please try again.");
      }
    }
  };

  const [selectedType, setSelectedType] = useState("MULTIPLE-CHOICE");

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  // Calculate total points
  const totalPoints = currentQuiz?.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) || 0;

  return (
    <div id="wd-quiz-editor">
      <div id="wd-quiz-buttons" className="d-flex justify-content-center gap-2">
        <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`}>
          <Button
            variant="light"
            size="lg"
            className="me-1"
            id="wd-add-module-btn"
            onClick={() => handleTabClick("details")}
          >
            Details
          </Button>
        </Link>

        <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/QuizQuestions`}>
          <Button
            variant="light"
            size="lg"
            className="me-1"
            id="wd-add-module-btn"
            onClick={() => handleTabClick("questions")}
          >
            Questions
          </Button>
        </Link>
      </div>

      {activeTab === "details" && questionType === "" ? (
        <div id="wd-quiz-editing">
          <Form>
            <Form.Group className="mb-3" controlId="wd-name">
              <Form.Label>Quiz Name</Form.Label>
              <Form.Control
                type="text"
                value={quizTitle}
                onChange={(e) =>
                  dispatch(updateQuiz({ ...currentQuiz, title: e.target.value }))
                }
                placeholder="Enter quiz name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) =>
                  dispatch(updateQuiz({ ...currentQuiz, description: e.target.value }))
                }
                placeholder="Enter quiz description"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-points">
              <Form.Label>Quiz Type</Form.Label>
              <Form.Control
                as="select"
                value={currentQuiz?.questionType || ""}
                onChange={(e) =>
                  dispatch(updateQuiz({ ...currentQuiz, type: e.target.value }))
                }
              >
                <option value="Graded Quiz">Graded Quiz</option>
                <option value="Practice Quiz">Practice Quiz</option>
                <option value="Graded Survey">Graded Survey</option>
                <option value="Ungraded Survey">Ungraded Survey</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-points">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                value={points}
                onChange={(e) =>
                  dispatch(updateQuiz({ ...currentQuiz, points: e.target.value }))
                }
                placeholder="Enter points"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-points">
              <Form.Label>Assignment Group</Form.Label>
              <Form.Control
                as="select"
                value={currentQuiz?.group || ""}
                onChange={(e) =>
                  dispatch(updateQuiz({ ...currentQuiz, group: e.target.value }))
                }
              >
                <option value="Quizzes">Quizzes</option>
                <option value="Exams">Exams</option>
                <option value="Assignments">Assignments</option>
                <option value="Project">Project</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-shuffle-answers">
              <Form.Check
                type="checkbox"
                checked={currentQuiz?.shuffle}
                onChange={(e) =>
                  dispatch(updateQuiz({ ...currentQuiz, shuffle: e.target.checked }))
                }
                inline
              />
              <Form.Label>Shuffle Answers</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-points">
              <Form.Label>Time Limit</Form.Label>
              <Form.Control
                type="number"
                value={timeLimit}
                onChange={(e) =>
                  dispatch(updateQuiz({ ...currentQuiz, time: e.target.value }))
                }
                placeholder="Enter points"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-points">
              <Form.Check
                type="checkbox"
                checked={currentQuiz?.attempts}
                onChange={(e) =>
                  dispatch(updateQuiz({ ...currentQuiz, attempts: e.target.checked }))
                }
                inline
              />
              <Form.Label>Multiple Attempts</Form.Label>
            </Form.Group>

            {currentQuiz?.attempts && (
              <Form.Group className="mb-3" controlId="wd-how-many-attempts">
                <Form.Label>How Many Attempts</Form.Label>
                <Form.Control
                  type="number"
                  value={howManyAttempts}
                  onChange={(e) =>
                    dispatch(updateQuiz({ ...currentQuiz, howManyAttempts: e.target.value }))
                  }
                  placeholder="Enter number of attempts"
                  min={1}
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="wd-points">
              <Form.Check
                type="checkbox"
                checked={currentQuiz?.answers}
                onChange={(e) =>
                  dispatch(updateQuiz({ ...currentQuiz, answers: e.target.checked }))
                }
                inline
              />
              <Form.Label>Show Correct Answers</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-name">
              <Form.Label>Access Code</Form.Label>
              <Form.Control
                type="text"
                value={accessCode}
                onChange={(e) =>
                  dispatch(updateQuiz({ ...currentQuiz, code: e.target.value })) 
                }
                placeholder="Enter access code"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-points">
              <Form.Check
                type="checkbox"
                checked={currentQuiz?.oneQuestion}
                onChange={(e) =>
                  dispatch(updateQuiz({ ...currentQuiz, oneQuestion: e.target.checked }))
                }
                inline
              />
              <Form.Label>One Question at a Time</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-points">
              <Form.Check
                type="checkbox"
                checked={currentQuiz?.webcam}
                onChange={(e) =>
                  dispatch(updateQuiz({ ...currentQuiz, webcam: e.target.checked }))
                }
                inline
              />
              <Form.Label>Webcam Required </Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-points">
              <Form.Check
                type="checkbox"
                checked={currentQuiz?.lock}
                onChange={(e) =>
                  dispatch(updateQuiz({ ...currentQuiz, lock: e.target.checked }))
                }
                inline
              />
              <Form.Label>Lock Questions After Answering</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-due">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={dueDate}
                onChange={(e) =>
                  dispatch(updateQuiz({ ...currentQuiz, due: e.target.value }))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-available">
              <Form.Label>Available From</Form.Label>
              <Form.Control
                type="date"
                value={availableDate}
                onChange={(e) =>
                  dispatch(updateQuiz({ ...currentQuiz, from: e.target.value }))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-available">
              <Form.Label>Available Until</Form.Label>
              <Form.Control
                type="date"
                value={untilDate}
                onChange={(e) =>
                  dispatch(updateQuiz({ ...currentQuiz, until: e.target.value }))
                }
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="danger" onClick={handleSave}>
                Save
              </Button>

              <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
                <Button variant="danger">Save and Publish</Button>
              </Link>

              <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
                <Button variant="secondary">Cancel</Button>
              </Link>
            </div>
          </Form>
        </div>
      ) : (
        <div id="wd-quiz-questions">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3>Questions</h3>
              <p className="text-muted">Total Points: {totalPoints}</p>
            </div>
            <Button variant="primary" onClick={handleAddQuestion}>
              + New Question
            </Button>
          </div>

          {currentQuiz?.questions?.length > 0 ? (
            currentQuiz.questions.map((question: any, index: number) => (
              <Card key={question._id || index} className="mb-4">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Question {index + 1}</strong>
                    <span className="ms-2 text-muted">({question.points || 1} pts)</span>
                    <span className="ms-2 badge bg-secondary">{question.type || "MULTIPLE-CHOICE"}</span>
                  </div>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleDeleteQuestion(index)}
                  >
                    Delete Question
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Question Type</Form.Label>
                    <Form.Select
                      value={question.type || "MULTIPLE-CHOICE"}
                      onChange={(e) => {
                        const updatedQuestions = currentQuiz.questions.map((q: any, i: number) =>
                          i === index ? { ...q, type: e.target.value } : q
                        );
                        dispatch(updateQuiz({ ...currentQuiz, questions: updatedQuestions }));
                      }}
                    >
                      <option value="MULTIPLE-CHOICE">Multiple choice question</option>
                      <option value="TRUE-FALSE">True/false question</option>
                      <option value="FILL-IN">Fill in the blank question</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="mt-4">
                    {(question.type === "MULTIPLE-CHOICE" || !question.type) && (
                      <MultipleChoiceEditor
                        index={index}
                        handleUpdateQuestion={handleUpdateQuestion}
                      />
                    )}
                    {question.type === "TRUE-FALSE" && (
                      <TrueFalseEditor
                        index={index}
                        handleUpdateQuestion={handleUpdateQuestion}
                      />
                    )}
                    {question.type === "FILL-IN" && (
                      <FillBlankEditor
                        index={index}
                        handleUpdateQuestion={handleUpdateQuestion}
                      />
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <Card className="text-center p-4">
              <Card.Body>
                <h5>No questions yet</h5>
                <p>Click "New Question" to add your first question.</p>
                <Button variant="primary" onClick={handleAddQuestion}>
                  + New Question
                </Button>
              </Card.Body>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}