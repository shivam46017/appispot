import React, { useEffect, useState } from "react";
import NFt2 from "../../../assets/img/nfts/Nft2.png";
import NFt4 from "../../../assets/img/nfts/Nft4.png";
import NFt3 from "../../../assets/img/nfts/Nft3.png";
import NFt5 from "../../../assets/img/nfts/Nft5.png";
import NFt6 from "../../../assets/img/nfts/Nft6.png";
import avatar1 from "../../../assets/img/avatars/avatar1.png";
import avatar2 from "../../../assets/img/avatars/avatar2.png";
import avatar3 from "../../../assets/img/avatars/avatar3.png";

import tableDataTopCreators from "../Host/variables/tableDataTopCreators.json";
import NftCard from "./../../../components/card/NftCard";
import TopCreatorTable from "../Host/components/TableTopCreators";
import HistoryCard from "../Host/components/HistoryCard";
import { tableColumnsTopCreators } from "../Host/variables/tableColumnsTopCreators";
// import Banner from "./Banner";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdFileUpload } from "react-icons/md";
import { toast } from "react-toastify";

function BannerManagement() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);


  const uploadImage = async (file) => {
    try {
      const selectedFile = file;
      const formData = new FormData();
      formData.append("coverImage", selectedFile);

      const response = await fetch("https://appispot.com/api/add-banner", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      if (data.success === true) {
        toast.success("Image Uploaded Successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setImagePreviewUrl(null);
      }
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to uplaod an image", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    const previewUrl = URL.createObjectURL(selectedFile);
    setImageFile(selectedFile);
    setImagePreviewUrl(previewUrl);
  };

  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(
          "https://appispot.com/api/get-allbanner"
        );
        setSlides(response.data.banner);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSlides();
  }, [imagePreviewUrl]);

  useEffect(() => {
    console.log(slides);
  }, [slides]);
  
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
      <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
          {/* Banner */}
          <div className="flex text-white max-w-full h-96 w-full relative group ">
            <div
              style={{
                backgroundImage: `url(https://appispot.com${
                  slides[currentIndex] ? slides[currentIndex].coverImage : ""
                })`,
              }}
              className="w-full h-full bg-center bg-cover duration-500 "
            ></div>

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

          {/* NFTs trending card */}
          <div className="mt-14  ">
            <div className=" mb-5 flex flex-col justify-between md:flex-row md:items-center ">
              <h4 className="text-2xl font-bold text-navy-700 ">
                {imagePreviewUrl
                  ? "Preview Banner Image"
                  : "Upload Banner Image"}
              </h4>
              <div className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
                {imagePreviewUrl && 
                  <div className="flex">
                    <button className="linear mt-1 bg-blue-100 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200   ">
                      <div className="relative  rounded-md overflow-hidden">
                        <span
                          className="text-base font-medium text-gray-600"
                          onClick={() => uploadImage(imageFile)}
                        >
                          Upload Image
                        </span>
                      </div>
                    </button>
                    <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200   ">
                      <div className="relative bg-white rounded-md overflow-hidden">
                        <span
                          className="text-base font-medium text-red-500"
                          onClick={() => setImagePreviewUrl(null)}
                        >
                          Remove Image
                        </span>
                      </div>
                    </button>
                  </div>
                }
              </div>
            </div>
            {!imagePreviewUrl ? (
              <div className="mb-4 relative bg-white rounded-md overflow-hidden">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 z-50"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <label
                  htmlFor="image"
                  className=" flex text-sm font-mediumfocus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <div className=" col-span-5 w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6 h-96">
                    <button className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 p-10">
                      <MdFileUpload className="text-[80px] text-brand-500 " />
                      <h4 className="text-xl font-bold text-brand-500 ">
                        Browse Files
                      </h4>
                      <p className="mt-2 text-sm font-medium text-gray-600">
                        PNG, JPG and GIF files are allowed
                      </p>
                    </button>
                  </div>
                </label>
              </div>
            ) : (
              <div className="flex justify-center items-center p-2 bg-gray-100">
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="object-cover h-96 w-full border border-gray-300"
                />
              </div>
            )}
          </div>
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
