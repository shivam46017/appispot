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
      <div className="relative overflow-hidden min-w-full">
        {/* Prev / Next Button */}
        {/* <div className="flex justify-between absolute top left w-full h-full">
          <button
            onClick={movePrev}
            className="bg-blue-300 left-0 hover:bg-blue-400 text-white rounded-xl w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
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
            className="bg-blue-300 hover:bg-blue-400 text-white rounded-xl w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300 self-end"
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
        </div> */}
        <div
          ref={carousel}
          className=" overflow-x-scroll cursor-pointer no-scrollbar carousel-container relative flex gap-1  scroll-smooth snap-x snap-mandatory touch-pan-x z-0 animate-bannermove"
        >
          {categories.map((resource, index) => {
            return (
              <div
                className={`relative bg-[rgba(0,0,0,0.5)] box-border flex flex-col rounded-md shadow-md justify-between items-center carousel-item text-center border border-[#777] text-sm p-7 h-32 w-36 mx-1 snap-start`}
              >
                <div className="items-center w-36 text-2xl md:text-lg">
                  {/* <img src={resource.icon} alt="" className="w-8 h-8 fill-blue" /> */}
                </div>
                <span className="items-center text-sm md:text-base">{resource.categoryName}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;