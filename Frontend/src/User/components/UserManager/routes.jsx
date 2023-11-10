import Profile from "./views/admin/profile";
import DataTables from "./views/admin/tables";

// Icon Imports
import {
  MdHome,
} from "react-icons/md";
import { BiHeart, BiMailSend, BiSupport } from "react-icons/bi";
import { TbHomeDollar } from "react-icons/tb";
import ChatBox from "./views/admin/profile/components/ChatBox";
import SupportManagement from '../UserManager/views/admin/profile/components/supportManagement/index'

const routes = [
  {
    name: "My Profile",
    layout: "/userprofile",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "My Bookings",
    layout: "/userprofile",
    path: "booking-management",
    icon: <TbHomeDollar className="h-6 w-6" />,
    component: <DataTables />,
  },
  {
    name: "Messages",
    layout: "/userprofile",
    path: "messages",
    icon: <BiMailSend className="h-6 w-6" />,
    component: <ChatBox />,
  },
  {
    name: "whishlist",
    layout: '/userprofile',
    path: 'whishlist',
    icon: <BiHeart className="h-6 w-6"/>,
    component: <DataTables/>
  },
  {
    name: "Support",
    layout: "/userprofile",
    path: "support",
    icon: <BiSupport className="h-6 w-6" />,
    component: <SupportManagement />,
  },
];

export default routes;
