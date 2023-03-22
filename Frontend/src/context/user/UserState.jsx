import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import {  useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const UserState = (props) => {
 

 
  return (
    <UserContext.Provider value={{ login, handleLogin }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
