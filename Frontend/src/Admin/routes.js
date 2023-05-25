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
import BannerManagement from "./views/admin/bannerManagement/BannerManagement";
import AmenitiesManagement from "./views/admin/amenitiesManagement/AmenitiesManagement";
import BookingManagement from "./views/admin/bookingManagement/BookingManagement";
import ReviewManagement from "./views/admin/reviewManagement/reviewManagement";
import ReportManagement from "./views/admin/reportManagement/reportManagement";
import DiscountCoupon from "./views/admin/discountCouponManagement/DiscountCoupon";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "User Management",
    layout: "/admin",
    path: "user-management",
    icon: <TiGroup className="h-6 w-6" />,
    component: <DataTables />,
  },
  {
    name: "Listings Management",
    layout: "/admin",
    path: "property-management",
    icon: <BiBuildingHouse className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  }, 
  {
    name: "Banner Management",
    layout: "/admin",
    path: "banner-management",
    icon: <BsBookmark className="h-6 w-6" />,
    component: <BannerManagement />,
  },
  {
    name: "Booking Management",
    layout: "/admin",
    path: "booking-management",
    icon: <TbHomeDollar className="h-6 w-6" />,
    component: <BookingManagement />,
  },
  {
    name: "Coupon & Discount",
    layout: "/admin",
    path: "coupon-discount-management",
    icon: <TbHomeDollar className="h-6 w-6" />,
    component: <DiscountCoupon   />,
  },
  {
    name: "Amenities Management",
    layout: "/admin",
    path: "amenities-management",
    icon: <RiGlobalLine className="h-6 w-6" />,
    component: <AmenitiesManagement />
  },
  {
    name: "Review Management",
    layout: "/admin",
    path: "review-management",
    icon: <RiGlobalLine className="h-6 w-6" />,
    component: <ReviewManagement />
  },
  {
    name: "Report Management",
    layout: "/admin",
    path: "report-management",
    icon: <TbReportAnalytics className="h-6 w-6" />,
    component: <ReportManagement />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <TbReportAnalytics className="h-6 w-6" />,
    component: <Profile />,
  },
 
  
];
export default routes;
