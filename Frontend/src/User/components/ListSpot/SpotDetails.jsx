import React from "react";
import { Grid } from '@mui/material'

function SpotDetails({
  handleChange,
  handleCheckboxChange,
  categories,
  amenities,
  cities,
  handleCityChange,
  formValues,
  setFormValues,
}) {
  return (
    <Grid container spacing={3} padding={3}>
      <Grid item xs={12}>
        <span className="font-semibold text-xl">What are the events your spot would be a great fit for?</span>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {categories.map((item) => (
            <Grid item xs={4}>
              <div key={item._id} className={"w-full h-full"}>
                <input
                  type="checkbox"
                  value={item._id}
                  className={"mr-2 p-2 drop-shadow-md rounded-md hidden"}
                  checked={item.isChecked}
                  onChange={() => handleCheckboxChange("categories", item._id)}
                  id={item._id}
                />
                {/* <img src={item.icon} alt={"icon"} width={20} height={20} /> */}
                <label htmlFor={item._id} onClick={() => handleCheckboxChange("categories", item._id)}>
                  <div key={item._id} className={"flex flex-col h-56 gap-3 items-center justify-center bg-light-blue rounded-2xl hover:bg-light-blue-100 cursor-pointer duration-100"}>
                    <img src={`http://localhost:5000${item.categoryIcon}`} alt={"icon"} width={25} height={25} />
                    <label>
                      {item.categoryName}
                    </label>
                  </div>
                </label>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <span className="font-semibold text-xl">What do you provide?</span>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {amenities.map((item) => (
            <Grid item xs={4} key={item._id} className={"w-full h-full"}>
              <input
                type="checkbox"
                value={item._id}
                className={"mr-2 p-2 drop-shadow-md rounded-md hidden"}
                checked={item.isChecked}
                onChange={() => handleCheckboxChange("amenities", item._id)}
                id={item._id}
              />
              {/* <img src={item.icon} alt={"icon"} width={20} height={20} /> */}
              <label htmlFor={item._id} className={"w-full h-full"} onClick={() => handleCheckboxChange("amenities", item._id)}>
                <li key={item._id} className={"flex flex-col gap-3 items-center checked:bg-blue-300 justify-center bg-light-blue rounded-2xl h-56 hover:bg-light-blue-100 cursor-pointer duration-100"}>
                  <img src={`http://localhost:5000${item.amenityIcon}`} alt={"icon"} width={25} height={25} />
                  <label>
                    {item.amenityName}
                  </label>
                </li>
              </label>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <span className={"w-full ml-auto text-blue-600 text-sm"}>
          *add multiple amenities for better reach
        </span>
      </Grid>
      {/* <input type="text" placeholder={"Location"}
                                   className={"drop-shadow-md rounded-xl border-0"} required/> */}
      <Grid item xs={12}>
        <input
          type="text"
          name="location"
          list="cities"
          id=""
          placeholder={"Location"}
          className={"drop-shadow-md rounded-xl border-0 w-full"}
          required
          // value={formValues.location}
          defaultValue={formValues.Location}
          onChange={handleCityChange}
          onFocus={() => {
            document.getElementById("cities").style.display = "block";
          }}
          onBlur={() => {
            document.getElementById("cities").style.display = "none";
          }}
        />
        <datalist
          id="cities"
          contentEditable={true}
          itemType="text"
          // onChange={()=>{
          //     setFormValues({ ...formValues, location: document.getElementById("cities").value });
          // }}
          className={"drop-shadow-md rounded-xl border-0 bg-white px-4 py-3"}
        >
          {cities.map((city, index) => {
            return (
              <option
                value={city.value}
                className="my-1 cursor-pointer font-medium"
                key={index}
                onClick={() => {
                  setFormValues({ ...formValues, Location: city.value });
                  // document.getElementById("location-select").style.display = "none"
                  console.log(formValues.Location);
                }}
              >
                {city.value}
              </option>
            );
          })}
        </datalist>
      </Grid>
    </Grid>
  );
}

export default SpotDetails;
