import { useState, useEffect, useContext } from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    email: "",
    job: "",
    location: "",
  });

  useEffect(() => {
    const { data: userData } = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  console.log(user);

  return (
    <div className="container mt-2 mt-md-3 p-2 p-md-4">
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Username</div>
            {user.username}
          </div>
          <a class="badge bg-primary rounded">Edit</a>
        </li>

        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Email</div>
            {user.email}
          </div>
          <a class="badge bg-primary rounded">Edit</a>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Job Title</div>
            {user.job}
          </div>
          <a class="badge bg-primary rounded">Edit</a>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Location</div>
            {user.location}
          </div>
          <a class="badge bg-primary rounded">Edit</a>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
