import React, { useState, useEffect } from "react";
import axios from "axios";
import useMultistepForm from "../../../Hook/useMultistepForm";
import SpotIntro from "./SpotIntro";
import SpotImages from "./SpotImages";
import SpotDetails from "./SpotDetails";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid } from "@mui/material";
import "./utils.css";

function SpotForm() {
  const [files, setFiles] = useState(null);
  const [formValues, setFormValues] = useState({
    Name: "",
    Description: "",
    type: "",
    Price: "",
    Timing: {
      Sunday: {
        open: "hh:mm",
        close: "hh:mm",
        holiday: false,
      },
      Monday: {
        open: "hh:mm",
        close: "hh:mm",
        holiday: false,
      },
      Tuesday: {
        open: "hh:mm",
        close: "hh:mm",
        holiday: false,
      },
      Wednesday: {
        open: "hh:mm",
        close: "hh:mm",
        holiday: false,
      },
      Thursday: {
        open: "hh:mm",
        close: "hh:mm",
        holiday: false,
      },
      Friday: {
        open: "hh:mm",
        close: "hh:mm",
        holiday: false,
      },
      Saturday: {
        open: "hh:mm",
        close: "hh:mm",
        holiday: false,
      },
    },
    SqFt: "",
    guests: "",
    Categories: [],
    Amenities: [],
    Location: {
      latitude: 0,
      longitude: 0,
      display_name: "",
      zipcode: null,
      roadName: "",
      city: "",
      state: "Connecticut",
      country: "US",
      address: "",
    },
    docs: files ? files : [],
    spotImages: files ? files : [],
    SpotRules: [""],
    CancelPolicy: "",
    lister: localStorage.getItem("userId"),
  });
  const [validateSteps, setValidatesSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
  });

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
  const MAX_NUM_FILES = 15;

  const [cities, setcities] = useState([]);

  const positionStackAPIKey = "b2b97ee9bcee7c4a1e69ce8b98b37b34";

  const location = useLocation();

  useEffect(() => {
    console.log("Printing...");
    console.log(location.state);

    if (location.state) {
      console.log("CHANGING");
      setFormValues({
        ...formValues,
        Name: location.state.Name,
        Description: location.state.Description,
        Price: location.state.Price,
        Timing: location.state.Timing,
        SqFt: location.state.SqFt,
        guests: location.state?.guests,
        Categories: location.state?.Categories,
        Amenities: location.state?.Amenities,
        Location: location.state.Location,
        docs: location.state?.docs,
        spotImages: location.state?.spotImages,
        SpotRules: location.state?.Rules,
        CancelPolicy: location.state?.CancelPolicy,
        lister: location.state?.lister,
      });
    }

    async function fetchCities() {
      const options = {
        method: "GET",
        url: "https://referential.p.rapidapi.com/v1/city",
        params: {
          fields: "iso_a2,state_code,state_hasc,timezone,timezone_offset",
          lang: "en",
          limit: "250",
        },
        headers: {
          "X-RapidAPI-Key":
            "288d4fa6f1msh340b04a3ab0076ap1d923bjsn6b1789362fe1",
          "X-RapidAPI-Host": "referential.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      console.log(response.data);
      setcities(response.data);
    }
    // fetchCities()
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      async function getLocationDetails() {
        const options = {
          method: "GET",
          url: "http://api.positionstack.com/v1/reverse",
          params: {
            access_key: positionStackAPIKey,
            query: `${position.coords.latitude},${position.coords.longitude}`,
            limit: "1",
          },
        };
        const response = await axios.request(options);
        console.log({ locationDetails: response.data });
      }
      getLocationDetails();
    });
  }, []);

  const handleLocationChange = (latlng) => {
    setFormValues({
      ...formValues,
      Location: {
        ...formValues.Location,
        ["latitude"]: latlng.lat,
        ["longitude"]: latlng.lng,
      },
    });
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const fileList = Array.from(selectedFiles);

    if (fileList.length > MAX_NUM_FILES) {
      alert(`You can only upload up to ${MAX_NUM_FILES} files`);
      return;
    }

    const invalidFiles = fileList.filter((file) => file.size > MAX_FILE_SIZE);
    if (invalidFiles.length > 0) {
      const invalidFileNames = invalidFiles.map((file) => file.name).join(", ");
      alert(
        `The following files exceed the maximum size of 2MB: ${invalidFileNames}`
      );
      return;
    }
    setFiles(selectedFiles);
  };

  const [categories, setcategories] = useState([]);

  const [amenities, setamenities] = useState([]);

  const fetchCategories = async () => {
    const res = await axios.get(`/api/getCategories`);
    const resData = res.data;
    if (resData.success === true) {
      setcategories(resData.category);
    } else {
      toast.error("Something went wrong");
    }
  };
  const fetchAmenities = async () => {
    const res = await axios.get(`/api/getAmenities`);
    const resData = res.data;
    if (resData.success === true) {
      setamenities(resData.amenities);
    } else {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    Promise.all([fetchCategories(), fetchAmenities()]);
  }, []);

  const handleCheckboxChange = (categoryName, id) => {
    switch (categoryName) {
      case "categories":
        if (formValues.Categories.includes(id)) {
          setFormValues({
            ...formValues,
            Categories: formValues.Categories.filter((value) => value !== id),
          });
          return;
        } else {
          setFormValues({
            ...formValues,
            Categories: [...formValues.Categories, id],
          });
        }
        break;

      case "amenities":
        if (formValues.Amenities.includes(id)) {
          setFormValues((prev) => {
            return {
              ...formValues,
              Amenities: prev.Amenities.filter((value) => value !== id),
            };
          });
        } else {
          setFormValues({
            ...formValues,
            Amenities: [...formValues.Amenities, id],
          });
        }
        break;

      default:
        console.log("error");
        break;
    }
  };

  const handleSpotRuleChange = (event, index) => {
    let newSpotRules = [...formValues.SpotRules];
    newSpotRules[index] = event.target.value;

    setFormValues({
      ...formValues,
      SpotRules: newSpotRules,
    });
  };

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleAddressChange = (event) => {
    setFormValues({
      ...formValues,
      ["Location"]: {
        ...formValues.Location,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const form = new FormData();
      form.append("Name", formValues.Name);
      form.append("Description", formValues.Description);
      form.append("type", formValues.type);
      form.append("Price", Number(formValues.Price));
      form.append("Categories", JSON.stringify(formValues.Categories));
      form.append("Amenities", JSON.stringify(formValues.Amenities));
      form.append("SpotRules", JSON.stringify(formValues.SpotRules));
      form.append("Location", JSON.stringify(formValues.Location));
      form.append("Timing", JSON.stringify(formValues.Timing));
      form.append("SqFt", Number(formValues.SqFt));
      form.append("guests", Number(formValues.guests));
      for (let i = 0; i < formValues.spotImages.length; i++) {
        form.append("spotImages", formValues.spotImages[i]);
      }
      for (let i = 0; i < formValues.docs.length; i++) {
        form.append("docImages", formValues.docs[i])
      }
      form.append("CancelPolicy", formValues.CancelPolicy);
      form.append("lister", localStorage.getItem("userId") || "");
      const res = await axios.post(
        `/api/createspot/${
          localStorage.getItem("userId") || ""
        }`,
        form
      );
      const data = res.data;
      console.log(data);
      toast.success("Congrats your Spot is Added");
    } catch (err) {
      console.log(err);
    }
  };

  const validate = [
    () => {
      if (formValues.Name === "" || !formValues.Name) {
        toast.info("Fill the name");
        return false;
      }

      if (formValues.Price <= 0 || !formValues.Price) {
        toast.info("Check the value you entered for price");
        return false;
      }

      if (formValues.SqFt <= 0 || !formValues.SqFt) {
        toast.info("Check the value you entered for area size of your spot");
        return false;
      }

      if (formValues.guests <= 0 || !formValues.guests) {
        toast.info("Check the guest value you entered");
        return false;
      }

      if (formValues.type === "" || !formValues.type) {
        toast.info("Please select a type of your spot");
        return false;
      }

      if (formValues.Description === "" || !formValues.Description) {
        toast.info("pls fill description");
        return false;
      }

      for (const key in formValues.Timing) {
        for (const time in formValues.Timing[key]) {
          if (
            formValues.Timing[key][time] === "hh:mm" &&
            !formValues.Timing[key]["holiday"]
          ) {
            toast.info(
              `pls fill the ${key}'s ${
                time === "open" ? "opening" : "closing"
              } time`
            );
            return false;
          }
        }
      }

      return true;
    },
    () => {
      if (formValues.Amenities.length <= 0) {
        toast.info("Pls select minimum 3 amenities");
        return false;
      }

      if (
        formValues.Location.address === "" ||
        formValues.Location.city === "" ||
        formValues.Location.roadName === "" ||
        !formValues.Location.zipcode
      ) {
        toast.info(
          "Fill custom address every value because everything is mandatory to fill"
        );
        return false;
      }

      if (
        formValues.Location.latitude === 0 ||
        formValues.Location.longitude === 0
      ) {
        toast.info(
          "pls pin down your location in map for better accessibility"
        );
        return false;
      }

      return true;
    },
    () => {
      if (!formValues.docs || formValues.docs.length === 0) {
        toast.info("pls upload cover image");
        return false;
      }

      if (formValues.spotImages.length === 0) {
        toast.info("pls upload the spot images");
        return false;
      }

      if (formValues.SpotRules.length === 0) {
        toast.info("please you have to add 1 rule for a spot");
        return false;
      }

      return true;
    },
  ];

  const {
    steps,
    currentStep,
    currentStepIndex,
    next,
    back,
    isFirstIndex,
    isLastIndex,
  } = useMultistepForm([
    <SpotIntro
      formValues={formValues}
      setFormValues={setFormValues}
      handleChange={handleChange}
    />,
    <SpotDetails
      handleChange={handleChange}
      handleCheckboxChange={handleCheckboxChange}
      categories={categories ? categories : []}
      amenities={amenities ? amenities : []}
      cities={cities}
      handleLocationChange={handleLocationChange}
      handleAddressChange={handleAddressChange}
      formValues={formValues}
      setFormValues={setFormValues}
    />,
    <SpotImages
      formValues={formValues}
      setFormValues={setFormValues}
      handleChange={handleChange}
      handleSpotRuleChange={handleSpotRuleChange}
    />,
  ]);
  return (
    <form className="container" onSubmit={handleSubmit}>
      <Grid
        container
        marginTop={12}
        padding={12}
        rowSpacing={3}
        columnSpacing={3}
      >
        <Grid item xs={12}>
          <h1 className="font-semibold text-3xl text-center">LIST YOUR SPOT</h1>
        </Grid>
        <Grid item xs={12}>
          <hr className="border-light-blue border-2 border-dashed" />
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="center">
          <Link className="w-full flex justify-center" to="/listeradmin">
            <button className="bg-light-blue p-3 rounded-md font-semibold lg:w-1/2">
              Show your listing
            </button>
          </Link>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="center">
          <Link className="w-full flex justify-center" to="/listeradmin">
            <button className="bg-light-blue p-3 rounded-md font-semibold lg:w-1/2">
              Show your booking
            </button>
          </Link>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="center">
          <Link className="w-full flex justify-center" to="/listeradmin">
            <button className="bg-light-blue p-3 rounded-md font-semibold lg:w-1/2">
              Show calendar
            </button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <div className="container flex flex-col bg-light-blue-gradient border-light-blue border-2 rounded-3xl p-4">
            {currentStep}
          </div>
        </Grid>
        <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
          <button
            type="button"
            onClick={back}
            disabled={isFirstIndex}
            className="disabled:bg-blue-100 text-black bg-blue-200 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center  items-center mx-1"
          >
            Back
          </button>
          {!isLastIndex && (
            <button
              type="button"
              onClick={() => {
                let func = validate[currentStepIndex];
                if (func()) {
                  next();
                } else null;
              }}
              className="text-black bg-blue-200 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center  items-center mx-1"
            >
              Next
            </button>
          )}
          {isLastIndex && (
            <button
              type="submit"
              onClick={(e) => {
                validate[currentStepIndex]()
                  ? handleSubmit(e)
                  : validate[currentStepIndex]();
              }}
              className="text-black bg-blue-200 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center  items-center mx-1"
            >
              Submit
            </button>
          )}
        </Grid>
      </Grid>
    </form>
  );
}

export default SpotForm;
