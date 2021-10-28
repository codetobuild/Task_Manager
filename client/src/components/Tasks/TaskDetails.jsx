import { useState, useEffect } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { getOneTask } from "../../Services/API/task";

const TaskDetails = (props) => {
  const history = useHistory();
  const location = useLocation();
  const routeMatch = useRouteMatch();
  const [task, setTask] = useState({});

  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "true") {
      history.push("/login");
    }

    const fetchTask = async () => {
      const data = await getOneTask(routeMatch.params.id);
      setTask(data);
    };
    fetchTask();
  }, []);

  const handleEdit = (e) => {
    return history.push({
      pathname: "/dashboard/task/new",
      state: {
        prev: location.pathname,
        detail: {
          edit: true,
          data: task,
        },
      },
    });
    // console.log("edit");
  };

  return (
    <main className="container  p-2 p-md-3 p-lg-5 mt-2 rounded">
      <section className="mb-5">
        <h4>Title: {task.title}</h4>
        <h4>
          <span className="">Description:</span> {task.description}
        </h4>
      </section>

      <section className="mb-4">
        <button
          type="button"
          className="btn btn-primary fs-5 mb-3"
          style={{ width: "150px" }}
          onClick={handleEdit}>
          Edit
        </button>
      </section>

      <section className="mb-5">
        <h6>
          Status <span className="badge bg-success">{task.status}</span>
        </h6>
        <h6>
          Created on{" "}
          <span className="badge bg-success">
            {new Date(task.createdAt).toDateString()}
          </span>
        </h6>
        <h6>
          Assigned members :
          <a className="badge bg-secondary m-1">akash@gmail.com</a>
          <a className="badge bg-secondary m-1">akash@gmail.com</a>
          <a className="badge bg-secondary m-1">akash@gmail.com</a>
          <a className="badge bg-secondary m-1">akash@gmail.com</a>
          <a className="badge bg-secondary m-1">akash@gmail.com</a>
          <a className="badge bg-secondary m-1">akash@gmail.com</a>
          <a className="badge bg-secondary m-1">akash@gmail.com</a>
          <a className="badge bg-secondary m-1">akash@gmail.com</a>
          <a className="badge bg-secondary m-1">akash@gmail.com</a>
          <a className="badge bg-secondary m-1">akash@gmail.com</a>
          <a className="badge bg-secondary m-1">akash@gmail.com</a>
          <a className="badge bg-secondary m-1">akash@gmail.com</a>
        </h6>
      </section>

      <section className="">
        <div className="row align-items-center">
          <div className="col-5 col-md-2">
            <h5>
              Comments <span className="badge bg-success">0</span>
            </h5>
          </div>
          <div className="col-1 col-md-0"></div>
          <div className="col-6 col-md-2">
            <button
              type="button"
              className="btn btn-primary fs-5 mb-3"
              style={{ width: "200px" }}>
              Add comment
            </button>
          </div>
          <hr />
        </div>
      </section>
    </main>
  );
};

export default TaskDetails;
