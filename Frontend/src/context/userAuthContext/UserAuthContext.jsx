import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(undefined);

  const navigate = useNavigate();

  const verifyEmail = async (email, role) => {
    try {
      console.log(email, role);
      const res = await axios.post(
        `http://localhost:5000/api/${role}/get-email-verification`,
        {
          emailId: email,
        }
      );
      let { data } = res;
      console.log(data);
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
      const res = await axios.post(
        "http://localhost:5000/api/user-login",
        data
      );
      console.log(res.data.user);
      let resData = res.data;
      console.log(resData);
      if (resData?.user.verified === false) {
        toast.warning("Verify you're email first!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        verifyEmail(data.emailId, "user");
      }
      console.log(resData.user.verified);
      if (resData?.success === true) {
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
        localStorage.setItem("userRole", "user");
        navigate("/home");
      }

      console.log(resData.user);
      setUser(resData.user);
      return resData.user;
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
      const res = await axios.post("http://localhost:5000/api/user-signup", {
        emailId,
        password,
        firstName,
        lastName,
      });
      const { data } = res;
      console.log(res.data);
      if (data.success === true) {
        toast.success(
          "You have been signedup verify yourself. In sometime you will receive mail",
          {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );

        verifyEmail(emailId, "user");
      }
      setUser(data.user);
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

  const fetchFromLocalStorage = async () => {
    const payload = localStorage.getItem("user");
    const user = await JSON.parse(payload);
    setUser(user);
  };

  useEffect(() => {
    fetchFromLocalStorage();
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        login,
        signup,
        verifyEmail,
        user,
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
