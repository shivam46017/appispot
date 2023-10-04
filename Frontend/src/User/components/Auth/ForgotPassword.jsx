import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TickIcon from "@material-ui/icons/Check";
import CrossIcon from "@material-ui/icons/Cancel";
import axios from "axios";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [requestStatus, setRequestStatus] = useState('userinput');
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.post(
        `http://192.168.1.104:5000/api/forgot-password?email=${email}`
      );
      const { data } = res;

      console.log(data)

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
        setRequestStatus('success')
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
      setRequestStatus('error')
    } finally {
      setLoading(false)
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
        class="min-h-screen mt-20 w-full text-gray-900  bg-center bg-cover bg-no-repeat px-3 py-10 grid place-items-center"
        style={{ backgroundImage: "url('/images/ListerAuthPage.png')" }}
      >
        <div className="w-full mx-auto bg-gray-100  rounded-lg shadow-lg  sm:max-w-5xl  flex lg:h-[50vh]">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:py-0">
            <div className=" text-black flex items-center lg:mx-4 cursor-pointer text-2xl md:text-3xl pt-5 mb-2 font-bold mx-3  ">
              <span className="mb-3 md:mb-0">Reset Password</span>
            </div>
            {requestStatus === 'success' ? (
              <div className="container flex flex-col justify-center items-center p-4 gap-2">
                <div className="rounded-full border-2 p-4 border-green-400">
                  <TickIcon className="text-3xl text-green-400" />
                </div>
                <div className="font-bold text-2xl">
                  Email has been successfully sent to you
                </div>
              </div>
            ) : requestStatus === 'userinput' ? (
              <form onSubmit={handleSubmit} method="post">
                <div className="w-96">
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-3 uppercase text-black bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {
                    loading 
                    ? 'Sending...'
                    : 'Get Reset Email'
                  }
                </button>
              </form>
            ) : requestStatus === 'error' ? (
              <div className="container flex flex-col justify-center items-center p-4 gap-2">
                <div className="rounded-full border-2 p-4 border-green-400">
                  <CrossIcon className="text-3xl text-green-400" />
                </div>
                <div className="font-bold text-2xl">
                  Something Went Wrong &#58;&#40;
                </div>
              </div>
            ) : (
              null
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgotPassword;
