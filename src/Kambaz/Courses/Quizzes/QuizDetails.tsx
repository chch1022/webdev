import { Button } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router";
import * as client from "./client"
import { updateQuiz } from "./reducer";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer)
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  const singleQuiz = quizzes.find((quiz: any) => quiz._id === qid);

  const formatDate = (dateStr?: string) => {
    if (!dateStr || isNaN(Date.parse(dateStr))) return "None";
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", options);
  };

  const handleTogglePublish = async () => {
    try {
      const newPublishedStatus = !singleQuiz.published;
      await client.togglePublishQuiz(singleQuiz._id, newPublishedStatus);
      dispatch(updateQuiz({ 
        _id: singleQuiz._id, 
        published: newPublishedStatus 
      }));
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
      alert("Failed to update publish status. Please try again.");
    }
  };

  // Don't show the quiz to students if it's not published
  if (isStudent && !singleQuiz?.published) {
    return (
      <div className="text-center mt-5">
        <h3>Quiz Not Available</h3>
        <p>This quiz is not currently published.</p>
      </div>
    );
  }

  return (
    <div>
      {isFaculty && (
        <div
          id="wd-modules-controls"
          className="d-flex justify-content-center gap-2 mb-3"
        >
          <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`}>
            <Button variant="light" size="lg" className="me-1" id="wd-add-module-btn">
              Preview
            </Button>
          </Link>

          <Link to={`/Kambaz/Courses/${cid}/Quizzes/${singleQuiz._id}`}>
            <Button variant="light" size="lg" className="me-1" id="wd-add-module-btn">
              <FaPencilAlt className="position-relative me-2" style={{ bottom: "1px" }} />
              Edit
            </Button>
          </Link>

          {/* Publish/Unpublish button with symbol */}
          <Button 
            variant={singleQuiz?.published ? "success" : "secondary"} 
            size="lg" 
            className="me-1"
            onClick={handleTogglePublish}
          >
            <span className="me-2">
              {singleQuiz?.published ? "✅" : "🚫"}
            </span>
            {singleQuiz?.published ? "Unpublish" : "Publish"}
          </Button>
        </div>
      )}

      {isStudent && (
        <div className="d-flex justify-content-center mt-3">
          <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`}>
            <Button
              variant="danger"
              size="lg"
            >
              Start Quiz
            </Button>
          </Link>
        </div>
      )}

      {/* Quiz Status Display */}
      {isFaculty && (
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center">
            <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>
              {singleQuiz?.published ? "✅" : "🚫"}
            </span>
            <span className={`badge ${singleQuiz?.published ? 'bg-success' : 'bg-secondary'} fs-6`}>
              {singleQuiz?.published ? "Published" : "Unpublished"}
            </span>
          </div>
          <div className="text-muted mt-2">
            {singleQuiz?.published 
              ? "This quiz is available to students" 
              : "This quiz is not available to students"
            }
          </div>
        </div>
      )}

      <div className="mt-4">
        <h2>{singleQuiz?.title}</h2>

        <div className="d-flex justify-content-between">
          <h6 className="text-end me-3" style={{ width: "40%" }}><b>Quiz Type:</b></h6>
          <h6 className="text-start" style={{ width: "60%" }}>{singleQuiz?.type}</h6>
        </div>

        <div className="d-flex justify-content-between">
          <h6 className="text-end me-3" style={{ width: "40%" }}><b>Points:</b></h6>
          <h6 className="text-start" style={{ width: "60%" }}>{singleQuiz?.points}</h6>
        </div>

        <div className="d-flex justify-content-between">
          <h6 className="text-end me-3" style={{ width: "40%" }}><b>Assignment Group:</b></h6>
          <h6 className="text-start" style={{ width: "60%" }}>{singleQuiz?.assignmentGroup}</h6>
        </div>

        <div className="d-flex justify-content-between">
          <h6 className="text-end me-3" style={{ width: "40%" }}><b>Shuffle Answers:</b></h6>
          <h6 className="text-start" style={{ width: "60%" }}>{singleQuiz?.shuffle ? "Yes" : "No"}</h6>
        </div>

        <div className="d-flex justify-content-between">
          <h6 className="text-end me-3" style={{ width: "40%" }}><b>Time Limit:</b></h6>
          <h6 className="text-start" style={{ width: "60%" }}>{singleQuiz?.timeLimit}</h6>
        </div>

        <div className="d-flex justify-content-between">
          <h6 className="text-end me-3" style={{ width: "40%" }}><b>Multiple Attempts:</b></h6>
          <h6 className="text-start" style={{ width: "60%" }}>{singleQuiz?.multipleAttempts ? "Yes" : "No"}</h6>
        </div>

        <div className="d-flex justify-content-between">
          <h6 className="text-end me-3" style={{ width: "40%" }}><b>How Many Attempts:</b></h6>
          <h6 className="text-start" style={{ width: "60%" }}>{singleQuiz?.howManyAttempts}</h6>
        </div>

        <div className="d-flex justify-content-between">
          <h6 className="text-end me-3" style={{ width: "40%" }}><b>Show Correct Answers:</b></h6>
          <h6 className="text-start" style={{ width: "60%" }}>{singleQuiz?.showCorrectAnswer ? "Yes" : "No"}</h6>
        </div>

        <div className="d-flex justify-content-between">
          <h6 className="text-end me-3" style={{ width: "40%" }}><b>Access Code:</b></h6>
          <h6 className="text-start" style={{ width: "60%" }}>{singleQuiz?.accessCode ? singleQuiz.accessCode : "None"}</h6>
        </div>

        <div className="d-flex justify-content-between">
          <h6 className="text-end me-3" style={{ width: "40%" }}><b>One Question At A Time:</b></h6>
          <h6 className="text-start" style={{ width: "60%" }}>{singleQuiz?.oneQuestion ? "Yes" : "No"}</h6>
        </div>

        <div className="d-flex justify-content-between">
          <h6 className="text-end me-3" style={{ width: "40%" }}><b>Webcam Required:</b></h6>
          <h6 className="text-start" style={{ width: "60%" }}>{singleQuiz?.webcamRequired ? "Yes" : "No"}</h6>
        </div>

        <div className="d-flex justify-content-between">
          <h6 className="text-end me-3" style={{ width: "40%" }}><b>Lock Questions After Answering:</b></h6>
          <h6 className="text-start" style={{ width: "60%" }}>{singleQuiz?.lockQuestions ? "Yes" : "No"}</h6>
        </div>

        <div className="d-flex justify-content-between">
          <h6 className="text-end me-3" style={{ width: "40%" }}><b>Due Date:</b></h6>
          <h6 className="text-start" style={{ width: "60%" }}>{formatDate(singleQuiz?.due)}</h6>
        </div>

        <div className="d-flex justify-content-between">
          <h6 className="text-end me-3" style={{ width: "40%" }}><b>Available Date:</b></h6>
          <h6 className="text-start" style={{ width: "60%" }}>{formatDate(singleQuiz?.from)}</h6>
        </div>

        <div className="d-flex justify-content-between">
          <h6 className="text-end me-3" style={{ width: "40%" }}><b>Until Date:</b></h6>
          <h6 className="text-start" style={{ width: "60%" }}>{formatDate(singleQuiz?.to)}</h6>
        </div>
      </div>
    </div>
  );
}