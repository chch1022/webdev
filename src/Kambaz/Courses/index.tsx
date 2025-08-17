import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Route, Routes, useParams, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { FaAlignJustify } from "react-icons/fa";
import Piazza from "./Piazza";
import Zoom from "./Zoom";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizPreview from "./Quizzes/QuizPreview";
import Grades from "./Grades";
import People from "./People";

export default function Courses() {
    const { cid } = useParams();
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const course = courses.find((course: any) => course._id === cid);
    const { pathname } = useLocation();

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}</h2> <hr />

            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        {/* Allow assignment editing and creation if user is FACULTY */}
                        {currentUser?.role === "FACULTY" && (
                            <>
                                <Route path="Assignments/new" element={<AssignmentEditor />} />
                                <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                            </>
                        )}
                        <Route path="Piazza" element={<Piazza />} />
                        <Route path="Zoom" element={<Zoom />} />
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="Quizzes/:qid" element={<QuizEditor />} />
                        <Route path="Quizzes/:qid/QuizQuestions" element={<QuizEditor />} />
                        <Route path="Quizzes/:qid/QuizDetails" element={<QuizDetails />} />
                        <Route path="Quizzes/:qid/preview" element={<QuizPreview />} />
                        <Route path="People" element={<People />} />
                        <Route path="Grades" element={<Grades />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}