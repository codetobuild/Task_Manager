import { useState, useEffect } from "react";
import { newTask, updateTask } from "../../Services/API/task";
import { useHistory, useLocation } from "react-router-dom";

const TaskForm = () => {
  const history = useHistory();
  const location = useLocation();
  const [status, setStatus] = useState("todo");
  const [formInputs, setFormInputs] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const { detail } = location.state;

  // title: "",
  // description: "",
  // status: "",

  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "true") {
      history.push("/login");
    }
    // check if form is used for edit or new task
    const edit = detail.edit ? true : false;
    setIsEdit(edit);
  }, []);

  // populate form
  useEffect(() => {
    let inputs = {};
    if (isEdit) {
      inputs = {
        title: detail.data.title,
        description: detail.data.description,
        status: detail.data.status,
      };
    } else {
      inputs = { ...formInputs };
      inputs.status = detail.taskStatus;
    }
    setFormInputs(inputs);
    setStatus(inputs.status);
  }, [isEdit]);

  const handlechange = (e) => {
    const inputs = { ...formInputs };
    inputs[e.target.name] = e.target.value;
    setFormInputs(inputs);
    // console.log(inputs);
  };

  const handleUpdate = async (taskId) => {
    const data = await updateTask(formInputs, taskId);
    console.log(data);
    if (data) {
      history.push("/dashboard");
    }
  };

  const handleNewTask = async () => {
    const data = await newTask(formInputs);
    if (data) {
      history.push("/dashboard");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      return handleUpdate(detail.data._id);
    } else {
      handleNewTask();
    }
  };

  const statuOptions = [
    { id: 1, label: "Todo", value: "todo" },
    { id: 2, label: "Progress", value: "progress" },
    { id: 3, label: "Completed", value: "completed" },
  ];

  return (
    <div className="container row m-auto">
      <form
        onSubmit={handleSubmit}
        className="col col-md-10 col-lg-8 m-auto mt-3 mt-md-5 rounded bg-info p-4 p-md-4 p-lg-5 ">
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
            name="description"
            value={formInputs.description}>
            {/* {formInputs.description} */}
          </textarea>
        </h5>
        <h5 className="mb-3">
          <label for="status" className="form-label">
            Status
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handlechange}
            name="status">
            {statuOptions.map((item) => (
              <option
                value={item.value}
                id={item.id}
                selected={status == item.value ? true : false}>
                {item.label}
              </option>
            ))}
          </select>
        </h5>
        <div className="d-flex flex-row justify-content-between">
          <h5 className="mb-3 me-3">
            <a href="/dashboard">
              <button className="btn btn-primary" type="button">
                Cancel
              </button>
            </a>
          </h5>
          {isEdit ? (
            <h5 className="mb-3">
              <button className="btn btn-primary">Update</button>
            </h5>
          ) : (
            <h5 className="mb-3">
              <button className="btn btn-primary">Add Task</button>
            </h5>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
