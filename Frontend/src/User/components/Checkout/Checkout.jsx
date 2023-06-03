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
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";

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
  const {spotDetails, startDate, endDate, startTime, endTime, guests, discountDetails } = location.state
  console.log(
  "Location", location.state
  )
  console.log("ST", startTime)
  console.log("ET", endTime)

  const params = useParams()

  const spotId = params.spotId

  const [firstName, setfirstName] = useState(localStorage.user ? JSON.parse(localStorage.user).firstName : undefined)
  const [lastName, setlastName] = useState(localStorage.user ? JSON.parse(localStorage.user).lastName : undefined)
  const [email, setemail] = useState(localStorage.user ? JSON.parse(localStorage.user).emailId : undefined)
  const [phone, setphone] = useState(undefined)

  const [showReviewDialog, setshowReviewDialog] = useState(false)
  const [starsSelectedForReview, setstarsSelectedForReview] = useState(0)
  const [reviewText, setreviewText] = useState("")

  const [coupon, setcoupon] = useState(undefined)
  const [couponData, setCouponData] = useState({})

  const checkCoupon = async () => {
    console.log(spotId);
    try {
        const res = await axios.request({
            method: "POST",
            url: "http://localhost:5000/api/verifycoupon",
            data: {
            Code: `${coupon}`,
            venueId: spotId,
            price: spotDetails.Price
          },
        });
        toast.success("Coupon Applied")
        setCouponData(res.data)

      } catch (error) {
        toast.error("Invalid Coupon")
      }
     
  };
  
  const handleSubmit = () => {
    
    async function bookSpot(){

      const response = await fetch("http://localhost:5000/book-spot", {
        method: "POST",
        body: JSON.stringify({
          userId: JSON.parse(localStorage.user)._id,
          spotId,
          startDate,
          endDate,
          startTime,
          endTime,
          guests,
          price: (discountDetails.code?discountDetails.code.couponType.toLowerCase()=="percent" || "flat"?spotDetails.Price-(discountDetails.code.Price/100)*(spotDetails.Price):(discountDetails.code.Price):spotDetails.Price) - (couponData.couponDetails?couponData.couponDetails.couponType.toLowerCase()=="percent"?(couponData.couponDetails.Price/100)*(spotDetails.Price):(couponData.couponDetails.Price):0)
        }),
        headers: {
          "Content-Type": "application/json",
        },
    })
      // if (response.status === 200)
      //   // alert("Booking Successful")
      //   // window.location.href = "/"
      //   toast.success("Booking Successful")
      //   setshowReviewDialog(true)
    }
    bookSpot()
  }

  function handleReviewSubmit(){
    async function submitReview(){
      const response = await axios.post("http://localhost:5000/api/review-spot", {
        userId: JSON.parse(localStorage.user)._id,
        spotId,
        rating: starsSelectedForReview,
        review: reviewText
      })
      console.log(response)
      if (response.status === 200)
        // alert("Booking Successful")
        // window.location.href = "/"
        toast.success("Review Submitted")
        setshowReviewDialog(false)
    }
    submitReview()
  }


  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
    {
      showReviewDialog && <div className="review-dialog-overlay flex justify-center items-center z-50 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50">
        <div className="review-dialog flex flex-col justify-center items-center bg-white p-8 rounded-lg">

        
      <span className="font-medium text-lg mb-2">How was your Experience?</span>
      <span className="text-gray-400 text-sm">
          Rate Stars
        </span>
        <div className="flex flex-row space-x-2 mt-2 mb-5">
          <StarIcon className={classNames(starsSelectedForReview >= 1 ? 'text-yellow-500' : 'text-gray-400', 'h-6 w-6 cursor-pointer')} onClick={()=>{
            console.log("clicked")
            setstarsSelectedForReview(1)
          }} />
          <StarIcon className={classNames(starsSelectedForReview >= 2 ? 'text-yellow-500' : 'text-gray-400', 'h-6 w-6 cursor-pointer')} onClick={()=>{
            console.log("clicked")
            setstarsSelectedForReview(2)
          }} />
          <StarIcon className={classNames(starsSelectedForReview >= 3 ? 'text-yellow-500' : 'text-gray-400', 'h-6 w-6 cursor-pointer')} onClick={()=>{
            console.log("clicked")
            setstarsSelectedForReview(3)
          }} />
          <StarIcon className={classNames(starsSelectedForReview >= 4 ? 'text-yellow-500' : 'text-gray-400', 'h-6 w-6 cursor-pointer')} onClick={()=>{
            console.log("clicked")
            setstarsSelectedForReview(4)
          }} />
          <StarIcon className={classNames(starsSelectedForReview >= 5 ? 'text-yellow-500' : 'text-gray-400', 'h-6 w-6 cursor-pointer')} onClick={()=>{
            console.log("clicked")
            setstarsSelectedForReview(5)
          }} />
        </div>
       <textarea name="review" value={reviewText} onChange={(e)=>{
          setreviewText(e.target.value)
       }} id="review" cols="30" placeholder="Your Experience" rows="4"></textarea>
      <div className="flex flex-row space-x-4 mt-4">
        <button className="bg-blue-600 text-white rounded-lg px-4 py-2" onClick={handleReviewSubmit}>Submit</button>
      
        <button className="bg-red-600 text-white rounded-lg px-4 py-2" onClick={()=>{
          setshowReviewDialog(false)
        }}>Cancel</button>
      </div>

      </div>
    </div>
    }
      
      <div className="flex justify-center items-center p-2 pb-8 space-y-4 lg:space-y-0 lg:p-12 flex-col mt-16 w-[100%]">
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
                  We will use these detail s to share your booking information
                </p>
                {/* <form action="http://localhost:5000/create-checkout-session" method="post" className="flex flex-col space-y-6"> */}
                <form className="flex flex-col space-y-6">
                  <div className="flex lg:flex-row flex-col lg:space-x-4">
                    <div className="flex flex-col space-y-1 text-lg">
                      <input type="text" name={"spotId"} value={spotId} className="hidden" />
                      <input type="text" name={"startDate"} value={startDate} className="hidden" />
                      <input type="text" name={"endDate"} value={endDate} className="hidden" />
                      <input type="text" name={"maxGuests"} value={guests} className="hidden" />
                      <input type="text" name={"startTime"} value={startTime} className="hidden" />
                      <input type="text" name={"endTime"} value={endTime} className="hidden" />
                      {/* <input type="text" name={"price"} value={price[1]} className="hidden" /> */}
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
                  <div className="flex flex-col gap-2">
                  <input type="number" className="hidden" name="price" value={(discountDetails.code?discountDetails.code.couponType.toLowerCase()=="percent" || "flat"?spotDetails.Price-(discountDetails.code.Price/100)*(spotDetails.Price):(discountDetails.code.Price):spotDetails.Price) - (couponData.couponDetails?couponData.couponDetails.couponType.toLowerCase()=="percent"?(couponData.couponDetails.Price/100)*(spotDetails.Price):(couponData.couponDetails.Price):0)} />
                  <span className="font-bold">Coupon Code</span>
                  <div className="flex items-center relative">
                      <input
                        type="text"
                        name="coupon"
                        placeholder="Any Coupon Code"
                        className="rounded-lg w-full"
                        value={coupon}
                        onChange={(e) => setcoupon(e.target.value)}
                      />
                      <button type="button" onClick={checkCoupon} className="font-medium text-[#24b124] absolute z-20 right-5 cursor-pointer">Apply</button>
                  </div>
                  </div>
                  <button
                    type="submit"
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
                <p className="ml-auto">{startDate}, {startTime}:00 - {endTime}:00</p>
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
              <ul className="flex flex-col space-y-3 border-0 border-b-4 drop-shadow-md border-slate-300">
                <li className="flex flex-row">
                  <p>{price.items}</p>
                  <p className="ml-auto">{`$ ${(spotDetails.Price*2.5).toFixed(2)}`}</p>
                </li>
                <li className="flex flex-row">
                  <p>{price.priceDrop}</p>
                  <p className="ml-auto">{`-$ ${(spotDetails.Price*0.6).toFixed(2)}`}</p>
                </li>

               { discountDetails.code && <li className="flex flex-row pb-4">
                  <p>Discount</p>
                  <p className="ml-auto">{discountDetails.code?.couponType.toLowerCase()==="percent"?`${discountDetails.code?discountDetails.code.Price:0}%`:` $ ${discountDetails.code?discountDetails.code.Price:0}`}</p>
                </li>}

                <li className="flex  pb-4 justify-between">
                {
                    couponData.couponDetails !==undefined &&
                    <>
                    <div>Coupon Code: </div>
                    <p className="font-semibold text-right">{couponData?couponData.couponDetails.Code:""} <span className="text-sm ml-1 font-bold text-green-500"> APPLIED!</span><br /><span>- {couponData.couponDetails.couponType.toLowerCase()=="percent"?`${couponData.couponDetails?couponData.couponDetails.Price:""} %`:`$ ${couponData.couponDetails?couponData.couponDetails.Price:""}`}</span></p>
                    </>
                  }
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
                  {/* {discountDetails.code?.couponType.toLowerCase()==='percent'? spotDetails.Price - (discountDetails.code.Price/100) * spotDetails.Price: discountDetails.code.Price} */}
                  {/*  - (discountDetails.code?discountDetails.code.couponType.toLowerCase()=="percent"?(discountDetails.code.Price/100)*(spotDetails.Price):(discountDetails.code.Price):0) */}

                  {`$ ${((discountDetails.code?discountDetails.code.couponType.toLowerCase()=="percent" || "flat"?spotDetails.Price-(discountDetails.code.Price/100)*(spotDetails.Price):(discountDetails.code.Price):spotDetails.Price) - (couponData.couponDetails?couponData.couponDetails.couponType.toLowerCase()=="percent"?(couponData.couponDetails.Price/100)*(spotDetails.Price):(couponData.couponDetails.Price):0)).toFixed(2)}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
