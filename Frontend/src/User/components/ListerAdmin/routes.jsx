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
import { HiOutlineUser } from "react-icons/hi";
import { BiBuildingHouse } from "react-icons/bi";
import { RiGlobalLine } from "react-icons/ri";
import { TiGroup } from "react-icons/ti";
import { TbHomeDollar, TbReportAnalytics } from "react-icons/tb";
import DiscountMangament from './views/admin/discountMagement/DiscountMangament'
import Messages from "./views/admin/bannerManagement/BannerManagement";


const routes = [
  {
    name: "Main Dashboard",
    layout: "/listeradmin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  // {
  //   name: "User Management",
  //   layout: "/listeradmin",
  //   path: "user-management",
  //   icon: <TiGroup className="h-6 w-6" />,
  //   component: <DataTables />,
  // },
  {
    name: "My Listings",
    layout: "/listeradmin",
    path: "property-management",
    icon: <BiBuildingHouse className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  }, 
  {
    name: "Messages",
    layout: "/listeradmin",
    path: "messages",
    icon: <BsBookmark className="h-6 w-6" />,
    component: <Messages />,
  },
  {
    name: "My Bookings",
    layout: "/listeradmin",
    path: "booking-management",
    icon: <TbHomeDollar className="h-6 w-6" />,
    component: <DataTables />,
  },
  {
    name: "Discount Management",
    layout: "/listeradmin",
    path: "discount-management",
    icon: <TbHomeDollar className="h-6 w-6" />,
    component: <DiscountMangament />,
  },
  // {
  //   name: "Amenities Management",
  //   layout: "/listeradmin",
  //   path: "amenities-management",
  //   icon: <RiGlobalLine className="h-6 w-6" />,
  //   component: <DataTables />,
  // },
  {
    name: "Report Management",
    layout: "/listeradmin",
    path: "report-management",
    icon: <TbReportAnalytics className="h-6 w-6" />,
    component: <DataTables />,
  },
  // {
  //   name: "Profile",
  //   layout: "/listeradmin",
  //   path: "profile",
  //   icon: <TbReportAnalytics className="h-6 w-6" />,
  //   component: <Profile />,
  // },
 
  
];
export default routes;
