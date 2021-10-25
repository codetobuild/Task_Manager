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
            data={todoTasks}
            boardTitle="To do"
            fetchTasksData={fetchTasksData}
          />
        </div>
        <div className="col">
          <Board
            data={inProgress}
            boardTitle="In progress"
            fetchTasksData={fetchTasksData}
          />
        </div>
        <div className="col">
          <Board
            data={completed}
            boardTitle="Completed"
            fetchTasksData={fetchTasksData}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
