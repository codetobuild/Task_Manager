import { useState } from "react";
import { userRegistration } from "../../Services/API/auth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const history = useHistory();
  const [formInputs, setFormInputs] = useState({
    username: "",
    email: "",
    password: "",
    job: "",
    location: "",
  });

  const handleChange = (e) => {
    const inputs = { ...formInputs };
    inputs[e.target.name] = e.target.value;
    setFormInputs(inputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { ...formInputs };
    const data = await userRegistration(formData);
    console.log(data);
    if (data) {
      history.push("/login");
    }
  };

  return (
    <div className="container row m-auto mt-2 mt-md-4 ">
      <form
        onSubmit={handleSubmit}
        className="col col-md-8 col-lg-5 m-auto pt-3 p-4 p-md-5 rounded bg-info shadow-lg">
        <h1 className="text-center mb-3">Register</h1>
        <h5 className="mb-3">
          <label for="username" className="form-label">
            Username
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={handleChange}
            value={formInputs["username"]}
          />
        </h5>
        <h5 className="mb-3">
          <label for="email" className="form-label">
            Email
          </label>
          <input
            required
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={handleChange}
            value={formInputs["email"]}
          />
        </h5>
        <h5 className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            required
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            value={formInputs["password"]}
          />
        </h5>

        <h5 className="mb-3">
          <label for="job" className="form-label">
            Job title
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="job"
            name="job"
            onChange={handleChange}
            value={formInputs["job"]}
          />
        </h5>
        <h5 className="mb-3">
          <label for="location" className="form-label">
            Location
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="location"
            name="location"
            onChange={handleChange}
            value={formInputs["location"]}
          />
        </h5>

        <div>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>

        <div className="d-flex flex-row justify-content-start">
          <h5 className="mb-3">
            <button className="btn btn-primary">Register</button>
          </h5>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
