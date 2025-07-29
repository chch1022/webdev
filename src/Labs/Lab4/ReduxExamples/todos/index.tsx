
import { useSelector, useDispatch } from "react-redux";
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
      <h2>Todo List</h2>
      
      {/* Input and action buttons at the top */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        alignItems: 'center'
      }}>
        <input
          type="text"
          value={todo.title}
          onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
          placeholder="Enter todo title"
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
        <button
          onClick={() => dispatch(updateTodo(todo))}
          style={{
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Update
        </button>
        <button
          onClick={() => dispatch(addTodo(todo))}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Add
        </button>
      </div>

      {/* Todo items */}
      <div>
        {todos.map((todoItem: Todo) => (
          <div 
            key={todoItem.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid #eee'
            }}
          >
            <span style={{ fontSize: '16px', flex: 1 }}>
              {todoItem.title}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => dispatch(setTodo(todoItem))}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTodo(todoItem.id))}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <hr/>
    </div>
  );
}
