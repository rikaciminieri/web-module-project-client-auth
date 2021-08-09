import "./App.css";
import { Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";

import { axiosWithAuth } from "./utils/axiosWithAuth";
import PrivateRoute from "./components/PrivateRoute";
import FriendsList from "./components/FriendsList";
import AddFriend from "./components/AddFriend";

function App() {
  const logout = () => {
    axiosWithAuth()
      .post("/logout")
      .then((res) => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <ul className="header">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link onClick={logout} to="/login">
            Logout
          </Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
      <Switch>
        <PrivateRoute exact path="/protected" component={FriendsList} />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/add-friend">
          <AddFriend />
        </Route>
        <Route>
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
