import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Dropdown from "./../../../Admin/components/dropdown/index";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import searchContext from "../../../context/search/searchContext";


function SearchBox() {

    const { addFilter, filters, setUserWantToFilterOrNot, categoryList } = useContext(searchContext)

    const [selectedCategory, setSelectedCategory] = useState(filters.category)
    const [selectedCity, setSelectedCity] = useState(filters.city)
    const [selectedDate, setSelectedDate] = useState(filters.date)
    const [noOfGuests, setNoOfGuests] = useState(filters.guests)


    const handleSearch = () => {
        setUserWantToFilterOrNot(true)
    };

    const [categories, setcategories] = useState([
        {
            id: 0,
            categoryName: "",
            isChecked: false,
            icon: "/Icons/CategoriesIcons/Barbeque.svg"
        },
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
    ]);
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

    const cities = ["", "Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"]

    return (
        <>
            <div
                className={`white shadow-xl rounded-full py-2 pl-6 px-3 w-max h-fit md:shadow-lg flex items-center`}
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
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            value={selectedCategory}>
                                <option value="" selected>Select Categories</option>
                            {
                                categoryList.map((item, index) => {
                                    return <option key={index} value={item.id} className="!text-black">{item.categoryName}</option>
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