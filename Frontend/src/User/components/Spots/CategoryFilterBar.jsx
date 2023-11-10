// css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import searchlogo from "../../../../public/Icons/BarIcons/filter.png";
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useSearchParams } from "react-router-dom";

function CategoryFilter({ setOpenFilter }) {
  const [amenities, setamenities] = useState([]);
  const [checked, setChecked] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams()

  let categories = [
    {
      _id: "64d76cc1bd20601e88854f6c",
      categoryName: "Barbeque",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/Barbecue.png",
    },
    {
      _id: "64d76cc1bd20601e88854f6d",
      categoryName: "Picnic",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/Picnic.png",
    },
    {
      _id: "64d76cc1bd20601e88854f6e",
      categoryName: "Wedding",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/Wedding.png",
    },
    {
      _id: "64d76cc1bd20601e88854f6f",
      categoryName: "Wedding Reception",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/Wedding Reception.png",
    },
    {
      _id: "64d76cc1bd20601e88854f70",
      categoryName: "Party",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/Party.png",
    },
    {
      _id: "64d76cc1bd20601e88854f71",
      categoryName: "Graduation Party",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/graduation party.png",
    },
    {
      _id: "64d76cc1bd20601e88854f72",
      categoryName: "Baby Shower",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/Baby shower.png",
    },
    {
      _id: "64d76cc1bd20601e88854f73",
      categoryName: "Birthday Party",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/Birthday party.png",
    },
    {
      _id: "64d76cc1bd20601e88854f74",
      categoryName: "Engagement Party",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/Engagement party.png",
    },
    {
      _id: "64d76cc1bd20601e88854f75",
      categoryName: "OutDoor Dinner",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/outdoor  dinner.png",
    },
    {
      _id: "64d76cc1bd20601e88854f76",
      categoryName: "Bridal Shower",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/Bridal shower.png",
    },
    {
      _id: "64d76cc1bd20601e88854f77",
      categoryName: "Gyms",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/Gym.png",
    },
    {
      _id: "13",
      categoryName: "Gala",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/Gala.png",
    },
    {
      _id: "64d76cc1bd20601e88854f78",
      categoryName: "Gathering",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/Gathering.png",
    },
    {
      _id: "64d76cc1bd20601e88854f79",
      categoryName: "Fundraiser",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/Fundraisers.png",
    },
    {
      _id: "64d76cc1bd20601e88854f7a",
      categoryName: "Wellness",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/wellness.png",
    },
    {
      _id: "64d76cc1bd20601e88854f7b",
      categoryName: "Video Shoot",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/Video shoot.png",
    },
    {
      _id: "64d76cc1bd20601e88854f7c",
      categoryName: "Pop-up shops",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/shop.png",
    },
    {
      _id: "19",
      categoryName: "Corporate Party",
      isChecked: false,
      icon: "/uploads/Amenities_categories/bnw/corporate party.png",
    },
  ]
  
  let settings = {
    slidesToShow: 14,
    slidesToScroll: 1,
    dots: false,
    className: "sample",
    autoplay: true,
    autoplaySpeed: 2000,
  }

  const fetchAmenities = async () => {
    const res = await axios.get(`http://localhost:5000/api/getAmenities`);
    const resData = res.data;
    if (resData.success === true) {
      setamenities(resData.amenities);
    } else {
      toast.error("Something went wrong");
    }
    console.log(resData);
  };

  const amenityIsChecked = (id) => {
    return checked.includes(id);
  };

  const checkAmenity = (id) => {
    if (amenityIsChecked(id)) {
      setChecked((prev) => prev.filter((value) => value !== id)); // remove the checked amenity if exist
    } else {
      setChecked((prev) => [...prev, id]); // add the amenity if it doesn't exit
    }
  };

  useEffect(() => {
    fetchAmenities()
  }, [])

  useEffect(() => {
    searchParams.set('category', checked)
    setSearchParams(searchParams)
  }, [checked])

  return (
    <div className="flex gap-6 items-center">
      <Slider
        {...settings}
        className="bg-white rounded-2xl shadow-xl !flex !gap-2 lg:px-9 lg:py-3 lg:max-w-[70vw] max-md:max-w-[80vw]"
      >
        {categories.map((value, i) => (
          <div
            title={value.categoryName}
            key={`categories-${i}-spot`}
            className={`${
              amenityIsChecked(value._id) ? "bg-light-blue rounded-md" : ""
            } w-16 border-r-2 last:border-r-0 flex items-center justify-center cursor-pointer lg:p-2 !mx-6`}
            onClick={() => checkAmenity(value._id)} // don't change this to reference of function
          >
            <img
              className="hover:scale-125 transition-all"
              src={`http://localhost:5000${value.icon}`}
              alt={value.categoryName}
              width={35}
            />
          </div>
        ))}
      </Slider>
      <div
        className="rounded-full h-14 w-14 grid place-items-center bg-light-blue hover:bg-light-blue-100 cursor-pointer"
        onClick={() => setOpenFilter()}
      >
        <img className="w-6 m-auto" src={searchlogo} alt="" />
      </div>
    </div>
  );
}

CategoryFilter.propTypes = {
  setOpenFilter: PropTypes.func
}

export default CategoryFilter;
