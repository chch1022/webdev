import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";

export default function AssignmentEditor() {
    const { cid, aid } = useParams(); // Get course ID and assignment ID from URL
    
    // Debug: Log what we're getting
    console.log("Course ID (cid):", cid);
    console.log("Assignment ID (aid):", aid);
    console.log("All assignments:", db.assignments);
    
    const assignment = db.assignments.find((a: any) => a._id === aid);
    console.log("Found assignment:", assignment);

    // Show loading/debug info
    if (!cid || !aid) {
        return (
            <div className="container-fluid p-4">
                <div className="alert alert-warning">
                    <h4>Debug Info:</h4>
                    <p>Course ID: {cid || "Missing"}</p>
                    <p>Assignment ID: {aid || "Missing"}</p>
                    <p>URL: {window.location.pathname}</p>
                </div>
            </div>
        );
    }

    // If assignment not found, show error message
    if (!assignment) {
        return (
            <div className="container-fluid p-4">
                <div className="alert alert-danger">
                    <h4>Assignment not found!</h4>
                    <p>Looking for assignment ID: {aid}</p>
                    <p>Available assignment IDs: {db.assignments.map(a => a._id).join(", ")}</p>
                </div>
                <Link to={`/Kambaz/Courses/${cid}/Assignments`} className="btn btn-outline-secondary">
                    Back to Assignments
                </Link>
            </div>
        );
    }

    return (
        <div className="container-fluid p-4">
            <div className="row">
                <div className="col-12">
                    <form>
                        {/* Assignment Name */}
                        <div className="mb-3">
                            <label htmlFor="wd-name" className="form-label fw-bold">
                                Assignment Name
                            </label>
                            <input 
                                id="wd-name" 
                                type="text"
                                className="form-control"
                                defaultValue={assignment.title}
                                placeholder="Enter assignment name"
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label htmlFor="wd-description" className="form-label fw-bold">
                                Description
                            </label>
                            <textarea 
                                id="wd-description"
                                className="form-control"
                                rows={4}
                                defaultValue={assignment.description || "The assignment is available online Submit a link to the landing page of"}
                                placeholder="Enter assignment description"
                            />
                        </div>

                        {/* Assignment Details */}
                        <div className="mb-3">
                            <label htmlFor="wd-points" className="form-label fw-bold">
                                Points
                            </label>
                            <input 
                                id="wd-points" 
                                type="number"
                                className="form-control"
                                defaultValue={assignment.points || 100}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="wd-group" className="form-label fw-bold">
                                Assignment Group
                            </label>
                            <select id="wd-group" className="form-select" defaultValue={assignment.type || "ASSIGNMENTS"}>
                                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                                <option value="QUIZZES">QUIZZES</option>
                                <option value="EXAMS">EXAMS</option>
                                <option value="PROJECT">PROJECT</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="wd-display-grade-as" className="form-label fw-bold">
                                Display Grade As
                            </label>
                            <select id="wd-display-grade-as" className="form-select">
                                <option value="Percentage">Percentage</option>
                                <option value="Points">Points</option>
                                <option value="Letter Grade">Letter Grade</option>
                                <option value="GPA Scale">GPA Scale</option>
                            </select>
                        </div>

                        {/* Submission Type & Online Entry Options */}
                        <div className="mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="wd-submission-type" className="form-label fw-bold">
                                            Submission Type
                                        </label>
                                        <select id="wd-submission-type" className="form-select">
                                            <option value="Online">Online</option>
                                            <option value="Paper">Paper</option>
                                            <option value="External Tool">External Tool</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="form-label fw-bold">Online Entry Options</label>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-check mb-2">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        name="wd-text-entry" 
                                                        id="wd-text-entry" 
                                                        defaultChecked 
                                                    />
                                                    <label className="form-check-label" htmlFor="wd-text-entry">
                                                        Text Entry
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        name="wd-website-url" 
                                                        id="wd-website-url" 
                                                        defaultChecked 
                                                    />
                                                    <label className="form-check-label" htmlFor="wd-website-url">
                                                        Website URL
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        name="wd-media-recordings" 
                                                        id="wd-media-recordings" 
                                                        defaultChecked 
                                                    />
                                                    <label className="form-check-label" htmlFor="wd-media-recordings">
                                                        Media Recordings
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-check mb-2">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        name="wd-student-annotation" 
                                                        id="wd-student-annotation" 
                                                        defaultChecked 
                                                    />
                                                    <label className="form-check-label" htmlFor="wd-student-annotation">
                                                        Student Annotation
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        name="wd-file-uploads" 
                                                        id="wd-file-uploads" 
                                                        defaultChecked 
                                                    />
                                                    <label className="form-check-label" htmlFor="wd-file-uploads">
                                                        File Uploads
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Assign */}
                        <div className="mb-4">
                            <label className="form-label fw-bold">Assign</label>
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="wd-assign-to" className="form-label fw-bold">
                                            Assign to
                                        </label>
                                        <input 
                                            id="wd-assign-to" 
                                            type="text"
                                            className="form-control"
                                            defaultValue="Everyone"
                                            placeholder="Enter assignment recipients"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="wd-due-date" className="form-label fw-bold">
                                            Due Date
                                        </label>
                                        <input 
                                            type="datetime-local" 
                                            id="wd-due-date" 
                                            className="form-control"
                                            defaultValue="2024-05-13T23:59"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="wd-available-from" className="form-label fw-bold">
                                            Available from
                                        </label>
                                        <input 
                                            type="datetime-local" 
                                            id="wd-available-from" 
                                            className="form-control"
                                            defaultValue="2024-05-06T00:00"
                                        />
                                    </div>

                                    <div className="mb-0">
                                        <label htmlFor="wd-available-until" className="form-label fw-bold">
                                            Available until
                                        </label>
                                        <input 
                                            type="datetime-local" 
                                            id="wd-available-until" 
                                            className="form-control"
                                            defaultValue="2024-05-20T23:59"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <hr className="my-4" />
                        <div className="d-flex justify-content-end gap-2">
                            <Link 
                                to={`/Kambaz/Courses/${cid}/Assignments`}
                                className="btn btn-outline-secondary px-4"
                            >
                                Cancel
                            </Link>
                            <Link 
                                to={`/Kambaz/Courses/${cid}/Assignments`}
                                className="btn btn-danger px-4"
                            >
                                Save
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}