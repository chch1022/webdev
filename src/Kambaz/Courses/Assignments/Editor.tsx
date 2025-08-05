import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addAssignment, updateAssignment } from "./reducer";
import * as assignmentClient from "./client";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const isNewAssignment = aid === "new";
    
    const [assignment, setAssignment] = useState({
        title: "",
        description: "",
        points: 100,
        dueDate: "",
        availableDate: "",
        availableUntil: "",
        type: "ASSIGNMENTS",
        course: cid
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch existing assignment if editing
    useEffect(() => {
        const fetchAssignment = async () => {
            if (!isNewAssignment && aid) {
                try {
                    setLoading(true);
                    const existingAssignment = await assignmentClient.fetchAssignmentById(aid);
                    setAssignment({
                        title: existingAssignment.title || "",
                        description: existingAssignment.description || "",
                        points: existingAssignment.points || 100,
                        dueDate: existingAssignment.dueDate ? new Date(existingAssignment.dueDate).toISOString().slice(0, 16) : "",
                        availableDate: existingAssignment.availableDate ? new Date(existingAssignment.availableDate).toISOString().slice(0, 16) : "",
                        availableUntil: existingAssignment.availableUntil ? new Date(existingAssignment.availableUntil).toISOString().slice(0, 16) : "",
                        type: existingAssignment.type || "ASSIGNMENTS",
                        course: cid
                    });
                } catch (error) {
                    console.error("Error fetching assignment:", error);
                    setError("Failed to load assignment");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchAssignment();
    }, [aid, isNewAssignment, cid]);

    const handleSave = async () => {
        try {
            setLoading(true);
            setError("");

            if (isNewAssignment) {
                const newAssignment = await assignmentClient.createAssignment(cid!, assignment);
                dispatch(addAssignment(newAssignment));
            } else {
                const updatedAssignment = await assignmentClient.updateAssignment(aid!, assignment);
                dispatch(updateAssignment(updatedAssignment));
            }
            navigate(`/Kambaz/Courses/${cid}/Assignments`);
        } catch (error) {
            console.error("Error saving assignment:", error);
            setError("Failed to save assignment");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    const handleInputChange = (field: string, value: any) => {
        setAssignment(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (loading && !isNewAssignment) {
        return (
            <div className="container-fluid p-4">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid p-4">
            <div className="row">
                <div className="col-12">
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={(e) => e.preventDefault()}>
                        {/* Assignment Name */}
                        <div className="mb-3">
                            <label htmlFor="wd-name" className="form-label fw-bold">
                                Assignment Name
                            </label>
                            <input 
                                id="wd-name" 
                                type="text"
                                className="form-control"
                                value={assignment.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="Enter assignment name"
                                required
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
                                value={assignment.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
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
                                value={assignment.points}
                                onChange={(e) => handleInputChange('points', parseInt(e.target.value) || 0)}
                                min="0"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="wd-group" className="form-label fw-bold">
                                Assignment Group
                            </label>
                            <select 
                                id="wd-group" 
                                className="form-select" 
                                value={assignment.type}
                                onChange={(e) => handleInputChange('type', e.target.value)}
                            >
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
                                            value={assignment.dueDate}
                                            onChange={(e) => handleInputChange('dueDate', e.target.value)}
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
                                            value={assignment.availableDate}
                                            onChange={(e) => handleInputChange('availableDate', e.target.value)}
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
                                            value={assignment.availableUntil}
                                            onChange={(e) => handleInputChange('availableUntil', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <hr className="my-4" />
                        <div className="d-flex justify-content-end gap-2">
                            <button 
                                type="button"
                                onClick={handleCancel}
                                className="btn btn-outline-secondary px-4"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button 
                                type="button"
                                onClick={handleSave}
                                className="btn btn-danger px-4"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Saving...
                                    </>
                                ) : (
                                    'Save'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}