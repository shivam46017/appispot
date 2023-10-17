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
      
        <form
          onSubmit={handleDiscount}
          className="p-4 bg-white rounded-lg shadow-md w-1/3"
        >
          <h2 className="text-lg font-medium mb-4">Discount Management</h2>
          <div className="mb-4">
            <label
              htmlFor="venueCategory"
              className="block text-gray-700 font-medium mb-2"
            >
              Select Spots
            </label>
            <Select
              onChange={(newValues)=> setVenueId(newValues)}
              isMulti
              value={venueId}
              options={options}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="couponType"
              className="block text-gray-700 font-medium mb-2"
            >
              Discount Type
            </label>
            <select
              id="couponType"
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Coupon type</option>
              <option value="Percent">Percentage</option>
              <option value="flat">Flat</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="minOrder"
              className="block text-gray-700 font-medium mb-2"
            >
              Minimum Order
            </label>
            <input
              type="number"
              id="minOrder"
              value={minOrder}
              onChange={(e) => setMinOrder(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-medium mb-2"
            >
              Percent/Price
            </label>
            <input
              type="number"
              id="price"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block text-gray-700 font-medium mb-2"
            >
              End Date
            </label>
            <input
              type="number"
              placeholder="Enter number of days"
              id="endDate"
              value={ExpiryInDays}
              onChange={(e) => setExpiryInDays(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            Add Discount
          </button>
        </form>
      </div>
      {/* <DiscountCouponTable
        tableName={"Coupon Discount"}
        columnsData={couponDiscountHeader}
        tableData={table}
      /> */}
    </div>
  );
}

export default DiscountMangament;
