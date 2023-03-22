import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';


function UserAuth({ login }) {
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
   
    if (e.target.name === "buyer") {
      setIsFlag(true);
    }
    if (e.target.name === "seller") {
      setIsFlag(false);
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
        <section class=" min-h-screen  w-full text-gray-900  bg-center bg-cover bg-no-repeat px-3 py-10" style={{backgroundImage: "url('/images/UserAuthPage.png')"}}>
          <div className="w-full bg-gray-100 mx-auto  rounded-lg shadow-lg sm:max-w-5xl flex ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:py-0 lg:h-[700px]">
              <div className=" text-black flex items-center lg:mx-4 cursor-pointer text-2xl md:text-3xl pt-5 mb-2 font-bold mx-3 ">
                <span className="mb-3 md:mb-0"> Welcome To</span>
                <img
                  src={"/logo.png"}
                  className="md:pt-4 w-32 md:w-44 mx-2 inline-flex "
                  alt=""
                  srcSet=""
                />
              </div>
              <div className="  pt-0 md:px-8 md:pb-10 h-full">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={handleChange}
                    name="buyer"
                    className={`text-center py-2 px-4 my-3 border border-gray-300 text-base font-medium rounded-md focus:outline-none ${isFlag
                        ? "bg-blue-100 text-black"
                        : "text-gray-700"
                      }`}
                  >
                   Login as an User
                  </button>
                  <button
                    type="button"
                    onClick={handleChange}
                    name="seller"
                    className={`text-center py-2 my-3 px-4 border border-gray-300 text-base font-medium rounded-md focus:outline-none ${!isFlag
                        ? "bg-blue-100 text-black"
                        : "text-gray-700"
                      }`}
                  >
                    Signup as an User
                  </button>
                </div>
                {isFlag ? <UserLogin /> : <UserSignup />}
              </div>
            </div>
            <div class="md:block hidden w-1/2 bg-blue-100  rounded-md">
              <div className="items-center p-10 pt-16 flex flex-col justify-center">
                <p className="text-3xl mt-10 text-center text-gray-800 ">
                  We are thrilled to welcome you to AppiSpot where you can
                  discover and book unique spaces for your upcoming events,
                  meetings, productions, and other types of gatherings. Our
                  platform offers an extensive selection of spaces that cater to
                  your individual needs and preferences, ranging from and back
                  yard to event spots.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default UserAuth;
