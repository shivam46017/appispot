import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import DiscountCouponTable from "./DiscountCouponTable";
import { useEffect } from "react";

function DiscountCoupon() {
  const [couponType, setCouponType] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [price, setPrice] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [venueCategory, setVenueCategory] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [ExpiryInDays, setExpiryInDays] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const categories = [
    {
      id: 1,
      categoryName: "Barbeque",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Barbeque.svg",
    },
    {
      id: 2,
      categoryName: "Picnic",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/PIcnic.svg",
    },
    {
      id: 3,
      categoryName: "Wedding",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Wedding.svg",
    },
    {
      id: 4,
      categoryName: "Wedding Reception",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/wedding Reception.svg",
    },
    {
      id: 5,
      categoryName: "Party",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Party.svg",
    },
    {
      id: 6,
      categoryName: "Graduation Party",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Graduation Party.svg",
    },
    {
      id: 7,
      categoryName: "Baby Shower",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Baby Shower.svg",
    },
    {
      id: 8,
      categoryName: "Birthday Party",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Birthday party.svg",
    },
    {
      id: 9,
      categoryName: "Engagement Party",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/engagement Party.svg",
    },
    {
      id: 10,
      categoryName: "OutDoor Dinner",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Outdoror Dinner.svg",
    },
    {
      id: 11,
      categoryName: "Bridal Shower",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Bridal shower.svg",
    },
    {
      id: 12,
      categoryName: "Gyms",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Gym.svg",
    },
    {
      id: 13,
      categoryName: "Gala",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Gala.svg",
    },
    {
      id: 14,
      categoryName: "Gathering",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Gathering.svg",
    },
    {
      id: 15,
      categoryName: "Fundraiser",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Fundraiser.svg",
    },
    {
      id: 16,
      categoryName: "Wellness",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Wllness.svg",
    },
    {
      id: 17,
      categoryName: "Video Shoot",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Videoshoot.svg",
    },
    {
      id: 18,
      categoryName: "Pop-up shops",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Shop.svg",
    },
    {
      id: 19,
      categoryName: "Corporate Party",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Cortorate party.svg",
    },
  ];
  const [table, setTable] = useState([]);

  const allData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/discountcoupon");
      const data = await res.data;
      console.log(data);
      setTable(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCoupon = async (e) => {
    e.preventDefault();

    // Add code to handle form submission (e.g., save coupon data)
    console.log(minOrder, code, price, description, endDate);
    try {
      const res = await axios.post("http://localhost:5000/api/genratecoupon", {
        couponType,
        MinOrder: minOrder,
        Code: code,
        Price: price,
        Description: description,
        offerValidTillDays: endDate,
      });
      const data = await res.data;
      console.log(data);
      toast.success("Coupon Added Successfully");

      // Reset form fields

      setCouponType("");
      setMinOrder("");
      setPrice("");
      setCode("");
      setDescription("");
      setEndDate("");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const handleDiscount = async (e) => {
    e.preventDefault();

    // Add code to handle form submission (e.g., save coupon data)
    console.log(minOrder, code, price, description, endDate);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/genratediscount",
        {
          venueCategory,
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

      setVenueCategory("");
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
    allData();
  }, []);


  return (
    <>
      <div className="flex justify-around">
        <form
          onSubmit={handleCoupon}
          className="p-4 bg-white rounded-lg shadow-md w-1/3"
        >
          <h2 className="text-lg font-medium mb-4">Coupon Management</h2>
          <div className="mb-4">
            <label
              htmlFor="couponType"
              className="block text-gray-700 font-medium mb-2"
            >
              Coupon Type
            </label>
            <select
              id="couponType"
              value={couponType}
              onChange={(e) => setCouponType(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-gray-700 font-medium mb-2"
            >
              Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
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
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            Add Coupon
          </button>
        </form>

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
              Venue Category
            </label>
            <select
              id="venueCategory"
              value={venueCategory}
              onChange={(e) => setVenueCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((item) => (
                <option key={item.id} value={item.categoryName}>{item.categoryName}</option>
              ))}
             
            </select>
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
      <DiscountCouponTable
        tableName={"Coupon Discount"}
        columnsData={couponDiscountHeader}
        tableData={table}
      />
    </>
  );
}

export default DiscountCoupon;

export const couponDiscountHeader = [
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
