import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addTodo, updateTodo, getTodoById } from "../../services/TodoService";
import { useParams } from "react-router-dom";
import { Collapse } from "bootstrap";

const Todo = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      console.log("---> place to set the get api call");
      getTodoById(id)
        .then((res) => {
          console.log(res);
          setTitle(res.data.title);
          setDescription(res.data.description);
          setCompleted(res.data.completed);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("No place to do api call");
    }
  }, [id]);
  function saveTodo(e) {
    const todo = { title, description, completed };
    e.preventDefault();
    if (id) {
      console.log("going to update ");
      console.log(todo);
      updateTodo(id, todo)
        .then((res) => {
          console.log(res);
          navigator("/todos");
        })
        .catch((err) => console.log(err));
    } else {
      console.log(todo);
      addTodo(todo)
        .then((res) => {
          console.log(res);
          navigator("/todos");
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">{id ? "Add Todo" : "Update Todo"}</h2>
          <div className="card-body">
            <form>
              <div className="form-group ">
                <label className="form-label"> Title </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter todo title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label"> Todo completed</label>
                <select
                  className="form-control"
                  value={completed}
                  onChange={(e) => setCompleted(e.target.value)}
                >
                  <option value="false">No</option>
                  <option value="true"> yes</option>
                </select>
              </div>
              <button className="btn btn-success" onClick={(e) => saveTodo(e)}>
                save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
