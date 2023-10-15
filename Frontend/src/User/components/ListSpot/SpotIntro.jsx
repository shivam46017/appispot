import { Grid } from "@mui/material";
import { TimePicker } from '@mui/x-date-pickers'
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { createPopper } from '@popperjs/core'
import { Checkbox } from "@mui/material";

function SpotIntro({ formValues, setFormValues, handleChange, triggerValidation }) {

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
          type="number"
          placeholder={"Spot Size Sq/Ft"}
          className={"w-full drop-shadow-md p-4 rounded-xl border-0"}
          defaultValue={formValues.SqFt}
          onChange={handleChange}
          name="SqFt"
        />
      </Grid>
      <Grid item xs={6}>
        <input
          type="number"
          placeholder={"How many guests do you recommend?"}
          className={"w-full drop-shadow-md p-4 rounded-xl border-0"}
          defaultValue={formValues.guests}
          onChange={handleChange}
          name="guests"
        />
      </Grid>
      <Grid item xs={12} display={'flex'} flexDirection={'column'} gap={2}>
        <label htmlFor="spot-type" className="text-lg font-bold">Select Spot Type</label>
        <select placeholder="" value={formValues.type} onChange={(e) => setFormValues({ ...formValues, type: e.target.value })} className={"w-full drop-shadow-md p-4 rounded-xl border-0"} name="" id="spot-type">
          <option value="">Please choose an option --</option>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
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
              <TimePicker { ...( formValues.Timing[day].holiday && { disabled: true }) } value={formValues.Timing[day].open === 'hh:mm' ? null : formValues.Timing[day].open} label={'Opening Time'} viewRenderers={{ minutes: () => { return } }} minutesStep={60} views={['hours']} onChange={(e) => {
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
              { ...( formValues.Timing[day].holiday && { disabled: true }) }
              value={formValues.Timing[day].close === 'hh:mm' ? null : formValues.Timing[day].close}
                label={'Closing Time'}
                viewRenderers={{ minutes: () => { return } }}
                minutesStep={60} views={['hours']}
                onChange={(value) => {
                  setFormValues({
                    ...formValues,
                    Timing: {
                      ...formValues.Timing,
                      [day]: {
                        ...formValues.Timing[day],
                        close: value,
                      },
                    },
                  })
                }}
                className="!bg-light-blue !rounded-xl"
                formatDensity="spacious"
                closeOnSelect
              />
              <div className="flex items-center mx-4 px-4 gap-2 rounded-xl h-full bg-light-blue">
                <span>Holiday</span>
                <Checkbox sx={{ padding: 0 }} checked={formValues.Timing[day].holiday} onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    Timing: {
                      ...formValues.Timing,
                      [day]: {
                        ...formValues.Timing[day],
                        holiday: e.target.checked
                      }
                    }
                  })
                }}/>
              </div>
            </div>
          );
        })}
      </Grid>
    </Grid>

  );
}

export default SpotIntro;