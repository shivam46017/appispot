import React, { useState, useEffect } from "react";
import DiscountCouponTable from "../../../../../../Admin/views/admin/discountCouponManagement/DiscountCouponTable";
import axios from "axios";
import { toast } from "react-toastify";
import Select from 'react-select';

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
    <div>
      <div className="flex justify-around">
           
      </div>
    </div>
  );
}

export default DiscountMangament;
