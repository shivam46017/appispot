import { useEffect, useState } from "react";
import SearchContext from "../../context/search/searchContext";
import { removeRepeatingValues, removeThisValue } from "../../utils/Sanitize";
import axios from "axios";

const searchProvider = ({ children }) => {

    const [filters, setFilters] = useState({
        date: '',
        city: '',
        category: '',
        spotType: '',
        amenity: '',
        guests: null,
        type: '',
        area: null
    })
    const [categoryList, setCategoryList] = useState([])
    const [amenityList, setAmenityList] = useState([])
    const [cityList, setCityList] = useState([])
    const [query, setQuery] = useState('')
    const [userWantToFilter, setUserWantToFilter] = useState(false)

    const hideFilters = () => {
        document.getElementById("filterList").style.display = "none";
        setListSize(3);
    };

    const showFilters = () => {
        let element = document.getElementById("filterList");
        if (element.style.display === "none") {
            element.style.display = "";
            setListSize(5);
        } else {
            hideFilters();
        }
    };

    const queryString = (payload) => {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(payload)) {
            if (value === null || value === undefined || value === '' || value === 0) continue;
            if (Array.isArray(value)) {
                for (const item of value) {
                    if (item !== null && item !== undefined && item !== '') {
                        params.append(key, item);
                    }
                }
            } else {
                params.append(key, value);
            }
        }
        setQuery('?' + params.toString())
    }


    /**
     * @param {{ date: Date, city: string, spotType: string, amenity: string }} value 
     */
    const addFilter = (value) => {
        for (const key in value) {
            setFilters((prev) => {
                return {
                    ...prev,
                    [key]: Array.isArray(value[key]) ? removeRepeatingValues(value[key]) : value[key]
                }
            })
        }
    }

    const removeFilter = (value) => {
        for (const key in value) {
            setFilters((prev) => {
                return {
                    ...prev,
                    [key]: removeThisValue(prev[key], value[key])
                }
            })
        }
    }

    const reset = () => {
        setFilters({
            date: '',
            city: '',
            category: '',
            spotType: '',
            amenity: '',
            guests: 0,
            type: '',
            
        })
        setUserWantToFilter(false)
    }

    /**
     * 
     * @param { boolean } bool 
     */
    const setUserWantToFilterOrNot = (bool) => {
        setUserWantToFilter(bool)
    }

    const fetchCategories = async () => {
        const res = await axios.get(`http://192.168.1.104:5000/api/getCategories`);
        const resData = res.data;
        if (resData.success === true) {
            setCategoryList(resData.category);
            console.log(resData.category)
        } else {
            toast.error("Something went wrong");
        }
    };
    const fetchAmenities = async () => {
        const res = await axios.get(`http://192.168.1.104:5000/api/getAmenities`);
        const resData = res.data;
        if (resData.success === true) {
            setAmenityList(resData.amenities);
        } else {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        fetchAmenities()
        fetchCategories()
    }, [])

    useEffect(() => {
        queryString(filters)
        console.log(filters)
    }, [filters])

    return (
        <SearchContext.Provider value={{ filters, addFilter, removeFilter, query, userWantToFilter, setUserWantToFilterOrNot, reset, categoryList, amenityList, showFilters, hideFilters }}>
            {children}
        </SearchContext.Provider>
    )
}

export default searchProvider