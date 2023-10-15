import React, { useReducer } from "react";
import filterContext from "./FilterContext";


const initialState = {
    brand: [],
    size: [],
    gender: [],
  };
  
  function setBrand(state, payload) {
    if (payload.checked) {
      return { ...state, brand: [...state.brand, payload.value] };
    } else {
      const index = state.brand.indexOf(payload.value);
      if (index !== -1) {
        const brand = [...state.brand];
        brand.splice(index, 1);
        return { ...state, brand: brand };
      }
    }
  }
  
  function setGender(state, payload) {
    if (payload.checked) {
      return { ...state, gender: [...state.gender, payload.value] };
    } else {
      const index = state.gender.indexOf(payload.value);
      if (index !== -1) {
        const gender = [...state.gender];
        gender.splice(index, 1);
        return { ...state, gender: gender };
      }
    }
  }
  
  function setSize(state, payload) {
    if (payload.checked) {
      return { ...state, size: [...state.size, payload.value] };
    } else {
      const index = state.size.indexOf(payload.value);
      if (index !== -1) {
        const size = [...state.size];
        size.splice(index, 1);
        return { ...state, size: size };
      }
    }
  }
  
  const filterReducer = (state, action) => {
    switch (action.type) {
      case "brand":
        return setBrand(state, action.payload);
      case "size":
        return setSize(state, action.payload);
      case "gender":
        return setGender(state, action.payload);
      case "clear":
        return initialState;
      default:
        return state;
    }
  };

const FilterState = (props) => {
const [state, dispatch] = useReducer(filterReducer, initialState);

  return <filterContext.Provider value={{ state, dispatch }}>{props.children}</filterContext.Provider>;
};

export default FilterState;
