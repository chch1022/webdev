import { Link } from "react-router-dom";
import { Col, Row, Card, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addCourse, deleteCourse, updateCourse } from "./Courses/reducer";
import { enrollUser, unenrollUser } from "./Enrollments/reducer";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  // Local state for the course being edited/created
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });

  // State for enrollment view toggle
  const [showAllCourses, setShowAllCourses] = useState(false);

  const addNewCourse = () => {
    dispatch(addCourse(course));
    // Reset form to default values
    setCourse({
      _id: "0", name: "New Course", number: "New Number",
      startDate: "2023-09-10", endDate: "2023-12-15",
      image: "/images/reactjs.jpg", description: "New Description"
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    dispatch(deleteCourse(courseId));
  };

  const handleUpdateCourse = () => {
    dispatch(updateCourse(course));
  };

  const handleSetCourse = (courseToEdit: any) => {
    setCourse(courseToEdit);
  };

  const handleEnroll = (courseId: string) => {
    dispatch(enrollUser({ userId: currentUser._id, courseId }));
  };

  const handleUnenroll = (courseId: string) => {
    dispatch(unenrollUser({ userId: currentUser._id, courseId }));
  };

  const isUserEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  // Filter courses based on enrollment view toggle
  const displayedCourses = showAllCourses 
    ? courses 
    : courses.filter((course: any) => isUserEnrolled(course._id));

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      
      {/* Only show New Course form if user is FACULTY */}
      {currentUser?.role === "FACULTY" && (
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0">New Course</h5>
            <div>
              <button className="btn btn-warning me-2"
                onClick={handleUpdateCourse} id="wd-update-course-click">
                Update
              </button>
              <button className="btn btn-primary"
                id="wd-add-new-course-click"
                onClick={addNewCourse}>
                Add
              </button>
            </div>
          </div>
          <hr />
          <FormControl
            value={course.name}
            className="mb-2"
            placeholder="Course Name"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            placeholder="Course Description"
            className="mb-2"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
        </div>
      )}

      {/* Enrollments Toggle Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          {showAllCourses ? "All Courses" : "Published Courses"} ({displayedCourses.length})
        </h2>
        <Button 
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
          className="btn btn-primary"
        >
          {showAllCourses ? "My Courses" : "All Courses"}
        </Button>
      </div>
      <hr />
      
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course: any) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </Card.Text>
                    <Button variant="primary"> Go </Button>
                    
                    {/* Show enrollment buttons for students when viewing all courses */}
                    {showAllCourses && currentUser?.role !== "FACULTY" && (
                      <div className="mt-2">
                        {isUserEnrolled(course._id) ? (
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={(e) => {
                              e.preventDefault();
                              handleUnenroll(course._id);
                            }}
                            className="w-100"
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button 
                            variant="success" 
                            size="sm" 
                            onClick={(e) => {
                              e.preventDefault();
                              handleEnroll(course._id);
                            }}
                            className="w-100"
                          >
                            Enroll
                          </Button>
                        )}
                      </div>
                    )}
                    
                    {/* Only show Delete and Edit buttons if user is FACULTY */}
                    {currentUser?.role === "FACULTY" && (
                      <>
                        <button onClick={(event) => {
                          event.preventDefault();
                          handleDeleteCourse(course._id);
                        }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </button>
                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            handleSetCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                        </button>
                      </>
                    )}
                   </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}