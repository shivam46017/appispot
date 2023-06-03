import React, { useState, useEffect } from "react";
import DiscountCouponTable from "../../../../../../Admin/views/admin/discountCouponManagement/DiscountCouponTable";
import axios from "axios";
import { toast } from "react-toastify";
import Select from 'react-select';
import { Button } from "@mui/material";
import ChatBox from "./ChatBox";
import { MdAccountCircle } from "react-icons/md";

function DiscountMangament() {
  const couponDiscountHeader = [
    {
      Header: "Coupon Type",
      accessor: "couponType",
    },
    {
      Header: "Minimun Order",
      accessor: "MinOrder",
    },
    {
      Header: "Price/Percent",
      accessor: "Price",
    },
    {
      Header: "Coupon Code",
      accessor: "Code",
    },
    {
      Header: "Start Date",
      accessor: "StartDate",
    },
    {
      Header: "Expiry Date",
      accessor: "EndDate",
    },
  ];
  const [venueId, setVenueId] = useState([]);
  const [minOrder, setMinOrder] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [ExpiryInDays, setExpiryInDays] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [options, setOptions] = useState([{}])
  const [table, setTable] = useState([]);


  const getSellerVenues = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/getspots/643d7b82740192f16ebc2c04/1");
      const data = await res.data;
      const spotData = data.yourSpots.map((spot) => ({
        value: spot._id,
        label: spot.Name,
      }));
      setOptions(spotData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDiscount = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/genratediscount",
        {
          venuesIds: venueId.map((venue) => venue.value),
          couponType: discountType,
          MinOrder: minOrder,
          Price: discountPrice,
          Description: description,
          ExpiryInDays,
        }
      );
      const data = await res.data;
      console.log(data);
      toast.success("Discount Added Successfully");

      // Reset form fields

      setVenueId("");
      setDiscountType("");
      setMinOrder("");
      setDiscountPrice("");
      setDescription("");
      setExpiryInDays("");
    } catch (error) {
      toast.error("Failed to add discount");
    }
  };
  useEffect(() => {
    getSellerVenues();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  
  return (
          <div className="max-h-full flex">
            <div className="chatsList border-l min-w-fit border-l-gray-500 px-3">
              <div className="flex flex-col max-h-full bg-[#eee] overflow-y-auto mr-6">
                <div className="p-4 bg-white border-b border-b-gray-500 pt-5">
                  <h1 className="text-2xl font-semibold">Chats</h1>
                </div>
                {
                  [1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <div className="flex pt-4 p-3 min-w-fit items-center gap-3 bg-white drop-shadow-lg">
                      <MdAccountCircle className="text-4xl text-blue-500" />
                      <span className="font-semibold">Alex Friedman</span>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="max-h-full relative">
            <div className="flex flex-col max-h-full bg-[#eee] px-4 py-2 pb-4 overflow-y-scroll">
              <div className="flex pt-4 p-3 items-center gap-3 bg-white drop-shadow-lg">
                <MdAccountCircle className="text-4xl text-blue-500" />
                <span className="font-semibold">Alex Friedman</span>  
              </div>              
              <ChatBox sender={0} message="Hello" />
              <ChatBox sender={1} message="Hey, How're you doin?" />
              <ChatBox sender={0} message="I'm good, what about you?" />
              <ChatBox sender={1} message="I'm good too, thanks for asking" />
              <ChatBox sender={0} message="No problem" />
              <ChatBox sender={1} message="So, what's up?" />
              <ChatBox sender={0} message="Nothing much, just chilling" />
              <ChatBox sender={1} message="Cool" />
              <ChatBox sender={0} message="Yeah" />
              <ChatBox sender={0} message="Yeah, YeahYeah, YeahYeah, YeahYeah, YeahYeah, YeahYeahYeahYeahYeahYeahYeahYeahYeahYeah, Yeah" />
              <ChatBox sender={0} message="Yeah, YeahYeah, YeahYeah, YeahYeah, YeahYeah, YeahYeah, Yeah" />
              <ChatBox sender={0} message="Yeah, YeahYeah, YeahYeah, YeahYeah, YeahYeah, YeahYeah, Yeah" />
              <ChatBox sender={0} message="Yeah, YeahYeah, YeahYeah, YeahYeah, YeahYeah, YeahYeah, Yeah" />

            </div>

            <div className="flex fixed mb-5 w-full md:pl-[36rem] z-10 bottom-0 right-0 flex-row gap-2">
              <input type="text" placeholder="Write a message" className="p-3 grow" />
              <button className="bg-blue-500 border border-blue-500 h-fit p-2 self-center px-4 rounded-lg text-white font-semibold" variant="gradient">Send</button>
            </div>
            </div>

           </div>
  );
}

export default DiscountMangament;
