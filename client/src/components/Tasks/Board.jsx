import Task from "./Task";
import { useHistory } from "react-router-dom";

const Board = (props) => {
  const { boardTitle, data, fetchTasksData } = props;
  const history = useHistory();

  const handleNewTask = () => {
    if (localStorage.getItem("loggedIn") !== "true") {
      return history.push("/login");
    }
    history.push("/dashboard/task/new");
  };

  //styles
  const styles = { cursor: "pointer" };

  return (
    <div className="p-2 bg-info rounded shadow">
      <div className="d-flex flex-row justify-content-between">
        <h4>{boardTitle}</h4>
        <h4>
          <span
            class="badge bg-secondary"
            onClick={handleNewTask}
            style={styles}>
            +
          </span>
        </h4>
      </div>
      {data.map((item) => (
        <Task task={item} fetchTasksData={fetchTasksData} />
      ))}
      <div>
        <h4>
          <span
            to="/dashboard/task/new"
            class="badge bg-secondary me-2"
            onClick={handleNewTask}
            style={styles}>
            +
          </span>
          <span className="fs-6">Add task</span>
        </h4>
      </div>
    </div>
  );
};

export default Board;
