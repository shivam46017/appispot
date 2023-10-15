import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import image1 from "../../../../assets/img/profile/image1.png";
import image2 from "../../../../assets/img/profile/image2.png";
import image3 from "../../../../assets/img/profile/image3.png";
import Card from '../../../../components/card/index';

const Project = () => {
  return (
    <Card extra={"w-full p-4 h-full"}>
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-navy-700">
          All your Bookings
        </h4>
        <p className="mt-2 text-base text-gray-600">
          Here you can find more details about your bookings. Keep you user
          engaged by providing meaningful information.
        </p>
      </div>
      {/* Project 1 */}
      <div className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex items-center">
          <div className="">
            <img className="h-[83px] w-[83px] rounded-lg" src={image1} alt="" />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700">
              Apex Party Hall
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Booking #1 .
              <a
                className="ml-1 font-medium text-brand-500 hover:text-brand-500"
                href=" "
              >
                See booking details
              </a>
            </p>
          </div>
        </div>
        <div className="mr-4 flex items-center justify-center text-gray-600">
          <MdModeEditOutline />
        </div>
      </div>
      {/* Project 1 */}
      <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex items-center">
          <div className="">
            <img className="h-[83px] w-[83px] rounded-lg" src={image3} alt="" />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700">
              Trial Spot
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Booking #2 .
              <a
                className="ml-1 font-medium text-brand-500 hover:text-brand-500"
                href=" "
              >
                See booking details
              </a>
            </p>
          </div>
        </div>
        <div className="mr-4 flex items-center justify-center text-gray-600">
          <MdModeEditOutline />
        </div>
      </div>
      {/* Booking 1 */}
      <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex items-center">
          <div className="">
            <img className="h-[83px] w-[83px] rounded-lg" src={image2} alt="" />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700">
              Second House
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Booking #3 .
              <a
                className="ml-1 font-medium text-brand-500 hover:text-brand-500"
                href=" "
              >
                See booking details
              </a>
            </p>
          </div>
        </div>
        <div className="mr-4 flex items-center justify-center text-gray-600">
          <MdModeEditOutline />
        </div>
      </div>
    </Card>
  );
};

export default Project;
