/* eslint-disable */
import { HiX } from "react-icons/hi";
import SidebarLinks from "./components/Links";

import routes from './../../routes';

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`lg:w-80   sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[26px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-4xl font-bold uppercase text-navy-700">
          Appi<span className="font-medium">spot</span>
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 " />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <SidebarLinks routes={routes} />
      </ul>

      {/* Free Horizon Card */}
      <div className="flex justify-center">
        {/* <SidebarCard /> */}
      </div>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
