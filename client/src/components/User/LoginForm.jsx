import { useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { userLogin } from "../../Services/API/auth";

const LoginForm = () => {
  const history = useHistory();
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const inputs = { ...formInputs };
    inputs[e.target.name] = e.target.value;
    setFormInputs(inputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { ...formInputs };
    const data = await userLogin(formData);
    if (data) {
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("user", JSON.stringify(data));
      history.push("/dashboard");
    }
  };

  return (
    <div className="container row m-auto mt-2 mt-md-4 ">
      <form
        onSubmit={handleSubmit}
        className="col col-md-8 col-lg-5 m-auto  p-5 rounded bg-warning shadow-lg">
        <h1 className="text-center mb-3">Login</h1>

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
            value={formInputs.email}
          />
        </h5>
        <h5 className="mb-3">
          <label for="password" className="form-label">
            password
          </label>
          <input
            required
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            value={formInputs.password}
          />
        </h5>

        <div>
          <p>
            New to Task-Manager? <a href="/register">Register</a>
          </p>
        </div>

        <div className="d-flex flex-row justify-content-start">
          <h5 className="mb-3">
            <button className="btn btn-primary">Login</button>
          </h5>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
