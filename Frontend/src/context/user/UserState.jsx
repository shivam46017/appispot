import React from "react";
import UserContext from "./userContext";

const UserState = (props) => {
  return (
    <UserContext.Provider value={{ login, logout, user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
