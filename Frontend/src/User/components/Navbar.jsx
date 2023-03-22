import { Link } from "react-router-dom";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { TfiMenu } from "react-icons/tfi";
import { MdAccountCircle } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar({ login, logout }) {
  const [nav, setNav] = useState("translate-x-full");
  const [dropDown, setDropDown] = useState(false);
  // const [mounted, setMounted] = useState(false);

  const toggleNav = () => {
    if (nav === "translate-x-full") {
      setNav("translate-x-0");
    } else {
      setNav("translate-x-full");
    }
  };

  return (
    <>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
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
      <nav
        className="w-full bg-white top-0 shadow-md  inline-block h-24 "
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <div className="w-full px-5 md:px-10 flex flex-wrap items-center lg:justify-around mt-0 pt-2">
          <div className=" px-0 pt-4 lg:pl-4 flex items-center lg:mx-4 cursor-pointer text-2xl md:pt-0 font-bold mx-3   ">
            <Link to="/" className="flex">
              <img
                src={"/logo.png"}
                className="md:pt-4 w-44 inline-flex "
                alt=""
                srcSet=""
              />
            </Link>
          </div>
          <div className="flex md:hidden justify-end absolute right-4 md:right-13 items-center">
            <button
              onClick={() => toggleNav()}
              className="text-white  font-medium rounded-lg text-lg px-3 py-2 text-center inline-flex items-center mx-1 "
            >
              {nav === "translate-x-full" ? (
                <TfiMenu className="text-blue-500 font-bold text-3xl" />
              ) : (
                <RxCross2 />
              )}
            </button>
          </div>

          <div className="w-full flex-grow-5 md:flex md:flex-1 md:content-center md:justify-end md:w-auto h-0 md:h-auto overflow-hidden mt-2 md:mt-0 z-20 transition-all">
            <ul className="flex items-center md:flex-row text-base font-medium text-black">
              <li className="mx-2 my-2  hover:border-b-2 hover:border-blue-600">
                <Link to="/">Home</Link>
              </li>
              <Link to={"/lister/auth"}>

              <button className="text-white bg-blue-600 hover:bg-blue-400 duration-300 focus:ring-2 focus:ring-blue-600 font-medium rounded-lg text-sm px-4 py-2 text-center  items-center mx-1">
                      List Your Spot!
                    </button>
              </Link>
             
            </ul>
            <div className=" text-center my-2 pr-4 pl-2 group ">
              {!login ? (
                <div>
                  <Link to={"/user/auth"}>
                    <button className="text-white bg-blue-600 hover:bg-blue-400 duration-300 focus:ring-2 focus:ring-blue-600 font-medium rounded-lg text-sm px-4 py-2 text-center  items-center mx-1">
                      Signup / Login
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <MdAccountCircle
                    className="hover:text-blue-600"
                    size={30}
                    onClick={() => setDropDown(!dropDown)}
                  />
                  <div
                    className={`absolute transition-all opacity-${
                      dropDown ? "1" : "0 hidden"
                    } right-10 top-16   bg-white shadow-lg border rounded-lg px-4 py-2 w-40`}
                  >
                    <ul onClick={() => setDropDown(false)}>
                      <li className="py-2 text-sm hover:text-blue-700">
                        <Link to="/my-account">My Account</Link>
                      </li>
                      <li className="py-2 text-sm hover:text-blue-700">
                        <Link to="/booking">My Booking</Link>
                      </li>
                      <li className="py-2 text-sm hover:text-blue-700">
                        <Link to="/my-venues">My Listing</Link>
                      </li>
                      <li className="py-2 text-sm hover:text-blue-700">
                        <Link to="/my-venues">Buy Premium</Link>
                      </li>
                      <li
                        className="py-2 text-sm hover:text-blue-700"
                        onClick={logout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className={` ${nav}  md:hidden z-20 transition-transform w-full  transform fixed top-0 right-0 bg-blue-100 py-10 px-8  h-full overflow-y-scroll`}
        >
          <ul>
            <div className="text-center my-2 pl-2">
              {login && (
                <div className="flex justify-between">
                  <div className="cursor-pointer">
                    <Link to="/" className="flex">
                      <img
                        src={"/logo.png"}
                        className="w-48 inline-flex "
                        alt=""
                        srcSet=""
                      />
                    </Link>
                  </div>
                </div>
              )}
              <div className="py-2 flex justify-between">
                {nav === "translate-x-full" ? (
                  <AiOutlineMenu />
                ) : (
                  <>
                    <img
                      src={"/logo.png"}
                      className="w-48 inline-flex "
                      alt=""
                      srcSet=""
                    />
                    <RxCross2
                      className="  text-3xl font-bold"
                      onClick={() => toggleNav()}
                    />
                  </>
                )}
              </div>
            </div>

            <li className="mx-2 py-3 text-lg font-medium  hover:border-b-2 hover:border-blue-600">
              <Link to="/">Home</Link>
            </li>
            <li className="mx-2 py-3 text-lg font-medium  hover:border-b-2 hover:border-blue-600">
              <Link to="/seller">List Property</Link>
            </li>

            <li className="mx-2 py-3 text-lg font-medium  hover:border-b-2 hover:border-blue-600">
              <Link to="/contact">Contact Us</Link>
            </li>

            <li className="mx-2 py-3 text-lg font-medium  hover:border-b-2 hover:border-blue-600">
              <Link to="/my-account">My Account</Link>
            </li>
            <li className="mx-2 py-3 text-lg font-medium  hover:border-b-2 hover:border-blue-600">
              <Link to="/booking">My Booking</Link>
            </li>
            <li className="mx-2 py-3 text-lg font-medium  hover:border-b-2 hover:border-blue-600">
              <Link to="/my-venues">My Listing</Link>
            </li>
            <li className="mx-2 py-3 text-lg font-medium  hover:border-b-2 hover:border-blue-600">
              <Link to="/my-venues">Buy Premium</Link>
            </li>
            {login ? (
              <li
                className="mx-2 py-3 text-lg font-medium text-red-400 hover:border-b-2 hover:border-red-600"
                onClick={logout}
              >
                Logout
              </li>
            ) : (
              <>
                {" "}
                <li className="mx-2 py-3 text-lg font-medium hover:border-b-2 hover:border-blue-600">
                  <Link to="/user/login"> Login</Link>
                </li>
                <li className="mx-2 py-3 text-lg font-medium hover:border-b-2 hover:border-blue-600">
                  <Link to="/user/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
