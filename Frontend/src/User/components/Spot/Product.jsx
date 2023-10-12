import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import ImageViewer from "./ImageViewer";
import ReactImageZoom from "react-image-zoom";
import axios from "axios";
import { toast } from "react-toastify";
import { DesktopTimePicker, TimePicker } from "@mui/x-date-pickers";
import { RxCross2 } from "react-icons/rx";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdAccountCircle, MdOutlineMail } from "react-icons/md";
import { CgMenuGridO } from "react-icons/cg";
import { Button, Dialog } from "@mui/material";
import ChatBox from "../UserManager/views/admin/discountMagement/ChatBox";
import { ImCross } from "react-icons/im";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import ChangeView from "../../../map/ChangeView";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import { useUserAuth } from "../../../context/userAuthContext/UserAuthContext";
import { socket } from "../../../Hook/socket";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Spot() {
  const params = useParams();

  const { user } = useUserAuth();

  const [spotDetails, setSpotDetails] = useState(null);
  const [spotImages, setSpotImages] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [discountDetails, setDiscountDetails] = useState({});

  const [reviews, setreviews] = useState([]);
  const [average, setaverage] = useState(0);

  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [guests, setguests] = useState(null);
  const [startTime, setstartTime] = useState(null);
  const [endTime, setendTime] = useState(null);
  const [cancellationPolicy, setCancellationPolicy] = useState("");

  const [noOfHours, setnoOfHours] = useState(0);

  const [dialogOpen, setdialogOpen] = useState(false);

  const forbiddenWords = [
    "Telephone",
    "Mobile",
    "mail",
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
    "Facebook",
    "Instagram",
    "Twitter",
    "LinkedIn",
    "Snapchat",
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
    "Could you send me your contact number?",
  ];
  async function discount() {
    const cat = spotDetails?.Categories?.map((item) => {
      return item.categoryName;
    });

    const response = await axios.post(
      "http://localhost:5000/api/discountvenue",
      {
        venueCategories: cat,
        price: spotDetails?.Price * 1.2,
        venueId: spotDetails?._id,
      }
    );
    const discountData = await response.data;
    setDiscountDetails(discountData);
  }
  const [queries, setQueries] = useState([]);
  const [currentChats, setCurrentChats] = useState([])
  const [chatIndex, setChatIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [timeoutId, setTimeoutId] = useState(undefined);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [respondentOrInquirer, setRespondentOrInquirer] = useState(undefined);


  const getQueries = async () => {
    try {
      const queries = await axios.get(
        "http://localhost:5000/api/chats/" +
          localStorage.getItem("userId") +
          "?role=" +
          localStorage.getItem("userRole")
      );
      const { chats } = queries.data;
      console.log(chats);
      setQueries(chats);
      setCurrentChats(chats[0].messages)
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getQueries();
    setRespondentOrInquirer(() =>
      localStorage.getItem("userRole") === "user" ? "respondent" : "inquirer"
    );
  }, []);

  useEffect(() => {
    console.log(user);
    if (user) {
      socket.connect();
      socket.emit("connection", {
        id: user?._id,
        role: localStorage.getItem("userRole"),
      });
    }

    socket.on("typing", (status) => {
      setTyping(status);
    });


  }, [user]);

  useEffect(() => {
    function handleReceivedMessages({ by, message }) {
      setCurrentChats((prev) =>[
        ...prev,
        {
          message, by
        }
      ])
      console.log(by, message)
    }

    socket.on("receive-message", handleReceivedMessages);

    return () => {
      socket.off("receive-message", handleReceivedMessages);
    };
  }, [currentChats]);

  // user online or not 👇
  useEffect(() => {
    function handleOnlineUsers({ id, online }) {
      console.log(id, online);
      if (online === true) {
        setOnlineUsers((prev) => {
          console.log(prev);
          if (prev?.includes(id)) return prev;
          prev.push(id);
          return prev;
        });
      } else {
        setOnlineUsers((prev) => {
          prev?.filter((existingId) => existingId !== id);
        });
      }
    }

    socket.on("online", handleOnlineUsers);

    return () => {
      // socket.disconnect()
      socket.off("online", handleOnlineUsers);
    };
  }, [onlineUsers]);
  // user online or not ☝️

  const emitTypingToReceiver = () => {
    if (timeoutId) clearTimeout(timeoutId);
    console.log("chal rha hu mai");
    socket.emit("typing", {
      toId:
        localStorage.getItem("userRole") === "user"
          ? queries[chatIndex].respondent._id
          : queries[chatIndex].inquirer._id,
      toRole: localStorage.getItem("userRole") === "user" ? "seller" : "user",
      status: true,
    });

    let tId = setTimeout(() => {
      console.log("mai chal rha hu");
      socket.emit("typing", {
        toId:
          localStorage.getItem("userRole") === "user"
            ? queries[chatIndex].respondent._id
            : queries[chatIndex].inquirer._id,
        toRole: localStorage.getItem("userRole") === "user" ? "seller" : "user",
        status: false,
      });
      setTimeoutId(tId);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    socket.emit("send-message", {
      myId: localStorage.getItem("userId"),
      toId:
        localStorage.getItem("userRole") === "seller"
          ? queries[chatIndex].inquirer._id
          : queries[chatIndex].respondent._id,
      message,
      toRole: localStorage.getItem("userRole") === "seller" ? "user" : "seller",
      spot: queries[chatIndex].spot,
    });
    setCurrentChats((prev) => [
      ...prev,
      {
        by: user?.firstName + " " + user?.lastName,
        message: message
      }
    ])
    setMessage("");
  };

  useEffect(() => {
    // alert(spotDetails?.lister)
    console.log("params", params.spotId);
    async function getSpotDetails() {
      const response = await fetch(
        `http://localhost:5000/api/getspot/${params.spotId}`
      );
      const data = await response.json();
      console.log("data", data);
      setSpotDetails(data.spot);
      setreviews(data.reviews);
      let sum = 0;
      reviews.map((r) => {
        return (sum += r.rating);
      });
      setaverage(sum / reviews.length);
    }

    getSpotDetails();
  }, [params.spotId]);

  // useEffect(() => {
  //   getAllMessages();
  // }, []);

  useEffect(() => {
    discount();
    // update Sportprice with discount
    // setSpotDetails(prevState => ({...prevState, Price: spotDetails?.Price- (discountDetails.code?discountDetails.code.couponType.toLowerCase()=="percent"?(discountDetails.code.Price/100)*(spotDetails.Price):(discountDetails.code.Price):0)}))
  }, [spotDetails]);

  useEffect(() => {
    if (startDate && endDate && startTime && endTime) {
      let start = new Date(startDate + " " + startTime);
      let end = new Date(endDate + " " + endTime);
      let diff = end.getTime() - start.getTime();
      let hours = diff / (1000 * 3600);
      setnoOfHours(hours);
      console.log(noOfHours);
      console.log("Changed Hours");
    }
  }, [startDate, endDate, startTime, endTime]);

  const checkMessage = (message) => {
    let result = message;

    for (let i = 0; i < forbiddenWords.length; i++) {
      const currentString = forbiddenWords[i];
      const regex = new RegExp("\\b" + currentString + "\\b", "gi");
      result = result.replace(regex, "");
      result = result.replace("@", "");
      result = result.replace(/\b\d{10}\b/, "");
    }
    let element = document.getElementById("chatBox");
    element.value = result;
    if (message !== result) {
      element = document.getElementById("alertPopUp");
      if (element) {
        element.style.display = "flex";
      }
    }
  };
  const closeForbiddenWordAlert = () => {
    let element = document.getElementById("alertPopUp");
    element.style.display = "none";
  };

  useEffect(() => {
    socket.connect();
    socket.emit("connection", {
      id: localStorage.getItem("userId"),
      role: 'user',
    });
  }, []);




  return (
    <div className="bg-white mt-24">
      <div className="flex flex-col">
        <div className=" lg:grid grid-cols-2 gap-4 h-[450px] pt-10 mx-10 container relative ">
          <img
            src={`http://localhost:5000${spotDetails?.Images[0]}`}
            onClick={() => setImagePreview(0)}
            alt=""
            className="lg:w-[34rem] max-h-[400px] rounded-xl "
          />
          <div className="flex flex-wrap gap-4 max-h-[450px] overflow-hidden">
            {spotDetails?.Images.length > 0 &&
              spotDetails?.Images.map((item, index) => {
                return (
                  <img
                    key={`spot-details-image-${index}`}
                    src={`http://localhost:5000${
                      spotDetails?.Images[index]
                        ? spotDetails?.Images[index + 1]
                        : spotDetails?.Images[0]
                    }`}
                    onClick={() => setImagePreview(index + 1)}
                    alt=""
                    className="rounded-lg h-[48%] w-[48%] object-cover hidden lg:block"
                  />
                );
              })}
          </div>
          {spotDetails?.Images?.length >= 5 && (
            <div
              onClick={() => setImagePreview(5)}
              className="absolute flex items-center cursor-pointer bg-white text-base right-5 bottom-5 p-2 px-3 rounded-lg font-medium capitalize hover:bg-gray-200"
            >
              <CgMenuGridO className="mx-2 text-base " /> Show all photos
            </div>
          )}
        </div>
        {imagePreview >= 0 && imagePreview != null && (
          <div className="absolute h-full w-full bg-black bg-opacity-25">
            <img
              src={`http://localhost:5000${spotDetails?.Images[imagePreview]}`}
              alt=""
              srcSet=""
              className="m-auto h-full"
            />
            <button
              onClick={() => setImagePreview(null)}
              className="absolute right-3 top-3 bg-white rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
            >
              <RxCross2 className="text-xl font-semibold" />
            </button>

            <button
              disabled={imagePreview === 0}
              onClick={() => setImagePreview(imagePreview - 1)}
              className="absolute left-3 top-[45%] bg-white disabled:bg-neutral-300 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
            >
              <FiChevronLeft className="text-xl font-semibold " />
            </button>
            <button
              disabled={imagePreview === spotDetails?.Images.length - 1}
              onClick={() => setImagePreview(imagePreview + 1)}
              className="absolute right-3 top-[45%] bg-white disabled:bg-neutral-300 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
            >
              <FiChevronRight className="text-xl font-semibold " />
            </button>
          </div>
        )}

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-7 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
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
                {spotDetails
                  ? `$ ${
                      spotDetails.Price -
                      (discountDetails.code
                        ? discountDetails.code.couponType.toLowerCase() ==
                          "percent"
                          ? (discountDetails.code.Price / 100) *
                            spotDetails.Price
                          : discountDetails.code.Price
                        : 0)
                    } /Hr`
                  : "Loading..."}
                {discountDetails.code && (
                  <>
                    <span className="text-sm text-gray-600 line-through ml-2 mb-2">
                      {" "}
                      $ {spotDetails?.Price}{" "}
                    </span>
                    <br />
                    <span className="text-base text-green-500 font-medium">
                      {discountDetails.code?.couponType.toLowerCase() ===
                      "percent"
                        ? `${discountDetails.code?.Price}% Discount Availed!`
                        : `Discount upto $ ${discountDetails.code?.Price}`}{" "}
                    </span>
                  </>
                )}
                {spotDetails && (
                  <span className="text-sm text-gray-600 ml-2">
                    <br />
                    Your SubTotal :{" "}
                    {noOfHours *
                      (spotDetails.Price -
                        (discountDetails.code
                          ? discountDetails.code.couponType.toLowerCase() ==
                            "percent"
                            ? (discountDetails.code.Price / 100) *
                              spotDetails.Price
                            : discountDetails.code.Price
                          : 0))}
                  </span>
                )}
              </p>

              {/* Reviews */}
              {/* <div className=" ml-auto pt-2">
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
                            </div> */}
            </div>
            <Dialog
              open={dialogOpen}
              onClose={() => {
                setdialogOpen(false);
              }}
              className="w-full px-5 !fixed !bottom-0 !right-20"
            >
              <div className="flex flex-col space-y-3 rounded px-2 my-3 md:fixed py-2 pb-5 bg-white bottom-0 right-20">
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert
                    severity="warning"
                    id="alertPopUp"
                    style={{ display: "none" }}
                    onClose={closeForbiddenWordAlert}
                  >
                    Forbidden Word
                  </Alert>
                </Stack>
                <div className="header flex p-2 gap-2 items-center border-b border-b-gray-600">
                  <MdAccountCircle className="text-3xl text-gray-500" />
                  <span className="text-lg font-bold ml-2">
                    {spotDetails?.lister?.firstName +
                      " " +
                      spotDetails?.lister?.lastName}
                  </span>
                  <ImCross
                    className="text-sm mx-2 text-gray-600 ml-auto cursor-pointer"
                    onClick={() => {
                      setdialogOpen(false);
                    }}
                  />
                </div>
                <span className="text-sm font-medium px-4 pb-2 shadow-lg">
                  Ask Lister your query...
                </span>
                <div className="chats flex flex-col grow min-h-[35vh] max-h-[60vh] overflow-y-auto">
                  {currentChats?.length !== 0 &&
                    currentChats.map((chat, index) => (
                      // <div></div>
                      <ChatBox
                        key={index}
                        sender={
                          chat.by === user.firstName + " " + user.lastName
                            ? 0
                            : 1
                        }
                        message={chat.message}
                      />
                    ))}
                </div>
                <form
                  onSubmit={
                    message != ""
                      ? handleSubmit
                      : () => alert("Can't send empty message!")
                  }
                  className="flex w-full h-full items-center border-t border-t-gray-400 pt-4"
                >
                  <input
                    value={message}
                    onChange={(e) => {
                      checkMessage(e.target.value);
                      setMessage(e.target.value);
                      //checkMessage(e.target.value)
                    }}
                    name=""
                    id="chatBox"
                    className="mx-4 rounded-lg border h-ful py-2 grow border-gray-300 px-2"
                    placeholder="Type your query here..."
                  ></input>
                  <button className="bg-indigo-600 w-fit text-white rounded-lg p-2 px-4">
                    Send
                  </button>
                </form>
              </div>
            </Dialog>
            <span
              className="flex gap-2 mt-6 border border-[#888] rounded p-3 w-fit"
              onClick={() => {
                setdialogOpen(true);
              }}
            >
              <MdOutlineMail className="text-2xl text-gray-500" />
              <span className="font-medium cursor-pointer">
                Send the owner query
              </span>
            </span>
            <h3 className="text-xl mt-3 mb-5 font-medium text-gray-900">
              When are you planning to book the spot?
            </h3>
            <div className={"flex flex-col space-y-3"}>
              {/* <span>Start Date:</span>
                            <input required={true} type="date" min={new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate()} value={startDate && startDate} onChange={(e)=>{setstartDate(e.target.value)}} className={"rounded-lg"} /> */}
              <span>Date:</span>
              <input
                required={true}
                type="date"
                value={endDate}
                onChange={(e) => {
                  localStorage.setItem("date", e.target.value);
                  setstartDate(e.target.value);
                  setendDate(e.target.value);
                }}
                className={"rounded-lg"}
              />
            </div>
            <div className={"mt-3 flex flex-col space-y-2"}>
              <span>Start Time:</span>
              <div className="flex">
                {/* <input required={true} step="3600000" type="time" max="12:00" value={startTime && startTime} onChange={(e)=>{setstartTime(e.target.value)}} className={"rounded-lg grow"} />
                            <select name="" id="" className="rounded-lg ml-2">
                                <option value="am">AM</option>
                                <option value="pm">PM</option>
                            </select> */}
                <TimePicker
                  minutesStep={60}
                  views={["hours"]}
                  // shouldDisableTime={(e) => {
                  // check if it's in the list of BlockedTimings of spotDetails
                  // BlockedTimings is an array of objects with start, end, date
                  // if it is, return true
                  // else return false
                  //   console.log("BlockedTimings", spotDetails?.BlockedTimings);
                  //   if (spotDetails?.BlockedTimings) {
                  //     let flag = false;
                  //     spotDetails?.BlockedTimings?.map((item) => {
                  //       console.log("item", item);
                  //       if (item.date === startDate) {
                  //         let start = item.start;
                  //         let end = item.end;
                  //         let time = e.$H;
                  //         console.log("start", start);
                  //         console.log("end", end);
                  //         console.log("time", time);
                  //         if (time >= start && time <= end + 3) {
                  //           flag = true;
                  //         }
                  //       }
                  //     });
                  //     return flag;
                  //   }
                  // }}
                  // disablePast

                  onChange={(e) => {
                    setstartTime(e.$H);
                    localStorage.setItem(
                      "startTime",
                      JSON.stringify(startTime)
                    );
                  }}
                  className={
                    "rounded-lg w-full h-10 px-3 py-2 border border-gray-300 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-transparent"
                  }
                />
              </div>
              {/* <TimePicker value={startTime} onChange={setstartTime} className={"rounded-lg w-full h-10 px-3 py-2 border border-gray-300 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-transparent"} /> */}
              <span className="!mt-6">End Time:</span>
              <div className="flex">
                {/* <input required={true} step="3600000" type="time" value={endTime && endTime} onChange={(e)=>{setendTime(e.target.value)}} className={"rounded-lg grow"} />
                            <select name="" id="" className="rounded-lg ml-2">
                                <option value="am">AM</option>
                                <option value="pm">PM</option>
                            </select> */}
                <TimePicker
                  viewRenderers={{
                    minutes: () => {
                      return;
                    },
                  }}
                  minutesStep={60}
                  views={["hours"]}
                  onChange={(e) => {
                    setendTime(e.$H);
                    localStorage.setItem("endTime", endTime);
                  }}
                  formatDensity="spacious"
                  className={
                    "rounded-xl w-full !mb-4 h-10 px-3 py-2 border border-gray-300 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-transparent"
                  }
                />
              </div>
            </div>

            <div className="mt-3 flex flex-col space-y-2">
              <span>Max Number Of Guests</span>
              <input
                required={true}
                type="number"
                value={guests}
                onChange={(e) => {
                  localStorage.setItem("guests", e.target.value);
                  setguests(e.target.value);
                }}
                placeholder="200"
                className="rounded-lg"
              />
            </div>

            {startDate && endDate && startTime && endTime && guests ? (
              <form className="mt-10">
                <Link
                  to={`/checkout/${params.spotId}`}
                  aria-disabled={
                    !startDate || !endDate || !startTime || !endTime || !guests
                  }
                  state={{
                    spotDetails: spotDetails,
                    startDate: startDate,
                    startTime: startTime,
                    endTime: endTime,
                    endDate: endDate,
                    guests: guests,
                    discountDetails,
                  }}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Continue to book your spot
                </Link>
              </form>
            ) : (
              <button
                // disabled={true}
                aria-disabled={
                  !startDate || !endDate || !startTime || !endTime || !guests
                }
                onClick={() => {
                  // alert("Please select all the fields!")
                  toast.error("Please select all the fields!");
                }}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Continue to book your spot
              </button>
            )}
          </div>

          <div
            className="py-10 pl-1.5 h-[110vh] overflow-y-auto lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8"
            id="spotDesc"
          >
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {spotDetails ? spotDetails.Description : "Loading..."}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-medium text-gray-900">
                What do you get?
              </h3>
              <div className="mt-6">
                <ul className={"grid grid-cols-3 sm:grid-cols-5 gap-4"}>
                  {spotDetails &&
                    spotDetails.Amenities.length > 0 &&
                    spotDetails.Amenities.map((item) => (
                      <li
                        key={item.id}
                        className={
                          "flex flex-col gap-3 items-center justify-between bg-[#e4e4e4] rounded-md my-2 px-3 py-7 pb-6 hover:bg-slate-300 duration-100"
                        }
                      >
                        <img
                          src={`http://localhost:5000${item.amenityIcon}`}
                          alt={"icon"}
                          width={25}
                          height={25}
                        />
                        <label>{item.amenityName}</label>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-medium text-gray-900">
                What the spot is recommended for?
              </h3>

              <div className="mt-6">
                <ul className={"grid grid-cols-3 sm:grid-cols-5 gap-4"}>
                  {spotDetails &&
                    spotDetails.Categories.length > 0 &&
                    spotDetails.Categories.map((item) => (
                      <li
                        key={item.id}
                        className={
                          "flex flex-col gap-3 items-center justify-between bg-[#e4e4e4] rounded-md my-2 px-3 py-7 pb-6 hover:bg-slate-300 duration-100"
                        }
                      >
                        <img
                          src={`http://localhost:5000${item.categoryIcon}`}
                          alt={"icon"}
                          width={25}
                          height={25}
                        />
                        <label className="text-center">
                          {item.categoryName}
                        </label>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="mt-10">
              <h3 className="text-xl font-medium text-gray-900">
                What are the rules for this spot?
              </h3>

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
              <h3 className="text-xl font-medium text-gray-900">
                When are we open?
              </h3>

              <div className="mt-6">
                <ul className={"flex flex-col space-y-3 list-disc"}>
                  {spotDetails
                    ? spotDetails.Timing &&
                      Object.keys(spotDetails.Timing).map((item) => (
                        <li key={item.id} className={"flex flex-row space-x-6"}>
                          {spotDetails.Timing[item].holiday ? (
                            <label className="xl:w-1/4 flex justify-between">
                              <span className="font-semibold">{item}</span>:
                              Holiday
                            </label>
                          ) : (
                            <label className="w-1/2 flex justify-between">
                              <span>{item}:</span>
                              <span className="flex">
                                {" "}
                                {new Date(
                                  spotDetails.Timing[item].open
                                ).getUTCHours()}
                                :
                                {new Date(
                                  spotDetails.Timing[item].open
                                ).getUTCMinutes()}
                                :00 -{" "}
                                {new Date(
                                  spotDetails.Timing[item].close
                                ).getUTCHours()}
                                :
                                {new Date(
                                  spotDetails.Timing[item].close
                                ).getUTCMinutes()}
                                :00
                              </span>
                            </label>
                          )}
                        </li>
                      ))
                    : "Loading..."}
                </ul>
              </div>
            </div>
            <h2 className="text-2xl font-semibold mt-12">
              Cancellation Policy
            </h2>
            <div>
              <h4 className="text-lg font-medium text-gray-900 mt-8 mb-2">
                24-Hour Cancellation Policy:
              </h4>
              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  Guests may cancel their booking up to 24 hours before the
                  start time of their reservation and receive a full refund of
                  the booking price. If the cancellation is made less than 24
                  hours before the start time, the guest will not be eligible
                  for a refund. If the booking is made within 24 hours of the
                  start time, guests will have a 2-hour grace period from the
                  time of booking to cancel the reservation without penalty.
                  After this 2-hour grace period, cancellations will not be
                  eligible for a refund.
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 mt-8 mb-2">
                48-Hour Cancellation Policy:
              </h4>
              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  Guests may cancel their booking up to 48 hours before the
                  start time of their reservation and receive a full refund of
                  the booking price. If the cancellation is made less than 48
                  hours before the start time, the guest will not be eligible
                  for a refund.
                  <br />
                  <br />
                  If the booking is made within 48 hours of the start time,
                  guests will have a 4-hour grace period from the time of
                  booking to cancel the reservation without penalty. After this
                  4-hour grace period, cancellations will not be eligible for a
                  refund.
                </p>
              </div>
            </div>
            {/* For more info link */}
            <div className="mt-10">
              <h3 className="text-lg font-medium text-[#0000ff] mt-0">
                For more info click here
              </h3>
            </div>
          </div>
        </div>
        <div className="mx-16 mb-14">
          <h3 className="text-xl font-medium text-gray-900 mt-8 mb-">
            Experiences
          </h3>
          <span className="text-xl font-semibold text-white flex items-center mb-8">
            <StarIcon className="text-[#3BD9FF] text-xl w-8 h-8" />
            <span className="text-black text-xl ml-1.5">5.0</span>
            <div className="w-1.5 h-1.5 bg-black rounded-full ml-2"></div>
            <span className="text-black text-xl ml-1.5">
              {" "}
              {reviews.length} reviews
            </span>
          </span>
          <div className="grid grid-cols-2 gap-12">
            {reviews.length > 0 ? (
              reviews.map((review) => {
                return (
                  <div
                    className="space-y-6 rounded-lg p-8"
                    style={{ boxShadow: "0 0 15px -5px #555" }}
                  >
                    <p className="text-base text-gray-900">{review.review}</p>
                    <p className="text-base text-gray-600 font-medium text-right">
                      ~ {review.clientName}
                    </p>
                  </div>
                );
              })
            ) : (
              <span className="font-medium text-center text-sm text-gray-500">
                No Reviews Yet!
              </span>
            )}
          </div>
        </div>

        <span className="text-xl font-semibold self-center my-8 text-center pt-10 border-t border-t-gray-400 w-full">
          You'll be here
        </span>
        <LeafletMap
          center={[
            spotDetails?.Location?.latitude ?? 0,
            spotDetails?.Location?.longitude ?? 0,
          ]}
          zoom={12}
          attributionControl={true}
          zoomControl={true}
        >
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <ChangeView
            center={[
              spotDetails?.Location?.latitude ?? 0,
              spotDetails?.Location?.longitude ?? 0,
            ]}
            zoom={12}
          />
          <Marker
            position={[
              spotDetails?.Location?.latitude ?? 0,
              spotDetails?.Location?.longitude ?? 0,
            ]}
          >
            <Popup>Popup for any custom information.</Popup>
          </Marker>
        </LeafletMap>
      </div>
    </div>
  );
}
