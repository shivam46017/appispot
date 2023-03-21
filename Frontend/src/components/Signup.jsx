import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup({ login }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isBuyerSelected, setIsBuyerSelected] = useState(true);
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  // let a = email.split("@");

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
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "cpassword") {
      setCpassword(e.target.value);
    }
    if (e.target.name === "buyer") {
      setIsBuyerSelected(true);
    }
    if (e.target.name === "seller") {
      setIsBuyerSelected(false);
    }
    if (e.target.name == "phone") {
      setPhone(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      toast.error("Password and Confirm Password must be same!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (password.length < 6) {
      toast.error("Password must be 6 characters", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      try {
        let data = {
          firstName: name,
          lastName: "sharmma",
          emailId: email,
          password,
        };
        let res = await axios.request({
          method: "POST",
          url: "http://localhost:5000/api/user-signup",
          data,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res.data);

        let resData = res.data;
        if (resData.success === true) {
          toast.success("Your account has been created successfully.", {
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
            navigate("/user/login");
          }, 1000);

          setName("");
          setPhone("");
          setEmail("");
          setPassword("");
          setCpassword("");
        }
      } catch (error) {
        if (error.response.data.success === false) {
          toast.error("Email is already taken!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log();
        }
      }
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
        <section
          class=" min-h-screen  w-full text-gray-900  bg-center bg-cover bg-no-repeat px-3 py-10"
          style={{
            background:
              "url('https://images.unsplash.com/photo-1565402170291-8491f14678db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1117&q=80')", backgroundRepeat: "no-repeat", backgourndCover: "cover",
          }}
        >
          <div className="w-full bg-gray-50 mx-auto  rounded-lg shadow-lg  sm:max-w-md  ">
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
                
                <form onSubmit={handleSubmit}  method="post">
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={handleChange}
                      name="buyer"
                      className={`text-center py-2 px-4 my-3 border border-gray-300 text-base font-medium rounded-md focus:outline-none ${
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

                  <div className="my-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium "
                    >
                      Name
                    </label>
                    <input
                      onChange={handleChange}
                      value={name}
                      type="text"
                      name="name"
                      id="name"
                      className="border shadow-lg bg-blue-100 border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder="Your Name"
                      requiblue=""
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium "
                    >
                      Phone No.
                    </label>
                    <input
                      onChange={handleChange}
                      value={phone}
                      type="phone"
                      name="phone"
                      id="phone"
                      className="border shadow-lg bg-blue-100 border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder="Enter Your Phone Number"
                      requiblue=""
                    />
                  </div>
                  <div className="mb-2">
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
                  <div className="mb-2">
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
                  <div className="mb-2">
                    <label
                      htmlFor="cpassword"
                      className="block text-sm font-medium "
                    >
                      Confirm Password
                    </label>
                    <input
                      onChange={handleChange}
                      value={cpassword}
                      type="password"
                      name="cpassword"
                      id="cpassword"
                      placeholder="••••••••"
                      className="border shadow-lg bg-blue-100 border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      requiblue=""
                    />
                  </div>
                  <div className="mb-2 mt-5">
                    <div className="flex items-center justify-center w-full">
                      <label
                        for="dropzone-file"
                        className="border shadow-lg bg-blue-100 border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      >
                        <div className="flex flex-col items-center justify-center pt-3 pb-6">
                          <span> Upload Profile Image</span>
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-1 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="mb-1 text-sm text-black ">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-black ">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                        />
                      </label>
                    </div>
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

export default Signup;
