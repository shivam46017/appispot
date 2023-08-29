import { Grid } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import React from "react";

function SpotIntro({ formValues, setFormValues, handleChange }) {
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <input
          type="text"
          placeholder={"Name"}
          className={" w-full h-full drop-shadow-md p-4 rounded-xl border-0"}
          defaultValue={formValues.Name}
          onChange={handleChange}
          name="Name"
        />
      </Grid>
      <Grid item xs={6}>
        <input
          type="number"
          placeholder={"Spot Price /per hour"}
          className={"w-full drop-shadow-md p-4 rounded-xl border-0"}
          defaultValue={formValues.Price}
          onChange={handleChange}
          name="Price"
        />
      </Grid>
      <Grid item xs={6}>
        <input
          type="text"
          placeholder={"Spot Size Sq/Ft"}
          className={"w-full drop-shadow-md p-4 rounded-xl border-0"}
          defaultValue={formValues.Price}
          onChange={handleChange}
          name="spot-size"
        />
      </Grid>
      <Grid item xs={6}>
        <input
          type="text"
          placeholder={"Spot Size Sq/Ft"}
          className={"w-full drop-shadow-md p-4 rounded-xl border-0"}
          defaultValue={formValues.Price}
          onChange={handleChange}
          name="spot-size"
        />
      </Grid>
      <Grid item xs={12}>
        <select placeholder="Please choose an option --" className={"w-full drop-shadow-md p-4 rounded-xl border-0"} name="" id="">
          <option value="">something</option>
        </select>
      </Grid>
      <Grid item xs={12}>
        <textarea
          placeholder={"Description"}
          className={" w-full h-full drop-shadow-md p-4 rounded-xl border-0"}
          defaultValue={formValues.Description}
          onChange={handleChange}
          name="Description"
          rows={7}
        />
      </Grid>
      <Grid item xs={12}>
        <span className="w-full font-bold text-xl">What are your Regular Timings?</span>
      </Grid>
      <Grid item xs={12} display="flex" flexDirection={'column'} gap={2} padding={2}>
        {Object.keys(formValues.Timing).map((day, index) => {
          return (
            <div
              key={index}
              className="flex flex-row justify-end text-center w-full"
            >
              <span className="mx-5 grow text-left font-semibold">{day}</span>
              <TimePicker label={'Opening Time'} viewRenderers={{ minutes: () => { return } }} minutesStep={60} views={['hours']} onChange={(e) => {
                setFormValues({
                  ...formValues,
                  Timing: {
                    ...formValues.Timing,
                    [day]: {
                      ...formValues.Timing[day],
                      open: e,
                    },
                  },
                })
              }}
                formatDensity="spacious"
                closeOnSelect
                className="!bg-light-blue !rounded-xl"
              />
              <div className={"flex-grow-0 mx-5 h-full flex items-center"}><hr className="border-2 w-3 border-light-blue-100" /></div>
              <TimePicker
                label={'Closing Time'}
                viewRenderers={{ minutes: () => { return } }}
                minutesStep={60} views={['hours']}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    Timing: {
                      ...formValues.Timing,
                      [day]: {
                        ...formValues.Timing[day],
                        close: e,
                      },
                    },
                  })
                }}
                className="!bg-light-blue !rounded-xl"
                formatDensity="spacious"
                closeOnSelect
              />
            </div>
          );
        })}
      </Grid>
    </Grid>

  );
}

export default SpotIntro;