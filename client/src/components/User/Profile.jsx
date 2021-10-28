import { useState, useEffect, useContext } from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { userUpdate } from "../../Services/API/auth";

const Profile = () => {
  const history = useHistory();
  const [edit, setEdit] = useState("");
  const useObject = {
    username: "",
    email: "",
    job: "",
    location: "",
  };

  const [user, setUser] = useState(useObject);
  const [formInputs, setFormInputs] = useState(useObject);

  useEffect(() => {
    const { data: userData } = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    console.log(user);
  }, []);

  useEffect(() => {
    populateFormInputs(user);
  }, [user]);

  const handleChange = (e) => {
    const inputs = { ...formInputs };
    inputs[e.target.name] = e.target.value;
    setFormInputs(inputs);
  };

  const handleCancel = (e, editProp) => {
    const inputs = { ...user };
    // inputs[editProp] = user[editProp];
    setEdit("");
    setFormInputs(inputs);
  };

  const handleSave = async () => {
    // console.log(formInputs);
    const data = await userUpdate(formInputs);
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    }
    const { data: userData } = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    setEdit("");
  };

  const populateFormInputs = (userData) => {
    const user = {
      username: userData.username,
      email: userData.email,
      job: userData.job,
      location: userData.location,
    };
    setFormInputs(user);
  };

  useEffect(() => {
    console.log(formInputs);
  }, [edit]);

  const profileProperties = [
    { id: 1, prop: "username", label: "Username" },
    { id: 2, prop: "email", label: "Email" },
    { id: 3, prop: "job", label: "Job" },
    { id: 4, prop: "location", label: "Location" },
  ];

  return (
    <div className="container mt-2 mt-md-3 p-2 p-md-4">
      <ul className="list-group list-group-flush">
        {profileProperties?.map((item) => (
          <li className="list-group-item " key={item.id}>
            <div className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{item.label}</div>
                {user[item.prop]}
              </div>
              <button
                className="btn badge bg-primary"
                onClick={() => setEdit(item.id)}>
                <i className="fas fa-pen"></i>
              </button>
            </div>

            {edit === item.id ? (
              <div className="d-flex justify-content-start align-items-start align-items-center">
                <input
                  type="text"
                  className="form-control me-2"
                  name={item.prop}
                  value={formInputs[item.prop]}
                  onChange={handleChange}
                />
                <button
                  className="btn bg-success rounded text-light me-2"
                  onClick={(e) => handleCancel(e, item.prop)}>
                  Cancel
                </button>
                <button
                  className="btn bg-success rounded text-light "
                  onClick={handleSave}>
                  Save
                </button>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
