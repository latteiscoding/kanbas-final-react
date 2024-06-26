import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

function WorkingWithArrays() {
  const API = `${API_BASE}/a5/todos`;
  const [errorMessage, setErrorMessage] = useState(null);
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false
  });
const [todos, setTodos] = 
    useState<{ id: number, title: string, description: string, due: string, completed: boolean }[]>([]);

const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos([...todos, response.data]);
};
const deleteTodo = async (todo: any) => {
    try {
        const response = await axios.delete(`${API}/${todo.id}`);
        setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error: any) {
        console.log(error);
        setErrorMessage(error.response.data.message);
    }
};
const updateTodo = async () => {
    try {
        const response = await axios.put(`${API}/${todo.id}`, todo);
        setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error: any) {
        console.log(error);
        setErrorMessage(error.response.data.message);
    }
};
const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
};
const removeTodo = async (todo: any) => {
    const response = await axios.get(`${API}/${todo.id}/delete`);
    setTodos(response.data);
};
const createTodo = async () => {
  const response = await axios.get(`${API}/create`);
  setTodos(response.data);
};
const fetchTodoById = async (id: number) => {
  const response = await axios.get(`${API}/${id}`);
  setTodo(response.data);
};
const updateTitle = async () => {
  const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
  setTodos(response.data);
};
useEffect(() => {
    fetchTodos();
}, []);

  return (
    <div>
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a className="btn btn-primary mb-2" href={API}>
        Get Todos
      </a>

      <h4>Retrieving an Item from an Array by ID</h4>
      <input
        type="number"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) })}
      />
      <a className="btn btn-primary ms-2 mb-2" href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>

      <h3>Filtering Array Items</h3>
      <a className="btn btn-primary mb-2" href={`${API}?completed=true`}>
        Get Completed Todos
      </a>

      <h3>Creating new Items in an Array</h3>
      <a className="btn btn-primary mb-2" href={`${API}/create`}>
        Create Todo
      </a>

      <h3>Deleting from an Array</h3>
      <a className="btn btn-primary mb-2" href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id}
      </a>

      <h3>Updating an Item in an Array</h3>
      <input
        type="number"
        value={todo.id}
        onChange={(e) =>
          setTodo({
            ...todo,
            id: parseInt(e.target.value),
          })
        }
      />
      <br />
      <input
        type="text"
        value={todo.title}
        onChange={(e) =>
          setTodo({
            ...todo,
            title: e.target.value,
          })
        }
      />
      <a
        className="btn btn-primary ms-2 mb-2"
        href={`${API}/${todo.id}/title/${todo.title}`}
      >
        Update Title to {todo.title}
      </a>
      <br />
      <textarea
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <br />
      <input
        value={todo.due}
        type="date"
        onChange={(e) =>
          setTodo({
            ...todo,
            due: e.target.value,
          })
        }
      />
      <br />
      <input
        type="checkbox"
        id="completed"
        checked={todo.completed}
        onChange={(e) =>
          setTodo({
            ...todo,
            completed: e.target.checked,
          })
        }
      />
      <label htmlFor="completed">Completed</label>
      <a
        className="btn btn-primary ms-2 mt-2 mb-2"
        href={`${API}/${todo.id}/completed/${todo.completed}`}
      >
        Update Completed Status to {String(todo.completed)}
      </a>
      <br />
      <input
        type="text"
        value={todo.description}
        onChange={(e) =>
          setTodo({
            ...todo,
            description: e.target.value,
          })
        }
      />
      <a
        className="btn btn-primary ms-2 mb-2"
        href={`${API}/${todo.id}/description/${todo.description}`}
      >
        Update Description to {todo.description}
      </a>

      <ul className="list-group">
        <button className="btn btn-warning mb-2" onClick={postTodo}>
          Post Todo
        </button>
        <button className="btn btn-secondary mb-2" onClick={updateTodo}>
          Update Todo
        </button>
        <button className="btn btn-primary mb-2" onClick={createTodo}>
          Create Todo
        </button>
        <button className="btn btn-success" onClick={updateTitle}>
          Update Title
        </button>
        {errorMessage && (
          <div className="alert alert-danger mb-2 mt-2">
            {errorMessage}
          </div>
        )}
        {todos.map(
          (todo: {
            id: number;
            title: string;
            description: string;
            due: string;
            completed: boolean;
          }) => (
            <li className="list-group-item" key={todo.id}>
              <input checked={todo.completed} type="checkbox" readOnly />
              {todo.title}
              <p>{todo.description}</p>
              <p>{todo.due}</p>
              <button
                className="btn btn-warning float-end"
                onClick={() => fetchTodoById(todo.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger float-end me-2"
                onClick={() => removeTodo(todo)}
              >
                Remove
              </button>
              <button
                onClick={() => deleteTodo(todo)}
                className="btn btn-danger float-end me-2"
              >
                Delete
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
export default WorkingWithArrays;
