import { useState, useEffect } from "react";
import { newTask } from "../../Services/API/task";
import { useHistory } from "react-router-dom";

const TaskForm = () => {
  const history = useHistory();
  const [formInputs, setFormInputs] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  const handlechange = (e) => {
    const inputs = { ...formInputs };
    inputs[e.target.name] = e.target.value;

    setFormInputs(inputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await newTask(formInputs);
    console.log(data);
    history.push("/dashboard");
  };

  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "true") {
      history.push("/login");
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="container p-5 mt-2 mt-md-4 rounded bg-warning">
      <h5 className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          required
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          name="title"
          value={formInputs.title}
          onChange={handlechange}
          required
        />
      </h5>
      <h5 className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          onChange={handlechange}
          name="description">
          {formInputs.description}
        </textarea>
      </h5>

      <h5 className="mb-3">
        <label for="status" className="form-label">
          Status
        </label>
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={handlechange}
          name="status">
          <option value="todo">Todo</option>
          <option value="progress">In progress</option>
          <option value="completed">Completed</option>
        </select>
      </h5>
      {/* <h5 className="mb-3">
        <label for="assign" className="form-label">
          Assign task
        </label>
        <select class="form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
      </h5> */}

      <div className="d-flex flex-row justify-content-start">
        <h5 className="mb-3 me-3">
          <a href="/dashboard">
            <button className="btn btn-primary" type="button">
              Cancel
            </button>
          </a>
        </h5>
        <h5 className="mb-3">
          <button className="btn btn-primary">Add Task</button>
        </h5>
      </div>
    </form>
  );
};

export default TaskForm;
