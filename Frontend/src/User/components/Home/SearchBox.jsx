import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropdown from "./../../../Admin/components/dropdown/index";
import { Link } from "react-router-dom";



function SearchBox() {

    const handleSearch = () => {
        // Handle search functionality here
    };
    const [isSticky, setIsSticky] = useState(false);
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

    return (
        <>
            <div
                className="bg-[rgba(0,0,0,0.4)] rounded-md p-5 px-5 md:shadow-lg sticky sm:fixed top-0 left-0 ml-[50%] translate-x-[-50%] mt-[130px] sm:mt-[300px] w-3/4"
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
                <div className="lg:grid grid-cols-1 py-3 md:grid-cols-2 lg:grid-cols-5 gap-4  item=center">
                    <main className="mt-4 p-2">
                        <h1 className="text-2xl my-2 uppercase font-semibold text-white text-center ">
                            Category
                        </h1>
                        <div className="">
                            <div className="my-1">
                                <Dropdown
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
                                />
                            </div>
                        </div>
                    </main>

                    <main className="mt-4 p-2">
                        <h1 className="text-2xl my-2 uppercase font-semibold text-white text-center">
                            City
                        </h1>
                        <div className="">
                            <div className="my-1">
                                <Dropdown
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
                                />
                            </div>
                        </div>
                    </main>

                    <main className="mt-4 p-2">
                        <h1 className="text-2xl my-2 uppercase font-semibold text-white text-center">
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
                    </main>

                    <main className="mt-4 p-2">
                        <h1 className="text-2xl my-2 uppercase font-semibold text-white text-center">
                            End Date
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
                    </main>

                    <main className="mt-4 p-2">
                        <h1 className="text-2xl my-2 uppercase font-semibold text-white text-center">
                            Guests
                        </h1>
                        <div className="">
                            <div className="my-1">
                                <input
                                    type="number"
                                    className="bg-blue-100 block w-full h-12 px-5 py-2 border rounded-lg  shadow-lg placeholder-black text-black focus:ring focus:outline-none"
                                    placeholder="No. of Guests"
                                    maxLength="22"
                                />
                            </div>
                        </div>
                    </main>
                </div>
                <div className="md:w-1/3 mx-auto">
                    <Link to={"/spots"}>
                        <button
                            className="md:flex w-full  justify-center items-center text-xl uppercase mx-auto mt-4  bg-blue-600 text-white px-4 py-2 rounded-full  hover:bg-blue-700 transition duration-300"
                            onClick={handleSearch}
                        >
                            Search Spots
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default SearchBox;
