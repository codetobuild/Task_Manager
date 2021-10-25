import { deleteTask } from "../../Services/API/task";
import { useHistory } from "react-router-dom";

const Task = (props) => {
  const history = useHistory();
  const { task, fetchTasksData } = props;

  const handleDelete = async (e, taskId) => {
    const data = await deleteTask(taskId);
    fetchTasksData();
  };



  return (
    <div className="card rounded mb-2" title="click to view task">
      <div className="card-body">
        <div className="row">
          <div className="col-10">
            <h5 className="card-title">{task.title}</h5>
          </div>
          <div className="col-2">
            <div className="dropdown ">
              <a
                className="btn btn-transparent dropdown-toggle icon"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuLink">
                <li>
                  <a
                    className="dropdown-item"
                    href={`/dashboard/task/${task._id}`}>
                    <i class="fas fa-tasks me-2"></i> View task
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/edit">
                    <i class="fas fa-pen me-2"></i> Edit
                  </a>
                </li>
                <li>
                  <span
                    className="dropdown-item"
                    onClick={(e) => handleDelete(e, task._id)}>
                    <i class="fas fa-trash me-2"></i>Delete
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="card-text">{shortenDescription(task.description)}</p>
      </div>
    </div>
  );
};

function shortenDescription(str) {
  const n = 80;
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

export default Task;
