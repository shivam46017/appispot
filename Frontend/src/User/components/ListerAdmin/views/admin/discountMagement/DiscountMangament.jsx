import React, { useState,useEffect } from 'react'
import DiscountCouponTable from '../../../../../../Admin/views/admin/discountCouponManagement/DiscountCouponTable';
import axios from 'axios';
import { toast } from 'react-toastify';

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
    const [venueId, setVenueId] = useState("");
    const [couponType, setCouponType] = useState("");
    const [minOrder, setMinOrder] = useState("");
    const [price, setPrice] = useState("");
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [venueCategory, setVenueCategory] = useState("");
    const [discountType, setDiscountType] = useState("");
    const [ExpiryInDays, setExpiryInDays] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
  
    const [table, setTable] = useState([]);
  
    const getAllDiscount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sellerdiscount");
        const data = await res.data;
        console.log(data);
        setTable(data.data);
      } catch (error) {
        console.log(error);
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
        setStartDate("");
        setExpiryInDays("");
      } catch (error) {
        toast.error("Failed to add discount");
      }
    };
    useEffect(() => {
      // getAllDiscount();
    }, []);
  

    const options = [
      { id: 1, label: 'Option 1' },
      { id: 2, label: 'Option 2' },
      { id: 3, label: 'Option 3' },
      // Add more options as needed
    ];
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
  
    const handleOptionChange = (option) => {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    };
  
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
              Venue Category
            </label>
            <div className="relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            id="dropdown-menu"
            aria-haspopup="true"
            aria-expanded={isOpen ? 'true' : 'false'}
            onClick={toggleDropdown}
          >
            {selectedOptions.length > 0
              ? `${selectedOptions.length} selected`
              : 'Select options'}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              transform={isOpen ? 'rotate(180)' : 'none'}
            >
              <path
                fillRule="evenodd"
                d="M10 12l-6-6 1.5-1.5L10 9.01l4.5-4.51L16 6l-6 6z"
              />
            </svg>
          </button>
        </span>
      </div>
      {isOpen && (
        <div
          className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdown-menu"
        >
          <div className="py-1" role="none">
            {options.map((option) => (
              <label
                key={option.id}
                className="flex items-center px-4 py-2 text-sm font-normal text-gray-700 cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  className="form-checkbox focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
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
    </div>
  )
}

export default DiscountMangament

