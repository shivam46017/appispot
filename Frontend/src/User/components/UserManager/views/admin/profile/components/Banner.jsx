import React, { useState } from "react";
import avatar from "../../../../assets/img/avatars/avatar11.png";
import banner from "../../../../assets/img/profile/banner.png";
import Card from "../../../../components/card/index";
import { useUserAuth } from "../../../../../../../context/userAuthContext/UserAuthContext";

const Banner = () => {

  const { user } = useUserAuth()
  const [profilePicture, setProfilePicture] = useState(undefined)

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <form action="post" className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white z-10" style={{ backgroundImage: `url(http://localhost:5000${user?.profilePic})` }}>
          <input type="file" className="h-full w-full rounded-full" style={{ opacity: 0 }} />
        </form>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 ">{`${user?.firstName} ${user?.lastName}`}</h4>
        <p className="text-base font-normal text-gray-600">{localStorage.getItem('userRole')}</p>
      </div>

      {/* Post followers */}
      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 ">14</p>
          <p className="text-sm font-normal text-gray-600">Bookings</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 ">3</p>
          <p className="text-sm font-normal text-gray-600">Fav Spots</p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
