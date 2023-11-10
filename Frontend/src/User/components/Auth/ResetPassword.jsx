import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import TickIcon from "@material-ui/icons/Check";
import CrossIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [requestStatus, setRequestStatus] = useState("userinput");
  const [loading, setLoading] = useState(false);
  const [validate, setValidate] = useState(true);

  const [searchParams] = useSearchParams();

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "cpassword") {
      setCPassword(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cpassword !== password) {
      setValidate(false);
      return toast.error("Confirm password is not matching", {
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
    try {
      setLoading(true);
      console.log(
        new URLSearchParams(window.location.search).get("token"),
        "$$searchparams"
      );
      const res = await axios.post(
        `http://localhost:5000/api/${
          window.location.pathname.split("/")[1]
        }/reset-password?token=${searchParams.get(
          "token"
        )}&password=${password}`
      );
      const { data } = res;

      console.log(data);

      if (data.success === true) {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setRequestStatus("success");
        setTimeout(() => {
          navigate(`/${window.location.pathname.split("/")[1]}/auth`);
        }, 2000);
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setRequestStatus("error");
    } finally {
      setLoading(false);
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
      <section
        className="min-h-screen mt-20 w-full text-gray-900  bg-center bg-cover bg-no-repeat px-3 py-10 grid place-items-center"
        style={{ backgroundImage: "url('/images/ListerAuthPage.png')" }}
      >
        <div className="w-full mx-auto bg-gray-100  rounded-lg shadow-lg  sm:max-w-5xl  flex lg:h-[50vh]">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:py-0">
            <div className=" text-black flex items-center lg:mx-4 cursor-pointer text-2xl md:text-3xl pt-5 mb-2 font-bold mx-3  ">
              <span className="mb-3 md:mb-0">Reset Password</span>
            </div>
            {requestStatus === "success" ? (
              <div className="container flex flex-col justify-center items-center p-4 gap-2">
                <div className="rounded-full border-2 p-4 border-green-400">
                  <TickIcon className="text-3xl text-green-400" />
                </div>
                <div className="font-bold text-2xl">
                  Email has been successfully sent to you
                </div>
                {requestStatus === "success" && (
                  <Link to="/user/auth">
                    Click here if you're not redirected to login page
                  </Link>
                )}
              </div>
            ) : requestStatus === "userinput" ? (
              <form onSubmit={handleSubmit} method="post">
                <div className="w-96">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium "
                  >
                    New Password
                  </label>
                  <input
                    onChange={handleChange}
                    value={password}
                    type="password"
                    name="password"
                    id="password"
                    className={`border border-gray-300 text-black sm:text-sm rounded-lg ${
                      validate
                        ? "focus:ring-blue-600 focus:border-blue-600"
                        : "ring-red-600 border-red-600"
                    } block w-full p-2.5`}
                    placeholder="******"
                    requiblue=""
                  />
                  <label
                    htmlFor="cpassword"
                    className="block text-sm font-medium mt-3"
                  >
                    Confirm Password
                  </label>
                  <input
                    onChange={handleChange}
                    value={cpassword}
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    className={`border border-gray-300 text-black sm:text-sm rounded-lg ${
                      validate
                        ? "focus:ring-blue-600 focus:border-blue-600"
                        : "ring-red-600 border-red-600"
                    } block w-full p-2.5`}
                    placeholder="*******"
                    requiblue=""
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-3 uppercase text-black bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {loading ? "Sending..." : "Reset"}
                </button>
              </form>
            ) : requestStatus === "error" ? (
              <div className="container flex flex-col justify-center items-center p-4 gap-2">
                <div className="rounded-full border-2 p-4 border-green-400">
                  <CrossIcon className="text-3xl text-green-400" />
                </div>
                <div className="font-bold text-2xl">
                  Something Went Wrong &#58;&#40;
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}

export default ResetPassword;
