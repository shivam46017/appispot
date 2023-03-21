import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBuyerSelected, setIsBuyerSelected] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (login) {
      toast.success("You are already logged in!", {
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
        navigate("/");
      }, 1000);
    }
  }, [login]);

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "buyer") {
      setIsBuyerSelected(true);
    }
    if (e.target.name === "seller") {
      setIsBuyerSelected(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        emailId: email,
        password,
      };

      let res = await axios.request({
        method: "POST",
        url: "http://localhost:5000/api/user-login",
        data,
      });
      console.log(res);
      let resData = res.data;

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

        localStorage.setItem("user", resData.user);
        navigate("/");
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
      {!login && (
        <section
          class=" min-h-screen  w-full text-gray-900  bg-center bg-cover bg-no-repeat px-3 py-10"
          style={{
            background:
              "url('https://images.unsplash.com/photo-1565402170291-8491f14678db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1117&q=80')" }}
        >
            <div className="w-full bg-gray-50 mx-auto  rounded-lg shadow-lg  sm:max-w-md  ">
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:py-0">
                <div className=" text-black flex items-center lg:mx-4 cursor-pointer text-2xl md:text-3xl pt-5 mb-2 font-bold mx-3   ">
                  <span className="mb-3 md:mb-0"> Welcome To</span>
                  <img
                    src={"/logo.png"}
                    className="md:pt-4 w-32 md:w-44 mx-2  inline-flex "
                    alt=""
                    srcSet=""
                  />
                </div>
                <div className="  pt-0 md:px-8 md:pb-10">
                  <form onSubmit={handleSubmit} method="post">
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={handleChange}
                        name="buyer"
                        className={`text-center py-2 my-3 px-4 border border-gray-300 text-base font-medium rounded-md focus:outline-none ${
                          isBuyerSelected
                            ? "bg-blue-600 text-white"
                            : "text-gray-700"
                        }`}
                      >
                        Sign up as a Buyer
                      </button>
                      <button
                        type="button"
                        onClick={handleChange}
                        name="seller"
                        className={`text-center py-2 my-3 px-4 border border-gray-300 text-base font-medium rounded-md focus:outline-none ${
                          !isBuyerSelected
                            ? "bg-blue-600 text-white"
                            : "text-gray-700"
                        }`}
                      >
                        Sign up as a Seller
                      </button>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium "
                      >
                        Email
                      </label>
                      <input
                        onChange={handleChange}
                        value={email}
                        type="email"
                        name="email"
                        id="email"
                        className="border shadow-lg bg-blue-100 border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                        className="border shadow-lg bg-blue-100 border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        requiblue=""
                      />
                    </div>
                    <div className="md:flex items-center mt-5 justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5"></div>
                        <div className="text-sm">
                          <p className="text-sm font-light ">
                            Don’t have an account yet?{" "}
                            <Link
                              to="/user/signup"
                              className="font-medium text-blue-600 hover:underline "
                            >
                              Sign up
                            </Link>
                          </p>
                        </div>
                      </div>
                      <Link
                        to="#"
                        className="text-sm font-medium text-blue-600 hover:underline "
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-3  text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Sign Up
                    </button>
                  </form>
                </div>
              </div>
            </div>
        </section>
      )}
    </>
  );
}

export default Login;
