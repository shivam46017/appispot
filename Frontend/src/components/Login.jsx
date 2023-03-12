import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBuyerSelected, setIsBuyerSelected] = useState(true);

  // const router = useRouter()
  // login=true
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
      // setTimeout(() => {
      //   router.push('/')
      // }, 1000);
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
    let data = {
      identifier: email,
      password,
      isBuyerSelected
    };
    let res = await fetch("", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let resData = await res.json();
    if (resData.data === null && resData.jwt === null) {
      toast.error("Invalid Cblueential!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (resData.jwt) {
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
      localStorage.setItem("token", resData.jwt);
      localStorage.setItem("user", resData.user.username);
      setTimeout(() => {
        // router.push("/")
      }, [1000]);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      {!login && (
        <section className=" min-h-screen ">
          <div className="flex flex-col items-center justify-center px-4 py-8 mx-auto md:py-5">
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
           <div className="px-0 pt-2 my-5 lg:pl-4 ml-3 flex items-center lg:mx-4 cursor-pointer text-3xl md:text-4xl md:pt-0 font-bold mx-3   ">
              <Link to="/">Welcome To Appispot</Link>
            </div>

            <div className="w-full bg-blue-200  rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0  ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                  Sign in to your account
                </h1>
                <form onSubmit={handleSubmit} method="post">
                {/* <div className="grid grid-cols-2 gap-4">
                    <button type="button" onClick={handleChange} name="buyer" className={`text-center py-2 px-4 border border-transparent font-medium rounded-md focus:outline-none ${
                        isBuyerSelected ? "bg-blue-600 text-white" : "text-gray-700" }`}
                    >
                      Sign up as a Buyer
                    </button>
                    <button type="button"
                      onClick={handleChange} name="seller" className={`text-center py-2 px-4 border border-transparent font-medium rounded-md focus:outline-none ${
                        !isBuyerSelected ? "bg-blue-600 text-white" : "text-gray-700" }`}
                    >
                      Sign up as a Seller
                    </button>
                  </div> */}
                  <div className="my-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium  "
                    >
                      Your email
                    </label>
                    <input
                      onChange={handleChange}
                      type="email"
                      name="email"
                      value={email}
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder="name@company.com"
                      requiblue=""
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium  "
                    >
                      Password
                    </label>
                    <input
                      onChange={handleChange}
                      type="password"
                      name="password"
                      value={password}
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      requiblue=""
                    />
                  </div>
                  <div className="md:flex items-center mt-3 justify-between">
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
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center border border-transparent  shadow-sm  focus:ring-offset-2 mt-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Login
                    </button>

                    {/* <button
                      type="submit"
                      className="w-full flex justify-center border border-transparent  shadow-sm  focus:ring-offset-2 mt-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      {isBuyerSelected ? "Buyer Login" : "Seller Login"}
                    </button> */}
                  </div>
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
