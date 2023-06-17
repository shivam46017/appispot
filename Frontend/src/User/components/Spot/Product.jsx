import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageViewer from "./ImageViewer";
import ReactImageZoom from 'react-image-zoom';
import axios from "axios";
import { toast } from "react-toastify";
import { TimePicker } from "@mui/x-date-pickers";
import { BsMailbox } from "react-icons/bs";
import { MdAccountCircle, MdOutlineMail } from "react-icons/md";
import { Button, Dialog } from "@mui/material";
import ChatBox from "../UserManager/views/admin/discountMagement/ChatBox";
import { ImCross } from "react-icons/im";

const product = {
    name: "Alpha Party Hall",
    price: "$50/hour",
    href: "#",
    breadcrumbs: [
        { id: 1, name: "Spots", href: "#" },
        // { id: 2, name: "Clothing", href: "#" },
    ],
    images: [
        {
            src: "https://th.bing.com/th/id/OIP.utfzQU9LITiZuyPkVHIjqgHaE8?pid=ImgDet&rs=1",
            alt: "Two each of gray, white, and black shirts laying flat.",
        },
        {
            src: "https://www.bookeventz.com/blog/wp-content/uploads/2016/08/720x480xhacienda_bella_terra12.jpg.pagespeed.ic.B3pQjLitnQ.jpg",
            alt: "Model wearing plain black basic tee.",
        },
        {
            src: "https://img.tagvenue.com/resize/61/d7/widen-1680-noupsize;7385-entire-venue-room.jpeg",
            alt: "Model wearing plain gray basic tee.",
        },
        {
            src: "https://th.bing.com/th/id/OIP.w0m7r7mj_dallyp0sFPF0gHaE8?pid=ImgDet&w=1024&h=684&rs=1",
            alt: "Model wearing plain white basic tee.",
        },
    ],
    colors: [
        { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
        { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
        { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    ],
    sizes: [
        { name: "XXS", inStock: false },
        { name: "XS", inStock: true },
        { name: "S", inStock: true },
        { name: "M", inStock: true },
        { name: "L", inStock: true },
        { name: "XL", inStock: true },
        { name: "2XL", inStock: true },
        { name: "3XL", inStock: true },
    ],
    description:
        'Whether you\'re planning a grand celebration or an intimate gathering, our venue can accommodate weddings of all sizes. From the moment you step inside, you\'ll be swept away by the beauty and charm of our space, which is designed to make your special day unforgettable.\n' +
        '\n',
    description2:
        'Venue cancellation policies can vary depending on the venue and the terms of the rental agreement. In general, most venues will require a certain amount of notice prior to cancellation in order to receive a refund or avoid additional fees. This notice period may range from a few weeks to several months, depending on the size and complexity of the event. Additionally, some venues may require a non-refundable deposit to hold the date, and this deposit may be forfeited in the event of a cancellation. It',
    amenities: [
        { id: 1, label: 'Fire Pit', isChecked: false, icon: "/Icons/AmminitiesIcons/Fire Pit.svg" },
        { id: 2, label: 'Deck', isChecked: false, icon: "/Icons/AmminitiesIcons/Deck.svg" },
        { id: 3, label: 'Pool', isChecked: false, icon: "/Icons/AmminitiesIcons/Pool.svg" },
        { id: 4, label: 'Gazeboo', isChecked: false, icon: "/Icons/AmminitiesIcons/Gazebo.svg" },
        { id: 5, label: 'Grill', isChecked: false, icon: "/Icons/AmminitiesIcons/Grill.svg" },
        { id: 6, label: 'Hot Tub', isChecked: false, icon: "/Icons/AmminitiesIcons/Hot Tub.svg" },
        { id: 7, label: 'Restroom', isChecked: false, icon: "/Icons/AmminitiesIcons/Restroom.svg" },
        { id: 8, label: 'Pet Friendly', isChecked: false, icon: "/Icons/AmminitiesIcons/Pet Friendly.svg" },
        { id: 9, label: "Jacuzzi", isChecked: false, icon: "/Icons/AmminitiesIcons/Jacuzee.svg" },
    ],
    timing: [
        { id: 1, label: 'Monday: 9AM - 9PM' },
        { id: 2, label: 'Tuesday: 9AM - 9PM' },
        { id: 3, label: 'Wednesday: 9AM - 9PM' },
        { id: 4, label: 'Thursday: 9AM - 9PM' },
        { id: 5, label: 'Friday: 9AM - 9PM' },
        { id: 6, label: 'Saturday: 9AM - 9PM' },
        { id: 7, label: 'Sunday: 9AM - 9PM' }
    ],
    categories: [
        { id: 1, label: 'Barbeque', isChecked: false, icon: "/Icons/CategoriesIcons/Barbeque.svg" },
        { id: 2, label: 'Picnic', isChecked: false, icon: "/Icons/CategoriesIcons/PIcnic.svg" },
        { id: 3, label: 'Wedding', isChecked: false, icon: "/Icons/CategoriesIcons/Wedding.svg" },
        { id: 4, label: 'Wedding Reception', isChecked: false, icon: "/Icons/CategoriesIcons/wedding Reception.svg" },
        { id: 5, label: 'Party', isChecked: false, icon: "/Icons/CategoriesIcons/Party.svg" },
        { id: 6, label: 'Graduation Party', isChecked: false, icon: "/Icons/CategoriesIcons/Graduation Party.svg" },
        { id: 7, label: 'Baby Shower', isChecked: false, icon: "/Icons/CategoriesIcons/Baby Shower.svg" },
        { id: 8, label: 'Birthday Party', isChecked: false, icon: "/Icons/CategoriesIcons/Birthday party.svg" },
        { id: 9, label: 'Engagement Party', isChecked: false, icon: "/Icons/CategoriesIcons/engagement Party.svg" }
    ],
    rules: [
        { id: 1, label: 'No smoking or vaping allowed inside the venue' },
        { id: 2, label: 'Guests must keep noise levels down after a certain time to avoid disturbing neighbors' },
        {
            id: 3,
            label: 'No outside food or beverages are allowed inside the venue, except for special dietary needs or allergies'
        },
        { id: 4, label: 'Dress code requirements must be followed.' },
        { id: 5, label: 'Guests must respect the property and not damage any furnishings, fixtures or equipment' }
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
// const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Spot() {


    const params = useParams();

    const [spotDetails, setSpotDetails] = useState(null)
    const [spotImages, setSpotImages] = useState(null)
    const [discountDetails, setDiscountDetails] = useState({})

    const [reviews, setreviews] = useState([])
    const [average, setaverage] = useState(0)
    async function discount() {
        const cat = spotDetails.Categories.map(item => {
            return item.categoryName
        })

        const response = await axios.post("http://localhost:5000/api/discountvenue", { venueCategories: cat, price: spotDetails?.Price * 1.2, venueId: spotDetails._id })
        const discountData = await response.data;
        setDiscountDetails(discountData)
    }

    const [message, setMessage] = useState("")
    const [chats, setChats] = useState([])

    async function sendMessage() {
        const response = await fetch(chats?.length == 0 ? "http://localhost:5000/api/conversation/add" : "http://localhost:5000/api/message/add", {
            method: "POST",
            body: JSON.stringify(chats?.length == 0 ? {
                senderId: localStorage.getItem("userId"),
                senderName: JSON.parse(localStorage.getItem("user")).firstName + " " + JSON.parse(localStorage.getItem("user")).lastName,
                receiverId: spotDetails?.lister,
                message: message
            } : {
                conversationId: chats[0]._id,
                message: message,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.data;
        console.log(data)
        setMessage("")
        getAllMessages()
    }

    async function getAllMessages() {
        const response = await fetch(`http://localhost:5000/api/conversation/getAll?senderId=${localStorage.getItem("userId")}&receiverId=${spotDetails?.lister}`)
        const data = await response.json();
        console.log("Messages", data);
        setChats(data);
    }

    useEffect(() => {
        // alert(spotDetails?.lister)
        console.log("params", params.spotId)
        async function getSpotDetails() {
            const response = await fetch(`http://localhost:5000/api/getspot/${params.spotId}`);
            const data = await response.json();
            console.log("data", data)
            setSpotDetails(data.spot)
            setreviews(data.reviews)
            let sum = 0
            reviews.map((r) => {
                sum += r.rating
            })
            setaverage(sum / reviews.length)
        }

        getSpotDetails()
    }, [params.spotId, chats])

    useEffect(() => {
        getAllMessages()
    }, [])

    useEffect(() => {
        discount()
        // update Sportprice with discount
        // setSpotDetails(prevState => ({...prevState, Price: spotDetails?.Price- (discountDetails.code?discountDetails.code.couponType.toLowerCase()=="percent"?(discountDetails.code.Price/100)*(spotDetails.Price):(discountDetails.code.Price):0)}))
    }, [spotDetails])
    const [startDate, setstartDate] = useState(null)
    const [endDate, setendDate] = useState(null)
    const [guests, setguests] = useState(null)
    const [startTime, setstartTime] = useState(null)
    const [endTime, setendTime] = useState(null)

    const [noOfHours, setnoOfHours] = useState(0)

    const [dialogOpen, setdialogOpen] = useState(false)

    const forbiddenWords = ["Telephone",
        "Mobile",
        "Cell",
        "Number",
        "Call",
        "Text",
        "SMS",
        "Email",
        "Address",
        "Location",
        "Map",
        "Coordinates",
        "Postcode",
        "Zip code",
        "Street",
        "Avenue",
        "Road",
        "Boulevard",
        "Lane",
        "Drive",
        "Country",
        "PO Box",
        "@",
        "Facebook", ,
        "Instagram", ,
        "Twitter", ,
        "LinkedIn", ,
        "Snapchat", ,
        "WhatsApp",
        "Skype",
        "Zoom",
        "Google meet",
        "#",
        "Where do you live?",
        "Whats the location?",
        "Could I have your phone number?",
        "Can you tell me your number?",
        "Please share your contact number.",
        "Would you mind providing your phone number?",
        "May I know your cell number?",
        "Can I get your telephone number?",
        "Do you mind sharing your number?",
        "Could you tell me your number?",
        "May I ask for your mobile number?",
        "Kindly provide your contact details.",
        "Would it be possible to get your phone number?",
        "I need your telephone number, please.",
        "Let's exchange numbers.",
        "Could we exchange contact details?",
        "Please give me your digits.",
        "Can you share your cell digits with me?",
        "Could you send me your contact number?"
    ];
    const checkMessage = (message) => {
        let result = message;

        for (let i = 0; i < forbiddenWords.length; i++) {
            const currentString = forbiddenWords[i];
            const regex = new RegExp("\\b" + currentString + "\\b", "gi");
            result = result.replace(regex, "");
        }
        
        const element = document.getElementById("chatBox");
        element.value = result
        if (message!==result)
           alert("ForbiddenWord")
        console.log(result);
    }
    // if (message) {
    //     console.log(message)
    // }


    useEffect(() => {
        if (startDate && endDate && startTime && endTime) {
            let start = new Date(startDate + " " + startTime)
            let end = new Date(endDate + " " + endTime)
            let diff = end.getTime() - start.getTime()
            let hours = diff / (1000 * 3600)
            setnoOfHours(hours)
            console.log(noOfHours)
            console.log("Changed Hours")
        }
    }, [startDate, endDate, startTime, endTime])

    return (
        <div className="bg-white mt-24">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol
                        role="list"
                        className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                    >
                        {product.breadcrumbs.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                        {breadcrumb.name}
                                    </a>
                                    <svg
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                        <li className="text-sm">
                            <a
                                href={product.href}
                                aria-current="page"
                                className="font-medium text-gray-500 hover:text-gray-600"
                            >
                                {product.name}
                            </a>
                        </li>
                    </ol>
                </nav>

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <ImageViewer data={[
                        {
                            id: 1,
                            title: spotDetails?.Name + " Image 1",
                            url: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
                        },
                        {
                            id: 2,
                            title: spotDetails?.Name + " Image 2",
                            url: "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928__480.jpg"
                        },
                        {
                            id: 3,
                            title: spotDetails?.Name + " Image 3",
                            url: "https://cdn.pixabay.com/photo/2017/12/29/12/50/sunset-3047544_1280.jpg"
                        },
                        {
                            id: 4,
                            title: spotDetails?.Name + " Image 4",
                            url: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg"
                        }
                    ]}
                    />

                </div>

                {/* Product info */}
                <div
                    className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            {spotDetails ? spotDetails.Name : "Loading..."}
                        </h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0" id="priceBox">
                        <div className={"flex flex-row"}>
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">
                                {spotDetails ? `$ ${spotDetails.Price - (discountDetails.code ? discountDetails.code.couponType.toLowerCase() == "percent" ? (discountDetails.code.Price / 100) * (spotDetails.Price) : (discountDetails.code.Price) : 0)} /Hr` : "Loading..."}
                                {discountDetails.code && <><span className="text-sm text-gray-600 line-through ml-2 mb-2"> $ {spotDetails?.Price} </span><br /><span className="text-base text-green-500 font-medium">{discountDetails.code?.couponType.toLowerCase() === "percent" ? `${discountDetails.code?.Price}% Discount Availed!` : `Discount upto $ ${discountDetails.code?.Price}`} </span></>}
                                {spotDetails && <span className="text-sm text-gray-600 ml-2"><br />Your SubTotal : {noOfHours * (spotDetails.Price - (discountDetails.code ? discountDetails.code.couponType.toLowerCase() == "percent" ? (discountDetails.code.Price / 100) * (spotDetails.Price) : (discountDetails.code.Price) : 0))}</span>}
                            </p>

                            {/* Reviews */}
                            <div className=" ml-auto pt-2">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            // let ratingNum = 0;
                                            <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    4 > rating
                                                        ? "text-[#FFD700]"
                                                        : "text-gray-200",
                                                    "h-5 w-5 flex-shrink-0"
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                                    <a
                                        href={reviews.href}
                                        className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        {reviews.totalCount} reviews
                                    </a>
                                </div>
                            </div>
                        </div>
                        <Dialog open={dialogOpen} onClose={() => { setdialogOpen(false) }} className="w-full px-5 !fixed !bottom-0 !right-20">
                            <div className="flex flex-col space-y-3 rounded px-2 my-3 md:fixed py-2 pb-5 bg-white bottom-0 right-20">
                                <div className="header flex p-2 gap-2 items-center border-b border-b-gray-600">
                                    <MdAccountCircle className="text-3xl text-gray-500" />
                                    <span className="text-lg font-bold ml-2">Alex Friedman</span>
                                    <ImCross className="text-sm mx-2 text-gray-600 ml-auto cursor-pointer" onClick={() => { setdialogOpen(false) }} />
                                </div>
                                <span className="text-sm font-medium px-4 pb-2 shadow-lg">Ask Lister your query...</span>
                                <div className="chats flex flex-col grow min-h-[35vh]">
                                    {
                                        chats.length != 0 && chats[0]?.message?.map((chat, index) => (
                                            // <div></div>
                                            <ChatBox key={index} sender={0} message={chat?.text} />
                                        ))
                                    }
                                </div>
                                <div className="flex w-full h-full items-center border-t border-t-gray-400 pt-4">
                                    <input value={message} onChange={(e) => {
                                        checkMessage(e.target.value)
                                        setMessage(e.target.value)
                                        //checkMessage(e.target.value)
                                    }} name="" id="chatBox" className="mx-4 rounded-lg border h-ful py-2 grow border-gray-300 px-2" placeholder="Type your query here..."></input>
                                    <button className="bg-indigo-600 w-fit text-white rounded-lg p-2 px-4" onClick={message != "" ? sendMessage : () => alert("Can't send empty message!")}>Send</button>
                                </div>
                            </div>
                        </Dialog>
                        <span className="flex gap-2 mt-6 border border-[#888] rounded p-3 w-fit" onClick={() => { setdialogOpen(true) }}>
                            <MdOutlineMail className="text-2xl text-gray-500" />
                            <span className="font-medium">Send the owner query</span>
                        </span>
                        <h3 className="text-xl mt-3 mb-5 font-medium text-gray-900">When are you planning to book the
                            spot?</h3>
                        <div className={"flex flex-col space-y-3"}>
                            {/* <span>Start Date:</span>
                            <input required={true} type="date" min={new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate()} value={startDate && startDate} onChange={(e)=>{setstartDate(e.target.value)}} className={"rounded-lg"} /> */}
                            <span>Date:</span>
                            <input required={true} type="date" value={localStorage.getItem("date") ? localStorage.getItem("date") : endDate} onChange={(e) => { localStorage.setItem("date", e.target.value); setstartDate(e.target.value); setendDate(e.target.value) }} className={"rounded-lg"} />
                        </div>
                        <div className={"mt-3 flex flex-col space-y-2"}>
                            <span>Start Time:</span>
                            <div className="flex">
                                {/* <input required={true} step="3600000" type="time" max="12:00" value={startTime && startTime} onChange={(e)=>{setstartTime(e.target.value)}} className={"rounded-lg grow"} />
                            <select name="" id="" className="rounded-lg ml-2">
                                <option value="am">AM</option>
                                <option value="pm">PM</option>
                            </select> */}
                                <TimePicker minutesStep={60} views={['hours']} shouldDisableTime={(e) => { return e.$H == 16 }} disablePast onChange={(e) => { setstartTime(e.$H); localStorage.setItem("startTime", JSON.stringify(startTime)) }} className={"rounded-lg w-full h-10 px-3 py-2 border border-gray-300 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-transparent"} />
                            </div>
                            {/* <TimePicker value={startTime} onChange={setstartTime} className={"rounded-lg w-full h-10 px-3 py-2 border border-gray-300 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-transparent"} /> */}
                            <span className="!mt-6">End Time:</span>
                            <div className="flex">
                                {/* <input required={true} step="3600000" type="time" value={endTime && endTime} onChange={(e)=>{setendTime(e.target.value)}} className={"rounded-lg grow"} />
                            <select name="" id="" className="rounded-lg ml-2">
                                <option value="am">AM</option>
                                <option value="pm">PM</option>
                            </select> */}
                                <TimePicker viewRenderers={{ minutes: () => { return } }} disablePast minutesStep={60} views={['hours']} onChange={(e) => { setendTime(e.$H); localStorage.setItem("endTime", endTime) }} formatDensity="spacious" closeOnSelect className={"rounded-xl w-full !mb-4 h-10 px-3 py-2 border border-gray-300 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-transparent"} />
                            </div>
                        </div>

                        <div className="mt-3 flex flex-col space-y-2">
                            <span>Max Number Of Guests</span>
                            <input required={true} type="number" value={localStorage.getItem("guests") ? localStorage.getItem("guests") : guests} onChange={(e) => { localStorage.setItem("guests", e.target.value); setguests(e.target.value) }} placeholder="200" className="rounded-lg" />
                        </div>

                        {
                            startDate && endDate && startTime && endTime && guests ?
                                <form className="mt-10">
                                    <Link to={`/checkout/${params.spotId}`}
                                        aria-disabled={!startDate || !endDate || !startTime || !endTime || !guests}
                                        state={{ spotDetails: spotDetails, startDate: startDate, startTime: startTime, endTime: endTime, endDate: endDate, guests: guests, discountDetails }}
                                        type="submit"
                                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Continue to book your spot
                                    </Link>
                                </form>
                                :
                                <button
                                    // disabled={true}
                                    aria-disabled={!startDate || !endDate || !startTime || !endTime || !guests}
                                    onClick={() => {
                                        // alert("Please select all the fields!")
                                        toast.error("Please select all the fields!")
                                    }}
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    Continue to book your spot
                                </button>
                        }
                    </div>

                    <div
                        className="py-10 pl-1.5 h-[110vh] overflow-y-auto lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8" id="spotDesc">
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{spotDetails ? spotDetails.Description : "Loading..."}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-xl font-medium text-gray-900">What do you get?</h3>
                            <div className="mt-6">
                                <ul className={"grid grid-cols-3 sm:grid-cols-5 gap-4"}>
                                    {product.amenities.map((item) => (
                                        <li key={item.id} className={"flex flex-col gap-3 items-center justify-between bg-[#e4e4e4] rounded-md my-2 px-3 py-7 pb-6 hover:bg-slate-300 duration-100"}>
                                            <img src={item.icon} alt={"icon"} width={25} height={25} />
                                            <label>
                                                {item.label}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-xl font-medium text-gray-900">What the spot is recommended for?</h3>

                            <div className="mt-6">
                                <ul className={"grid grid-cols-3 sm:grid-cols-5 gap-4"}>
                                    {product.categories.map((item) => (
                                        <li key={item.id} className={"flex flex-col gap-3 items-center justify-between bg-[#e4e4e4] rounded-md my-2 px-3 py-7 pb-6 hover:bg-slate-300 duration-100"}>
                                            <img src={item.icon} alt={"icon"} width={25} height={25} />
                                            <label className="text-center">
                                                {item.label}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mt-10">
                            <h3 className="text-xl font-medium text-gray-900">What are the rules for this spot?</h3>

                            <div className="mt-6">
                                <ul className={"flex flex-col space-y-3 list-disc"}>
                                    {spotDetails?.Rules?.map((item) => (
                                        <li key={item} className={"flex flex-row space-x-6"}>
                                            <label>
                                                <label className={"mr-4"}>⏺</label>
                                                {item}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mt-10">
                            <h3 className="text-xl font-medium text-gray-900">When are we open?</h3>

                            <div className="mt-6">
                                <ul className={"flex flex-col space-y-3 list-disc"}>
                                    {spotDetails ? spotDetails.Timing && Object.keys(spotDetails.Timing).map((item) => (
                                        <li key={item.id} className={"flex flex-row space-x-6"}>
                                            <label>
                                                {/*<label className={"mr-4"}>⏺</label>*/}
                                                {item} : {spotDetails.Timing[item].open} - {spotDetails.Timing[item].close}
                                            </label>
                                        </li>
                                    )) : "Loading..."}
                                </ul>
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold mt-12">Cancellation Policy</h2>
                        <div>
                            <h4 className="text-lg font-medium text-gray-900 mt-8 mb-2">24-Hour Cancellation Policy:</h4>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">Guests may cancel their booking up to 24 hours before the start time of their reservation and receive a full refund of the booking price. If the cancellation is made less than 24 hours before the start time, the guest will not be eligible for a refund.
                                    If the booking is made within 24 hours of the start time, guests will have a 2-hour grace period from the time of booking to cancel the reservation without penalty. After this 2-hour grace period, cancellations will not be eligible for a refund.</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-medium text-gray-900 mt-8 mb-2">48-Hour Cancellation Policy:</h4>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">
                                    Guests may cancel their booking up to 48 hours before the start time of their reservation and receive a full refund of the booking price. If the cancellation is made less than 48 hours before the start time, the guest will not be eligible for a refund.
                                    <br /><br />
                                    If the booking is made within 48 hours of the start time, guests will have a 4-hour grace period from the time of booking to cancel the reservation without penalty. After this 4-hour grace period, cancellations will not be eligible for a refund.

                                </p>
                            </div>
                        </div>
                        {/* For more info link */}
                        <div className="mt-10">
                            <h3 className="text-lg font-medium text-[#0000ff] mt-0">For more info click here</h3>
                        </div>
                        <div>
                            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-8">Experiences</h3>
                            {
                                reviews.length > 0 ? reviews.map((review) => {
                                    return <div className="space-y-6 rounded-lg p-8 my-4" style={{ boxShadow: '0 0 15px -5px #555' }}>
                                        <p className="text-base text-gray-900">{review.review}</p>
                                        <p className="text-base text-gray-600 font-medium text-right">~ {review.clientName}</p>
                                    </div>
                                }) : <span className="font-medium text-center text-sm text-gray-500">No Reviews Yet!</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
