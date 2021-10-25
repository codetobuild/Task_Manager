import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const TaskDetails = () => {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "true") {
      history.push("/login");
    }
  }, []);

  return (
    <main className="container  p-2 p-md-3 p-lg-5 mt-2 rounded">
      <section className="mb-5">
        <h2>
          task tile will appear heretask tile will appear heretask tile will
          appear here task tile will appear here
        </h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut mollit
          anim id est laborum.
        </p>
      </section>

      <section className="mb-4">
        <button
          type="button"
          class="btn btn-primary fs-5 mb-3"
          style={{ width: "150px" }}>
          Edit
        </button>
      </section>

      <section className="mb-5">
        <h6>
          Status : <span className="badge bg-success">In progress</span>
        </h6>
        <h6>
          Created on :{" "}
          <span className="badge bg-success">09 september,2021</span>
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
              class="btn btn-primary fs-5 mb-3"
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
