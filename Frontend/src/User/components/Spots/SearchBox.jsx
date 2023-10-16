import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Dropdown from "./../../../Admin/components/dropdown/index";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import searchContext from "../../../context/search/searchContext";
import { DatePicker } from '@mui/x-date-pickers'


function SearchBox() {

    const { addFilter, filters, setUserWantToFilterOrNot, categoryList } = useContext(searchContext)

    const [selectedCategory, setSelectedCategory] = useState(filters.category)
    const [selectedCity, setSelectedCity] = useState(filters.city)
    const [selectedDate, setSelectedDate] = useState(filters.date)
    const [noOfGuests, setNoOfGuests] = useState(filters.guests)
    const [cities, setCities] = useState([])


    const handleSearch = () => {
        setUserWantToFilterOrNot(true)
    };

    const [categories, setcategories] = useState(categoryList);
    const [isSticky, setIsSticky] = useState(false);
    const [payload, setPayload] = useState({})

    const inputHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
    }

    useEffect(() => {
        const handleResize = () => {
            setIsSticky(window.innerWidth <= 600);
        };

        // Attach event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial check on component mount
        handleResize();

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        addFilter({
            category: selectedCategory,
            city: selectedCity,
            date: selectedDate,
            guests: noOfGuests
        })
    }, [selectedCategory, selectedCity, selectedDate, noOfGuests])

    const fetchCities = async () => {
        const res = await axios.get('/api/admin/cities')
        setCities(() => {
          console.log(res.data)
          return res.data.cities
        })
      }
    
      useEffect(() => {
        fetchCities()
      }, [])

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
                                setSelectedCategory(e.target.value)
                            }}
                            value={selectedCategory}>
                                <option value="" selected>Select Categories</option>
                            {
                                categoryList.map((item, index) => {
                                    return <option key={index} value={item._id} className="!text-black">{item.categoryName}</option>
                                })
                            }
                        </select>
                    </main>

                    <main className="">
                        <h1 className="text-sm font-semibold ml-3 text-black text-left">
                            City
                        </h1>
                        <select
                            className="bg-transparent block w-full border-none h-fit py-0 rounded-lg placeholder-gray-300 text-gray-400 outline-none"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value) }>
                                <option value="" selected>Select City</option>
                            {
                                cities.map((city, index) => {
                                    return <option key={index} value={city} className="!text-black">{city}</option>
                                })
                            }
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
                            onChange={(e) => setSelectedDate(e.target.value)}
                            value={selectedDate}
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
                            onChange={(e) => setNoOfGuests(Number(e.target.value))}
                            value={noOfGuests} />
                    </main>

                </div>
            </div>
        </>
    );
}

export default SearchBox;
