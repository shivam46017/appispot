import React from "react";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
import navbarimage from '../../assets/img/layout/Navbar.png'

import { BsArrowBarUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import {
  IoMdNotificationsOutline,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import avatar from "../../assets/img/avatars/avatar4.png";
import Dropdown from './../dropdown/index';

const Navbar = (props) => {
  const { onOpenSidenav, brandText } = props;

  return (
    <nav className="sticky top-4 z-10 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl ">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline "
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 ">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 ">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 "
          >
            {brandText}
          </Link>
        </p>
      </div>

    </nav>
  );
};

export default Navbar;
