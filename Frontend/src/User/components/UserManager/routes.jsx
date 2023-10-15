import React from "react";

// Admin Imports
import MainDashboard from "./views/admin/default";
import NFTMarketplace from "./views/admin/Lister";
import Profile from "./views/admin/profile";
import DataTables from "./views/admin/tables";

// Auth Imports

import SignIn from './views/auth/SignIn';
// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import { BsBookmark, BsFileEarmarkBarGraph, BsFileEarmarkPerson, BsJournalBookmark } from "react-icons/bs";
import { HiMail, HiOutlineUser } from "react-icons/hi";
import { BiBuildingHouse, BiMailSend } from "react-icons/bi";
import { RiGlobalLine } from "react-icons/ri";
import { TiGroup } from "react-icons/ti";
import { TbHomeDollar, TbReportAnalytics } from "react-icons/tb";
import ChatBox from "./views/admin/profile/components/ChatBox";


const routes = [
  {
    name: "My Profile",
    layout: "/userprofile",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <Profile />,
  },
  // {
  //   name: "User Management",
  //   layout: "/userprofile",
  //   path: "user-management",
  //   icon: <TiGroup className="h-6 w-6" />,
  //   component: <DataTables />,
  // },
  // {
  //   name: "My Listings",
  //   layout: "/userprofile",
  //   path: "property-management",
  //   icon: <BiBuildingHouse className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // }, 
  // {
  //   name: "Banner Management",
  //   layout: "/userprofile",
  //   path: "banner-management",
  //   icon: <BsBookmark className="h-6 w-6" />,
  //   component: <BannerManagement />,
  // },
  {
    name: "My Bookings",
    layout: "/userprofile",
    path: "booking-management",
    icon: <TbHomeDollar className="h-6 w-6" />,
    component: <DataTables />,
  },
  // {
  //   name: "Discount Management",
  //   layout: "/userprofile",
  //   path: "discount-management",
  //   icon: <TbHomeDollar className="h-6 w-6" />,
  //   component: <DiscountMangament />,
  // },
  // {
  //   name: "Amenities Management",
  //   layout: "/userprofile",
  //   path: "amenities-management",
  //   icon: <RiGlobalLine className="h-6 w-6" />,
  //   component: <DataTables />,
  // },
  {
    name: "Messages",
    layout: "/userprofile",
    path: "messages",
    icon: <BiMailSend className="h-6 w-6" />,
    component: <ChatBox />,
  },
  // {
  //   name: "Profile",
  //   layout: "/userprofile",
  //   path: "profile",
  //   icon: <TbReportAnalytics className="h-6 w-6" />,
  //   component: <Profile />,
  // },
 
  
];
export default routes;
