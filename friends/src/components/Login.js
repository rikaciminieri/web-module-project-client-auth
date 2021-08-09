import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", credentials)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        setCredentials({
          username: "",
          password: "",
        });
        history.push("/protected");
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onClick={submit}>
      <input
        type="text"
        placeholder="username"
        name="username"
        onChange={handleChange}
        value={credentials.username}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        onChange={handleChange}
        value={credentials.password}
      />
      <button>Log In</button>
    </form>
  );
};

export default Login;
