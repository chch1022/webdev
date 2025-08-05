import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import * as client from "./client";
import { FaTrash } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
export default function WorkingWithArraysAsynchronously() {
    const [todos, setTodos] = useState<any[]>([]);
    const fetchTodos = async () => {
        const todos = await client.fetchTodos();
        setTodos(todos);
    };
    const removeTodo = async (todo: any) => {
        const updatedTodos = await client.removeTodo(todo);
        setTodos(updatedTodos);
    };
    const createNewTodo = async () => {
        const todos = await client.createNewTodo();
        setTodos(todos);
    };

    const postNewTodo = async () => {
        const newTodo = await client.postNewTodo({ title: "New Posted Todo", completed: false, });
        setTodos([...todos, newTodo]);
    };



    useEffect(() => {
        fetchTodos();
    }, []);
    return (
        <div id="wd-asynchronous-arrays">
            <h3>Working with Arrays Asynchronously</h3>
            <h4> Todos <FaPlusCircle onClick={createNewTodo} className="text-success float-end fs-3" /> </h4>
           

            <h4>Todos</h4>
            <ListGroup>
                {todos.map((todo) => (
                    <ListGroup.Item key={todo.id}>
                        <FaTrash onClick={() => removeTodo(todo)}
                            className="text-danger float-end mt-1" id="wd-remove-todo" />
                             <FaPlusCircle onClick={postNewTodo} className="text-primary float-end fs-3 me-3" id="wd-post-todo" />
                        <input type="checkbox" className="form-check-input me-2"
                            defaultChecked={todo.completed} />
                        <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                            {todo.title} </span>


                    </ListGroup.Item>
                ))}
            </ListGroup> <hr />
        </div>
    );
}

