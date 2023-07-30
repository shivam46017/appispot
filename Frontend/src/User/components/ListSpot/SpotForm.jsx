import React, { useState, useEffect } from "react";
import axios from "axios";
import useMultistepForm from "../../../Hook/useMultistepForm";
import SpotIntro from "./SpotIntro";
import SpotImages from "./SpotImages";
import SpotDetails from "./SpotDetails";
import { Link, useLocation } from "react-router-dom";

function SpotForm() {
  const [files, setFiles] = useState(null);
  const [formValues, setFormValues] = useState({
    Name: "",
    Description: "",
    Price: "",
    Timing: {
      Sunday: {
        open: "hh:mm",
        close: "hh:mm",
      },
      Monday: {
        open: "hh:mm",
        close: "hh:mm",
      },
      Tuesday: {
        open: "hh:mm",
        close: "hh:mm",
      },
      Wednesday: {
        open: "hh:mm",
        close: "hh:mm",
      },
      Thursday: {
        open: "hh",
        close: "hh:mm",
      },
      Friday: {
        open: "hh:mm",
        close: "hh:mm",
      },
      Saturday: {
        open: "hh:mm",
        close: "hh:mm",
      },
    },
    SqFt: "",
    MinGuests: "",
    Categories: [],
    Amenities: [],
    Location: "",
    coverImage: files ? files[0] : null,
    spotImages: files ? files : [],
    SpotRules: [""],
    CancelPolicy: "",
    lister: localStorage.getItem("userId"),
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
        MinGuests: location.state?.MinGuests,
        Categories: location.state?.Categories,
        Amenities: location.state?.Amenities,
        Location: location.state.Location,
        coverImage: location.state?.coverImage,
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
    async function getAmmeenitiesAndCategories() {
      const response1 = await axios.get(
        "http://localhost:5000/api/v1/amenities"
      );
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
        console.log(response.data);
      }
      getLocationDetails();
    });
  }, []);

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setFormValues({
      ...formValues,
      Location: selectedCity,
    });
    async function fetchCities(keyword) {
      const options = {
        method: "GET",
        url: "https://referential.p.rapidapi.com/v1/city",
        params: {
          fields: "iso_a2,state_code,state_hasc,timezone,timezone_offset",
          lang: "en",
          name: keyword,
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
    fetchCities(selectedCity);
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

  const [categories, setcategories] = useState([
    {
      id: 1,
      categoryName: "Barbeque",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Barbeque.svg",
    },
    {
      id: 2,
      categoryName: "Picnic",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/PIcnic.svg",
    },
    {
      id: 3,
      categoryName: "Wedding",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Wedding.svg",
    },
    {
      id: 4,
      categoryName: "Wedding Reception",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/wedding Reception.svg",
    },
    {
      id: 5,
      categoryName: "Party",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Party.svg",
    },
    {
      id: 6,
      categoryName: "Graduation Party",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Graduation Party.svg",
    },
    {
      id: 7,
      categoryName: "Baby Shower",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Baby Shower.svg",
    },
    {
      id: 8,
      categoryName: "Birthday Party",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Birthday party.svg",
    },
    {
      id: 9,
      categoryName: "Engagement Party",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/engagement Party.svg",
    },
    {
      id: 10,
      categoryName: "OutDoor Dinner",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Outdoror Dinner.svg",
    },
    {
      id: 11,
      categoryName: "Bridal Shower",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Bridal shower.svg",
    },
    {
      id: 12,
      categoryName: "Gyms",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Gym.svg",
    },
    {
      id: 13,
      categoryName: "Gala",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Gala.svg",
    },
    {
      id: 14,
      categoryName: "Gathering",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Gathering.svg",
    },
    {
      id: 15,
      categoryName: "Fundraiser",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Fundraiser.svg",
    },
    {
      id: 16,
      categoryName: "Wellness",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Wllness.svg",
    },
    {
      id: 17,
      categoryName: "Video Shoot",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Videoshoot.svg",
    },
    {
      id: 18,
      categoryName: "Pop-up shops",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Shop.svg",
    },
    {
      id: 19,
      categoryName: "Corporate Party",
      isChecked: false,
      icon: "/Icons/CategoriesIcons/Cortorate party.svg",
    },
  ]);

  const [amenities, setamenities] = useState([
    {
      id: 1,
      amenityName: "Fire Pit",
      isChecked: false,
      icon: "/Icons/AmminitiesIcons/Fire Pit.svg",
    },
    {
      id: 2,
      amenityName: "Deck",
      isChecked: false,
      icon: "/Icons/AmminitiesIcons/Deck.svg",
    },
    {
      id: 3,
      amenityName: "Pool",
      isChecked: false,
      icon: "/Icons/AmminitiesIcons/Pool.svg",
    },
    {
      id: 4,
      amenityName: "Gazeboo",
      isChecked: false,
      icon: "/Icons/AmminitiesIcons/Gazebo.svg",
    },
    {
      id: 5,
      amenityName: "Grill",
      isChecked: false,
      icon: "/Icons/AmminitiesIcons/Grill.svg",
    },
    {
      id: 6,
      amenityName: "Hot Tub",
      isChecked: false,
      icon: "/Icons/AmminitiesIcons/Hot Tub.svg",
    },
    {
      id: 7,
      amenityName: "Restroom",
      isChecked: false,
      icon: "/Icons/AmminitiesIcons/Restroom.svg",
    },
    {
      id: 8,
      amenityName: "Pet Friendly",
      isChecked: false,
      icon: "/Icons/AmminitiesIcons/Pet Friendly.svg",
    },
    {
      id: 9,
      amenityName: "Jacuzzi",
      isChecked: false,
      icon: "/Icons/AmminitiesIcons/Jacuzee.svg",
    },
    {
      id: 10,
      amenityName: "Noise Friendly",
      isChecked: false,
      icon: "/Icons/AmminitiesIcons/Noice Friendly.svg",
    },
    {
      id: 11,
      amenityName: "Wifi",
      isChecked: false,
      icon: "/Icons/AmminitiesIcons/Wifi.svg",
    },
    {
      id: 12,
      amenityName: "Chairs & Tables",
      isChecked: false,
      icon: "/Icons/AmminitiesIcons/Table Chair.svg",
    },
    {
      id: 13,
      amenityName: "Parking",
      isChecked: false,
      icon: "/Icons/AmminitiesIcons/Parking.svg",
    },
    {
      id: 14,
      amenityName: "Tables",
      isChecked: false,
      icon: "/Icons/AmminitiesIcons/Table.svg",
    },
    {
      id: 15,
      amenityName: "Chairs",
      isChecked: false,
      icon: "/Icons/AmminitiesIcons/Chair.svg",
    },
  ]);

  const handleCheckboxChange = (categoryName, id) => {
    let updatedCategory = [];
    switch (categoryName) {
      case "categories":
        updatedCategory = categories.map((item) => {
          if (item.id === id) {
            return { ...item, isChecked: !item.isChecked };
          }
          return item;
        });
        setcategories(updatedCategory);

        const selectedCategory = categories.find((item) => item.id === id);
        if (selectedCategory) {
          setFormValues((prevState) => ({
            ...prevState,
            Categories: [...prevState.Categories, selectedCategory],
          }));
        }
        break;
      case "amenities":
        updatedCategory = amenities.map((item) => {
          if (item.id === id) {
            return { ...item, isChecked: !item.isChecked };
          }
          return item;
        });
        setamenities(updatedCategory);
        const selectedAmenity = amenities.find((item) => item.id === id);
        if (selectedAmenity) {
          setFormValues((prevState) => ({
            ...prevState,
            Amenities: [...prevState.Amenities, selectedAmenity],
          }));
        }
        break;
      default:
        console.log("error");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const categoryChecked = categories.filter((obj) => obj.isChecked).length;
    const amenityChecked = amenities.filter((obj) => obj.isChecked).length;
    if (categoryChecked === 0) {
      alert("please select at least one category");
    } else if (amenityChecked === 0) {
      alert("please select at least one amenities");
    } else {
      const form = new FormData();
      form.append("Name", formValues.Name);
      form.append("Description", formValues.Description);
      form.append("Price", formValues.Price);
      form.append(
        "Categories",
        JSON.stringify(
          categories.filter((obj) => (obj.isChecked ? obj.categoryName : null))
        )
      );
      form.append("Amenities",  JSON.stringify(
        amenities.filter((obj) => (obj.isChecked ? obj.amenityName : null))
      ));
      form.append("SpotRules", formValues.SpotRules);
      form.append("Location", formValues.Location);
      form.append("Timing", JSON.stringify(formValues.Timing));
      form.append("SqFt", formValues.SqFt);
      form.append("MinGuests", formValues.MinGuests);
      form.append("coverImage", formValues.coverImage);
      for (const X of formValues.spotImages) {
        form.append("spotImages", X);
      }
      form.append("CancelPolicy", formValues.CancelPolicy);
      form.append("lister", localStorage.getItem("userId") || "");
      const res = await axios.post(
        `http://localhost:5000/api/createspot/${
          localStorage.getItem("userId") || ""
        }`,
        form
      );
      const data = res.data;
      alert("Congrats your Spot is Added");
    }
  };

  const { steps, currentStep, next, back, isFirstIndex, isLastIndex } =
    useMultistepForm([
      <SpotIntro
        formValues={formValues}
        setFormValues={setFormValues}
        handleChange={handleChange}
      />,
      <SpotDetails
        handleChange={handleChange}
        handleCheckboxChange={handleCheckboxChange}
        categories={categories}
        amenities={amenities}
        cities={cities}
        handleCityChange={handleCityChange}
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
    <div
      className={
        "flex flex-col min-h-screen justify-center items-center mt-[3.5%] mb-[3.5%]"
      }
    >
      <div className={"text-4xl p-3 border-b-4 w-[90%] mb-[1.5%] text-center"}>
        LIST YOUR SPOT
      </div>
      <div
        className={
          "flex flex-col md:flex-row mt-4 md:mt-2 md:space-y-0 space-y-5 lg:space-x-12 md:space-x-8"
        }
      >
        <div className={"flex flex-col space-y-5"}>
          <Link to="/listeradmin">
            <button
              className={
                "p-2 text-black bg-blue-100 drop-shadow-md rounded-xl hover:bg-blue-200 hover:scale-110"
              }
            >
              Show your listing
            </button>
          </Link>
          <button
            className={
              "p-2 text-black bg-blue-100 drop-shadow-md rounded-xl hover:bg-blue-200 hover:scale-110"
            }
          >
            Show Bookings
          </button>
          <button
            className={
              "p-2 text-black bg-blue-100 drop-shadow-md rounded-xl hover:bg-blue-200 hover:scale-110"
            }
          >
            Show Calender
          </button>
        </div>
        <div
          className={"md:hidden drop-shadow-md rounded-xl bg-white p-3 w-fit"}
        >
          Enter details to add new spot:
        </div>
        <div className={"pt-0 min-h-screen"}>
          <form
            className={
              "flex flex-col space-y-5 md:w-[50vh] lg:w-[80vh] border-0 w-[40vh]"
            }
            onSubmit={handleSubmit}
          >
            <div
              className={
                "flex flex-col space-y-5 bg-[#F3F4F6] p-4 md:p-8 drop-shadow-md rounded-xl border-0"
              }
            >
              {currentStep}
            </div>
            <div className="flex justify-between">
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
                  onClick={next}
                  className="text-black bg-blue-200 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center  items-center mx-1"
                >
                  Next
                </button>
              )}
              {isLastIndex && (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="text-black bg-blue-200 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center  items-center mx-1"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SpotForm;
