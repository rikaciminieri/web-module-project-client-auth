import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const AddFriend = () => {
  const initialFormValues = {
    name: "",
    age: "",
    email: "",
  };

  const history = useHistory();

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newFriend = { ...formValues, id: Date.now() };
    axiosWithAuth()
      .post("/friends", newFriend)
      .then((res) => {
        history.push("/protected");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Add a new Friend</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
          value={formValues.name}
        />
        <input
          type="number"
          placeholder="Age"
          name="age"
          onChange={handleChange}
          value={formValues.age}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={formValues.email}
        />
        <button>Add Friend</button>
      </form>
    </div>
  );
};

export default AddFriend;
