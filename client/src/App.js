import "./App.css";
import DashBoard from "./components/Tasks/Dashboard";
import TaskDetails from "./components/Tasks/TaskDetails";
import TaskForm from "./components/Tasks/TaskForm";
import Header from "./components/Header/Header";
import Profile from "./components/User/Profile";
import RegisterForm from "./components/User/RegisterForm";
import LoginForm from "./components/User/LoginForm";
import { useEffect } from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./components/HomePage";
import Team from "./components/Team/Team";
import About from "./components/About";
import { checkIsLoggedIn } from "./Services/API/auth";

function App() {
  // const [user, setUser] = useState(null);

  // check if user is logged in and store status
  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      async function fetchIsLoggedIn() {
        const data = await checkIsLoggedIn();
        console.log(data);
        localStorage.setItem("loggedIn", false);
        localStorage.setItem("user", "");
      }
      fetchIsLoggedIn();
    }
  }, []);

  return (
    <div className="">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/Profile" component={Profile} />
        <Route exact path="/teams" component={Team} />
        <Route exact path="/about" component={About} />

        <Route exact path="/dashboard" component={DashBoard} />
        <Route exact path="/dashboard/task/new" component={TaskForm} />
        <Route exact path="/dashboard/task/:id" component={TaskDetails} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
