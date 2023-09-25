import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useUserAuth } from "../../../../context/userAuthContext/UserAuthContext";
import UserForget from "./userForget";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useUserAuth();
  const [requestEmailVerification, setRequestEmailVerification] =
    useState(false);
  const [forgotEmailDialog, setForgotEmailDialog] = useState(false)

  const { verifyEmail, user } = useUserAuth();

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      emailId: email,
      password,
    };
    const res = await login(data);

    if (res.verified === true) {
      return navigate("/home");
    }

    if (res.verified === false) {
      setRequestEmailVerification(true);
      toast.error("You're email has not been verified yet", {
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


  return (
    <div>
      <form onSubmit={handleSubmit} method="post">
        <div className="mb-3">
          <label htmlFor="email" className="block text-sm font-medium ">
            Email
          </label>
          <input
            onChange={handleChange}
            value={email}
            type="email"
            name="email"
            id="email"
            className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="name@company.com"
            requiblue=""
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="block text-sm font-medium ">
            Password
          </label>
          <input
            onChange={handleChange}
            value={password}
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            requiblue=""
          />
        </div>
        <div className="md:flex items-center mt-5 justify-between">
          <button
            onClick={() => setForgotEmailDialog(true)}
            type="button"
            className="text-sm font-medium text-blue-600 hover:underline "
          >
            Forgot password?
          </button>
          {requestEmailVerification && (
            <button
              type="button"
              onClick={() => verifyEmail(user._id, user.emailId)}
              className="text-sm font-medium text-blue-600 hover:underline "
            >
              verify email
            </button>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-3 uppercase text-black bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Login
        </button>
      </form>
      <UserForget open={forgotEmailDialog} handleClose={() => setForgotEmailDialog(false)}/>
    </div>
  );
}

export default UserLogin;
