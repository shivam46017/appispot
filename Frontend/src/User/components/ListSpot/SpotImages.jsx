import React from "react";
import { Grid } from "@mui/material";

function SpotImages({ setFormValues, formValues, handleSpotRuleChange }) {


  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <div className={"flex flex-col space-y-2"}>
          <span>Any Identity Proof Document:</span>
          {/* <div className={"flex flex-row justify-between text-base"}> */}
          <label
            htmlFor="file"
            className="relative flex-col justify-center text-center items-center h-40 p-5 rounded-lg border-dashed border-2 border-light-blue-100 duration-200 ease-in-out cursor-pointer gap-5 transition-all bg-light-blue"
          >
            <span className="hidden sm:block text-lg font-bold text-gray-800 text-center duration-200 ease-in-out">
              Drag & Drop Doc Here
            </span>
            <span>or</span>
            <br />
            <input
              type="file"
              id="file"
              name="upload"
              accept="image/*"
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  coverImage: e.target.files[0],
                });
              }}
              onDrag={(e) => {
                setFormValues({
                  ...formValues,
                  coverImage: e.target.files[0],
                });
              }}
              onDragOver={(e) => {
                setFormValues({
                  ...formValues,
                  coverImage: e.target.files[0],
                });
              }}
              className={
                "drop-shadow-md rounded-md border-none px-20 self-center"
              }
            />
          </label>
          {/* </div> */}
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={"flex flex-col space-y-2"}>
          <span>Upload images of the spot:</span>
          {/* <div className={"flex flex-row justify-between text-base"}> */}
          <label
            htmlFor="file"
            className="relative flex-col justify-center text-center items-center h-40 p-5 rounded-lg border-dashed border-2 border-light-blue-100 duration-200 ease-in-out cursor-pointer gap-5 transition-all bg-light-blue"
          >
            <span className="hidden sm:block text-lg font-bold text-gray-800 text-center duration-200 ease-in-out">
              Drag & Drop the Images here
            </span>
            <span>or</span>
            <br />
            <input
              type="file"
              id="file"
              name="upload"
              accept="image/*"
              multiple
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  spotImages: e.target.files,
                });
              }}
              onDrag={(e) => {
                setFormValues({
                  ...formValues,
                  spotImages: e.target.files,
                });
              }}
              onDragOver={(e) => {
                setFormValues({
                  ...formValues,
                  spotImages: e.target.files,
                });
              }}
              className={
                "drop-shadow-md rounded-md border-none px-20 self-center"
              }
            />
          </label>
          {/* </div> */}
          <span className={"text-red-400 text-left"}>
            *upto 15 images (2-mb max & jpg/png/jpeg)
          </span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <label htmlFor="spot-type-select">Spot Rules</label>
      </Grid>
      {
        formValues.SpotRules.map((item, index) => (
          <Grid item xs={12}>
            <div key={index} className={"flex flex-row space-x-2 w-full"}>
              <input
                type="text"
                value={item}
                className={"focus:border-none border-none mr-1 p-3 drop-shadow-md rounded-md w-full "}
                onChange={(e) => handleSpotRuleChange(e, index)}
                placeholder={`Spot rule #${index + 1}`}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-5 h-5 mt-2 -ml-2 cursor-pointer"
                onClick={() => {
                  setFormValues({
                    ...formValues,
                    SpotRules: formValues.SpotRules.filter((_, i) => i !== index),
                  });
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </Grid>
        ))}
      {/* <input type="text" placeholder={"Spot rules"}
                                   className={"drop-shadow-md rounded-xl border-0"} required   onChange={handleChange} name='spotRule'/> */}
      <Grid item xs={12}>
        <span
          className="text-blue-600 text-sm cursor-pointer inline-flex"
          onClick={() => {
            setFormValues({
              ...formValues,
              SpotRules: [...formValues.SpotRules, ""],
            });
          }}
        >
          Add a Rule +
        </span>
      </Grid>
    </Grid>
  );
}

export default SpotImages;
