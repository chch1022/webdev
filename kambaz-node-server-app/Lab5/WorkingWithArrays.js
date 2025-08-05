let todos = [
    { id: 1, title: "Task 1", description: "First task description", completed: false },
    { id: 2, title: "Task 2", description: "Second task description", completed: true },
    { id: 3, title: "Task 3", description: "Third task description", completed: false },
    { id: 4, title: "Task 4", description: "Fourth task description", completed: true },
];

export default function WorkingWithArrays(app) {
    const getTodos = (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
            const completedBool = completed === "true";
            const completedTodos = todos.filter((t) => t.completed === completedBool);
            res.json(completedTodos);
            return;
        }
        res.json(todos);
    };

    const getTodoById = (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        res.json(todo);
    };

    const createNewTodo = (req, res) => {
        const newTodo = {
            id: new Date().getTime(),
            title: "New Task",
            description: "New task description",
            completed: false,
        };
        todos.push(newTodo);
        res.json(todos);
    };

    const postNewTodo = (req, res) => {
        const newTodo = { ...req.body, id: new Date().getTime() };
        todos.push(newTodo);
        res.json(newTodo);
    };


    const removeTodo = (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        todos.splice(todoIndex, 1);
        res.json(todos);
    };

    const deleteTodo = (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        if (todoIndex === -1) {
            res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
            return;
        }

        todos.splice(todoIndex, 1);
        res.sendStatus(200);
    };

    const updateTodoTitle = (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (todo) {
            todo.title = title;
            res.json(todo);
        } else {
            res.status(404).json({ message: "Todo not found" });
        }
    };

    const updateTodo = (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        if (todoIndex === -1) {
            res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
            return;
        }

        todos = todos.map((t) => {
            if (t.id === parseInt(id)) {
                return { ...t, ...req.body };
            }
            return t;
        });
        res.sendStatus(200);
    };


    // NEW: Update todo description
    const updateTodoDescription = (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (todo) {
            todo.description = description;
            res.json(todo);
        } else {
            res.status(404).json({ message: "Todo not found" });
        }
    };

    // NEW: Update todo completed status
    const updateTodoCompleted = (req, res) => {
        const { id, completed } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (todo) {
            todo.completed = completed === "true";
            res.json(todo);
        } else {
            res.status(404).json({ message: "Todo not found" });
        }
    };


    app.get("/lab5/todos/create", createNewTodo);
    app.post("/lab5/todos", postNewTodo);
    app.get("/lab5/todos/:id/title/:title", updateTodoTitle);
    app.get("/lab5/todos/:id/description/:description", updateTodoDescription);  // NEW
    app.get("/lab5/todos/:id/completed/:completed", updateTodoCompleted);        // NEW
    app.get("/lab5/todos/:id/delete", removeTodo);
    app.get("/lab5/todos/:id", getTodoById);
    app.get("/lab5/todos", getTodos);
    app.delete("/lab5/todos/:id", deleteTodo);
    app.put("/lab5/todos/:id", updateTodo);


};