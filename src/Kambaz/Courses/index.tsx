import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import { Navigate, Route, Routes } from "react-router";
export default function Courses() {
    return (
        <div id="wd-courses">
            <h2>Course 1234</h2>
            <hr />
            <table>
                <tr>
                    <td valign="top">
                        <CourseNavigation />
                    </td>
                    <td valign="top">
                        <Routes>
                            <Route path="/" element={<Navigate to="Home" />} />
                            <Route path="Home" element={<h3>Home</h3>} />
                            <Route path="Modules" element={<Modules />} />
                            <Route path="Assignments" element={<h3>Assignments</h3>} />
                            <Route path="Assignments/:aid" element={<h3>Assignment Editor</h3>} />
                        </Routes>

                    </td>
                </tr>
            </table>
        </div>
    );
}
