import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, Radio, Space } from "antd";
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import Button from "@mui/material/Button";
import HowToList from "./HowToList";
import HowToBook from "./HowToBook";
// import { useCountries } from "use-react-countries";
// import { Select, Option } from "@material-tailwind/react";
// import Slick from "slick-carousel/slick/slick"
import Dropdown from "./../../../Admin/components/dropdown/index";
import Banner from "./Banner";
import HoverButtons from "./HoverButtons";
import SearchBox from "./SearchBox";
import getCategories from "../../../utils/fetch/Categories";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        {header}
        <img
          className={`ml-auto transition-transform duration-200 ease-in-out ${
            isEnter && "rotate-225"
          }`}
          src="/assets/add.svg"
          alt="Chevron"
        />
      </>
    )}
    className="border-b py-1 !bg-transparent select-none"
    buttonProps={{
      className: ({ isEnter }) => `flex w-full p-4 text-left`,
      // ${
      // isEnter && "bg-slate-200"
      // }
    }}
    contentProps={{
      className: "transition-height duration-200 ease-in-out",
    }}
    panelProps={{ className: "p-4" }}
  />
);

function Home() {
  const { RangePicker } = DatePicker;

  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState("");
  const [isHovered, setIsHovered] = useState(0);
  const [featuredlist, setFeaturedList] = useState([
    {
      title: "Aesthetic Content Creation Studio and Event Space in Venice",
      banner:
        "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      price: "$300/hr",
      tags: ["#travel", "#winter"],
      ratting: 3,
    },
    {
      title: "DeSoto State Park, Fort Payne, Alabama, Resort State",
      banner:
        "https://th.bing.com/th/id/OIP.Kbqbz9DoLl7ytOsGjNgKZAHaE7?pid=ImgDet&rs=1",
      price: "$250/hr",
      tags: ["#camping", "#hike"],
      ratting: 4,
    },
    {
      title: "Bartlett River Trail, Glacier Bay National Park, Alaska",
      banner:
        "https://th.bing.com/th/id/OIP.yufhEteBqqmb_hFXARNJqgHaE6?pid=ImgDet&rs=1",
      price: "$200/hr",
      tags: ["#travel", "#alaska"],
      ratting: 2,
    },
    {
      title: "Grandview Point, Grand Canyon National Park, Arizona",
      banner:
        "https://th.bing.com/th/id/OIP.8PIGNJdGaubig2c-nhWnrAHaEK?pid=ImgDet&rs=1",
      price: "$150/hr",
      tags: ["#mountain", "#hike"],
      ratting: 5,
    },
  ]);
  const [categories, setcategories] = useState([])

  // const handleSearch = () => {
  //   // Handle search functionality here
  // };

  //   const handleClose = () => {
  //     setModal(false)
  //     setNoteModal(false)
  // }

  const [size, setSize] = useState("middle");
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const AccordionItem = ({ header, ...rest }) => (
    <Item
      {...rest}
      header={({ state: { isEnter } }) => (
        <>
          {header}
          <img
            className={`ml-auto transition-transform duration-200 w-6 h-6 ease-in-out text-black fill-black ${
              isEnter && "rotate-225 hidden"
            }`}
            src="/plus.png"
            alt="Chevron"
          />
          <img
            className={`ml-auto hidden transition-transform duration-200 w-6 h-6 ease-in-out text-black fill-black ${
              isEnter && "!block rotate-225 "
            }`}
            src="/minus.png"
            alt="Chevron"
          />
        </>
      )}
      className="border-b py-1  select-none font-semibold text-xl"
      buttonProps={{
        className: ({ isEnter }) => `flex w-full p-4 text-left `,
        // ${
        // isEnter && "bg-slate-200"
        // }
      }}
      contentProps={{
        className:
          "transition-height font-semibold text-base text-left duration-200 ease-in-out",
      }}
      panelProps={{ className: "p-4" }}
    />
  );

  const faqs = [
    {
      header: "Hey, why not get paid to rent your Spot?",
      content: "Hosts can make anywhere from $2000-$4000 per month.",
    },
    {
      header: "Why should you host with AppiSpot? ",
      content:
        "We are excited to offer the peace of mind that our hosts will receive excellent support. Our AppiSpot Protection Guarantee ensures the safety of all bookings made through AppiSpot, providing up to $1 million in coverage for general liability claims.",
    },
    {
      header: "How can I contact AppiSpot?",
      content:
        "AppiSpot's Customer Support is committed to providing exceptional assistance, regardless of the scale or complexity of your needs. Our team is fully devoted to delivering exceptional customer service. We offer service from Monday-Saturday 9am-5pm per week. ",
    },
    {
      header: "How can I become a host on AppiSpot?",
      content: `Give your Spot a name: Choose a name for your spot from options like "Cozy Backyard," "Nature Retreat," "Nature Paradise," or "Secret Gardens." Provide a brief description of your spot: Write a concise and appealing description that highlights the unique features and atmosphere of your spot. Set your price: Decide on a price for your spot's rental. Alternatively, you can use our pricing model to determine the best hourly rate for your spot. Choose your availability: Select the dates and times when your spot is available for booking.  Upload pictures of your spot: Include high-quality photos showcasing the different areas and amenities of your spot. This will help potential guests visualize their experience. Add your rules: Establish any necessary rules or guidelines for guests to follow while using your spot. This ensures a smooth and respectful experience for everyone involved. For example : No smoking or No Glass bottles on premises  Determine what you are willing to host: Decide on the types of events or activities you are willing to host in your spot, such as Picnic, bridal showers, baby showers, photo shoots or kids birthday parties.  By following these steps, you can effectively create a listing for your spot, provide essential information, and attract potential guests.`,
    },
    {
      header: "How to book a spot?",
      content:
        "1 Create an account: -Sign up and create an account on the platform. 2 Search for the spot that best suits your needs: -Utilize the search functionality to browse and explore available spots based on your preferences and requirements. 3 Select your desired spot: -Choose the spot that aligns with your needs.. 4 Book the spot: -Once you've found the ideal spot, proceed to book. After successful booking you will get a confirmation with the Spot’s address.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Banner */}
      <Banner />
      {/* Search Box */}
      <SearchBox float variant="dark"/>

      {/* Category */}
      <section
        className="text-black body-font lg:px-16 py-10 md:pt-20 mt-[100vh] bg-white z-40 "
        style={{ paddingTop: "0" }}
      >
        <div className="container px-5 py-2 mx-auto">
          <div className="carousel my-12 mx-auto  overflow-x-scroll no-scrollbar ">
            <h1
              className="sm:text-3xl text-2xl font-semibold text-center title-font mb-2 text-gray-900"
              style={{ fontSize: "2em" }}
            >
              We have spots for everything.
            </h1>
            <h3
              style={{
                textAlign: "",
                fontSize: "1.40em",
                fontWeight: "bolder",
              }}
            ></h3>
            <Carousel/>
            {/* <div id="carousel" data-slick='{"slidesToShow": 5, "slidesToScroll": 3}'>
                  <div>1</div>
                  <div>1</div>
                  <div>1</div>
                  <div>1</div>
                  <div>1</div>
                  <div>1</div>
                  <div>1</div>
                  <div>1</div>
                  <div>1</div>
            </div> */}
          </div>
        </div>
        {/* CANT FIND A PROPERTY */}
        <div className="flex flex-wrap justify-center" id="cantFind">
          <div className="flex flex-wrap w-full mb-12 mt-4 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-semibold title-font mb-2 text-gray-900">
              Discover AppiSpot Experiences
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-5 w-full">
            {featuredlist.map((item) => (
              <div className="w-full p-2">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    className=" h-[50vh] mx-auto w-full hover:scale-105  transition duration-300 ease-in-out "
                    src={item.banner}
                    alt="Mountain"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-base mb-2">{item.title}</div>
                    <p className="text-gray-700 text-base">{item.price}</p>
                  </div>
                  <div className="flex items-center justify-between px-2">
                    <div className="">
                      {item.tags.map((tag) => (
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center">
                      <svg
                        aria-hidden="true"
                        className={
                          item.ratting > 0
                            ? "w-5 h-5 text-yellow-400"
                            : "w-5 h-5 dark:text-gray-500 text-gray-300"
                        }
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>First star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className={
                          item.ratting > 1
                            ? "w-5 h-5 text-yellow-400"
                            : "w-5 h-5 dark:text-gray-500 text-gray-300"
                        }
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Second star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className={
                          item.ratting > 2
                            ? "w-5 h-5 text-yellow-400"
                            : "w-5 h-5 dark:text-gray-500 text-gray-300"
                        }
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Third star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className={
                          item.ratting > 3
                            ? "w-5 h-5 text-yellow-400"
                            : "w-5 h-5 dark:text-gray-500 text-gray-300"
                        }
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fourth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className={
                          item.ratting > 4
                            ? "w-5 h-5 text-yellow-400"
                            : "w-5 h-5 dark:text-gray-500 text-gray-300"
                        }
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fifth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <section className="text-black body-font lg:px-16 py-10 md:pt-20 bg-white z-40">
        <div className="container px-5 py-2 mx-auto">
          <div className="carousel my-12 mx-auto  overflow-x-scroll no-scrollbar ">
            <h1 className="sm:text-3xl text-2xl font-semibold text-center title-font mb-2 text-gray-900">
              Categories
            </h1>
            <Carousel />
          </div>
        </div>
        <div className="flex container space-x-4">
          <div className="flex flex-col w-1/2 flex-wrap ">
            <div className="sm:text-4xl text-2xl font-semibold title-font mb-2 text-gray-900">
              Exclusive List of Property
            </div>
            <p className="leading-relaxed text-xl text-gray-500">
              Irving is on trend with tons for attendees to do during their free
              time. Once you're here, you won’t have to go far to experience
              something new or tried and true, as everything is a stroll away.
              Less than a three-hour flight from either coast and minutes from
              DFW airport, Irving offers more than 85 hotels with versatile
              options to meet the needs of your meeting. Let our team help you
              start planning the perfect event and submit your RFP today!
            </p>
          </div>
          <div className="w-1/2">
            <div className="relative">

              <img src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_200,q_80,w_200/v1/clients/irving/Las_Colinas_with_Sunset_Main_Image_076e7661-ad1b-4f7d-8845-1205ffe6000e.jpg" alt="" className="h-32 absolute " style={{ top: "-50px", left: "-45px", borderRadius: "100%" }} />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1674574124349-0928f4b2bce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
                alt=""
                srcset=""
                className="h-full w-full object-fill"
              />
            </div>
          </div>
          <div></div>
        </div>
      </section> */}

      {/* Why to choose */}
      <section className="text-gray-600 body-font bg-white z-40 px-4 md:px-32 py-4 pb-8 text-center">
        {/* <div className="container px-5 py-14 mx-auto">
          <div className="flex flex-wrap w-full mb-14 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-semibold title-font mb-2 text-gray-900">
              Why To Choose
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Over 12 Lac properties
                </h2>
                <p className="leading-relaxed text-base">
                  10,000+ properties are added every day.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Verified Seller
                </h2>
                <p className="leading-relaxed text-base">
                  Photos / Videos and other details are verified on location.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Large user base
                </h2>
                <p className="leading-relaxed text-base">
                  High active user count and user engagement to find and close
                  deals .
                </p>
              </div>
            </div>
          </div>
        </div> */}
        {/* HOVERING BUTTONS */}

        <HoverButtons />
        <div className="p-3 ">
          <video
            src={"/images/Appispot-video.mp4"}
            className="mx-auto"
            width={1744}
            controls="controls"
          />
        </div>
        {/* HOW TO */}
        <HowToBook />
        <HowToList />

        {/* Q AND A */}
        <span className="text-3xl md:text-[2.5rem] text-black text-left font-bold title-font my-12 mb-6">
          QUESTION & ANSWERS
        </span>
        <div>
          {/* <div className="w-1/5">
            <ul>
              <li>

              </li>
            </ul>
          </div> */}

          <Accordion
            className="grow my-12 mb-8"
            transition
            transitionTimeout={200}
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} header={faq.header} className="">
                {faq.content}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* TESTIMONIAL */}
      {/* <section className="text-gray-600 body-font bg-white z-40">
        <div className="container px-5 py-14 mx-auto">
          <div className="flex flex-wrap w-full mb-14 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-semibold title-font mb-2 text-gray-900">
              What our customers are saying about Appispot
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Hear from our satisfied buyers, tenants, owners and dealers
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://dummyimage.com/302x302"
                />
                <p className="leading-relaxed">
                  Edison bulb retro cloud bread echo park, helvetica stumptown
                  taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee
                  ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut
                  adaptogen squid fanny pack vaporware.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                  HOLDEN CAULFIELD
                </h2>
                <p className="text-gray-500">Senior Product Designer</p>
              </div>
            </div>
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://dummyimage.com/300x300"
                />
                <p className="leading-relaxed">
                  Edison bulb retro cloud bread echo park, helvetica stumptown
                  taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee
                  ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut
                  adaptogen squid fanny pack vaporware.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                  ALPER KAMU
                </h2>
                <p className="text-gray-500">UI Develeoper</p>
              </div>
            </div>
            <div className="lg:w-1/3 lg:mb-0 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://dummyimage.com/305x305"
                />
                <p className="leading-relaxed">
                  Edison bulb retro cloud bread echo park, helvetica stumptown
                  taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee
                  ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut
                  adaptogen squid fanny pack vaporware.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                  HENRY LETHAM
                </h2>
                <p className="text-gray-500">CTO</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default Home;
