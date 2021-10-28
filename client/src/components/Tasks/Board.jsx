import Task from "./Task";
import { useHistory, Link } from "react-router-dom";

const Board = (props) => {
  const history = useHistory();
  const { reloadData } = props;
  const { taskList, taskStatus, boardTitle } = props.data;

  const handleNewTask = () => {
    if (localStorage.getItem("loggedIn") !== "true") {
      return history.push("/login");
    }
    history.push("/dashboard/task/new");
  };
  const handleDelete = async () => {
    try {
      return await reloadData();
    } catch (err) {
      console.log(err);
    }
  };

  // return jsx
  return (
    <div className="p-2 bg-info rounded shadow">
      <div className="d-flex flex-row justify-content-between">
        <h4>{boardTitle}</h4>
        <h4>{renderAddTaskButton(taskStatus, handleNewTask)}</h4>
      </div>
      {taskList.map((item) => (
        <Task task={item} onDelete={handleDelete} />
      ))}
      <div>
        <h4>
          <h4>{renderAddTaskButton(taskStatus, handleNewTask)}</h4>
          <span className="fs-6">Add task</span>
        </h4>
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
