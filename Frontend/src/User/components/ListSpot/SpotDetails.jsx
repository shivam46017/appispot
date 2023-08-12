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
          <li key={item._id} className={"w-full h-full"}>
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
              <li key={item._id} className={"flex flex-col gap-3 items-center justify-between bg-[#e4e4e4] rounded-md my-2 px-3 py-7 pb-6 hover:bg-slate-300 duration-100"}>
                <img src={`http://localhost:5000${item.categoryIcon}`} alt={"icon"} width={25} height={25} />
                <label>
                    {item.categoryName}
                </label>
              </li>
            </label>
          </li>
        ))}
      </ul>
      <span>What do you provide?</span>
      <ul className={"grid grid-cols-2 sm:grid-cols-3 grid-flow-row gap-4"}>
        {amenities.map((item) => (
          <li key={item._id} className={"w-full h-full"}>
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
              <li key={item._id} className={"flex flex-col gap-3 items-center checked:bg-blue-300 justify-between bg-[#e4e4e4] rounded-md my-2 px-3 py-7 pb-6 hover:bg-slate-300 duration-100"}>
                <img src={`http://localhost:5000${item.amenityIcon}`} alt={"icon"} width={25} height={25} />
                <label>
                    {item.amenityName}
                </label>
              </li>
            </label>
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
