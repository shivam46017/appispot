import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify'

function SearchBox() {

  const [isSticky, setIsSticky] = useState()
  const [cities, setCities] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const handleResize = () => {
      setIsSticky(window.innerWidth <= 600);
    };

    // Attach event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check on component mount
    handleResize();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchCities = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/cities");
    setCities(() => {
      console.log(res.data);
      return res.data.cities;
    });
  };

  const fetchCategories = async () => {
    const res = await axios.get(`http://localhost:5000/api/getCategories`);
    const resData = res.data;
    if (resData.success === true) {
      setCategoryList(resData.category);
      console.log(resData.category);
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchCities();
    fetchCategories()
  }, []);

  return (
    <>
      <div
        className={`white shadow-xl max-md:rounded-xl rounded-full py-2 pl-6 px-3 w-max h-fit md:shadow-lg flex items-center`}
      >
        <div className="grid grid-cols-1 py-1 md:flex md:flex-row md:justify-between gap-3 h-fit w-full items-center">
          <main className="">
            <h1 className="text-sm font-semibold ml-3 text-black text-left">
              Category
            </h1>
            <select
              className="bg-transparent block w-full py-0 border-none h-fit rounded-lg placeholder-gray-300 text-gray-400 outline-none"
              placeholder="Select"
              onChange={(e) => {
                searchParams.set('category', e.target.value)
                setSearchParams(searchParams)
              }}
              value={searchParams.get('category')}
            >
              <option value="" selected>
                Select Categories
              </option>
              {categoryList.map((item, index) => {
                return (
                  <option key={index} value={item._id} className="!text-black">
                    {item.categoryName}
                  </option>
                );
              })}
            </select>
          </main>

          <main className="">
            <h1 className="text-sm font-semibold ml-3 text-black text-left">
              City
            </h1>
            <select
              className="bg-transparent block w-full border-none h-fit py-0 rounded-lg placeholder-gray-300 text-gray-400 outline-none"
              value={searchParams.get('city')}
              onChange={(e) => {
                searchParams.set('city', e.target.value)
                setSearchParams(searchParams)
              }}
            >
              <option value="" selected>
                Select City
              </option>
              {cities.map((city, index) => {
                return (
                  <option key={index} value={city} className="!text-black">
                    {city}
                  </option>
                );
              })}
            </select>
          </main>
          <main className="">
            <h1 className="text-sm font-semibold !text-left ml-3 text-black ">
              Date
            </h1>
            <input
              type="Date"
              className="bg-transparent block w-full h-fit px-3 py-0 border-none rounded-lg placeholder-gray-500 text-gray-400 outline-none"
              maxLength="22"
              onChange={(e) => {
                searchParams.set('date', e.target.value)
                setSearchParams(searchParams)
              }}
              value={searchParams.get('date')}
            />
          </main>

          <main className="">
            <h1 className="text-sm font-semibold !text-left ml-3 text-black">
              Guests
            </h1>
            <input
              type="number"
              className="bg-transparent py-0 border-none block w-full h-fit rounded-lg placeholder-gray-500 text-gray-400 outline-none"
              placeholder="No. of Guests"
              maxLength="22"
              onChange={(e) => {
                searchParams.set('guests', e.target.value)
                setSearchParams(searchParams)
              }}
              value={searchParams.get('guests')}
            />
          </main>
        </div>
      </div>
    </>
  );
}

export default SearchBox;
