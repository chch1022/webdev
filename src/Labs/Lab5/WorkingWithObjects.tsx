import { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });

    // ADD MODULE STATE VARIABLE
    const [module, setModule] = useState({
        id: "CS5610",
        name: "Web Development",
        description: "Full-stack web development with modern frameworks and technologies",
        course: "Computer Science"
    });
    
    const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
    const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>

            <h4>Modifying Assignment Properties</h4> 
            
            {/* Assignment Title */}
            <div className="mb-3">
                <label className="form-label">Assignment Title:</label>
                <a id="wd-update-assignment-title" className="btn btn-primary float-end" 
                   href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                    Update Title 
                </a> 
                <FormControl className="w-75" id="wd-assignment-title" 
                            value={assignment.title} 
                            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} /> 
            </div>

            {/* Assignment Score - NEW */}
            <div className="mb-3">
                <label className="form-label">Assignment Score:</label>
                <a id="wd-update-assignment-score" className="btn btn-primary float-end" 
                   href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                    Update Score 
                </a> 
                <FormControl 
                    type="number"
                    className="w-75" 
                    id="wd-assignment-score" 
                    value={assignment.score} 
                    onChange={(e) => setAssignment({ ...assignment, score: parseInt(e.target.value) || 0 })} /> 
            </div>

            {/* Assignment Completed - NEW */}
            <div className="mb-3">
                <label className="form-label me-3">Assignment Completed:</label>
                <a id="wd-update-assignment-completed" className="btn btn-primary float-end" 
                   href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                    Update Completed 
                </a> 
                <input 
                    type="checkbox"
                    id="wd-assignment-completed" 
                    checked={assignment.completed} 
                    onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })} 
                />
            </div>
            <hr />

            {/* Module Properties - NEW SECTION */}
            <h4>Modifying Module Properties</h4>
            
            {/* Module Name */}
            <div className="mb-3">
                <label className="form-label">Module Name:</label>
                <a id="wd-update-module-name" className="btn btn-success float-end" 
                   href={`${MODULE_API_URL}/name/${module.name}`}>
                    Update Module Name 
                </a> 
                <FormControl 
                    className="w-75" 
                    id="wd-module-name" 
                    value={module.name} 
                    onChange={(e) => setModule({ ...module, name: e.target.value })} /> 
            </div>

            {/* Module Description */}
            <div className="mb-3">
                <label className="form-label">Module Description:</label>
                <a id="wd-update-module-description" className="btn btn-success float-end" 
                   href={`${MODULE_API_URL}/description/${module.description}`}>
                    Update Module Description 
                </a> 
                <FormControl 
                    as="textarea"
                    rows={3}
                    className="w-75" 
                    id="wd-module-description" 
                    value={module.description} 
                    onChange={(e) => setModule({ ...module, description: e.target.value })} /> 
            </div>
            <hr />

            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary me-2"
                href={`${HTTP_SERVER}/lab5/assignment`}>
                Get Assignment
            </a>
            <a id="wd-retrieve-modules" className="btn btn-success"
                href={`${HTTP_SERVER}/lab5/module`}>
                Get Module
            </a>
            <hr />
            
            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary me-2"
                href={`${HTTP_SERVER}/lab5/assignment/title`}>
                Get Title
            </a>
            <a id="wd-retrieve-module-name" className="btn btn-success"
                href={`${HTTP_SERVER}/lab5/module/name`}>
                Get Module Name
            </a>
            <hr />

        </div>
    );
}