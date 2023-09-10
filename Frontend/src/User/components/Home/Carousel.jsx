import { useState, useRef, useEffect, useContext } from "react";
import { MdCelebration, MdTrendingUp } from "react-icons/md";
import Slider from 'react-slick';
import { useNavigate } from "react-router-dom";

// utils
import getCategories from "../../../utils/fetch/Categories";

// context
import searchContext from "../../../context/search/searchContext";


const Carousel = () => {

  const navigate = useNavigate()

  // context
  const { addFilter } = useContext(searchContext)

  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([])
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    const fetchNeccessaries = async () => {
      const results = await getCategories()
      setCategories(results)
    }

    fetchNeccessaries()
  })

  return (
    <div className="carousel my-12 mx-auto">
      <div className="relative overflow-hidden min-w-full">
        <div className="flex animate-bannermove">
          {categories.map((resource, index) => {
            return (
              <div
                onClick={() => {
                  addFilter({ category: resource.categoryName })
                  navigate('/spots')
                }}
                className={`relative box-border flex flex-col rounded-md shadow-md justify-between items-center carousel-item text-center border border-[#777] text-sm h-64 duration-200 hover:h-72 w-fit mx-4 snap-start cursor-pointer`}
              >
                <img src={`http://localhost:5000${resource.categoryIcon}`} className="relative top-1/2 -translate-y-1/2" height={100} width={100} alt="" />
                <div className="items-end flex flex-row justify-start w-fit sm:w-56 text-left text-xl font-extrabold text-white h-full md:text-xl">
                  <span className="bg-blue-500 p-4 w-full">
                    {resource.categoryName}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;