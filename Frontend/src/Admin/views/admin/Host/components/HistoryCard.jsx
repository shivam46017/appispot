import React, { useEffect } from "react";
import Card from "./../../../../components/card/index";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const HistoryCard = (props) => {
  const { bannerImages } = props;
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(bannerImages);
  }, [bannerImages]);

  const toggleImage = (value, e, id) => {
    const updatedImages = images.map((image) => {
      if (image.id === parseInt(id)) {
        return {
          ...image,
          isActive: value,
        };
      } else {
        return image;
      }
    });

    setImages(updatedImages);
  };
  const onDelete = async (img) => {
    console.log(img);
    
    try {
      const response = await axios.request({
        method: "DELETE",
        url: `http://192.168.1.104:5000/api/delete-bannerbyId/${img._id}`,
      });
      setImages(
        images.filter((e) => {
          return e !== img;
        })
      );
      console.log(response);
      toast.success("Image Deleted Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.success("Failed to delete the image", {
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

  return (
    <Card extra={"mt-3 !z-5 overflow-hidden"}>
      {/* HistoryCard Header */}
      <div className="flex items-center justify-between rounded-t-3xl p-3">
        <div className="text-lg font-bold text-navy-700 ">Banner Images</div>
        <div className="flex hover:scale-105">
          <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200   ">
            <div className="relative bg-white rounded-md overflow-hidden">
             
              
                <span className="text-base font-medium text-gray-600">
                  See all
                </span>
             
            </div>
          </button>
        </div>
      </div>
      {/* History CardData */}
      {images.map((data) => {
        return (
          <div
            key={data._id}
            className="flex h-full w-full items-start bg-gray-100 rounded-lg justify-between px-3 py-[20px] hover:shadow-2xl"
          >
            <div className="flex items-center gap-3 ">
              <div className="flex h-16 w-16 items-center justify-center">
                <img
                  className="h-full w-full rounded-xl"
                  src={`http://192.168.1.104:5000${data.coverImage}`}
                  alt=""
                />
              </div>
              <p>Banner Image</p>
            </div>
            <div className="mt-4 flex items-center justify-center text-navy-700 ">
              {/* <label className="mt-2">
              <Switch
                onColor="#bfdbfe"
                onChange={toggleImage}
                checked={data.isActive}
                id={`${data.id}`}
              />
            </label> */}
              <span>
                <BsTrash
                  className="text-2xl mx-2 hover:scale-110 text-red-400"
                  onClick={() => onDelete(data)}
                />
              </span>
            </div>
          </div>
        );
      })}
    </Card>
  );
};

export default HistoryCard;
