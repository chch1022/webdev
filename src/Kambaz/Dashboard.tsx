import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={4} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Full Stack software developer</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/5001/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5001 Intensive Foundations of Computer Science</Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Intro to programming and problem solving</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/5002/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5002 Discrete Structures</Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Logic, sets, functions, combinatorics</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/5004/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5004 Object-Oriented Design</Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    OOP principles and design patterns</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>


          <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/5008/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5008 Data Structures, Algorithms, and Their Applications</Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Core data structures and algorithms</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/5800/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5800 Algorithms</Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Algorithm design and analysis</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/5500/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5500 Foundations of Software Engineering</Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Software engineering principles</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>


          <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/5610/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5610 Web Development</Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Modern web application development</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>


        </Row>
      </div>
    </div>
  );
}
