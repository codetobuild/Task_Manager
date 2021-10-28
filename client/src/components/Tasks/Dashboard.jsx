import Board from "./Board";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getTasks, deleteTask } from "../../Services/API/task";

const DashBoard = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  const fetchTasksData = async () => {
    if (localStorage.getItem("loggedIn") !== "true") {
      return;
    }
    const { data } = await getTasks();
    console.log(data);
    setAllTasks(data);
  };

  useEffect(() => {
    const todos = allTasks?.filter((item) => item.status === "todo");
    setTodoTasks(todos);
    const inProgress = allTasks?.filter((item) => item.status === "progress");
    setInProgress(inProgress);
    const completed = allTasks?.filter((item) => item.status === "completed");
    setCompleted(completed);
  }, [allTasks]);

  useEffect(() => {
    fetchTasksData();
  }, []);

  // return jsx
  return (
    <div className="container mt-3 mt-md-5 ">
      <div className="row">
        <div className="col-12 col-lg-4 mb-5 md-lg-0">
          <Board
            setAllTasks={setAllTasks}
            data={{
              taskList: todoTasks,
              taskStatus: "todo",
              boardTitle: "To do",
            }}
          />
        </div>
        <div className="col-12 col-lg-4 mb-5 md-lg-0">
          <Board
            setAllTasks={setAllTasks}
            data={{
              taskList: inProgress,
              taskStatus: "progress",
              boardTitle: "In progress",
            }}
          />
        </div>
        <div className="col-12 col-lg-4 mb-5 md-lg-0">
          <Board
            setAllTasks={setAllTasks}
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
