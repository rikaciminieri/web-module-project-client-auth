import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const FriendsList = () => {
  const [friendsList, setFriendsList] = useState([]);

  console.log(friendsList);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosWithAuth()
        .get("/friends")
        .then((res) => setFriendsList(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div>
      <h1>Your Friends</h1>
      <ul>
        {friendsList ? (
          friendsList.map((friend) => {
            return <li key={friend.id}>{friend.name}</li>;
          })
        ) : (
          <p> No friends yet! Add a friend</p>
        )}
      </ul>
      <Link to="/add-friend">
        <button> Add a Friend!</button>
      </Link>
    </div>
  );
};

export default FriendsList;
