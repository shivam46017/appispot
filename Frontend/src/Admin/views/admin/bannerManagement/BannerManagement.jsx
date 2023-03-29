import React, { useEffect, useState } from "react";
import NFt2 from "../../../assets/img/nfts/Nft2.png";
import NFt4 from "../../../assets/img/nfts/Nft4.png";
import NFt3 from "../../../assets/img/nfts/Nft3.png";
import NFt5 from "../../../assets/img/nfts/Nft5.png";
import NFt6 from "../../../assets/img/nfts/Nft6.png";
import avatar1 from "../../../assets/img/avatars/avatar1.png";
import avatar2 from "../../../assets/img/avatars/avatar2.png";
import avatar3 from "../../../assets/img/avatars/avatar3.png";

import tableDataTopCreators from "./../Lister/variables/tableDataTopCreators.json";
import NftCard from "./../../../components/card/NftCard";
import TopCreatorTable from "./../Lister/components/TableTopCreators";
import HistoryCard from "./../Lister/components/HistoryCard";
import { tableColumnsTopCreators } from "./../Lister/variables/tableColumnsTopCreators";
// import Banner from "./Banner";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";

function BannerManagement() {
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
    console.log(slides[currentIndex].coverImage)
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <>
      <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
          {/* Banner */}
          <div className="flex text-white max-w-full h-96 w-full relative group ">
            <div
              style={{ backgroundImage: `url(http://localhost:5000${slides[currentIndex]?slides[currentIndex].coverImage:''})` }}
              className="w-full h-full bg-center bg-cover duration-500 "
            >
              
            </div>

            {/* Left Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full md:p-2  bg-black/20 text-white cursor-pointer">
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            {/* Right Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full md:p-2  bg-black/20 text-white cursor-pointer">
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
          {/* NFt Header */}
          {/* <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
            <h4 className="ml-1 text-2xl font-bold text-navy-700 ">
              Trending NFTs
            </h4>
            <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
              <li>
                <a
                  className="text-base font-medium text-brand-500 hover:text-brand-500 "
                  href=" "
                >
                  Art
                </a>
              </li>
              <li>
                <a
                  className="text-base font-medium text-brand-500 hover:text-brand-500 "
                  href=" "
                >
                  Music
                </a>
              </li>
              <li>
                <a
                  className="text-base font-medium text-brand-500 hover:text-brand-500 "
                  href=" "
                >
                  Collection
                </a>
              </li>
              <li>
                <a
                  className="text-base font-medium text-brand-500 hover:text-brand-500 "
                  href=" "
                >
                  <a href=" ">Sports</a>
                </a>
              </li>
            </ul>
          </div> */}

          {/* NFTs trending card */}
          {/* <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
            <NftCard
              bidders={[avatar1, avatar2, avatar3]}
              title="Abstract Colors"
              author="Esthera Jackson"
              price="0.91"
              image={NFt3}
            />
            <NftCard
              bidders={[avatar1, avatar2, avatar3]}
              title="ETH AI Brain"
              author="Nick Wilson"
              price="0.7"
              image={NFt2}
            />
            <NftCard
              bidders={[avatar1, avatar2, avatar3]}
              title="Mesh Gradients"
              author="Will Smith"
              price="2.91"
              image={NFt4}
            />
          </div> */}

          {/* Recenlty Added setion */}
          {/* <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
            <h4 className="text-2xl font-bold text-navy-700 ">
              Recently Added
            </h4>
          </div> */}

          {/* Recently Add NFTs */}
          {/* <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <NftCard
              bidders={[avatar1, avatar2, avatar3]}
              title="Abstract Colors"
              author="Esthera Jackson"
              price="0.91"
              image={NFt4}
            />
            <NftCard
              bidders={[avatar1, avatar2, avatar3]}
              title="ETH AI Brain"
              author="Nick Wilson"
              price="0.7"
              image={NFt5}
            />
            <NftCard
              bidders={[avatar1, avatar2, avatar3]}
              title="Mesh Gradients"
              author="Will Smith"
              price="2.91"
              image={NFt6}
            />
          </div> */}
        </div>

        {/* right side section */}

        <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
          {/* <TopCreatorTable
            extra="mb-5"
            tableData={tableDataTopCreators}
            columnsData={tableColumnsTopCreators}
          /> */}
          <HistoryCard bannerImages={slides} />
        </div>
      </div>
    </>
  );
}

export default BannerManagement;
