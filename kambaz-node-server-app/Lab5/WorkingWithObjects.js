// Create the assignment object (assuming you already have this)
const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
};

// Create the module object (NEW)
const module = {
    id: "CS5610",
    name: "Web Development",
    description: "Full-stack web development with modern frameworks and technologies",
    course: "Computer Science"
};

export default function WorkingWithObjects(app) {
    // ASSIGNMENT ROUTES (your existing code)
    const getAssignment = (req, res) => { res.json(assignment); };
    const getAssignmentTitle = (req, res) => { res.json(assignment.title); };
    const setAssignmentTitle = (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    };

    // ASSIGNMENT ROUTES - Register them
    app.get("/lab5/assignment", getAssignment);
    app.get("/lab5/assignment/title", getAssignmentTitle); 
    app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);

    // NEW MODULE ROUTES
    const getModule = (req, res) => { res.json(module); };
    const getModuleName = (req, res) => { res.json(module.name); };
    
    // Register the new module routes
    app.get("/lab5/module", getModule);
    app.get("/lab5/module/name", getModuleName);
}