import "./Header.css";
import { useContext } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { userLogout } from "../../Services/API/auth";

const Header = () => {
  const history = useHistory();
  const location = useLocation();

  const handleLogin = () => {
    history.push("/login");
  };

  const handleLogout = () => {
    const fetchUserLogout = async () => {
      const data = await userLogout();
      console.log(data);
    };
    fetchUserLogout();
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    history.push("/");
  };
  const handleProfile = () => {};

  return (
    <div className="container-fluid bg-primary shadow">
      <div className="container">
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
              <a className="navbar-brand " href="/">
                {window.innerWidth >= 930 ? (
                  <h3>Task-Manager</h3>
                ) : (
                  <h5>Task-Manager</h5>
                )}
              </a>
              <button
                className="navbar-toggler "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <i className="fas fa-bars fs-2 text-light"></i>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      className="nav-link active fs-5"
                      aria-current="page"
                      href="/dashboard">
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active fs-5"
                      aria-current="page"
                      href="/teams">
                      Teams
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active fs-5"
                      aria-current="page"
                      href="/about">
                      About
                    </a>
                  </li>
                </ul>

                <div className="dropdown ">
                  <a
                    className="btn btn-transparent dropdown-toggle icon"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i className="fas fa-user-circle fs-1 text-light"></i>
                  </a>

                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    style={{ cursor: "pointer" }}
                    aria-labelledby="dropdownMenuLink">
                    {localStorage.getItem("loggedIn") === "true" ? (
                      <>
                        <li onClick={handleProfile}>
                          <a className="dropdown-item" href="/profile">
                            Profile
                          </a>
                        </li>
                        <li onClick={handleLogout}>
                          <span className="dropdown-item">Logout</span>
                        </li>
                      </>
                    ) : (
                      <li onClick={handleLogin}>
                        <span className="dropdown-item">Login</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Header;
