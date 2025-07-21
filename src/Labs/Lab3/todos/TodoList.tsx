import TodoItem from "./TodoItem";
import todosData from "./todos.json";
import { ListGroup } from 'react-bootstrap';

const todos = todosData as any[];

export default function TodoList() {
  return(
    <>
      <h3>Todo List</h3>
      <ListGroup>
        {todos?.map((todo, index) => {
          return(<TodoItem key={index} todo={todo}/>);
        })}
      </ListGroup><hr/>
    </>
  );
}