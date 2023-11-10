import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// context
import adminContext from "../../../context/admin/adminContext";

function AdminAuth() {
  const { authenticateAdmin } = useContext(adminContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      const res = await authenticateAdmin(email, password);
      console.log(res);
      if (res.success) {
        toast.success("Successfully logged as Admin", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      }
    } catch (error) {
      toast.error("Something Went Wrong or Verify your email id", {
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
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <section
        className=" min-h-screen  mt-24 w-full text-gray-900 px-3 py-10 bg-gradient-to-br from-[#3cdbfb] to-[#fff]"
        style={{
          backgroundColor:
            "linear-gradient(297deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,212,255,1) 100%)",
        }}
      >
        <div className="w-full bg-gray-100 mx-auto  rounded-lg shadow-lg sm:max-w-5xl flex flex-col">
          <div className=" text-black flex items-center lg:mx-4 cursor-pointer text-2xl md:text-3xl pt-5 mb-2 font-bold mx-3 ">
            <span className="mb-3 md:mb-0">Welcome To</span>
            <img
              src={"http://localhost:5000/logo.png"}
              className="md:pt-4 w-32 md:w-44 mx-2 inline-flex "
              alt=""
              srcSet=""
            />
          </div>
          <div className="ml-4 text-left font-bold text-2xl">
            <h1>Admin Login</h1>
          </div>
          <div className="p-4">
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium "
                >
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
        </div>
      </section>
    </>
  );
}

export default AdminAuth;
