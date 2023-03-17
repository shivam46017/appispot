import { useState, useRef, useEffect } from "react";
import { MdCelebration, MdTrendingUp } from "react-icons/md";

// Data
let data = {
  resources: [
    {
      title: "Celebration",
      imageUrl: <MdCelebration />
    },
    {
      title: "Celebration",
      imageUrl: <MdCelebration />
    },
    {
      title: "Celebration",
      imageUrl: <MdCelebration />
    },
    {
      title: "Celebration",
      imageUrl: <MdCelebration />
    },
    {
      title: "Celebration",
      imageUrl: <MdCelebration />
    },

    {
      title: "Tranding",
      imageUrl: <MdTrendingUp />
    },
    {
      title: "Celebration",
      imageUrl: <MdCelebration />
    },
    {
      title: "Celebration",
      imageUrl: <MdCelebration />
    },

    {
      title: "Tranding",
      imageUrl: <MdTrendingUp />
    },
    {
      title: "Celebration",
      imageUrl: <MdCelebration />
    },
    {
      title: "Celebration",
      imageUrl: <MdCelebration />
    },

    {
      title: "Tranding",
      imageUrl: <MdTrendingUp />
    },

    {
      title: "Tranding",
      imageUrl: <MdTrendingUp />
    },

    {
      title: "Tranding",
      imageUrl: <MdTrendingUp />
    },

    {
      title: "Tranding",
      imageUrl: <MdTrendingUp />
    },

    {
      title: "Tranding",
      imageUrl: <MdTrendingUp />
    },
    
  ],
};

const Carousel = () => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
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
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className=" carousel my-12 mx-auto">
      <div className="relative overflow-hidden">
        {/* Prev / Next Button */}
        <div className="flex justify-between absolute top left w-full h-full">
          <button
            onClick={movePrev}
            className="bg-blue-300 hover:bg-blue-400 text-white rounded-xl w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('prev')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only bg-black">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="bg-blue-300 hover:bg-blue-400 text-white rounded-xl w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('next')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className=" overflow-x-scroll cursor-pointer no-scrollbar  carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          {data.resources.map((resource, index) => {
            return (
              <div
                key={index}
                className="relative box-border flex flex-col rounded-md shadow-md  justify-center items-center carousel-item text-center border  text-sm p-7  h-32 w-36 mx-1 snap-start"
              >
                <div className="items-center  text-2xl md:text-lg">
                  {resource.imageUrl}
                </div>
                {resource.title}
                <span className="items-center text-sm md:text-lg"></span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;