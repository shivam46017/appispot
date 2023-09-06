import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../Home/Banner";
import axios from "axios";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { maxHeight } from "@mui/system";

function Cards(props) {
  console.log('props')
  console.log(props)
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
            paddingTop: '20px',
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
            <div className="flex flex-col justify-around w-1/2 p-4">
              <div className="flex items-center justify-around border-b-2 last:border-b-none">
                <div>
                  <span><span className="font-extrabold text-2xl">55</span> Sq Ft</span>
                </div>
                <span style={{ marginLeft: '5px' }}><span className="font-extrabold text-2xl">150</span> guests</span>
                <div style={detailFirstRowBackgroundStyle}>
                  <h1 className="text-2xl font-extrabold">
                    ${props.price ? props.price : ""}
                    <span className="text-base ml-1 text-gray-500 font-light ">
                      <span className="line-through">${props.price ? props.price * 8 : ""}</span>
                      <span style={{ color: 'black' }}> / hour</span>

                    </span>
                  </h1>
                </div>
              </div>
              <div className="space-x-3 p-2 flex items-center justify-start border-b-2 last:border-b-none" id="amenities">
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
              {/* RATING */}
              <div className="flex items-center justify-evenly">
                  <div id="rating" style={{ padding: "5px" }}>
                    <span className="font-extrabold text-cyan-50  px-1 rounded-md bg-blue-500">
                      4.5 &#9734;
                    </span>
                    <span className="font-extralight">({2122} Ratings)</span>
                    {/* <span className="font-extralight">Very Good</span> */}
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
