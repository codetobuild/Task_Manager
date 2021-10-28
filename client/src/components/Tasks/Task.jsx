import { deleteTask } from "../../Services/API/task";
import { useHistory, useLocation } from "react-router-dom";
import { getTasks } from "../../Services/API/task";

const Task = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { task, setAllTasks } = props;

  const handleDelete = async (e, taskId) => {
    const deleteResponse = await deleteTask(taskId);
    console.log(deleteResponse);
    // reload data
    const { data } = await getTasks();
    const allTasks = [...data];
    console.log(allTasks);
    setAllTasks(allTasks);
  };
  console.log("adsf", typeof setAllTasks);

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
    <div className="card rounded mb-2" title="click to view task">
      <div className="card-body">
        <div className="row">
          <div className="col-10">
            <h5 className="card-title">{task.title}</h5>
          </div>
          <div className="col-2">
            <div className="dropdown" style={{ cursor: "pointer" }}>
              <a
                className="btn btn-transparent dropdown-toggle icon"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <i className="fas fa-ellipsis-v"></i>
              </a>

              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuLink">
                <li>
                  <a
                    className="dropdown-item"
                    href={`/dashboard/task/${task._id}`}>
                    <i className="fas fa-tasks me-2"></i> View task
                  </a>
                </li>
                <li onClick={handleEdit}>
                  <span className="dropdown-item">
                    <i class="fas fa-pen me-2"></i> Edit
                  </span>
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
