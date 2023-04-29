import {
  AiOutlineArrowLeft,
  AiOutlineEnter,
  AiOutlineFieldTime,
} from "react-icons/ai";
import { FaBed } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { BsPersonFill } from "react-icons/bs";
import { MdNightlightRound } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

const spot = {
  name: "OYO 644 Pong Pai House",
  cover:
    "https://th.bing.com/th/id/OIP.UEqkLMfo0bmA1RlfjnNqCgHaE7?pid=ImgDet&rs=1",
  address: "Near Suvarnabhumi Airport, Bangkok",
  reviews: { href: "#", average: 4, totalCount: 117 },
};

const selectedAmmenities = {
  date: "Tue, 11 Apr - Web, 12 Apr",
  bedSize: "Standard Double",
  room: "1 room, 2 guests",
  night: "1 Night Stay",
};

const price = {
  items: "Room price for 1 Night x 2 Guests",
  itemsPrice: 743,
  priceDrop: "Price Drop",
  priceDropAmount: 229,
  coupon: "42% Coupon Discount",
  couponAmount: 216,
};

export default function Checkout() {

  const location = useLocation()
  const {spotDetails, startDate, endDate, startTime, endTime, guests } = location.state

  const params = useParams()

  const spotId = params.spotId

  const [firstName, setfirstName] = useState(localStorage.user ? JSON.parse(localStorage.user).firstName : undefined)
  const [lastName, setlastName] = useState(localStorage.user ? JSON.parse(localStorage.user).lastName : undefined)
  const [email, setemail] = useState(localStorage.user ? JSON.parse(localStorage.user).emailId : undefined)
  const [phone, setphone] = useState(undefined)

  
  const handleSubmit = () => {
    
    async function bookSpot(){
      const response = await axios.post("http://localhost:5000/api/book-spot", {
        spotId,
        startDate,
        endDate,
        startTime,
        endTime,
        maxGuests: guests,
        name : firstName+lastName,
        email,
        phone,
        price: spotDetails.Price,
        userId: JSON.parse(localStorage.user)._id
      })
      const data = response.json()
      console.log(data)
    }
    bookSpot()
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="flex justify-center items-center p-2 pb-8 space-y-4 lg:space-y-0 lg:p-12 flex-col w-[100%]">
        <div className="flex flex-row space-x-2 pt-4 text-blue-600 font-bold mr-[45%]">
          <AiOutlineArrowLeft className="m-1" />
          <span onClick={()=>{
            window.history.back()
          }}>Modify your booking</span>
        </div>
        <div className="flex lg:flex-row flex-col space-y-4 lg:space-y-0 lg:space-x-10 lg:p-8">
          <div className="flex flex-col space-y-4 lg:w-fit">
            <div className="bg-[#FEF6E9] drop-shadow-lg text-center p-4 rounded-lg">{`🎉 Yay! you just saved $${price.couponAmount} on this booking!`}</div>
            <div className="flex flex-col drop-shadow-md rounded-lg border border-slate-300">
              <div className="bg-[#F3F4F6] p-6 flex flex-row space-x-2 text-lg font-black">
                <AiOutlineEnter className="m-1" />
                <h1>Enter your details</h1>
              </div>
              <div className="flex flex-col p-6 rounded-lg space-y-4">
                <p>
                  We will use these details to share your booking information
                </p>
                <form action="" className="flex flex-col space-y-6">
                  <div className="flex lg:flex-row flex-col lg:space-x-4">
                    <div className="flex flex-col space-y-1 text-lg">
                      <span className="font-bold">First Name</span>
                      <input
                        type="text"
                        name="fname"
                        placeholder="your first name"
                        className="rounded-lg"
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1 text-lg">
                      <span className="font-bold">Last Name</span>
                      <input
                        type="text"
                        name="lname"
                        placeholder="your last name"
                        className="rounded-lg"
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex lg:flex-row flex-col lg:space-x-4">
                    <div className="flex flex-col space-y-1 text-lg">
                      <span className="font-bold">Email Address</span>
                      <input
                        type="email"
                        name="email"
                        placeholder="name@abc.com"
                        className="rounded-lg"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1 text-lg">
                      <span className="font-bold">Phone Number</span>
                      <input
                        type="number"
                        name="number"
                        placeholder="eg. 1234567890"
                        className="rounded-lg"
                        value={phone}
                        onChange={(e) => setphone(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="p-4 bg-[#BFDBFE] text-lg font-bold rounded-lg hover:bg-blue-100"
                    onClick={handleSubmit}
                  >
                    Pay Now
                  </button>
                  <span className="text-xs text-center">
                    *by clicking pay now to accept to all our terms & conditions
                  </span>
                </form>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-6 p-6 border drop-shadow-md border-slate-300 bg-[#F3F4F6] rounded-lg">
            <div className="flex flex-row space-x-10">
              <div className="space-y-2">
                <h1 className="font-bold text-lg">{spotDetails.Name}</h1>
                <p className="text-sm">{spotDetails.Location}</p>
                <div className="flex flex-row">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          spot.reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-4 w-4 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <a
                    href={spot.reviews.href}
                    className="ml-auto text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {spot.reviews.totalCount} reviews
                  </a>
                </div>
              </div>
              <div>
                <img
                  className="w-32 rounded-lg drop-shadow-md"
                  src={spotDetails.coverImage}
                  alt="spot"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <div className="p-2 rounded-lg bg-white drop-shadow-md flex flex-row px-4">
                <AiOutlineFieldTime className="mt-1" />
                <p className="ml-auto">{startDate} - {endDate}</p>
              </div>
              {/* <div className="p-2 rounded-lg bg-white drop-shadow-md flex flex-row px-4">
                <FaBed className="mt-1" />
                <p className="ml-auto">{selectedAmmenities.bedSize}</p>
              </div> */}
              <div className="p-2 rounded-lg bg-white drop-shadow-md flex flex-row px-4">
                <BsPersonFill className="mt-1" />
                <p className="ml-auto">{guests} Guests</p>
              </div>
              <div className="p-2 rounded-lg bg-white drop-shadow-md flex flex-row px-4">
                <MdNightlightRound className="mt-1" />
                <p className="ml-auto">{new Date(endDate).getDate() - new Date(startDate).getDate()} Nights</p>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <ul className="flex flex-col space-y-3 border border-0 border-b-4 drop-shadow-md border-slate-300">
                <li className="flex flex-row">
                  <p>{price.items}</p>
                  <p className="ml-auto">{`-$${spotDetails.Price*2.8}`}</p>
                </li>
                <li className="flex flex-row">
                  <p>{price.priceDrop}</p>
                  <p className="ml-auto">{`-$${spotDetails.Price*0.6}`}</p>
                </li>
                <li className="flex flex-row pb-4">
                  <p>Discount</p>
                  <p className="ml-auto">{`-$${spotDetails.Price*1.2}`}</p>
                </li>
              </ul>
              <div className="flex flex-row">
                <ul>
                  <li className="flex flex-row font-black text-lg">
                    Payable Amount
                  </li>
                  <li className="text-xs">* inclusive of all taxes</li>
                </ul>
                <p className="ml-auto mt-2 font-black text-lg">
                  {`$${spotDetails.Price*2.8 - spotDetails.Price*0.6 - spotDetails.Price*1.2}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
