import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import searchContext from '../../../context/search/searchContext';

/**
 * 
 * @param {{ onSelect: (id) => void }} {} 
 * @returns 
 * @description
 * Returns the selected amenities id in param id
 */

function AminitiesBar({ onSelect }) {

    const { addFilter } = useContext(searchContext)

    const [amenities, setamenities] = useState([]);
    const [checked, setChecked] = useState([])

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
            addFilter({ amenity: checked })
        }
    }

    useEffect(() => {
        Promise.all([fetchAmenities()])
    }, [])

    useEffect(() => {
        addFilter({ amenity: checked })
    }, [checked])

    return (
        <div className='bg-white rounded-full shadow-xl flex gap-2 px-9 py-3'>
            <div className='flex'>
                {
                    amenities.map((value, i) => (
                        <div
                            title={value.amenityName}
                            key={`Aminities-${i}-spot`}
                            className={`${amenityIsChecked(value._id) ? 'bg-light-blue' : ''} w-16 border-r-2 last:border-r-0 flex items-center justify-center cursor-pointer`}
                            onClick={() => checkAmenity(value._id)} // don't change this to reference of function
                        >
                            <img
                                className='hover:scale-125 transition-all'
                                src={`http://localhost:5000${value.amenityIcon}`}
                                alt=""
                                width={20}
                            />
                        </div>
                    ))
                }
            </div>
            <div className='rounded-full p-3 bg-blue-600 hover:bg-blue-700 cursor-pointer h-full'>
                <img className='w-6 m-auto' src={'../../../../public/Icons/BarIcons/filter.png'} alt="" />
            </div>
        </div >
    )
}

export default AminitiesBar