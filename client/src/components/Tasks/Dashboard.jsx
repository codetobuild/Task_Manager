import Board from "./Board";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getTasks, deleteTask } from "../../Services/API/task";

const DashBoard = () => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  const fetchTasksData = async () => {
    if (localStorage.getItem("loggedIn") !== "true") {
      return;
    }

    const { data } = await getTasks();
    console.log(data);
    const todos = data.filter((item) => item.status === "todo");
    setTodoTasks(todos);
    const inProgress = data.filter((item) => item.status === "progress");
    setInProgress(inProgress);
    const completed = data.filter((item) => item.status === "completed");
    setCompleted(completed);
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  return (
    <div className="container mt-3 mt-md-5">
      <div className="row">
        <div className="col">
          <Board
            reloadData={fetchTasksData}
            data={{
              taskList: todoTasks,
              taskStatus: "todo",
              boardTitle: "To do",
            }}
          />
        </div>
        <div className="col">
          <Board
            fetchTasksData
            data={{
              taskList: inProgress,
              taskStatus: "progress",
              boardTitle: "In progress",
            }}
          />
        </div>
        <div className="col">
          <Board
            data={{
              taskList: completed,
              taskStatus: "completed",
              boardTitle: "Completed",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
