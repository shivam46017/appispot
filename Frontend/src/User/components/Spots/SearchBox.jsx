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
        const res = await axios.get('http://localhost:5000/api/admin/cities')
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
            // style={{
            //     backgroundColor: 'rgba(0, 0, 0, 0.4)',
            //     borderRadius: '0.375rem',
            //     padding: '1.25rem',
            //     paddingLeft: '1.25rem',
            //     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            //     position: isSticky ? 'sticky' : 'fixed',
            //     top: '0',
            //     left: '0',
            //     transform: 'translateX(-50%)',
            //     marginTop: '300px',
            //     marginLeft: '50%',
            //     width: '75%',
            //     backdropFilter: "blur(8px"
            // }}
            >
                <div className="grid grid-cols-1 py-1 md:flex md:flex-row md:justify-between gap-3 h-fit w-full items-center">
                    <main className="">
                        <h1 className="text-sm font-semibold ml-3 text-black text-left">
                            Category
                        </h1>
                        {/* <Dropdown
                                    button={
                                        <input
                                            type="text"
                                            className="bg-blue-100 block w-full h-12 px-5 py-2 border rounded-lg  shadow-lg placeholder-black text-black focus:ring focus:outline-none"
                                            placeholder="Select Category"
                                            maxLength="22"
                                        />
                                    }
                                    children={
                                        <div className="flex h-48 overflow-y-auto no-scrollbar w-52 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 ">
                                            <div className="mt-3 h-px w-full bg-gray-200  " />
                                            <div className="mt-3 ml-4 flex flex-col ">
                                                <a href=" " className="text-sm text-gray-800  hover:">
                                                    Profile Settings
                                                </a>
                                                <a
                                                    href=" "
                                                    className="mt-3 text-sm text-gray-800  hover:"
                                                >
                                                    Newsletter Settings
                                                </a>
                                            </div>
                                        </div>
                                    }
                                    classNames={"py-2 top-12  w-max"}
                                /> */}
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
                        {/* <Dropdown
                                    button={
                                        <input
                                            type="text"
                                            className="bg-blue-100 block w-full h-12 px-5 py-2 border rounded-lg  shadow-lg placeholder-black text-black focus:ring focus:outline-none"
                                            placeholder="Select City"
                                            maxLength="22"
                                        />
                                    }
                                    children={
                                        <div className="flex h-48 overflow-y-auto no-scrollbar w-52 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 ">
                                            <div className="mt-3 h-px w-full bg-gray-200  " />
                                            <div className="mt-3 ml-4 flex flex-col ">
                                                <a href=" " className="text-sm text-gray-800  hover:">
                                                    Profile Settings
                                                </a>
                                                <a
                                                    href=" "
                                                    className="mt-3 text-sm text-gray-800  hover:"
                                                >
                                                    Newsletter Settings
                                                </a>
                                            </div>
                                        </div>
                                    }
                                    classNames={"py-2 top-12  w-max"}
                                /> */}
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

                    {/* <main className="mt-4 p-2">
                        <h1 className="text-sm font-semibold !text-left ml-3 text-black text-center">
                            Start Date
                        </h1>
                        <div className="">
                            <div className="my-1">
                                <input
                                    type="Date"
                                    className="bg-blue-100 block w-full h-12 px-5 py-2 border rounded-lg  shadow-lg placeholder-black text-black focus:ring focus:outline-none"
                                    placeholder="Card holder"
                                    maxLength="22"
                                />
                            </div>
                        </div>
                    </main> */}

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
                            onChange={(e) => setNoOfGuests(e.target.value)}
                            value={noOfGuests} />
                    </main>

                </div>
            </div>
        </>
    );
}

export default SearchBox;
