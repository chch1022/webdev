import { Link } from "react-router-dom";
import { Col, Row, Card, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addCourse, deleteCourse, updateCourse } from "./Courses/reducer";

// Add this interface for props
interface DashboardProps {
  courses: any[];
  addNewCourse: (course: any) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
}

// Update the function signature to accept props
export default function Dashboard({ courses, addNewCourse, deleteCourse }: DashboardProps) {
  // Remove this line since courses come from props now
  // const { courses } = useSelector((state: any) => state.coursesReducer);
  
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  // Local state for the course being edited/created
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });

  // Update this function to use the server API
  const handleAddNewCourse = async () => {
    try {
      await addNewCourse(course);
      // Reset form to default values
      setCourse({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description"
      });
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  // Update this function to use the server API
  const handleDeleteCourse = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleUpdateCourse = () => {
    dispatch(updateCourse(course));
  };

  const handleSetCourse = (courseToEdit: any) => {
    setCourse(courseToEdit);
  };

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
                onClick={handleAddNewCourse}>
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

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          Published Courses ({courses.length})
        </h2>
      </div>
      <hr />
      
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {/* Now using courses from props (server data) */}
          {courses.map((course: any) => (
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