import { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;

export default function WorkingWithArrays() {
    const [todo, setTodo] = useState({
        id: 1,
        title: "Task 1", 
        description: "First task description",
        completed: false
    });

    const TODO_API_URL = `${HTTP_SERVER}/lab5/todos`;

    return (
        <div id="wd-working-with-arrays">
            <h3>Working With Arrays</h3>

            <h4>Adding to Arrays</h4>
            <a id="wd-create-todo" className="btn btn-primary mb-3"
               href={`${TODO_API_URL}/create`}>
                Create Todo
            </a>
            <hr />

            <h4>Modifying Todo Properties</h4>
            
            {/* Todo ID Selection */}
            <div className="mb-3">
                <label className="form-label">Todo ID:</label>
                <FormControl 
                    type="number"
                    className="w-25" 
                    id="wd-todo-id" 
                    value={todo.id} 
                    onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) || 1 })} 
                />
            </div>

            {/* Todo Title */}
            <div className="mb-3">
                <label className="form-label">Todo Title:</label>
                <a id="wd-update-todo-title" 
                   className="btn btn-primary float-end" 
                   href={`${TODO_API_URL}/${todo.id}/title/${todo.title}`}>
                    Update Title
                </a>
                <FormControl 
                    className="w-75" 
                    id="wd-todo-title" 
                    value={todo.title} 
                    onChange={(e) => setTodo({ ...todo, title: e.target.value })} 
                />
            </div>

            {/* Todo Description - NEW */}
            <div className="mb-3">
                <label className="form-label">Todo Description:</label>
                <a id="wd-update-todo-description" 
                   className="btn btn-success float-end" 
                   href={`${TODO_API_URL}/${todo.id}/description/${todo.description}`}>
                    Update Description
                </a>
                <FormControl 
                    as="textarea"
                    rows={3}
                    className="w-75" 
                    id="wd-todo-description" 
                    value={todo.description} 
                    onChange={(e) => setTodo({ ...todo, description: e.target.value })} 
                />
            </div>

            {/* Todo Completed - NEW */}
            <div className="mb-3">
                <label className="form-label me-3">Todo Completed:</label>
                <a id="wd-update-todo-completed" 
                   className="btn btn-warning float-end" 
                   href={`${TODO_API_URL}/${todo.id}/completed/${todo.completed}`}>
                    Update Completed
                </a>
                <input 
                    type="checkbox"
                    id="wd-todo-completed" 
                    checked={todo.completed} 
                    onChange={(e) => setTodo({ ...todo, completed: e.target.checked })} 
                />
                <span className="ms-2">{todo.completed ? "Completed" : "Not Completed"}</span>
            </div>
            <hr />

            <h4>Retrieving Arrays</h4>
            <a id="wd-retrieve-todos" className="btn btn-primary me-2"
               href={`${TODO_API_URL}`}>
                Get All Todos
            </a>
            <a id="wd-retrieve-completed-todos" className="btn btn-success me-2"
               href={`${TODO_API_URL}?completed=true`}>
                Get Completed Todos
            </a>
            <a id="wd-retrieve-incomplete-todos" className="btn btn-secondary"
               href={`${TODO_API_URL}?completed=false`}>
                Get Incomplete Todos
            </a>
            <hr />

            <h4>Retrieving Arrays by ID</h4>
            <a id="wd-retrieve-todo-by-id" className="btn btn-primary me-2"
               href={`${TODO_API_URL}/${todo.id}`}>
                Get Todo by ID
            </a>
            <hr />

            <h4>Deleting from Arrays</h4>
            <a id="wd-delete-todo" className="btn btn-danger"
               href={`${TODO_API_URL}/${todo.id}/delete`}>
                Delete Todo
            </a>
            <hr />
        </div>
    );
}