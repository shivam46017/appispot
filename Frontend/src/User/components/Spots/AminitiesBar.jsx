// css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import searchContext from '../../../context/search/searchContext';
import Slider from 'react-slick'

/**
 * 
 * @param {{ onSelect: (id) => void }} {} 
 * @returns 
 * @description
 * Returns the selected amenities id in param id
 */


function AminitiesBar({ setOpenFilter }) {

    const { addFilter, categoryList, showFilters } = useContext(searchContext)
    const [amenities, setamenities] = useState([]);
    const [checked, setChecked] = useState([])
    const [categories, setcategories] = useState([
        {
            _id: 1,
            categoryName: "Barbeque",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/Barbecue.png",
        },
        {
            _id: 2,
            categoryName: "Picnic",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/PIcnic.png",
        },
        {
            _id: 3,
            categoryName: "Wedding",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/Wedding.png",
        },
        {
            _id: 4,
            categoryName: "Wedding Reception",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/wedding Reception.png",
        },
        {
            _id: 5,
            categoryName: "Party",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/Party.png",
        },
        {
            _id: 6,
            categoryName: "Graduation Party",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/Graduation Party.png",
        },
        {
            _id: 7,
            categoryName: "Baby Shower",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/Baby Shower.png",
        },
        {
            _id: 8,
            categoryName: "Birthday Party",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/Birthday party.png",
        },
        {
            _id: 9,
            categoryName: "Engagement Party",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/engagement Party.png",
        },
        {
            _id: 10,
            categoryName: "OutDoor Dinner",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/outdoor  dinner.png",
        },
        {
            _id: 11,
            categoryName: "Bridal Shower",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/Bridal shower.png",
        },
        {
            _id: 12,
            categoryName: "Gyms",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/Gym.png",
        },
        {
            _id: 13,
            categoryName: "Gala",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/Gala.png",
        },
        {
            _id: 14,
            categoryName: "Gathering",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/Gathering.png",
        },
        {
            _id: 15,
            categoryName: "Fundraiser",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/Fundraisers.png",
        },
        {
            _id: 16,
            categoryName: "Wellness",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/wellness.png",
        },
        {
            _id: 17,
            categoryName: "Video Shoot",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/Video shoot.png",
        },
        {
            _id: 18,
            categoryName: "Pop-up shops",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/Shop.png",
        },
        {
            _id: 19,
            categoryName: "Corporate Party",
            isChecked: false,
            icon: "/uploads/Amenities_categories/bnw/corporate party.png",
        },
    ]);

    const fetchAmenities = async () => {
        const res = await axios.get(`http://localhost:5000/api/getAmenities`);
        const resData = res.data;
        if (resData.success === true) {
            setamenities(resData.amenities);
        } else {
            toast.error("Something went wrong");
        }

        console.log(resData)
    };

    const amenityIsChecked = (id) => {
        return checked.includes(id)
    }

    const checkAmenity = (id) => {
        if (amenityIsChecked(id)) {
            setChecked((prev) => prev.filter((value) => value !== id)) // remove the checked amenity if exist
            removeFilter()
        } else {
            setChecked((prev) => (
                [...prev, id] // add the amenity if it doesn't exit
            ))
        }
    }

    useEffect(() => {
        addFilter({ category: checked })
    }, [checked])

    let settings = { 
        slidesToShow: 14,
        slidesToScroll: 1,
        dots: false,
        className: 'sample',
        autoplay: true,
        autoplaySpeed: 2000,      
    }

    return (
        <div className="flex gap-6 items-center">
        <Slider {...settings} className='bg-white rounded-2xl shadow-xl flex gap-2 px-9 py-3 max-w-[70vw]'>
                {
                    categories.map((value, i) => (
                        <div
                            title={value.categoryName}
                            key={`categories-${i}-spot`}
                            className={`${amenityIsChecked(value.categoryName) ? 'bg-light-blue rounded-md' : ''} w-16 border-r-2 last:border-r-0 flex items-center justify-center cursor-pointer p-2`}
                            onClick={() => checkAmenity(value.categoryName)} // don't change this to reference of function
                        >
                            <img
                                className='hover:scale-125 transition-all'
                                src={`http://localhost:5000${value.icon}`}
                                alt={value.categoryName}
                                width={35}
                            />
                        </div>
                    ))
                }
        </Slider>
        <div className='rounded-full h-14 w-14 grid place-items-center bg-light-blue hover:bg-light-blue-100 cursor-pointer' onClick={() => showFilters()}>
                <img className='w-6 m-auto' src={'../../../../public/Icons/BarIcons/filter.png'} alt="" />
            </div>
        </div>
    )
}

export default AminitiesBar