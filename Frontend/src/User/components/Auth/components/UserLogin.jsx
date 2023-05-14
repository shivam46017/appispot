import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useUserAuth } from "../../../../context/FirebaseAuth/UserAuthContext";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { logIn } = useUserAuth();

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
    try {
      let data = {
        emailId: email,
        password,
      };
      let firebaseLogin = await logIn(email, password);
      console.log(firebaseLogin);


      let res = "";
      if (firebaseLogin.user.emailVerified === true) {
        res = await axios.request({
          method: "POST",
          url: "https://appispot-server.onrender.com/api/user-login",
          data,
        });
      }

      
      let resData = res.data;

      if (
        resData.success === true &&
        firebaseLogin.user.emailVerified === true
      ) {
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

        console.log(resData);
        localStorage.setItem("user", JSON.stringify(resData.user));
        localStorage.setItem("userId", resData.user._id);
        navigate("/");
        setEmail("");
        setPassword("");
      } else if (firebaseLogin.user.emailVerified === false) {
        toast.error(
          "Your Email Is Not Verified, Please Verify Your Email First!",
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
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      toast.error("Something Went Wrong!", {
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
          <Link
            to="#"
            className="text-sm font-medium text-blue-600 hover:underline "
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full mt-3 uppercase text-black bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default UserLogin;
