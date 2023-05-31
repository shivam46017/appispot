import React from "react";

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
    <>
      <input
        type="number"
        placeholder={"Spot size Sq/Ft"}
        className={"drop-shadow-md rounded-xl border-0"}
        required
        defaultValue={formValues.SqFt}
        onChange={handleChange}
        name="SqFt"
      />
      <input
        type="number"
        placeholder={"How many guests do you recommend"}
        className={"drop-shadow-md rounded-xl border-0"}
        required
        defaultValue={formValues.MinGuests}
        onChange={handleChange}
        name="MinGuests"
      />
      <span>What are the events your spot would be a great fit for?</span>
      <ul className={"grid grid-cols-2 sm:grid-cols-3 grid-flow-row gap-4"}>
        {categories.map((item) => (
          <li key={item.id} className={"flex flex-row space-x-2"}>
            <input
              type="checkbox"
              value={item.id}
              className={"mr-2 p-2 drop-shadow-md rounded-md"}
              checked={item.isChecked}
              onChange={() => handleCheckboxChange("categories", item.id)}
            />
            <img src={item.icon} alt={"icon"} width={20} height={20} />
            <label>{item.categoryName}</label>
          </li>
        ))}
      </ul>
      <span>What do you provide?</span>
      <ul className={"grid grid-cols-2 sm:grid-cols-3 grid-flow-row gap-4"}>
        {amenities.map((item) => (
          <li key={item.id} className={"flex flex-row space-x-2"}>
            <input
              type="checkbox"
              value={item.id}
              className={"mr-2 p-2 drop-shadow-md rounded-md"}
              checked={item.isChecked}
              onChange={() => handleCheckboxChange("amenities", item.id)}
            />
            <img src={item.icon} alt={"icon"} width={20} height={20} />
            <label>{item.amenityName}</label>
          </li>
        ))}
      </ul>
      <span className={"ml-auto text-blue-600 text-sm"}>
        *add multiple amenities for better reach
      </span>
      {/* <input type="text" placeholder={"Location"}
                                   className={"drop-shadow-md rounded-xl border-0"} required/> */}
      <input
        type="text"
        name="location"
        list="cities"
        id=""
        placeholder={"Location"}
        className={"drop-shadow-md rounded-xl border-0"}
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
    </>
  );
}

export default SpotDetails;
