import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../Home/Banner";
import axios from "axios";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { maxHeight } from "@mui/system";
import Slider from "react-slick";
import { Grid } from "@mui/material";
import Rating from "@mui/material/Rating";

function Cards(props) {
  console.log({ spots: props });
  const [slides, setSlides] = useState([]);
  const [size, setSize] = useState('xs')

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/get-allbanner"
        );
        setSlides(response.data.banner);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    console.log(slides);
  }, [slides]);

  useEffect(() => {
    console.log(props);
  }, [props]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    console.log(slides[currentIndex].coverImage);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  const detailFirstRowBackgroundStyle = {
    marginTop: "auto",
    borderRadius: "15px",
    display: "flex",
    padding: "8px",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "stretch",
    justifyContent: "space-evenly",
    alignItems: "center",
  };

  const calculateReview = () => {
    console.log((50 / 100) * 5);
    return (props.reviews.length / 10) * 5;
  };

  window.onresize = () => {
    
  }

  return (
    <>
      <Link to={`/spot/${props._id}`}>
        <Grid container>
          <Grid xs={4} className="flex justify-center">
            <Slider
              dots={false}
              autoplay={true}
              autoplaySpeed={4000}
              slidesToScroll={1}
              slidesToShow={1}
              className="!min-w-full !max-w-full"
            >
              {props.Images.map((data) => (
                <img src={`https://appispot.com${data}`} alt="" srcset="" className="rounded-2xl !min-w-full object-cover"/>
              ))}
            </Slider>
          </Grid>
          <Grid xs={8}>
            <Grid container paddingLeft={3} gap={3}>
              <Grid
                xs={12}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <div>
                  <h1 className="text-2xl font-extrabold">
                    ${props.Price ? props.Price : ""}
                    <span className="text-base ml-1 text-gray-500 font-light ">
                      <span className="line-through">
                        ${props.Price ? props.Price * 8 : ""}
                      </span>
                      <span style={{ color: "black" }}> / hour</span>
                    </span>
                  </h1>
                </div>
                <div>
                  <span className="text-blue-500 font-bold">
                    Request to book
                  </span>
                </div>
              </Grid>
              <Grid xs={12} display={"flex"} justifyContent={"start"}>
                <div className="flex flex-col space-y-2">
                  <h1 className="text-xl font-bold">Preferred use For</h1>
                  <div className="flex space-x-2">
                    {props.Amenities ? (
                      props.Amenities.slice(0, 3).map((amenity, index) => {
                        return (
                          <div
                            key={index}
                            className="bg-gray-100 shadow-sm rounded-lg flex flex-col gap-2 items-start px-3 py-2 w-fit"
                          >
                            <img
                              src={`http://localhost:5000${amenity.amenityIcon}`}
                              alt=""
                              width={20}
                            />
                            {amenity.amenityName}
                          </div>
                        );
                      })
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </Grid>
              <Grid xs={12} display={"flex"} justifyContent={"start"}>
                <div className="flex flex-col space-y-2">
                  <h1 className="text-xl font-bold">Preferred use For</h1>
                  <div className="flex space-x-2">
                    {props.Categories ? (
                      props.Categories.slice(0, 3).map((category, index) => {
                        return (
                          <div
                            key={index}
                            className="p-1 bg-gray-100 shadow-sm rounded-lg flex flex-col gap-2 items-center px-3 py-2 w-fit"
                          >
                            <img
                              src={`http://localhost:5000${category.categoryIcon}`}
                              alt=""
                              width={20}
                            />
                            {category.categoryName}
                          </div>
                        );
                      })
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </Grid>
              <Grid xs={12}>
                <span className="font-bold">Sqft {props.SqFt}</span>
              </Grid>
              <Grid
                xs={12}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-bold">Experience</span>{" "}
                  <Rating name="read-only" value={calculateReview()} readOnly />
                </div>
                <div>
                  <span className="font-bold">Max Guests {props.guests}</span>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    </>
  );
}

export default Cards;
