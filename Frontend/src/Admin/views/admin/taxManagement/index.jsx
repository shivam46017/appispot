import React, { useState, useEffect } from "react";
import DiscountCouponTable from "../../../../../../Admin/views/admin/discountCouponManagement/DiscountCouponTable";
import axios from "axios";
import { toast } from "react-toastify";
import Select from 'react-select';

function TaxManagement() {

    const [taxQueries, setTaxQueries] = useState([])

    const fetchTaxQueries = async () => {
        const res = await axios('http://localhost:5000/api/admin/cities')
        setTaxQueries(res.data.cities)
    }

  useEffect(() => {
    fetchTaxQueries()
  }, [])

  return (
    <div>
      <div className="flex justify-around">
      
        <form
          action="post"
          className="p-4 bg-white rounded-lg shadow-md w-1/3"
        >
          <h2 className="text-lg font-medium mb-4">Manage Tax</h2>
          <div className="mb-4">
            <label
              htmlFor="venueCategory"
              className="block text-gray-700 font-medium mb-2"
            >
              Select city
            </label>
            <Select
              onChange={(newValues)=> setVenueId(newValues)}
              isMulti
              value={venueId}
              options={options}
              name="city"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="couponType"
              className="block text-gray-700 font-medium mb-2"
            >
              Tax Rate
            </label>
            <input type="number" />
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

export default TaxManagement;
