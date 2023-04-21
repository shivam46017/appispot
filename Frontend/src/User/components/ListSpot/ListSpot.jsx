import React, {useEffect, useState} from 'react';
import axios from 'axios';

function ListSpot() {

    //logic to limit user from uploading more than 15 images and files larger than 2 mb

    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
    const MAX_NUM_FILES = 15;

    //to store the files
    const [files, setFiles] = useState([]);

    const [cities, setcities] = useState([])

    const positionStackAPIKey = "b2b97ee9bcee7c4a1e69ce8b98b37b34"
    

    useEffect(() => {
        async function fetchCities() {
            const options = {
                method: 'GET',
                url: 'https://referential.p.rapidapi.com/v1/city',
                params: {
                    fields: 'iso_a2,state_code,state_hasc,timezone,timezone_offset',
                    lang: 'en',
                    limit: '250'
                },
                headers: {
                    'X-RapidAPI-Key': '288d4fa6f1msh340b04a3ab0076ap1d923bjsn6b1789362fe1',
                    'X-RapidAPI-Host': 'referential.p.rapidapi.com'
                }
            };

            const response = await axios.request(options)
            console.log(response.data);
            setcities(response.data)
        }
        async function getAmmeenitiesAndCategories () {
            const response1 = await axios.get('http://localhost:5000/api/v1/amenities')
        }
        // fetchCities()
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            async function getLocationDetails (){
                const options = {
                    method: 'GET',
                url: 'http://api.positionstack.com/v1/reverse',
                params: {
                    access_key: positionStackAPIKey,
                    query: `${position.coords.latitude},${position.coords.longitude}`,
                    limit: '1'
                }
            };
            const response = await axios.request(options)
            console.log(response.data);
        }
        getLocationDetails()
    });
    }, [])

    const handleCityChange = (event) => {
        const selectedCity = event.target.value;
        setFormValues({
            ...formValues,
            Location: selectedCity
        })
        async function fetchCities(keyword) {
            const options = {
                method: 'GET',
                url: 'https://referential.p.rapidapi.com/v1/city',
                params: {
                    fields: 'iso_a2,state_code,state_hasc,timezone,timezone_offset',
                    lang: 'en',
                    name: keyword,
                    limit: '250'
                },
                headers: {
                    'X-RapidAPI-Key': '288d4fa6f1msh340b04a3ab0076ap1d923bjsn6b1789362fe1',
                    'X-RapidAPI-Host': 'referential.p.rapidapi.com'
                }
            };

            const response = await axios.request(options)
            console.log(response.data);
            setcities(response.data)
        }
        fetchCities(selectedCity)
    }

    //to handle the file change
    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        const fileList = Array.from(selectedFiles);

        // Limit number of files
        if (fileList.length > MAX_NUM_FILES) {
            alert(`You can only upload up to ${MAX_NUM_FILES} files`);
            return;
        }

        // Limit file size
        const invalidFiles = fileList.filter((file) => file.size > MAX_FILE_SIZE);
        if (invalidFiles.length > 0) {
            const invalidFileNames = invalidFiles.map((file) => file.name).join(', ');
            alert(`The following files exceed the maximum size of 2MB: ${invalidFileNames}`);
            return;
        }

        // Update the state
        setFiles(fileList);
    };

    //lofic to handle the categories dynamically
    const [categories, setcategories] = useState([
        {id: 1, categoryName: 'Barbeque', isChecked: false, icon: "/Icons/CategoriesIcons/Barbeque.svg"},
        {id: 2, categoryName: 'Picnic', isChecked: false, icon: "/Icons/CategoriesIcons/PIcnic.svg"},
        {id: 3, categoryName: 'Wedding', isChecked: false, icon: "/Icons/CategoriesIcons/Wedding.svg"},
        {id: 4, categoryName: 'Wedding Reception', isChecked: false, icon: "/Icons/CategoriesIcons/wedding Reception.svg"},
        {id: 5, categoryName: 'Party', isChecked: false, icon: "/Icons/CategoriesIcons/Party.svg"},
        {id: 6, categoryName: 'Graduation Party', isChecked: false, icon: "/Icons/CategoriesIcons/Graduation Party.svg"},
        {id: 7, categoryName: 'Baby Shower', isChecked: false, icon: "/Icons/CategoriesIcons/Baby Shower.svg"},
        {id: 8, categoryName: 'Birthday Party', isChecked: false, icon: "/Icons/CategoriesIcons/Birthday party.svg"},
        {id: 9, categoryName: 'Engagement Party', isChecked: false, icon: "/Icons/CategoriesIcons/engagement Party.svg"},
        {id: 10, categoryName: 'OutDoor Dinner', isChecked: false, icon: "/Icons/CategoriesIcons/Outdoror Dinner.svg"},
        {id: 11, categoryName: 'Bridal Shower', isChecked: false, icon: "/Icons/CategoriesIcons/Bridal shower.svg"},
        {id: 12, categoryName: 'Gyms', isChecked: false, icon: "/Icons/CategoriesIcons/Gym.svg"},
        {id: 13, categoryName: 'Gala', isChecked: false, icon: "/Icons/CategoriesIcons/Gala.svg"},
        {id: 14, categoryName: 'Gathering', isChecked: false, icon: "/Icons/CategoriesIcons/Gathering.svg"},
        {id: 15, categoryName: 'Fundraiser', isChecked: false, icon: "/Icons/CategoriesIcons/Fundraiser.svg"},
        {id: 16, categoryName: 'Wellness', isChecked: false, icon: "/Icons/CategoriesIcons/Wllness.svg"},
        {id: 17, categoryName: 'Video Shoot', isChecked: false, icon: "/Icons/CategoriesIcons/Videoshoot.svg"},
        {id: 18, categoryName: 'Pop-up shops', isChecked: false, icon: "/Icons/CategoriesIcons/Shop.svg"},
        {id: 19, categoryName: "Corporate Party", isChecked: false, icon: "/Icons/CategoriesIcons/Cortorate party.svg"}
    ]);

    //to handle the amenities dynamically
    const [amenities, setamenities] = useState([
        {id: 1, amenityName: 'Fire Pit', isChecked: false, icon: "/Icons/AmminitiesIcons/Fire Pit.svg"},
        {id: 2, amenityName: 'Deck', isChecked: false, icon: "/Icons/AmminitiesIcons/Deck.svg"},
        {id: 3, amenityName: 'Pool', isChecked: false, icon: "/Icons/AmminitiesIcons/Pool.svg"},
        {id: 4, amenityName: 'Gazeboo', isChecked: false, icon: "/Icons/AmminitiesIcons/Gazebo.svg"},
        {id: 5, amenityName: 'Grill', isChecked: false, icon: "/Icons/AmminitiesIcons/Grill.svg"},
        {id: 6, amenityName: 'Hot Tub', isChecked: false, icon: "/Icons/AmminitiesIcons/Hot Tub.svg"},
        {id: 7, amenityName: 'Restroom', isChecked: false, icon: "/Icons/AmminitiesIcons/Restroom.svg"},
        {id: 8, amenityName: 'Pet Friendly', isChecked: false, icon: "/Icons/AmminitiesIcons/Pet Friendly.svg"},
        {id: 9, amenityName: "Jacuzzi", isChecked: false, icon: "/Icons/AmminitiesIcons/Jacuzee.svg"},
        {id: 10, amenityName: "Noise Friendly", isChecked: false, icon: "/Icons/AmminitiesIcons/Noice Friendly.svg"},
        {id: 11, amenityName: 'Wifi', isChecked: false, icon: "/Icons/AmminitiesIcons/Wifi.svg"},
        {id: 12, amenityName: 'Chairs & Tables', isChecked: false, icon: "/Icons/AmminitiesIcons/Table Chair.svg"},
        {id: 13, amenityName: 'Parking', isChecked: false, icon: "/Icons/AmminitiesIcons/Parking.svg"},
        {id: 14, amenityName: 'Tables', isChecked: false, icon: "/Icons/AmminitiesIcons/Table.svg"},
        {id: 15, amenityName: 'Chairs', isChecked: false, icon: "/Icons/AmminitiesIcons/Chair.svg"}
    ]);

    //logic to make checking at least one checkbox from categories and amenities mandatory
    const handleCheckboxChange = (category, id) => {
        let updatedCategory=[{}]
        //make the property of the clicked check box to be isChecked true
        switch (category) {
            case "categories":
                updatedCategory = categories.map(item => {
                    if (item.id === id) {
                        return {...item, isChecked: !item.isChecked};
                    }
                    return item;
                });
                categories.map(item => {
                    if (item.id === id) {
                        setFormValues({
                            ...formValues,
                            Categories: [...formValues.Categories, item]
                        })
                    }
                })
                setcategories(updatedCategory);
                break;
            case "amenities":
                updatedCategory = amenities.map(item => {
                    if (item.id === id) {
                        return {...item, isChecked: !item.isChecked};
                    }
                    return item;
                });
                amenities.map(item => {
                    if (item.id === id) {
                        setFormValues({
                            ...formValues,
                            Amenities: [...formValues.Amenities, item]
                        })
                    }
                })
                setamenities(updatedCategory);
                break;
            default:
                console.log("error")
        }
    };

    const handleSpotRuleChange = (event, index) => {

        let newSpotRules = [...formValues.SpotRules];
        newSpotRules[index] = event.target.value;

        setFormValues({
            ...formValues,
            SpotRules: newSpotRules
        })
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(formValues)
        
        //checks if at least one checkbox is checked from categories and amenities
        const categoryChecked = categories.filter(obj => obj.isChecked).length;
        const amenityChecked = amenities.filter(obj => obj.isChecked).length;
        console.log('Form submitted!');
        //if at least one checkbox is checked from categories and amenities then alert the user
        if (categoryChecked === 0) {
            alert('please select at least one category')
        } else if (amenityChecked === 0) {
            alert('please select at least one amenities')
        } else {
            setFormValues({
                ...formValues,
                Categories: categories.filter(obj => obj.isChecked).map(obj => obj.categoryName),
                Amenities: amenities.filter(obj => obj.isChecked).map(obj => obj.amenityName)
            })
            const response = await fetch('http://localhost:5000/api/createspot/643d7b82740192f16ebc2c04', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            })
            const data = await response.json();
            console.log(data)
            console.log(formValues)
            console.log(categories.filter(obj => obj.isChecked).map(obj => obj.categoryName))
            console.log(amenities.filter(obj => obj.isChecked).map(obj => obj.amenityName))
            alert('Congrats your Spot is Added')
        }
    };

    const [formValues, setFormValues] = useState(
        {
            Name: "",
            Description: "",
            Price: "",
            Timing: {
                "Sunday": {
                    "open": "hh:mm",
                    "close": "hh:mm"
                },
                "Monday": {
                    "open": "hh:mm",
                    "close": "hh:mm"
                },
                "Tuesday": {
                    "open": "hh:mm",
                    "close": "hh:mm"
                },
                "Wednesday": {
                    "open": "hh:mm",
                    "close": "hh:mm"
                },
                "Thursday": {
                    "open": "hh:mm",
                    "close": "hh:mm"
                },
                "Friday": {
                    "open": "hh:mm",
                    "close": "hh:mm"
                },
                "Saturday": {
                    "open": "hh:mm",
                    "close": "hh:mm"
                }
            },
            SqFt: "",
            MinGuests: "",
            Categories: [],
            Amenities: [],
            Location: "",
            Images: files,
            SpotRules: [''],
            CancelPolicy: ""
        }
    )

    const handleChange = (event) => {
        setFormValues({...formValues, [event.target.name]: event.target.value});
    };

    return <>
        <div className={"flex flex-col min-h-screen justify-center items-center mt-[3.5%] mb-[3.5%]"}>
            <div className={"text-4xl p-3 border-b-4 w-[90%] mb-[1.5%] text-center"}>LIST YOUR SPOT</div>
            <div className={"flex flex-col md:flex-row mt-4 md:mt-2 md:space-y-0 space-y-5 lg:space-x-12 md:space-x-8"}>
                <div className={"flex flex-col space-y-5"}>
                    <button
                        className={"p-2 text-black bg-blue-100 drop-shadow-md rounded-xl hover:bg-blue-200 hover:scale-110"}>Show
                        your listing
                    </button>
                    <button
                        className={"p-2 text-black bg-blue-100 drop-shadow-md rounded-xl hover:bg-blue-200 hover:scale-110"}>Show
                        Bookings
                    </button>
                    <button
                        className={"p-2 text-black bg-blue-100 drop-shadow-md rounded-xl hover:bg-blue-200 hover:scale-110"}>Show
                        Calender
                    </button>
                </div>
                <div className={"md:hidden drop-shadow-md rounded-xl bg-white p-3 w-fit"}>
                    Enter details to add new spot:
                </div>
                <div className={"pt-0"}>
                    <form className={"flex flex-col space-y-5 md:w-[50vh] lg:w-[80vh] border-0 w-[40vh]"}
                          onSubmit={handleSubmit}>
                        <div
                            className={"flex flex-col space-y-5 bg-[#F3F4F6] p-4 md:p-8 drop-shadow-md rounded-xl border-0"}>
                            <input type="text" placeholder={"Name"} className={"drop-shadow-md rounded-xl border-0"}
                                   required onChange={handleChange} name='Name'/>
                            <textarea placeholder={"Description"} className={"drop-shadow-md rounded-xl border-0"}
                                      required  onChange={handleChange} name='Description'/>
                            <input type="number" placeholder={"Spot Price /per hour"}
                                   className={"drop-shadow-md rounded-xl border-0"} required  onChange={handleChange} name='Price'/>
                            <span className="">
                                What are your Regular Timings?
                            </span>
                            {
                                Object.keys(formValues.Timing).map((day, index) => {
                                    return <div key={index} className='flex-row justify-end text-center w-full'>
                                        <span className="flex-grow-0 mx-5">
                                            {day}
                                        </span>
                                    <input type="time" placeholder={"hh:mm"} defaultValue={formValues.Timing[day].open}
                                        className={"drop-shadow-md rounded-xl border-0"} required onChange={(event) => {
                                            setFormValues({
                                                ...formValues,
                                                Timing: {
                                                    ...formValues.Timing,
                                                    [day]: {
                                                        ...formValues.Timing[day],
                                                        open: event.target.value
                                                    }
                                                }
                                            })
                                        }} name='Timing' />
                                    <span className={"flex-grow-0 mx-5"}>to</span>
                                    <input type="time" placeholder={"hh:mm"} defaultValue={formValues.Timing[day].close}
                                        className={"drop-shadow-md rounded-xl border-0"} required onChange={() => { return 0 }} name='Timing' />
                                </div>
                                })
                            }
                            
                            <input type="number" placeholder={"Spot size Sq/Ft"}
                                   className={"drop-shadow-md rounded-xl border-0"} required  onChange={handleChange} name='SqFt'/>
                            <input type="number" placeholder={"How many guests do you recommend"}
                                   className={"drop-shadow-md rounded-xl border-0"} required  onChange={handleChange} name='MinGuests'/>
                            <span>What are the events your spot would be a great fit for?</span>
                            <ul className={"grid grid-cols-2 sm:grid-cols-3 grid-flow-row gap-4"}>
                                {categories.map((item) => (
                                    <li key={item.id} className={"flex flex-row space-x-2"}>
                                        <input
                                            type="checkbox"
                                            value={item.id}
                                            className={"mr-2 p-2 drop-shadow-md rounded-md"}
                                            checked={item.isChecked}
                                            onChange={() => handleCheckboxChange("categories", item.id)}
                                        />
                                        <img src={item.icon} alt={"icon"} width={20} height={20}/>
                                        <label>
                                            {item.categoryName}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <span>What do you provide?</span>
                            <ul className={"grid grid-cols-2 sm:grid-cols-3 grid-flow-row gap-4"}>
                                {amenities.map((item) => (
                                    <li key={item.id} className={"flex flex-row space-x-2"}>
                                        <input
                                            type="checkbox"
                                            value={item.id}
                                            className={"mr-2 p-2 drop-shadow-md rounded-md"}
                                            checked={item.isChecked}
                                            onChange={() => handleCheckboxChange("amenities", item.id)}
                                        />
                                        <img src={item.icon} alt={"icon"} width={20} height={20}/>
                                        <label>
                                            {item.amenityName}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <span
                                className={"ml-auto text-blue-600 text-sm"}>*add multiple amenities for better reach</span>
                            {/* <input type="text" placeholder={"Location"}
                                   className={"drop-shadow-md rounded-xl border-0"} required/> */}
                            <input
                                type="text"
                                name="location"
                                list='cities'
                                id=""
                                placeholder={"Location"}
                                className={"drop-shadow-md rounded-xl border-0"}
                                required
                                // value={formValues.location}
                                onChange={handleCityChange}
                                onFocus={()=>{
                                    document.getElementById("cities").style.display = "block"
                                }}
                                onBlur={()=>{
                                    document.getElementById("cities").style.display = "none"
                                }}
                            />
                            <datalist id="cities"
                                contentEditable={true}
                                itemType='text'
                                // onChange={()=>{
                                //     setFormValues({ ...formValues, location: document.getElementById("cities").value });
                                // }}
                                className={"drop-shadow-md rounded-xl border-0 bg-white px-4 py-3"}>
                                {
                                    cities.map((city, index) => {
                                        return <option value={city.value} className='my-1 cursor-pointer font-medium' key={index} onClick={() => {
                                            setFormValues({ ...formValues, Location: city.value });
                                            // document.getElementById("location-select").style.display = "none"
                                            console.log(formValues.Location)
                                        }} >{city.value}</option>
                                    })
                                }
                            </datalist>
                            <div className={"flex flex-col space-y-2"}>
                                <label htmlFor="spot-type-select">Select Spot Type</label>
                                <select name="spot-type" id="spot-type-select"
                                        className={"drop-shadow-md rounded-xl border-0"}>
                                    <option value="">Please choose an option --</option>
                                    <option value="outdoor">outdoor</option>
                                    <option value="indoor">indoor</option>
                                </select>
                            </div>
                            <div className={"flex flex-col space-y-2"}>
                                <span>Upload images of the spot:</span>
                                {/* <div className={"flex flex-row justify-between text-base"}> */}
                                    <label htmlFor="file" className='relative flex-col justify-center text-center items-center h-40 p-5 rounded-lg border-dashed border-2 border-gray-500 duration-200 ease-in-out cursor-pointer gap-5 transition-all bg-gray-100 hover:bg-gray-300 hover:border-gray-800'>
                                    <span className="hidden sm:block text-lg font-bold text-gray-800 text-center duration-200 ease-in-out">Drag & Drop the Images here</span>
                                    <span>or</span><br />
                                    <input type="file"
                                           id="file"
                                           name="upload"
                                           accept=".png,.jpg,.jpeg"
                                           multiple onChange={handleFileChange}
                                           onDrag={handleFileChange} onDragOver={handleFileChange}
                                           className={"drop-shadow-md rounded-md border-none px-20 self-center"}
                                           
                                    />
                                    </label>
                                {/* </div> */}
                                <span
                                    className={"text-red-400 text-left"}>*upto 15 images (2-mb max & jpg/png/jpeg)</span>
                            </div>
                                <label htmlFor="spot-type-select">Spot Rules</label>
                            {
                                formValues.SpotRules.map((item, index) => (
                                    <div key={index} className={"flex flex-row space-x-2"}>
                                        <input
                                            type="text"
                                            value={item}
                                            className={"mr-1 p-2 py-1 min-w-min drop-shadow-md rounded-md"}
                                            onChange={(e) => handleSpotRuleChange(e, index)}
                                            placeholder={`Spot rule #${index + 1}`}
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            strokeWidth={3} 
                                            stroke="currentColor" 
                                            className="w-5 h-5 mt-2 -ml-2 cursor-pointer"
                                            onClick={() => {
                                                setFormValues({
                                                    ...formValues,
                                                    SpotRules: formValues.SpotRules.filter((_, i) => i !== index)
                                                })
                                            }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                ))
                            }
                            {/* <input type="text" placeholder={"Spot rules"}
                                   className={"drop-shadow-md rounded-xl border-0"} required   onChange={handleChange} name='spotRule'/> */}
                            <span 
                                className='text-blue-600 text-sm cursor-pointer inline-flex' 
                                onClick={() => {
                                    setFormValues({
                                        ...formValues,
                                        SpotRules: [...formValues.SpotRules, '']
                                    })
                            }}>
                                Add a Rule +
                            </span>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg> */}
                        </div>
                        <div className={"flex flex-col md:flex-row space-y-2 md:space-y-0"}>
                            <input type="checkbox" name={"T&C"} className={"mr-2 p-2 drop-shadow-md rounded-md"}/>
                            <span className={"text-sm"}>"By clicking this button, you agree to the terms and conditions of Appispot"</span>
                            <button
                                className={"ml-auto p-3 text-black bg-blue-100 drop-shadow-md rounded-xl hover:bg-blue-200 hover:scale-110"}>LIST
                                YOU SPOT
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default ListSpot;