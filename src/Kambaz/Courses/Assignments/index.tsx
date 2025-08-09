import { Button, InputGroup, FormControl, ListGroup, Modal } from "react-bootstrap";
import { FaPlus, FaMagnifyingGlass, FaTrash } from "react-icons/fa6";
import { BsGripVertical, BsFileText } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setAssignments, deleteAssignment } from "./reducer";
import { useState, useEffect } from "react";
import * as assignmentClient from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  
  // State for delete dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);

  // Fetch assignments when component mounts or courseId changes
  const fetchAssignments = async () => {
    if (cid) {
      try {
        const courseAssignments = await assignmentClient.fetchAssignmentsForCourse(cid);
        dispatch(setAssignments(courseAssignments));
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid, dispatch]);

  const handleDeleteClick = (assignment: any) => {
    setAssignmentToDelete(assignment);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (assignmentToDelete) {
      try {
        await assignmentClient.deleteAssignment(assignmentToDelete._id);
        dispatch(deleteAssignment(assignmentToDelete._id));
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  // Group assignments by type - no need to filter since API returns course-specific assignments
  const groupedAssignments = assignments.reduce((groups: any, assignment: any) => {
    const type = assignment.type || 'ASSIGNMENTS';
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(assignment);
    return groups;
  }, {});

  const sectionConfigs = [
    { key: 'ASSIGNMENTS', title: 'ASSIGNMENTS', percentage: '40% of Total' },
    { key: 'QUIZZES', title: 'QUIZZES', percentage: '20% of Total' },
    { key: 'EXAMS', title: 'EXAMS', percentage: '25% of Total' },
    { key: 'PROJECT', title: 'PROJECT', percentage: '15% of Total' }
  ];

  return (
    <div id="wd-assignments" className="p-4">
      {/* Top controls */}
      <div className="d-flex align-items-center mb-4">
        <InputGroup className="me-auto" style={{ maxWidth: 350 }}>
          <InputGroup.Text>
            <FaMagnifyingGlass />
          </InputGroup.Text>
          <FormControl
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </InputGroup>
        
        {/* Only show Add Group and Add Assignment buttons if user is FACULTY */}
        {currentUser?.role === "FACULTY" && (
          <div className="ms-auto">
            <Button
              id="wd-add-assignment-group"
              variant="secondary"
              className="me-2"
            >
              <FaPlus className="me-1" />
              Group
            </Button>
            <Link to={`/Kambaz/Courses/${cid}/Assignments/new`}>
              <Button
                id="wd-add-assignment"
                variant="danger"
                className="me-2"
              >
                <FaPlus className="me-1" />
                Assignment
              </Button>
            </Link>
          </div>
        )}
      </div>

      <ListGroup className="rounded-0" id="wd-assignments-list">
        {sectionConfigs.map((section) => {
          const sectionAssignments = groupedAssignments[section.key] || [];

          // Only render section if it has assignments
          if (sectionAssignments.length === 0) return null;

          return (
            <ListGroup.Item key={section.key} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {section.title}
                
                {/* Only show section controls if user is FACULTY */}
                {currentUser?.role === "FACULTY" && (
                  <div className="float-end">
                    <Button variant="secondary" size="sm" className="me-2">
                      {section.percentage}
                    </Button>
                    <Button variant="secondary" size="sm" className="me-2">
                      <FaPlus />
                    </Button>
                    <IoEllipsisVertical className="fs-4" />
                  </div>
                )}
              </div>
              <ListGroup className="wd-lessons rounded-0">
                {sectionAssignments.map((assignment: any) => (
                  <ListGroup.Item key={assignment._id} className="wd-lesson p-3 ps-1">
                    <div className="d-flex align-items-center">
                      <BsGripVertical className="me-2 fs-3" />
                      <BsFileText className="text-success me-2" />
                      <div className="flex-grow-1">
                        <Link
                          to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                          className="wd-assignment-link fw-bold fs-5 text-decoration-none text-dark"
                        >
                          {assignment.title}
                        </Link>
                        <div className="text-secondary ms-0 mt-2">
                          {assignment.description}
                          {assignment.availableDate && ` | Not available until ${assignment.availableDate}`}
                          {assignment.dueDate && ` | Due ${assignment.dueDate}`}
                          {assignment.points && ` | ${assignment.points} pts`}
                        </div>
                      </div>
                      
                      {/* Show control buttons and delete button if user is FACULTY */}
                      {currentUser?.role === "FACULTY" && (
                        <div className="d-flex align-items-center ms-2">
                          <AssignmentControlButtons />
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="ms-2"
                            onClick={() => handleDeleteClick(assignment)}
                            title="Delete Assignment"
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      )}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          );
        })}
      </ListGroup>

      {/* Delete Confirmation Dialog */}
      <Modal show={showDeleteDialog} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove the assignment:</p>
          <p><strong>"{assignmentToDelete?.title}"</strong></p>
          <p>This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}