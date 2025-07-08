export default function Assignments() {
    return (
        <div id="wd-assignments">
            <input placeholder="Search for Assignments"
                id="wd-search-assignment" />
            <button id="wd-add-assignment-group">+ Group</button>
            <button id="wd-add-assignment">+ Assignment</button>

            <h3 id="wd-assignments-title">
                ASSIGNMENTS 40% of Total <button>+</button> </h3>
            <ul id="wd-assignment-list">
                <li className="wd-assignment-list-item">
                    <a href="#/Kambaz/Courses/1234/Assignments/123"
                        className="wd-assignment-link" >
                        A1 - ENV + HTML
                    </a>
                    <div>
                        Multiple Modules | Not available until May 6 at 12:00am |
                        Due May 13 at 11:59pm | 100 pts
                    </div>
                </li>
                <li className="wd-assignment-list-item">
                    <a href="#/Kambaz/Courses/1234/Assignments/124"
                        className="wd-assignment-link" >
                        A2 - CSS + BOOTSTRAP
                    </a>
                    <div>
                        Multiple Modules | Not available until May 13 at 12:00am |
                        Due May 20 at 11:59pm | 100 pts
                    </div>
                </li>
                <li className="wd-assignment-list-item">
                    <a href="#/Kambaz/Courses/1234/Assignments/125"
                        className="wd-assignment-link" >
                        A3 - JAVASCRIPT + REACT
                    </a>
                    <div>
                        Multiple Modules | Not available until May 20 at 12:00am |
                        Due May 27 at 11:59pm | 100 pts
                    </div>
                </li>
            </ul>

            <h3>QUIZZES 20% of Total <button>+</button></h3>
            <ul id="wd-quiz-list">
                <li className="wd-assignment-list-item">
                    <a href="#/Kambaz/Courses/1234/Quizzes/201" className="wd-assignment-link">
                        Q1 - HTML & CSS Basics
                    </a>
                    <div>
                        Available May 10 | Due May 12 at 11:59pm | 20 pts
                    </div>
                </li>
                <li className="wd-assignment-list-item">
                    <a href="#/Kambaz/Courses/1234/Quizzes/202" className="wd-assignment-link">
                        Q2 - JavaScript Fundamentals
                    </a>
                    <div>
                        Available May 17 | Due May 19 at 11:59pm | 20 pts
                    </div>
                </li>
            </ul>

            <h3>EXAMS 25% of Total <button>+</button></h3>
            <ul id="wd-exam-list">
                <li className="wd-assignment-list-item">
                    <a href="#/Kambaz/Courses/1234/Exams/301" className="wd-assignment-link">
                        Midterm Exam
                    </a>
                    <div>
                        Available May 24 | Due May 24 at 11:59pm | 50 pts
                    </div>
                </li>
                <li className="wd-assignment-list-item">
                    <a href="#/Kambaz/Courses/1234/Exams/302" className="wd-assignment-link">
                        Final Exam
                    </a>
                    <div>
                        Available June 7 | Due June 7 at 11:59pm | 75 pts
                    </div>
                </li>
            </ul>

            <h3>PROJECT 15% of Total <button>+</button></h3>
            <ul id="wd-project-list">
                <li className="wd-assignment-list-item">
                    <a href="#/Kambaz/Courses/1234/Projects/401" className="wd-assignment-link">
                        WebDev Final Project
                    </a>
                    <div>
                        Available May 15 | Due June 10 at 11:59pm | 100 pts
                    </div>
                </li>
            </ul>
        </div>
    );
}
