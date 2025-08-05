import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";
import ProtectedCourseRoute from "./Enrollments/ProtectedCourseRoute";
import "./styles.css";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as courseClient from "./Courses/client";

export default function Kambaz() {
    const [courses, setCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    
    const fetchCourses = async () => {
        try {
            const courses = await userClient.findMyCourses();
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };

    const addNewCourse = async (course: any) => {
        try {
            const newCourse = await userClient.createCourse(course);
            setCourses([...courses, newCourse]);
        } catch (error) {
            console.error("Error creating course:", error);
        }
    };

    const deleteCourse = async (courseId: string) => {
    try {
        await courseClient.deleteCourse(courseId); 
        setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
        console.error("Error deleting course:", error);
    }
};

    const updateCourse = async (course: any) => {
        try {
            await courseClient.updateCourse(course);
            setCourses(courses.map((c) => {
                if (c._id === course._id) { 
                    return course; 
                } else { 
                    return c; 
                }
            }));
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [currentUser]);

    return (
        <Session>
            <div id="wd-kambaz">
                <KambazNavigation />
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Dashboard" />} />
                        <Route path="Account/*" element={<Account />} />
                        <Route path="Dashboard" element={
                            <ProtectedRoute>
                                <Dashboard 
                                    courses={courses}
                                    addNewCourse={addNewCourse}
                                    deleteCourse={deleteCourse}
                                    updateCourse={updateCourse}
                                />
                            </ProtectedRoute>
                        } />
                        <Route path="Courses/:cid/*" element={
                            <ProtectedRoute>
                                <ProtectedCourseRoute>
                                    <Courses />
                                </ProtectedCourseRoute>
                            </ProtectedRoute>
                        } />
                        <Route path="Calendar" element={<h1>Calendar</h1>} />
                        <Route path="Inbox" element={<h1>Inbox</h1>} />
                    </Routes>
                </div>
            </div>
        </Session>
    );
}