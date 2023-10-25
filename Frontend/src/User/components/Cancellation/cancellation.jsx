import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function CancellationForm() {
  const [selectedSpot, setSelectedSpot] = useState("");
  const [password, setPassword] = useState("");
  const [bookedSpots, setBookedSpots] = useState([])

  const handleChange = (e) => {
    if (e.target.name === "spot") {
      setSelectedSpot(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      emailId: email,
      password,
    };
  };

  const getMyBookedSpots = async () => {
    const res = await axios(`http://localhost:5000/api/user/my-booked-spots/${localStorage.getItem('userId')}`)
    setBookedSpots(res.data.bookedSpots ?? [])
  }

  return (
    <div className="pt-28 p-12">
      <div className="mb-4">
        <h1 className="font-bold text-3xl text-black">Request Booked Spot Cancellation</h1>
      </div>
      <form onSubmit={handleSubmit} method="post">
        <div className=""></div>
        <div className="mb-3">
          <label htmlFor="spot" className="block text-sm font-medium ">
            Booked Spots
          </label>
          <select
            onChange={handleChange}
            value={selectedSpot}
            name="spot"
            id="spot"
            className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            required=""
          >
            <option value="">Select Spot</option>
            {
              bookedSpots?.map((value) => {
                return (
                  <option value={value._id}>{value.Name}</option>
                )
              })
            }
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="block text-sm font-medium ">
            Reason
          </label>
          <textarea
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

        <button
          type="submit"
          className="w-full mt-3 uppercase text-black bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Request
        </button>
      </form>
    </div>
  );
}

export default CancellationForm;
