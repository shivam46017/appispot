import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ListerLogin from "./components/ListerLogin";
import ListerSignup from './components/ListerSignup';

function ListerAuth({ login }) {
  const [isFlag, setIsFlag] = useState(true);
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
    if (e.target.name === "login") {
      setIsFlag(true);
    }
    if (e.target.name === "signup") {
      setIsFlag(false);
    }
  
  };
   return (
    <>
      <div>
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
      </div>
      {!login && (
        <section class=" min-h-screen mt-20 w-full text-gray-900  bg-center bg-cover bg-no-repeat px-3 py-10" style={{backgroundImage: "url('/images/ListerAuthPage.png')"}}>
          <div className="w-full mx-auto bg-gray-100  rounded-lg shadow-lg  sm:max-w-5xl  flex lg:h-[790px] ">
            <div class="md:block hidden w-1/2 bg-blue-100  rounded-md">
              <div className="items-center p-10 pt-16 flex flex-col justify-center">
                <p className="text-3xl mt-10 text-center text-gray-700  ">
                  Welcome to our community of hosts! As a new host, your passion
                  and dedication will undoubtedly make you a valuable addition
                  to our platform. We are here to support you every step of the
                  way, from listing your space to communicating with guests. Our
                  team is available to provide you with the resources and
                  guidance you need to succeed.
                </p>
                <span className="text-gray-700 white text-4xl mt-7 text-center">
                  Thank you for choosing AppiSpot!
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:py-0">
              <div className=" text-black flex items-center lg:mx-4 cursor-pointer text-2xl md:text-3xl pt-5 mb-2 font-bold mx-3  ">
                <span className="mb-3 md:mb-0"> Welcome To</span>
                <img
                  src={"/logo.png"}
                  className="md:pt-4 w-32 md:w-44 mx-2  inline-flex "
                  alt=""
                  srcSet=""
                />
              </div>
              <div className="  pt-0 md:p-8 md:pb-10">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={handleChange}
                    name="login"
                    className={`text-center py-2 px-4 my-3 border border-gray-300 text-base font-medium rounded-md focus:outline-none ${
                      isFlag ? "bg-blue-100 text-black" : "text-gray-700"
                    }`}
                  >
                    Login as a Host
                  </button>
                  <button
                    type="button"
                    onClick={handleChange}
                    name="signup"
                    className={`text-center py-2 my-3 px-4 border border-gray-300 text-base font-medium rounded-md focus:outline-none ${
                      !isFlag ? "bg-blue-100 text-black" : "text-gray-700"
                    }`}
                  >
                    Sign up as a Host
                  </button>
                </div>
                {isFlag ? <ListerLogin /> : <ListerSignup/>}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ListerAuth;
