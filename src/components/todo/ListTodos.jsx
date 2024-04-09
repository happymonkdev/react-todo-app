import React, { useState, useEffect } from "react";
import {
  getAllTodos,
  deleteTodoService,
  markIncomplete,
  markComplete,
} from "../../services/TodoService";
import { useNavigate } from "react-router-dom";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    getListTodos();
  }, []);

  function getListTodos() {
    getAllTodos()
      .then((res) => {
        console.log(res);
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addTodo() {
    navigator("/add-todo");
  }
  function updateTodo(id) {
    console.log("here is update btn", `/update-todo/${id}`);
    navigator(`/update-todo/${id}`);
  }
  const deleteTodo = (id) => {
    deleteTodoService(id)
      .then((res) => {
        console.log(res);
        getListTodos();
      })
      .catch((err) => console.log(err));
  };

  const toggleComplete = (id, toComplete) => {
    console.log("start of toggle completed", id, toComplete);
    if (toComplete) {
      markIncomplete(id)
        .then((res) => {
          let todos1 = [...todos];
          todos1.map((item) => {
            if (item.id === res.data.id) {
              item.completed = res.data.completed;
            }
          });
          console.log(todos1);
          setTodos(todos1);
        })
        .catch((err) => console.log(err));
    } else {
      markComplete(id)
        .then((res) => {
          console.log("res", res);
          let todos1 = [...todos];

          todos1.map((item) => {
            if (item.id === id) {
              item.completed = res.data.completed;
            }
          });
          console.log(todos1);
          setTodos(todos1);
        })
        .catch((err) => console.log("error" + err));
      console.log("- completed");
    }
  };
  return (
    <div className="container">
      <h2 className="text-center">List of Todos</h2>
      <div>
        <button className="btn btn-primary mb-2" onClick={addTodo}>
          Add Todo
        </button>
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="text-center">
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">IsCompleted</th>
              <th scope="col">Actions</th>
              <th scope="col">Mark complete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {todos.map((todo) => (
              <tr>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? "completed" : "inprogress"}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => updateTodo(todo.id)}
                  >
                    update
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={todo.completed ? true : false}
                    onChange={() =>
                      toggleComplete(todo.id, todo.completed ? true : false)
                    }
                  ></input>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ListTodos;
