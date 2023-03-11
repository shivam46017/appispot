import { Link } from "react-router-dom";
import React, {  useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar({ login, logout }) {
  // login = true;
  const [nav, setNav] = useState("hidden");
  // const [mounted, setMounted] = useState(false);

  const toggleNav = () => {
    if (nav === "hidden") {
      setNav("block");
    } else {
      setNav("hidden");
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
      <nav className="w-full bg-slate-100 top-0 shadow-md  inline-block h-24 ">
        <div className="w-full px-5 md:px-10 flex flex-wrap items-center lg:justify-around mt-0 pt-2">
          <div className=" px-0 pt-4 lg:pl-4 flex items-center lg:mx-4 cursor-pointer text-2xl md:pt-0 font-bold mx-3   ">
            <Link to="/" className="flex"><img src={'/logo.png'} className="md:pt-3 w-48 inline-flex " alt="" srcset="" /></Link>
          </div>
          <div className="flex md:hidden justify-end absolute right-4 md:right-13 items-center">
            <button
              onClick={() => toggleNav()}
              className="text-white  bg-blue-600 hover:bg-blue-600 font-medium rounded-lg text-lg px-3 py-2 text-center inline-flex items-center mx-1 "
            >
              {nav === "hidden" ? <AiOutlineMenu /> : <RxCross2 />}
            </button>
          </div>

          <div className="w-full flex-grow-5 md:flex md:flex-1 md:content-center md:justify-end md:w-auto h-0 md:h-auto overflow-hidden mt-2 md:mt-0 z-20 transition-all">
            <ul className="flex items-center md:flex-row text-base font-medium text-black">
              <li className="mx-2 my-2  hover:border-b-2 hover:border-blue-600">
                <Link to="/">Home</Link>
              </li>
              <li className="mx-2 my-2  hover:border-b-2 hover:border-blue-600">
                <Link to="/seller">Post Property</Link>
              </li>
              <li className="mx-2 my-2  hover:border-b-2 hover:border-blue-600">
                <Link to="/buyer">Buyer</Link>
              </li>
              <li className="mx-2 my-2  hover:border-b-2 hover:border-blue-600">
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
            <div className=" text-center my-2 pr-4 pl-2 group ">
              {!login ? (
                <div>
                  <Link to={"/user/login"}>
                    <button className="text-white bg-blue-600 hover:bg-blue-400 duration-300 focus:ring-2 focus:ring-blue-600 font-medium rounded-lg text-sm px-4 py-2 text-center  items-center mx-1">
                      Signup / Login
                    </button>
                  </Link>
                </div>
              ) : (
                <Link to={"/"} className="">
                  <MdOutlineAccountCircle className="text-2xl mx-2 " />
                  <div className="absolute hidden text-blue-700 pt-1 group-hover:block top-12 right-7 font-medium">
                    <Link
                      className="rounded-t bg-blue-200 hover:bg-blue-400  py-2 px-4 block whitespace-no-wrap"
                      to="/"
                    >
                      My Booking
                    </Link>

                    <Link
                      className="bg-blue-200 hover:bg-blue-400  py-2 px-4 block whitespace-no-wrap"
                      to="/"
                    >
                      My Listing
                    </Link>
                    <Link
                      className="rounded-b bg-blue-200 hover:bg-red-400 text-red-600 hover:text-blue-200 py-2 px-4 block whitespace-no-wrap"
                      to="/"
                    >
                      Logout
                    </Link>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div
          className={`bg-blue-100  text-center py-3 shadow-lg absolute w-full ${nav} md:hidden`}
        >
          <ul>
            <div className="text-center my-2 pl-2">
              {!login ? (
                <div>
                  <Link to={"/user/login"}>
                    <button className="text-white bg-blue-600 hover:bg-blue-400 duration-300 focus:ring-2 focus:ring-blue-600 font-medium rounded-lg text-sm px-3 py-2 text-center  items-center mx-1">
                      Login
                    </button>
                  </Link>
                  <Link to={"/signup"}>
                    <button className="text-white bg-blue-600 hover:bg-blue-400 duration-300 focus:ring-2 focus:ring-blue-600 font-medium rounded-lg text-sm px-3 py-2 text-center  items-center mx-1">
                      Signup
                    </button>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link to={"/"}>
                    <button className="text-white bg-blue-600 hover:bg-blue-400 duration-300 focus:ring-2 focus:ring-blue-600 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mx-1">
                      Account
                    </button>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-white bg-blue-600 hover:bg-blue-400 duration-300 focus:ring-2 focus:ring-blue-600 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mx-1"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <li className="pt-4 text-blue-600 font-bold ">
              <Link to="/">Home</Link>
            </li>
            <li className="pt-4 text-blue-600 font-bold">
              <Link to="/blog/">Blog</Link>
            </li>
            <li className="pt-4 text-blue-600 font-bold">
              <Link to="/notes/">Notes</Link>
            </li>
            <li className="pt-4 text-blue-600 font-bold">
              <Link to="/contact/">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
