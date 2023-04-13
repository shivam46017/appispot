import React, { useEffect, useState } from "react";
import Banner from "../Home/Banner";
import axios from "axios";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

function Cards() {
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
  return (
    <>
      <section className="w-full my-5 mx-2 h-auto flex shadow-lg shadow-gray-300  rounded-md p-3">
        <div className="w-1/3 h-56">
          <div className="flex text-white w-auto h-full relative">
            <div
              style={{
                backgroundImage: `url(https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg)`,
              }}
              className="w-full h-full bg-center bg-cover duration-500 "
            ></div>

            {/* Left Arrow */}
            <div className=" absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full md:p-2  bg-black/20 text-white cursor-pointer">
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            {/* Right Arrow */}
            <div className=" absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full md:p-2  bg-black/20 text-white cursor-pointer">
              <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
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
        <div className="w-2/3  px-4">
          <h1 className="text-2xl font-extrabold mt-2">New Product</h1>
          <h1 className="w-2/3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo
            dicta ducimus dolore
          </h1>
          <div className="space-x-2 mt-2">
            <span className="font-extrabold text-cyan-50  px-1 rounded-md bg-blue-500">
              4.5 &#9734;
            </span>
            <span className="font-extralight">(2121 Ratings)</span>
            <span className="font-extralight">Very Good</span>
          </div>
          <div className="mt-2 space-x-3 ">
            <span className="font-extralight">Gazebo</span>
            <span className="font-extralight">Restroom</span>
            <span className="font-extralight">Noise Friendy</span>
            <span className="font-extralight">Tables</span>
            <span className="font-extralight">Parking</span>
          </div>
          <div className="mt-5 flex justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-blue-400">
                $212
                <span className="text-base ml-1 text-gray-500  font-light line-through">
                  $2121
                </span>
              </h1>
            </div>
            <div className="space-x-4">
              <button className="px-4 py-2 font-extrabold text-lg border-2 text-blue-400 rounded border-blue-400">
                View Details
              </button>
              <button className="px-4 py-2 font-extrabold text-lg border-2 text-white bg-blue-400 border-blue-400 rounded">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cards;