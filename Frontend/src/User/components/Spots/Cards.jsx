import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../Home/Banner";
import axios from "axios";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { maxHeight } from "@mui/system";
import Slider from "react-slick";

function Cards(props) {
  console.log({ spots: props })
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
      <Link to={`/spot/${props._id}`}>
        <section className="w-full my-5 mx-2 h-auto flex items-center sm:flex-row  rounded-md p-3 min-h-[605px] sm:min-h-fit mb-[20px] sm:mb-0"
          style={{
            // minHeight: '333px',
            height: 'fit-content',
            borderRadius: '25px',
            display: 'block',
            borderBottomRightRadius: '0',
            borderBottomLeftRadius: '0',
            borderBottom: 'solid #0000004f 1px',
            margin: 'auto',
          }}>
          {/* IMAGE AND DETAILS */}
          <div
            className="flex flex-col sm:flex-row">
            {/* IMAGE SLIDER */}
            <div className="sm:w-[340px] h-56" style={{ display: "" }}>
              <div className="flex text-white min-w-full w-full h-full relative">
                <div
                  style={{
                    borderRadius: '25px',
                    height: "220px",
                    minWidth: "100%",
                    boxShadow: "0 2px 4px 0 rgb(136 144 195 / 40%), 0 5px 15px 0 rgb(37 44 97 / 35%)"
                  }}
                  className="block bg-center bg-cover duration-500 w-[360px] sm:!w-[600px] overflow-hidden"
                >
<Slider dots={false} autoplay={true} autoplaySpeed={4000} slidesToScroll={1} slidesToShow={1}>
  {
    props.Images.map((data) => (
      <img src={`http://localhost:5000${data}`} alt="" srcset="" className="container"/>
    ))
  }
</Slider>
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
            <div className="flex flex-col justify-around w-1/2 px-6 py-2">
              <div className="flex items-center justify-between">
                <div>
                  <span><span className="font-extrabold text-2xl">{props.SqFt}</span> Sq Ft</span>
                </div>
                <span style={{ marginLeft: '5px' }}><span className="font-extrabold text-2xl">{props.guests ?? 0}</span> guests</span>
                <div style={detailFirstRowBackgroundStyle}>
                  <h1 className="text-2xl font-extrabold">
                    ${props.Price ? props.Price : ""}
                    <span className="text-base ml-1 text-gray-500 font-light ">
                      <span className="line-through">${props.Price ? props.Price * 8 : ""}</span>
                      <span style={{ color: 'black' }}> / hour</span>

                    </span>
                  </h1>
                </div>
              </div>
              <hr />
              <div className="space-x-3 flex items-center justify-between" id="amenities">
                {
                  props.Amenities ? props.Amenities.map((amenity, index) => {
                    // console.log("AMENITY", amenity)
                    console.log("here", amenity.amenityName)
                    return (

                      <div key={index} className="p-1 bg-gray-100 shadow-sm rounded-lg flex gap-2 items-center px-3 py-2">
                        <img src={`http://localhost:5000${amenity.amenityIcon}`} alt="" width={20} />
                        {amenity.amenityName}
                      </div>
                    )
                  }) : <div></div>
                }
              </div >
              <hr />
              {/* RATING */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="font-extrabold text-cyan-50  px-1 rounded-md bg-blue-500">
                    4.5 &#9734;
                  </div>
                  <div className="font-extralight">({props.reviews.length} Ratings)</div>
                  </div>
                  {/* <span className="font-extralight">Very Good</span> */}
                <div className="sm:flex sm:mt-0 sm:space-x-2">
                  <Link to={`/spot/${props._id}`}>
                    <button className="px-4 py-2 font-extrabold text-lg text-blue-400 rounded w-full border-blue-400" style={{
                      borderRadius: '25px',
                      width: 'auto',
                      marginLeft: '10px'
                    }}>
                      View Details
                    </button>
                  </Link>
                  <Link to={`/spot/${props._id}`}>
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
