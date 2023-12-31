import React from "react";
import { useState, useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserAuth } from "../../../../context/userAuthContext/UserAuthContext";

import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput from "react-phone-input-2";

function UserSignup() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const { signUp, setUpRecaptha } = useUserAuth();

  const [number, setNumber] = useState("");
  const [otpForm, setOtpForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const [disbaleButton, setDisbaleButton] = useState(false);
  
  const { login, signup } = useUserAuth()
  console.log(login)
  console.log(signup)

  const handleChange = (e) => {
    if (e.target.name === "firstName") {
      setName(e.target.value);
    }
    if (e.target.name === "lastName") {
      setLastName(e.target.value);
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

    console.log(`${e.target.name}: ${e.target.value}`)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length < 2) {
      toast.error("First Name is required", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (email.length < 5) {
      toast.error("Enter a valid Email", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (password !== cpassword) {
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
          username: a[0],
          emailId: email,
          password,
        };
        console.log(data);

        const res = await signup(data)
        console.log(res)

        if(res?.success === false) {
          return toast.error(res.message)
        }

        if (res?.success === true) {
          toast.success("Link Sent to Your Email, Please Verify Your Email! ", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setName("");
          setLastName("");
          // setUsername("")
          setEmail("");
          setPassword("");
          setCpassword("");
          // setOtp("");
          // setOtpForm(false);
        }
      } catch (error) {
        console.log(error)
        toast.error("Something wrong happen", {
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
  };

  // const getOtp = async (e) => {
  //   e.preventDefault();
  //   let no = "+".concat(number);
  //   console.log(no);
  //   try {
  //     const response = await setUpRecaptha(no);
  //     setResult(response);
  //   } catch (err) {
  //     console.log(err);
  //     console.log(err);
  //     toast.error("Use another valid phone number!", {
  //       position: "top-right",
  //       autoClose: 1500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };

  // const verifyOtp = async (e) => {
  //   e.preventDefault();
  //   if (otp === "" || otp === null) return;
  //   try {
  //     setDisbaleButton(true);
  //     await result.confirm(otp);
  //     toast.success("OTP Verified!", {
  //       position: "top-right",
  //       autoClose: 1500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     // navigate("/home");
  //   } catch (err) {
  //     setDisbaleButton(false);
  //     toast.error("Please Enter a Valid OTP!", {
  //       position: "top-right",
  //       autoClose: 1500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };

  useEffect(() => {
    console.log(`number: ${number}`)
  }, [number])
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="my-2">
          <label htmlFor="name" className="block text-sm font-medium ">
            First Name
          </label>
          <input
            onChange={handleChange}
            value={name}
            type="text"
            name="firstName"
            id="firstName"
            className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="Your Name"
            requiblue=""
            required
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
            placeholder="Your Name"
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
        <div className="mb-2">
          <div className="" style={{ display: "block" }}>
            {/* <label htmlFor="name" className="block text-sm font-medium ">
              Enter Phone Number to get Verification Code
            </label> */}
            <div className="flex justify-between mb-3">
              {/* <PhoneInput
                inputStyle={{ padding: "10px 14px 8.5px 60px", width: "100%" }}
                countryCodeEditable={false}
                country={"in"}
                value={number}
                onChange={setNumber}
                placeholder="Enter Phone Number"
              /> */}
              {/* <button
                className="min-w-max mx-2 text-black uppercase bg-blue-200 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={getOtp}
              >
                Send Code
              </button> */}
            </div>
          </div>

          {/* <div style={{ display: otpForm ? "block" : "none" }}>
            <label htmlFor="name" className="block text-sm font-medium ">
              Enter Verification Code
            </label>
            <div className="flex justify-between mb-3">
              <input
                className="border w-2/3 disabled:bg-gray-100  border-gray-300  text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 "
                type="number"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                disabled={disbaleButton}
              />
              <button
                className="disabled:bg-gray-300  mx-2 text-black uppercase w-1/3 bg-blue-200 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  py-2.5 text-center"
                onClick={verifyOtp}
                disabled={disbaleButton}
              >
                Verify Code
              </button>
            </div>
          </div> */}
        </div>
        <div className="md:flex items-center mt-5 justify-between">
          <div className="flex items-start">
<div id="recaptcha-container"></div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-5 text-black uppercase bg-blue-200 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default UserSignup;
