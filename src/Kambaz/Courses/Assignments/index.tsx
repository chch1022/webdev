import { Button, InputGroup, FormControl, ListGroup } from "react-bootstrap";
import { FaPlus, FaMagnifyingGlass } from "react-icons/fa6";
import { BsGripVertical, BsFileText } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Assignments() {
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
        {/* Assignments Section */}
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> 
            ASSIGNMENTS 
            <div className="float-end">
              <Button variant="secondary" size="sm" className="me-2">40% of Total</Button>
              <Button variant="secondary" size="sm" className="me-2"><FaPlus /></Button>
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <BsFileText className="text-success me-2" />
              <a href="#/Kambaz/Courses/1234/Assignments/123"
                className="wd-assignment-link fw-bold fs-5 text-decoration-none text-dark">
                A1 - ENV + HTML
              </a>
              <AssignmentControlButtons />
              <div className="text-secondary ms-4 mt-2">
                Multiple Modules | Not available until May 6 at 12:00am | Due May 13 at 11:59pm | 100 pts
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <BsFileText className="text-success me-2" />
              <a href="#/Kambaz/Courses/1234/Assignments/124"
                className="wd-assignment-link fw-bold fs-5 text-decoration-none text-dark">
                A2 - CSS + BOOTSTRAP
              </a>
              <AssignmentControlButtons />
              <div className="text-secondary ms-4 mt-2">
                Multiple Modules | Not available until May 13 at 12:00am | Due May 20 at 11:59pm | 100 pts
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <BsFileText className="text-success me-2" />
              <a href="#/Kambaz/Courses/1234/Assignments/125"
                className="wd-assignment-link fw-bold fs-5 text-decoration-none text-dark">
                A3 - JAVASCRIPT + REACT
              </a>
              <AssignmentControlButtons />
              <div className="text-secondary ms-4 mt-2">
                Multiple Modules | Not available until May 20 at 12:00am | Due May 27 at 11:59pm | 100 pts
              </div>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>

        {/* Quizzes Section */}
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> 
            QUIZZES 
            <div className="float-end">
              <Button variant="secondary" size="sm" className="me-2">20% of Total</Button>
              <Button variant="secondary" size="sm" className="me-2"><FaPlus /></Button>
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <BsFileText className="text-success me-2" />
              <a href="#/Kambaz/Courses/1234/Quizzes/201"
                className="wd-assignment-link fw-bold fs-5 text-decoration-none text-dark">
                Q1 - HTML & CSS Basics
              </a>
              <AssignmentControlButtons />
              <div className="text-secondary ms-4 mt-2">
                Available May 10 | Due May 12 at 11:59pm | 20 pts
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <BsFileText className="text-success me-2" />
              <a href="#/Kambaz/Courses/1234/Quizzes/202"
                className="wd-assignment-link fw-bold fs-5 text-decoration-none text-dark">
                Q2 - JavaScript Fundamentals
              </a>
              <AssignmentControlButtons />
              <div className="text-secondary ms-4 mt-2">
                Available May 17 | Due May 19 at 11:59pm | 20 pts
              </div>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>

        {/* Exams Section */}
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> 
            EXAMS 
            <div className="float-end">
              <Button variant="secondary" size="sm" className="me-2">25% of Total</Button>
              <Button variant="secondary" size="sm" className="me-2"><FaPlus /></Button>
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <BsFileText className="text-success me-2" />
              <a href="#/Kambaz/Courses/1234/Exams/301"
                className="wd-assignment-link fw-bold fs-5 text-decoration-none text-dark">
                Midterm Exam
              </a>
              <AssignmentControlButtons />
              <div className="text-secondary ms-4 mt-2">
                Available May 24 | Due May 24 at 11:59pm | 50 pts
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <BsFileText className="text-success me-2" />
              <a href="#/Kambaz/Courses/1234/Exams/302"
                className="wd-assignment-link fw-bold fs-5 text-decoration-none text-dark">
                Final Exam
              </a>
              <AssignmentControlButtons />
              <div className="text-secondary ms-4 mt-2">
                Available June 7 | Due June 7 at 11:59pm | 75 pts
              </div>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>

        {/* Project Section */}
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> 
            PROJECT 
            <div className="float-end">
              <Button variant="secondary" size="sm" className="me-2">15% of Total</Button>
              <Button variant="secondary" size="sm" className="me-2"><FaPlus /></Button>
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <BsFileText className="text-success me-2" />
              <a href="#/Kambaz/Courses/1234/Projects/401"
                className="wd-assignment-link fw-bold fs-5 text-decoration-none text-dark">
                WebDev Final Project
              </a>
              <AssignmentControlButtons />
              <div className="text-secondary ms-4 mt-2">
                Available May 15 | Due June 10 at 11:59pm | 100 pts
              </div>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}