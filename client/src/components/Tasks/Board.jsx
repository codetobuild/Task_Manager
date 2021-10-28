import Task from "./Task";
import { useHistory, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Board = (props) => {
  const history = useHistory();

  const { taskList, taskStatus, boardTitle } = props.data;

  const handleNewTask = () => {
    if (localStorage.getItem("loggedIn") !== "true") {
      return history.push("/login");
    }
    history.push("/dashboard/task/new");
  };

  // return jsx
  return (
    <div className="p-2 bg-info rounded shadow">
      <div className="d-flex flex-row justify-content-between">
        <h4>{boardTitle}</h4>
        <h4>{renderAddTaskButton(taskStatus, handleNewTask)}</h4>
      </div>
      {taskList.map((item) => (
        <Task task={item} setAllTasks={props.setAllTasks} key={uuidv4()} />
      ))}
      <div>
        <div>
          <h4>{renderAddTaskButton(taskStatus, handleNewTask)}</h4>
          <span className="fs-6">Add task</span>
        </div>
      </div>
    </div>
  );
};

// util functions
function renderAddTaskButton(taskStatus, handleNewTask) {
  const styles = { cursor: "pointer" };

  return (
    <Link
      to={{
        pathname: "/dashboard/task/new",
        state: { detail: { prev: "/dashboard", taskStatus } },
      }}
      className="badge bg-secondary me-2"
      onClick={handleNewTask}
      style={styles}>
      +
    </Link>
  );
}

export default Board;
