import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../Home/Banner";
import axios from "axios";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { maxHeight } from "@mui/system";

function Cards(props) {
  const [slides, setSlides] = useState([]);
 
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/get-allbanner"
        );
        setSlides(response.data.banner);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    console.log(slides);
  }, [slides]);

  useEffect(() => {
    console.log(props);
  }, [props]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    console.log(slides[currentIndex].coverImage);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  const detailFirstRowBackgroundStyle = {
    marginTop: 'auto',
    borderRadius: '15px',
    display: 'flex',
    padding: '8px',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    justifyContent: 'space-evenly',
    alignItems: 'center'

  }

  return (
    <>
      <Link to={`/spot/${props.objectId}`}>
        <section className="w-full my-5 mx-2 h-auto flex flex-col sm:flex-row  rounded-md p-3 min-h-[605px] sm:min-h-fit mb-[20px] sm:mb-0 "
          style={{
            // minHeight: '333px',
            height: 'fit-content',
            borderRadius: '45px',
            display: 'block',
            padding: '5px',
            paddingTop:'20px',
            borderBottomRightRadius: '0',
            borderBottomLeftRadius: '0',
            borderBottom: 'solid #0000004f 1px',
            margin: 'auto'
          }}>
          {/* IMAGE AND DETAILS */}
          <div
            className="flex flex-col sm:flex-row">
            {/* IMAGE SLIDER */}
            <div className="sm:w-[340px] h-56" style={{ display: "" }}>
              <div className="flex text-white min-w-full w-full h-full relative">
                <div
                  style={{
                    backgroundImage: `url(http://localhost:5000${props.image})`,
                    borderRadius: '25px',
                    height: "220px",
                    minWidth: "100%",
                    boxShadow: "0 2px 4px 0 rgb(136 144 195 / 40%), 0 5px 15px 0 rgb(37 44 97 / 35%)"
                  }}
                  className="block bg-center bg-cover duration-500 w-[360px] sm:!w-[600px]"
                >

                </div>

                {/* Left Arrow */}
                {/* <div className=" absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full md:p-2  bg-black/20 text-white cursor-pointer">
                  <BsChevronCompactLeft onClick={prevSlide} size={30} />
                </div> */}
                {/* Right Arrow */}
                {/* <div className=" absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full md:p-2  bg-black/20 text-white cursor-pointer">
                  <BsChevronCompactRight onClick={nextSlide} size={30} />
                </div> */}
                <div className="flex top-4 justify-center py-2">
                  {slides.map((slide, slideIndex) => (
                    <div
                      key={slideIndex}
                      onClick={() => goToSlide(slideIndex)}
                      className="text-2xl cursor-pointer"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            {/* DETAILS */}
            <div className="sm:w-2/3 pb-4 px-4 mt-0 sm:mt-0"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '25px',
                height: '240px'
              }}>
              {/* TITLE */}
              <div >
                <h1 className="font-semibold capitalize"
                  style={{
                    fontSize: '2em',
                    padding: '5px',
                    marginBottom: '10px',
                  }}>
                  {props.title ? props.title : ""}</h1>
              </div>
              {/* <h1 className="text-2xl font-extrabold mt-2">{props.title ? props.title : ""}</h1> */}
              {/* <div className="space-x-2 mt-2">
                <span className="font-extrabold text-cyan-50  px-1 rounded-md bg-blue-500">
                  4.5 &#9734;
                </span>
                <span className="font-extralight">(2121 Ratings)</span>
                <span className="font-extralight">Very Good</span>
              </div> */}
              {/* ROW 1 */}
              {/* <div id="areaAndNumberOfGuests" style={{ display: "flex", borderRadius: '15px', justifyContent: 'space-around' }}>

                <span style={detailFirstRowBackgroundStyle}>
                  <span>
                    <img src={areaIcon} alt={"icon"} style={detailIconStyle} />
                  </span>
                  <span style={{ display: 'inline', alignItems: "center", fontSize: '1.15em' }}>1000 sq. feet</span>
                </span>
                <div style={detailFirstRowBackgroundStyle}>

                  <h1 className="text-3xl font-extrabold text-blue-400">
                    <img src={rateIcon} alt={"icon"} style={{
                      height: '2em',
                      width: '2em',
                      display: 'inline',
                      marginLeft: '15px',
                      marginRight: '5px',
                      background: 'rgb(191, 219, 254)',
                      border: 'solid rgb(191, 219, 254)',
                      borderRadius: '15px',
                      padding: '4px',
                    }} />
                    ${props.price ? props.price : ""}
                    <span className="text-base ml-1 text-gray-500 font-light ">
                      <span className="line-through">${props.price ? props.price * 8 : ""}</span>
                      <span style={{ color: 'black' }}> / hour</span>

                    </span>
                  </h1>
                </div>
                <span style={detailFirstRowBackgroundStyle}>
                  <img src={guestCapacityIcon} alt={"icon"} style={{
                    height: '3.5em',
                    width: '3.5em',
                    display: 'inline',
                    marginLeft: '15px',
                    marginRight: '5px',
                    background: 'rgb(191, 219, 254)',
                    border: 'solid rgb(191, 219, 254)',
                    borderRadius: '15px',
                    padding: '4px',
                  }} />
                  <span style={{ display: 'inline', alignItems: "center", fontSize: '1.15em' }}>250 guests</span>
                </span>
              </div> */}
              {/* AMENITIES */}
              {/* <div className="flex space-x-4 px-2" id="amenities">
                <div className="">
                  <ul className={"flex space-x-5"}>
                    {props.amenities.map((item) => (
                      <li key={item.id} className={"rounded-lg text-center"}>
                        <img src={item.icon} className="mx-auto mix-blend-multiply" alt={"icon"} height={20} width={20} />
                        <label className="text-sm ">
                          {item.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}
              <div className="mt-2 space-x-3 p-2 flex" id="amenities">
                {
                  props.amenities ? props.amenities.map((amenity, index) => {
                    // console.log("AMENITY", amenity)
                     console.log("here", amenity.amenityName)
                    return (
                      
                      <span key={index} className="p-1 bg-gray-100 shadow-sm rounded-lg flex gap-2 items-center px-3 py-2">
                        <img src={`http://localhost:5000${amenity.amenityIcon}`} alt="" width={20} />
                        {amenity.amenityName}
                        </span>
                    )
                  }) : <span></span>
                }
              </div > 
              {/* <div id="bestFor" style={detailStyles}>
                <span id="iconBoxHeading" style={iconBoxHeadingStyle}>Best for</span>
                <div className="">
                  <ul className={""} style={iconContainerStyle}>
                    {product.categories.map((item) => (
                      <li key={item.id} className={""} style={iconStyle}>
                        <img src={item.icon} alt={"icon"} style={iconImageStyle} />
                        <label style={iconTextStyle}>
                          {item.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}
              {/* <h1 className="w-2/3 px-2 my-1" id="description">
                {
                  props.description ? props.description : ""
                }
              </h1> */}
              {/* RATING */}
              <div className="space-x-2" id="rating" style={{padding:"5px"}}>
                <span className="font-extrabold text-cyan-50  px-1 rounded-md bg-blue-500">
                  4.5 &#9734;
                </span>
                <span className="font-extralight">(2121 Ratings)</span>
                {/* <span className="font-extralight">Very Good</span> */}
                <span style={{alignItems:'center'}}><img src="/Icons/Filled/guests.png" alt="" style={{width:'25px',height:'25px',display:"inline",marginLeft:"9vw"}}/>
                  <span style={{marginLeft:'5px'}}>250 guests</span>
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between" style={{ marginTop: "auto", alignItems:"center"}} id="ratingDetailsAndBookNow">
                <div style={detailFirstRowBackgroundStyle}>
                  <h1 className="text-3xl font-extrabold text-blue-400">
                    ${props.price ? props.price : ""}
                    <span className="text-base ml-1 text-gray-500 font-light ">
                      <span className="line-through">${props.price ? props.price * 8 : ""}</span>
                      <span style={{ color: 'black' }}> / hour</span>

                    </span>
                  </h1>
                </div>
                <div className="sm:flex sm:mt-0 sm:space-x-2">
                  <Link to={`/spot/${props.objectId}`}>
                    <button className="px-4 py-2 font-extrabold text-lg border-2 text-blue-400 rounded w-full border-blue-400" style={{
                      borderRadius: '25px',
                      width: 'auto',
                      marginLeft: '10px'
                    }}>
                      View Details
                    </button>
                  </Link>
                  <Link to={`/spot/${props.objectId}`}>
                    <button className="px-4 py-2 font-extrabold text-lg border-2 text-white bg-blue-400 w-full mt-2 sm:mt-0 border-blue-400 rounded" style={{
                      borderRadius: '25px',
                      width: 'auto',
                      marginLeft: '10px'
                    }}>
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Link>
    </>
  );
}

export default Cards;
