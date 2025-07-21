import { Button, InputGroup, FormControl, ListGroup } from "react-bootstrap";
import { FaPlus, FaMagnifyingGlass } from "react-icons/fa6";
import { BsGripVertical, BsFileText } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  // Group assignments by type (ASSIGNMENTS, QUIZZES, EXAMS, PROJECT)
  const groupedAssignments = assignments
    .filter((assignment: any) => assignment.course === cid)
    .reduce((groups: any, assignment: any) => {
      const type = assignment.type || 'ASSIGNMENTS';
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(assignment);
      return groups;
    }, {});

  // Define section configurations
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
        <div className="ms-auto">
          <Button
            id="wd-add-assignment-group"
            variant="secondary"
            className="me-2"
          >
            <FaPlus className="me-1" />
            Group
          </Button>
          <Button
            id="wd-add-assignment"
            variant="danger"
            className="me-2"
          >
            <FaPlus className="me-1" />
            Assignment
          </Button>
        </div>
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
                <div className="float-end">
                  <Button variant="secondary" size="sm" className="me-2">
                    {section.percentage}
                  </Button>
                  <Button variant="secondary" size="sm" className="me-2">
                    <FaPlus />
                  </Button>
                  <IoEllipsisVertical className="fs-4" />
                </div>
              </div>
              <ListGroup className="wd-lessons rounded-0">
                {sectionAssignments.map((assignment: any) => (
                  <ListGroup.Item key={assignment._id} className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    <BsFileText className="text-success me-2" />
                    <Link
                      to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                      className="wd-assignment-link fw-bold fs-5 text-decoration-none text-dark"
                    >
                      {assignment.title}
                    </Link>
                    <AssignmentControlButtons />
                    <div className="text-secondary ms-4 mt-2">
                      {assignment.description} |
                      {assignment.availableDate && ` Not available until ${assignment.availableDate} |`}
                      {assignment.dueDate && ` Due ${assignment.dueDate} |`}
                      {assignment.points && ` ${assignment.points} pts`}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
