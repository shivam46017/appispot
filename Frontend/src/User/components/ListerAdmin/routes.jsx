// Admin Imports
import MainDashboard from "./views/admin/default";
import DataTables from "./views/admin/tables";

// Icon Imports
import {
  MdHome
} from "react-icons/md";
import { BiBuildingHouse, BiMailSend, BiSupport } from "react-icons/bi";
import { TbHomeDollar, TbReportAnalytics } from "react-icons/tb";
import DiscountMangament from './views/admin/discountMagement/DiscountMangament'
import Messages from "./views/admin/bannerManagement/BannerManagement";
import ListingManagement from "./views/admin/Listings";
import SupportManagement from "./views/admin/supportManagement";


const routes = [
  {
    name: "Main Dashboard",
    layout: "/listeradmin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "My Listings",
    layout: "/listeradmin",
    path: "property-management",
    icon: <BiBuildingHouse className="h-6 w-6" />,
    component: <ListingManagement />,
    secondary: true,
  }, 
  {
    name: "Messages",
    layout: "/listeradmin",
    path: "messages",
    icon: <BiMailSend className="h-6 w-6" />,
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
  {
    name: "Report Management",
    layout: "/listeradmin",
    path: "report-management",
    icon: <TbReportAnalytics className="h-6 w-6" />,
    component: <DataTables />,
  },
  {
    name: "Support",
    layout: "/listeradmin",
    path: "support",
    icon: <BiSupport className="h-6 w-6" />,
    component: <SupportManagement />,
  },
];
export default routes;