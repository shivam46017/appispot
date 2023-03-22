import React from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useUserAuth } from "../../../../context/FirebaseAuth/UserAuthContext";


function ListerSignup({ login }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { signUp, sendEmail } = useUserAuth();
  
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
    if (e.target.name === "lastName") {
      setLastName(e.target.value);
    }
    // if (e.target.name === "username") {
    //   setUsername(e.target.value);
    // }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "cpassword") {
      setCpassword(e.target.value);
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
        let a = email.split("@");
        let data = {
          firstName: name,
          lastName,
          phone,
          username: a[0],
          emailId: email,
          password,
        };

        // const firebaseUserAuth = await signUp(email, password);
        // const ver= await sendEmail()

        // console.log(firebaseUserAuth.user.emailVerified)
        // console.log(ver)

        let res = await axios.request({
          method: "POST",
          url: "http://localhost:5000/api/seller-signup",
          data,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res.data);

        let resData = res.data;
        if (resData.success === true ){
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
          // setTimeout(() => {
          //   navigate("/");
          // }, 1000);

          setName("")
          setLastName("")
          // setUsername("")
          setEmail("")
          setPassword("")
          setCpassword("")
          setPhone("")
          
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
        }
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} method="post">
        <div className="my-2">
          <label htmlFor="name" className="block text-sm font-medium ">
            Name
          </label>
          <input
            onChange={handleChange}
            value={name}
            type="text"
            name="name"
            id="name"
            className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="Your Name"
            requiblue=""
          />
        </div>
        <div className="my-2">
          <label htmlFor="name" className="block text-sm font-medium ">
            Last Name
          </label>
          <input
            onChange={handleChange}
            value={lastName}
            type="text"
            name="lastName"
            id="lastName"
            className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="Your Last Name"
            requiblue=""
          />
        </div>

        {/* <div className="mb-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium "
          >
            Username
          </label>
          <input
            onChange={handleChange}
            value={username}
            type="text"
            name="username"
            id="username"
            className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="Enter Your Phone Number"
            requiblue=""
          />
        </div> */}
        <div className="mb-2">
          <label htmlFor="phone" className="block text-sm font-medium ">
            Phone No.
          </label>
          <input
            onChange={handleChange}
            value={phone}
            type="phone"
            name="phone"
            id="phone"
            className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="Enter Your Phone Number"
            requiblue=""
          />
        </div>
        <div className="mb-2">
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
        <div className="mb-2">
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
        <div className="mb-2">
          <label htmlFor="cpassword" className="block text-sm font-medium ">
            Confirm Password
          </label>
          <input
            onChange={handleChange}
            value={cpassword}
            type="password"
            name="cpassword"
            id="cpassword"
            placeholder="••••••••"
            className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            requiblue=""
          />
        </div>
        {/* <div className="mb-2 mt-5">
                    <div className="flex items-center justify-center w-full">
                      <label
                        for="dropzone-file"
                        className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                  </div> */}
        <button
          type="submit"
          className="w-full mt-3  text-black uppercase bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default ListerSignup;
