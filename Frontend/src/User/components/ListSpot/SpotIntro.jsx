import { TimePicker } from "@mui/x-date-pickers";
import React from "react";

function SpotIntro({ formValues, setFormValues, handleChange}) {
  return (
    <>
      <input
        type="text"
        placeholder={"Name"}
        className={"drop-shadow-md rounded-xl border-0"}
        defaultValue={formValues.Name}
        onChange={handleChange}
        name="Name"
      />
      <textarea
        placeholder={"Description"}
        className={"drop-shadow-md rounded-xl border-0"}
        defaultValue={formValues.Description}
        onChange={handleChange}
        name="Description"
      />
      <input
        type="number"
        placeholder={"Spot Price /per hour"}
        className={"drop-shadow-md rounded-xl border-0"}
        defaultValue={formValues.Price}
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
            {/* <input
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
            /> */}
            <TimePicker label={'Opening Time'} viewRenderers={{minutes: ()=>{return}}} minutesStep={60} views={['hours']}  onChange={(e)=>{setFormValues({
                  ...formValues,
                  Timing: {
                    ...formValues.Timing,
                    [day]: {
                      ...formValues.Timing[day],
                      open: e,
                    },
                  },
                })}} formatDensity="spacious" closeOnSelect  className={"rounded-xl max-w-52 !mb-4 h-10 px-3 py-2 border border-gray-300 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-transparent"} />
            <span className={"flex-grow-0 mx-5"}>to</span>
            {/* <input
              type="time"
              placeholder={"hh:mm"}
              defaultValue={formValues.Timing[day].close}
              className={"drop-shadow-md rounded-xl border-0 px-6"}
              
              onChange={() => {
                return 0;
              }}
              name="Timing"
            /> */}
            <TimePicker
              label={'Closing Time'}
              viewRenderers={{minutes: ()=>{return}}}
              minutesStep={60} views={['hours']}
              onChange={(e)=>{setFormValues({
                  ...formValues,
                  Timing: {
                    ...formValues.Timing,
                    [day]: {
                      ...formValues.Timing[day],
                      close: e,
                    },
                  },
                })}}
              formatDensity="spacious"
              closeOnSelect
              className={"rounded-xl max-w-52 !mb-4 h-10 px-3 py-2 border border-gray-300 placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-transparent"} />
          </div>
        );
      })}
    </>
  );
}

export default SpotIntro;
