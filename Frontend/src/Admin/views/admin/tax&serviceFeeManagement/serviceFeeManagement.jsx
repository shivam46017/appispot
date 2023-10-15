import React, { useState, useEffect, useCallback } from "react";
import DiscountCouponTable from "../discountCouponManagement/DiscountCouponTable";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import ServiceTable from "./tables/serviceTable";
import serviceTableHeader from "./tables/var/serviceTableVar";

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

function ServiceManagement() {
  const [taxInfo, setTaxInfo] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [serviceFee, setServiceFee] = useState();
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [tableData, setTableData] = useState([]);

  const fetchServiceInfo = async () => {
    const res = await axios("http://localhost:5000/api/admin/tax");
    setTaxInfo(res.data.taxInfos);
  };

  useEffect(() => {
    fetchServiceInfo();
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("http://localhost:5000/api/admin/tax", {
          state: selectedState,
          city: selectedCity,
          serviceFee
        });
        console.log(res.data);
        if (res.data.success === true) {
          toast.success("Successfully updated " + selectedState + ", " + selectedCity + " service fee to " + serviceFee + "%");
        }
        setTaxInfo((prev) => prev.map((value) => value.state === res.data.tax.state ? res.data.tax : value))
      } catch (err) {
        toast.error("Something went wrong while updating");
      }
    }

  useEffect(() => {
    setCities(
      taxInfo.filter((value) => value.state === selectedState)?.[0]?.cities
    );
  }, [selectedState, taxInfo]);

  useEffect(() => {
    console.log(tableData.splice(0, 100))
  }, [tableData])

  useEffect(() => {
    setServiceFee(() => {
      for (const i in taxInfo) {
        if(taxInfo[i].state === selectedState) {
          for(const city in taxInfo[i].cities) {
            if(cities[city].name === selectedCity) {
              return cities[city].serviceFee
            }
          }
        }
      }
    })
  }, [selectedCity]) 

  const makeTableData = async () => {
    let tData = [];
    for (const i in taxInfo) {
      for (const j in taxInfo[i].cities) {
        tData.push({
          state: taxInfo[i].state,
          city: taxInfo[i].cities[j].name,
          serviceFee: taxInfo[i].cities[j].serviceFee,
        });
      }
    }
    setTableData(tData);
    return tData;
  };

  useEffect(() => {
    setTableData(async () => await makeTableData())
    console.log(async () => await makeTableData())
  }, [taxInfo]);

  return (
    <div>
      <div className="flex justify-around">
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-white rounded-lg shadow-md w-1/3"
        >
          <h2 className="text-lg font-medium mb-4">Manage Service</h2>
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
              {taxInfo?.map((value, i) => (
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
              {cities?.map((value, i) => (
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
              Service Fee
            </label>
            <input
              type="number"
              name="serviceFee"
              value={serviceFee}
              step={0.01}
              onChange={(e) => setServiceFee(e.target.value)}
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
      <ServiceTable
      tableData={tableData}
      columnsData={serviceTableHeader}
      tableName="Service Fee"
      />
    </div>
  );
}

export default ServiceManagement;
