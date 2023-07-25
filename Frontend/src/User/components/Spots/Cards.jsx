import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../Home/Banner";
import axios from "axios";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { maxHeight } from "@mui/system";

function Cards(props) {
  const [slides, setSlides] = useState([]);
  const product = {
    name: "Alpha Party Hall",
    price: "$50/hour",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Spots", href: "#" },
      // { id: 2, name: "Clothing", href: "#" },
    ],
    images: [
      {
        src: "https://th.bing.com/th/id/OIP.utfzQU9LITiZuyPkVHIjqgHaE8?pid=ImgDet&rs=1",
        alt: "Two each of gray, white, and black shirts laying flat.",
      },
      {
        src: "https://www.bookeventz.com/blog/wp-content/uploads/2016/08/720x480xhacienda_bella_terra12.jpg.pagespeed.ic.B3pQjLitnQ.jpg",
        alt: "Model wearing plain black basic tee.",
      },
      {
        src: "https://img.tagvenue.com/resize/61/d7/widen-1680-noupsize;7385-entire-venue-room.jpeg",
        alt: "Model wearing plain gray basic tee.",
      },
      {
        src: "https://th.bing.com/th/id/OIP.w0m7r7mj_dallyp0sFPF0gHaE8?pid=ImgDet&w=1024&h=684&rs=1",
        alt: "Model wearing plain white basic tee.",
      },
    ],
    colors: [
      { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
      { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
      { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    ],
    sizes: [
      { name: "XXS", inStock: false },
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
      { name: "2XL", inStock: true },
      { name: "3XL", inStock: true },
    ],
    description:
      'Whether you\'re planning a grand celebration or an intimate gathering, our venue can accommodate weddings of all sizes. From the moment you step inside, you\'ll be swept away by the beauty and charm of our space, which is designed to make your special day unforgettable.\n' +
      '\n',
    description2:
      'Venue cancellation policies can vary depending on the venue and the terms of the rental agreement. In general, most venues will require a certain amount of notice prior to cancellation in order to receive a refund or avoid additional fees. This notice period may range from a few weeks to several months, depending on the size and complexity of the event. Additionally, some venues may require a non-refundable deposit to hold the date, and this deposit may be forfeited in the event of a cancellation. It',
    amenities: [
      //{ id: 1, label: 'Fire Pit', isChecked: false, icon: "/Icons/CardIcons/Amenities/Fire Pit.png" },
      { id: 2, label: 'Deck', isChecked: false, icon: "/Icons/CardIcons/Amenities/Deck.png" },
      //{ id: 3, label: 'Pool', isChecked: false, icon: "/Icons/CardIcons/Amenities/Pool.png" },
      { id: 4, label: 'Gazeboo', isChecked: false, icon: "/Icons/CardIcons/Amenities/Gazebo.png" },
      //{ id: 5, label: 'Grill', isChecked: false, icon: "/Icons/CardIcons/Amenities/Grill.png" },
      { id: 6, label: 'Hot Tub', isChecked: false, icon: "/Icons/CardIcons/Amenities/Hot Tub.png" },
      //{ id: 7, label: 'Restroom', isChecked: false, icon: "/Icons/CardIcons/Amenities/Restroom.png" },
      { id: 8, label: 'Pet Friendly', isChecked: false, icon: "/Icons/CardIcons/Amenities/Pet Friendly.png" },
      //{ id: 9, label: "Jacuzzi", isChecked: false, icon: "/Icons/CardIcons/Amenities/Jacuzee.png" },
    ],
    timing: [
      { id: 1, label: 'Monday: 9AM - 9PM' },
      { id: 2, label: 'Tuesday: 9AM - 9PM' },
      { id: 3, label: 'Wednesday: 9AM - 9PM' },
      { id: 4, label: 'Thursday: 9AM - 9PM' },
      { id: 5, label: 'Friday: 9AM - 9PM' },
      { id: 6, label: 'Saturday: 9AM - 9PM' },
      { id: 7, label: 'Sunday: 9AM - 9PM' }
    ],
    categories: [
      //{ id: 1, label: 'Barbeque', isChecked: false, icon: "/Icons/CardIcons/BestFor/Barbeque.png" },
      { id: 2, label: 'Picnic', isChecked: false, icon: "/Icons/CardIcons/BestFor/Picnic.png" },
      //{ id: 3, label: 'Wedding', isChecked: false, icon: "/Icons/CardIcons/BestFor/Wedding.png" },
      //{ id: 4, label: 'Wedding Reception', isChecked: false, icon: "/Icons/CardIcons/BestFor/wedding Reception.png" },
      { id: 5, label: 'Party', isChecked: false, icon: "/Icons/CardIcons/BestFor/Party.png" },
      //{ id: 6, label: 'Graduation Party', isChecked: false, icon: "/Icons/CardIcons/BestFor/Graduation Party.png" },
      { id: 7, label: 'Baby Shower', isChecked: false, icon: "/Icons/CardIcons/BestFor/Baby Shower.png" },
      { id: 8, label: 'Birthday Party', isChecked: false, icon: "/Icons/CardIcons/BestFor/Birthday party.png" },
      //{ id: 9, label: 'Engagement Party', isChecked: false, icon: "/Icons/CardIcons/BestFor/engagement Party.png" }
    ],
    rules: [
      { id: 1, label: 'No smoking or vaping allowed inside the venue' },
      { id: 2, label: 'Guests must keep noise levels down after a certain time to avoid disturbing neighbors' },
      {
        id: 3,
        label: 'No outside food or beverages are allowed inside the venue, except for special dietary needs or allergies'
      },
      { id: 4, label: 'Dress code requirements must be followed.' },
      { id: 5, label: 'Guests must respect the property and not damage any furnishings, fixtures or equipment' }
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  };
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
  const detailStyles = {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  };
  const iconBoxHeadingStyle = {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '3px',
    borderBottomRightRadius: '0',
    borderBottomLeftRadius: '0',
    fontSize: '0.8em',
    paddingRight: '10px',
    paddingLeft: '7px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
  }
  const iconContainerStyle = {
    backgroundColor: 'white',
    display: 'flex',
    borderRadius: '0px 15px 15px',
    justifyContent: 'space-around'
  }
  const iconStyle = {
    display: 'flex',
    margin: '5px 10px 5px 5px',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '6px',
    backgroundColor: 'rgb(191, 219, 254)',
    borderRadius: '15px',
  }
  const cardIconStyle = {
    height: '2em',
    width: '2em',
    display: 'inline',
    marginLeft: '15px',
  }
  const iconImageStyle = { height: "3em", width: "3em", padding: '5px' }
  const iconTextStyle = { fontSize: "0.75em", textAlign: "center" }
  const rateIcon = "/Icons/CardIcons/Per Hour.png"
  const guestCapacityIcon = "/Icons/CardIcons/Number of guests.png"
  const areaIcon = "/Icons/CardIcons/Area.png"
  const detailBackgroundStyle = {
    borderRadius: '15px',
    padding: "8px"
  }
  const detailIconStyle = {
    height: '4em',
    width: '4em',
    display: 'inline',
    marginLeft: '15px',
    marginRight: '5px',
    borderRadius: '15px',
    padding: '4px',
  }
  const detailFirstRowBackgroundStyle = {
    marginTop: 'auto',
    borderRadius: '15px',
    display: 'flex',
    padding: '8px',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    justifyContent: 'space-evenly',
    alignItems: 'center'

  }

  return (
    <>
      <Link to={`/spot/${props.objectId}`}>
        <section className="w-full my-5 mx-2 h-auto flex flex-col sm:flex-row  rounded-md p-3 min-h-[605px] sm:min-h-fit mb-[20px] sm:mb-0 "
          style={{
            // minHeight: '333px',
            height: 'fit-content',
            borderRadius: '45px',
            display: 'block',
            padding: '5px',
            paddingTop:'20px',
            borderBottomRightRadius: '0',
            borderBottomLeftRadius: '0',
            borderBottom: 'solid #0000004f 1px',
            margin: 'auto'
          }}>
          {/* IMAGE AND DETAILS */}
          <div
            className="flex flex-col sm:flex-row">
            {/* IMAGE SLIDER */}
            <div className="sm:w-[340px] h-56" style={{ display: "" }}>
              <div className="flex text-white min-w-full w-full h-full relative">
                <div
                  style={{
                    backgroundImage: `url(https://plus.unsplash.com/premium_photo-1686090450592-aca413579d36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)`,
                    borderRadius: '25px',
                    height: "220px",
                    minWidth: "100%",
                    boxShadow: "0 2px 4px 0 rgb(136 144 195 / 40%), 0 5px 15px 0 rgb(37 44 97 / 35%)"
                  }}
                  className="block bg-center bg-cover duration-500 w-[360px] sm:!w-[600px]"
                >

                </div>

                {/* Left Arrow */}
                {/* <div className=" absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full md:p-2  bg-black/20 text-white cursor-pointer">
                  <BsChevronCompactLeft onClick={prevSlide} size={30} />
                </div> */}
                {/* Right Arrow */}
                {/* <div className=" absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full md:p-2  bg-black/20 text-white cursor-pointer">
                  <BsChevronCompactRight onClick={nextSlide} size={30} />
                </div> */}
                <div className="flex top-4 justify-center py-2">
                  {slides.map((slide, slideIndex) => (
                    <div
                      key={slideIndex}
                      onClick={() => goToSlide(slideIndex)}
                      className="text-2xl cursor-pointer"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            {/* DETAILS */}
            <div className="sm:w-2/3 pb-4 px-4 mt-0 sm:mt-0"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '25px',
                height: '240px'
              }}>
              {/* TITLE */}
              <div >
                <h1 className="font-extrabold"
                  style={{
                    fontSize: '2em',
                    padding: '5px',
                    marginBottom: '10px',
                  }}>
                  {props.title ? props.title : ""}</h1>
              </div>
              {/* <h1 className="text-2xl font-extrabold mt-2">{props.title ? props.title : ""}</h1> */}
              {/* <div className="space-x-2 mt-2">
                <span className="font-extrabold text-cyan-50  px-1 rounded-md bg-blue-500">
                  4.5 &#9734;
                </span>
                <span className="font-extralight">(2121 Ratings)</span>
                <span className="font-extralight">Very Good</span>
              </div> */}
              {/* ROW 1 */}
              {/* <div id="areaAndNumberOfGuests" style={{ display: "flex", borderRadius: '15px', justifyContent: 'space-around' }}>

                <span style={detailFirstRowBackgroundStyle}>
                  <span>
                    <img src={areaIcon} alt={"icon"} style={detailIconStyle} />
                  </span>
                  <span style={{ display: 'inline', alignItems: "center", fontSize: '1.15em' }}>1000 sq. feet</span>
                </span>
                <div style={detailFirstRowBackgroundStyle}>

                  <h1 className="text-3xl font-extrabold text-blue-400">
                    <img src={rateIcon} alt={"icon"} style={{
                      height: '2em',
                      width: '2em',
                      display: 'inline',
                      marginLeft: '15px',
                      marginRight: '5px',
                      background: 'rgb(191, 219, 254)',
                      border: 'solid rgb(191, 219, 254)',
                      borderRadius: '15px',
                      padding: '4px',
                    }} />
                    ${props.price ? props.price : ""}
                    <span className="text-base ml-1 text-gray-500 font-light ">
                      <span className="line-through">${props.price ? props.price * 8 : ""}</span>
                      <span style={{ color: 'black' }}> / hour</span>

                    </span>
                  </h1>
                </div>
                <span style={detailFirstRowBackgroundStyle}>
                  <img src={guestCapacityIcon} alt={"icon"} style={{
                    height: '3.5em',
                    width: '3.5em',
                    display: 'inline',
                    marginLeft: '15px',
                    marginRight: '5px',
                    background: 'rgb(191, 219, 254)',
                    border: 'solid rgb(191, 219, 254)',
                    borderRadius: '15px',
                    padding: '4px',
                  }} />
                  <span style={{ display: 'inline', alignItems: "center", fontSize: '1.15em' }}>250 guests</span>
                </span>
              </div> */}
              {/* AMENITIES */}
              {/* <div id="amenities" style={detailStyles}>
                <span id="iconBoxHeading" style={iconBoxHeadingStyle}>Amenities</span>
                <div className="">
                  <ul className={""} style={iconContainerStyle}>
                    {product.amenities.map((item) => (
                      <li key={item.id} className={""} style={iconStyle}>
                        <img src={item.icon} alt={"icon"} style={iconImageStyle} />
                        <label style={iconTextStyle}>
                          {item.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}
              {/* <div className="mt-2 space-x-3 " id="amenities">
                {
                  props.amenities ? props.amenities.map((amenity, index) => {
                    // console.log("AMENITY", amenity)
                     console.log("here", amenity.amenityName)
                    return (
                      <span key={index} className="">{amenity.amenityName}</span>
                    )
                  }) : <span>himanshu</span>
                }
                {/* <span className="font-extralight">Gazebo</span>
            <span className="font-extralight">Restroom</span>
            <span className="font-extralight">Noise Friendy</span>
            <span className="font-extralight">Tables</span>
            <span className="font-extralight">Parking</span> */}
              {/* </div >  */}
              {/* <div id="bestFor" style={detailStyles}>
                <span id="iconBoxHeading" style={iconBoxHeadingStyle}>Best for</span>
                <div className="">
                  <ul className={""} style={iconContainerStyle}>
                    {product.categories.map((item) => (
                      <li key={item.id} className={""} style={iconStyle}>
                        <img src={item.icon} alt={"icon"} style={iconImageStyle} />
                        <label style={iconTextStyle}>
                          {item.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}
              {/* <h1 className="w-2/3" id="description">
                {
                  props.description ? props.description : ""
                }
              </h1> */}
              {/* RATING */}
              <div className="space-x-2" id="rating" style={{padding:"5px"}}>
                <span className="font-extrabold text-cyan-50  px-1 rounded-md bg-blue-500">
                  4.5 &#9734;
                </span>
                <span className="font-extralight">(2121 Ratings)</span>
                {/* <span className="font-extralight">Very Good</span> */}
                <span style={{alignItems:'center'}}><img src="/Icons/Filled/guests.png" alt="" style={{width:'25px',height:'25px',display:"inline",marginLeft:"9vw"}}/>
                  <span style={{marginLeft:'5px'}}>250 guests</span>
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between" style={{ marginTop: "auto", alignItems:"center"}} id="ratingDetailsAndBookNow">
                <div style={detailFirstRowBackgroundStyle}>
                  <h1 className="text-3xl font-extrabold text-blue-400">
                    {/* <img src={rateIcon} alt={"icon"} style={{
                      height: '2em',
                      width: '2em',
                      display: 'inline',
                      marginLeft: '',
                      marginRight: 'auto',
                      //background: 'rgb(191, 219, 254)',
                      //border: 'solid rgb(191, 219, 254)',
                      borderRadius: '15px',
                      padding: '4px',
                    }} /> */}
                    ${props.price ? props.price : ""}
                    <span className="text-base ml-1 text-gray-500 font-light ">
                      <span className="line-through">${props.price ? props.price * 8 : ""}</span>
                      <span style={{ color: 'black' }}> / hour</span>

                    </span>
                  </h1>
                </div>
                <div className="sm:flex sm:mt-0 sm:space-x-2">
                  <Link to={`/spot/${props.objectId}`}>
                    <button className="px-4 py-2 font-extrabold text-lg border-2 text-blue-400 rounded w-full border-blue-400" style={{
                      borderRadius: '25px',
                      width: 'auto',
                      marginLeft: '10px'
                    }}>
                      View Details
                    </button>
                  </Link>
                  <Link to={`/spot/${props.objectId}`}>
                    <button className="px-4 py-2 font-extrabold text-lg border-2 text-white bg-blue-400 w-full mt-2 sm:mt-0 border-blue-400 rounded" style={{
                      borderRadius: '25px',
                      width: 'auto',
                      marginLeft: '10px'
                    }}>
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Link>
    </>
  );
}

export default Cards;
