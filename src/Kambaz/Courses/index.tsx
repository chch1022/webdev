import { courses } from "../Database";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Route, Routes, useParams,useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import Piazza from "./Piazza";
import Zoom from "./Zoom";
import Quizzes from "./Quizzes";
import PeopleTable from "./People/Table";
import Grades from "./Grades";
export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
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
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="Piazza" element={<Piazza />} />
                        <Route path="Zoom" element={<Zoom />} />
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="People" element={<PeopleTable />} />
                        <Route path="Grades" element={<Grades />} />
                    </Routes>
                </div></div>
        </div >

    );
}
