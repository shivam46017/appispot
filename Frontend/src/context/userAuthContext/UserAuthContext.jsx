import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(undefined);

  const verifyEmail = async (id, email, name) => {
    try {
      const res = await axios.post(
        `http://192.168.1.104:5000/api/get-email-verification/${id}`,
        {
          email,
          name
        }
      );
      let { data } = res;
      console.log(data)
      toast.success("Verification email has been sent successfully");
    } catch (err) {
      console.error(err);
    }
  };

  /**
   *  
   * @param { string } email
   * @param { string } password
   * @param { () => void } cb
   * @returns
   */
  const login = async (data, cb) => {
    try {
      const res = await axios.post("http://192.168.1.104:5000/api/user-login", data);
      console.log(res.data.user)
      let resData = res.data
      
      if (resData.success === true) {
        toast.success("You are logged in!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("user", JSON.stringify(resData.user));
        localStorage.setItem("userId", resData.user._id);
      } 
      console.log(resData.user)
      setUser(resData.user)
      return resData.user
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  /**
   *
   * @param {{ email: string, password: string, firstName: string, lastName: string }} data
   * @param { () => void } cb
   */

  const signup = async ({ emailId, password, firstName, lastName }, cb) => {
    try {
      const res = await axios.post("http://192.168.1.104:5000/api/user-signup", {
        emailId,
        password,
        firstName,
        lastName,
      });
      console.log(res);
      const { data } = res;
      if (data.success === true) {
        verifyEmail(data.user._id, data.user.emailId, data.user.firstName + " " + data.user.lastName);
        toast.success("Verification Email has been sent to your signup email");
        return data;
      }
      setUser(data.user)
    } catch (err) {
      console.log(err);
      let msg = err.response.data.message;
      toast.error(msg);
    } finally {
      if (!cb) return;
      if (!(typeof cb === "function"))
        throw Error("Expected callback function but got " + typeof cb);
      cb();
    }
  };

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <userAuthContext.Provider
      value={{
        login,
        signup,
        verifyEmail,
        user
      }}
    >
      <ToastContainer />
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}