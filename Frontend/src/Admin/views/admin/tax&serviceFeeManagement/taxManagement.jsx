import React, { useState, useEffect, useCallback } from "react";
import DiscountCouponTable from "../discountCouponManagement/DiscountCouponTable";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import TaxTable from "./tables/taxTable";
import taxTableHeader from "./tables/var/taxTableVar";

/*
            <input
              type="number"
              id="minOrder"
              value={minOrder}
              onChange={(e) => setMinOrder(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
             */

/**
            <Select
              onChange={(newValues)=> setVenueId(newValues)}
              isMulti
              value={venueId}
              options={taxQueries.map((tax) => tax.city)}
              name="city"
            />
 */

function TaxManagement() {
  const [taxInfo, setTaxInfo] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [taxRate, setTaxRate] = useState();
  const [serviceFee, setServiceFee] = useState();
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

  const fetchTaxInfo = async () => {
    const res = await axios("http://localhost:5000/api/admin/tax");
    setTaxInfo(res.data.taxInfos);
  };

  useEffect(() => {
    fetchTaxInfo();
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("http://localhost:5000/api/admin/tax", {
          city: selectedCity,
          taxRate,
          serviceFee,
        });
        if (res.data.success === true) {
          toast.success("Successfully updated " + res.data.tax.city);
        }
        setTaxInfo((prev) => {
          let newTaxInfo = prev.map((value, i) => {
            if (value.city === res.data.tax.city) {
              return res.data.tax;
            }
            return value;
          });
          return newTaxInfo;
        });
      } catch (err) {
        toast.error("Something went wrong while updating");
      }
    },
    [selectedCity, taxRate, serviceFee]
  );

  useEffect(() => {
    setCities(
      taxInfo.filter((value) => value.state === selectedState)?.[0]?.cities
    );
    setTaxRate((prev) =>
      taxInfo.filter((value) => value.state === selectedState)
    );
  }, [selectedState, selectedCity]);

  return (
    <div>
      <div className="flex justify-around">
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-white rounded-lg shadow-md w-1/3"
        >
          <h2 className="text-lg font-medium mb-4">Manage Tax</h2>
          <div className="mb-4">
            <label
              htmlFor="states"
              className="block text-gray-700 font-medium mb-2"
            >
              Select state
            </label>
            <select
              name="state"
              id="states"
              className="w-full"
              onChange={(e) => setSelectedState(e.target.value)}
              value={selectedState}
            >
              <option value={""}>Select State</option>
              {taxInfo.map((value, i) => (
                <option value={value.state} onClick={() => setIndex(i)}>
                  {value.state}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="cities"
              className="block text-gray-700 font-medium mb-2"
            >
              Select city
            </label>
            <select
              name="city"
              id="cities"
              className="w-full"
              onChange={(e) => setSelectedCity(e.target.value)}
              value={selectedCity}
            >
              <option value={""}>Select City</option>
              {cities.map((value, i) => (
                <option value={value.name} onClick={() => setIndex(i)}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="couponType"
              className="block w-full text-gray-700 font-medium mb-2"
            >
              Tax Rate
            </label>
            <input
              type="number"
              name="taxRate"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
            />
          </div>
          {/* <div className="mb-4">
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
          </div> */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            Update
          </button>
        </form>
      </div>
      <TaxTable 
      tableName="Tax"
      tableData={taxInfo ?? [] }
      columnData={taxTableHeader}/>
    </div>
  );
}

export default TaxManagement;
