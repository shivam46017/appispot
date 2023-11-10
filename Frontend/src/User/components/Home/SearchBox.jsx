import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify'

function SearchBox() {


  const [cities, setCities] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams()
  const [categoryList, setCategoryList] = useState([])

  const location = useLocation()

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
        className={`bg-[rgba(0,0,0,4)] rounded-full max-md:rounded-xl max-md:px-4 py-4 pl-6 px-3 w-max h-fit md:shadow-lg flex items-center sticky sm:fixed top-0 left-0 ml-[50%] translate-x-[-50%] mt-[130px] sm:mt-[160px]`}
      >
        <div className="grid grid-cols-1 py-1 md:flex md:flex-row md:justify-between gap-3 h-fit w-full items-center">
          <main className="">
            <h1 className="text-sm font-semibold !text-left ml-3 text-white ">
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
              <option value="">Select Category</option>
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
            <h1 className="text-sm font-semibold !text-left ml-3 text-white text-center">
              City
            </h1>
            <select
              className="bg-transparent block w-full border-none h-fit py-0 rounded-lg placeholder-gray-300 text-gray-400 outline-none"
              onChange={(e) => {
                searchParams.set('city', e.target.value)
                setSearchParams(searchParams)
              }}
              value={searchParams.get('city')}
            >
              <option value="">Select City</option>
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
            <h1 className="text-sm font-semibold !text-left ml-3 text-white text-center">
              Date
            </h1>
            <input
              type="Date"
              className="bg-black block w-full h-fit px-3 py-0 border-none rounded-lg  shadow-lg placeholder-gray-500 text-gray-400 outline-none "
              placeholder="Card holder"
              maxLength="22"
              onChange={(e) =>{
                searchParams.set('date', e.target.value)
                 setSearchParams(searchParams)
              }}
              value={searchParams.get('date')}
              style={{
                WebkitCalendarPickerIndicator: {
                  filter: "invert(1)",
                },
              }}
            />
          </main>

          <main className="">
            <h1 className="text-sm font-semibold !text-left ml-3 text-white text-center">
              Guests
            </h1>
            <input
              type="number"
              className="bg-transparent py-0 border-none block w-full h-fit rounded-lg shadow-lg placeholder-gray-500 text-gray-400 outline-none"
              placeholder="No. of Guests"
              maxLength="22"
              value={searchParams.get('guests')}
              onChange={(e) => {
                searchParams.set('guests', e.target.value)
                setSearchParams(searchParams)
              }}
            />
          </main>
          {location.search.length > 0 && (
            <div className="mx-auto rounded-full">
              <Link to={`/spots${location.search}`}>
                <button className="md:flex w-full justify-center items-center text-xl uppercase mx-auto aspect-square bg-blue-600 text-white px-4 py- rounded-full  hover:bg-blue-700 transition duration-300">
                  <BiSearch className="text-2xl" />
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchBox;
