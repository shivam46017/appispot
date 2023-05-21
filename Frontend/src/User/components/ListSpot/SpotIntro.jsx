import React from "react";

function SpotIntro({ formValues, setFormValues, handleChange}) {
  return (
    <>
      <input
        type="text"
        placeholder={"Name"}
        className={"drop-shadow-md rounded-xl border-0"}
        
        onChange={handleChange}
        name="Name"
      />
      <textarea
        placeholder={"Description"}
        className={"drop-shadow-md rounded-xl border-0"}
        
        onChange={handleChange}
        name="Description"
      />
      <input
        type="number"
        placeholder={"Spot Price /per hour"}
        className={"drop-shadow-md rounded-xl border-0"}
        
        onChange={handleChange}
        name="Price"
      />
      <span className="">What are your Regular Timings?</span>
      {Object.keys(formValues.Timing).map((day, index) => {
        return (
          <div
            key={index}
            className="flex flex-row justify-end text-center w-full"
          >
            <span className="mx-5 grow text-left">{day}</span>
            <input
              type="time"
              placeholder={"hh:mm"}
              defaultValue={formValues.Timing[day].open}
              className={"drop-shadow-md rounded-xl border-0 px-6"}
              
              onChange={(event) => {
                setFormValues({
                  ...formValues,
                  Timing: {
                    ...formValues.Timing,
                    [day]: {
                      ...formValues.Timing[day],
                      open: event.target.value,
                    },
                  },
                });
              }}
              name="Timing"
            />
            <span className={"flex-grow-0 mx-5"}>to</span>
            <input
              type="time"
              placeholder={"hh:mm"}
              defaultValue={formValues.Timing[day].close}
              className={"drop-shadow-md rounded-xl border-0 px-6"}
              
              onChange={() => {
                return 0;
              }}
              name="Timing"
            />
          </div>
        );
      })}
    </>
  );
}

export default SpotIntro;
