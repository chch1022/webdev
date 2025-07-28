import { useSelector, useDispatch } from "react-redux";
import { ListGroup, Button, FormControl } from "react-bootstrap";
import { addTodo, updateTodo, setTodo, deleteTodo } from "./todosReducer";

interface Todo {
  id: string;
  title: string;
  
}
export default function todosReducer() {
  const { todos, todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <div id="wd-todos-redux">
      <h2>Todos Redux</h2>
      <ListGroup>
        <ListGroup.Item>
          <Button 
            onClick={() => dispatch(addTodo(todo))}
            id="wd-add-todo-click"
          > 
            Add 
          </Button>
          <Button 
            onClick={() => dispatch(updateTodo(todo))}
            id="wd-update-todo-click"
          > 
            Update 
          </Button>
          <FormControl
            defaultValue={todo.title}
            onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
          />
        </ListGroup.Item>
        
        {todos.map((todoItem: Todo) => (
          <ListGroup.Item key={todoItem.id}>
            <Button 
              onClick={() => dispatch(deleteTodo(todoItem.id))}
              id="wd-delete-todo-click"
            > 
              Delete 
            </Button>
            <Button 
              onClick={() => dispatch(setTodo(todoItem))}
              id="wd-set-todo-click"
            > 
              Edit 
            </Button>
            {todoItem.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr/>
    </div>
  );
}