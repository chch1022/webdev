import { Link } from "react-router-dom";
import { Col, Row, Card, Button, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";

// Updated interface for props to include updateCourse
interface DashboardProps {
  courses: any[];
  addNewCourse: (course: any) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  updateCourse: (course: any) => Promise<void>;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void
}

// Update the function signature to accept updateCourse prop
export default function Dashboard({ courses, addNewCourse, deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment }: DashboardProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Local state for the course being edited/created
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description"
  });

  // Use the server API for adding courses
  const handleAddNewCourse = async () => {
    try {
      await addNewCourse(course);
      // Reset form to default values
      setCourse({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description"
      });
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  // Use the server API for deleting courses
  const handleDeleteCourse = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Use the server API for updating courses
  const handleUpdateCourse = async () => {
    try {
      // Only update if we're editing an existing course (not creating new)
      if (course._id && course._id !== "0") {
        await updateCourse(course);
        // Reset form to default values after successful update
        setCourse({
          _id: "0",
          name: "New Course",
          number: "New Number",
          startDate: "2023-09-10",
          endDate: "2023-12-15",
          image: "/images/reactjs.jpg",
          description: "New Description"
        });
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleSetCourse = (courseToEdit: any) => {
    setCourse(courseToEdit);
  };

  const isEditing = course._id && course._id !== "0";

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
        {enrolling ? "My Courses" : "All Courses"}
      </button>


      {/* Only show New Course form if user is FACULTY */}
      {currentUser?.role === "FACULTY" && (
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0">
              {isEditing ? `Edit Course: ${course.name}` : "New Course"}
            </h5>
            <div>
              {isEditing && (
                <button
                  className="btn btn-warning me-2"
                  onClick={handleUpdateCourse}
                  id="wd-update-course-click"
                >
                  Update
                </button>
              )}
              <button
                className="btn btn-primary me-2"
                id="wd-add-new-course-click"
                onClick={handleAddNewCourse}
                disabled={isEditing}
              >
                Add
              </button>
              {isEditing && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setCourse({
                    _id: "0",
                    name: "New Course",
                    number: "New Number",
                    startDate: "2023-09-10",
                    endDate: "2023-12-15",
                    image: "/images/reactjs.jpg",
                    description: "New Description"
                  })}
                >
                  Cancel
                </button>
              )}
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
            value={course.number}
            className="mb-2"
            placeholder="Course Number"
            onChange={(e) => setCourse({ ...course, number: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            placeholder="Course Description"
            className="mb-2"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <div className="row">
            <div className="col-md-6">
              <FormControl
                type="date"
                value={course.startDate}
                className="mb-2"
                onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <FormControl
                type="date"
                value={course.endDate}
                className="mb-2"
                onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
              />
            </div>
          </div>
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
          {courses.map((course: any) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  to={`/Kambaz/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    src={course.image || "/images/reactjs.jpg"}
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {enrolling && (
                        <button onClick={(event) => {
                          event.preventDefault();
                          updateEnrollment(course._id, !course.enrolled);
                        }}
                          className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`} >
                          {course.enrolled ? "Unenroll" : "Enroll"}
                        </button>
                      )}
                      {course.name}
                    </Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description}
                    </Card.Text>
                    <Button variant="primary">Go</Button>

                    {/* Only show Delete and Edit buttons if user is FACULTY */}
                    {currentUser?.role === "FACULTY" && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            if (window.confirm(`Are you sure you want to delete "${course.name}"?`)) {
                              handleDeleteCourse(course._id);
                            }
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            handleSetCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
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