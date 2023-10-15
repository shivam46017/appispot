import MiniCalendar from "./../../../components/calendar/MiniCalendar";
import Widget from "./../../../components/widget/Widget";
import TaskCard from "./components/TaskCard";
import { RiUserHeartLine, RiUserLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import {
  BsBuildingFillCheck,
  BsBuildingFillUp,
  BsFillBuildingFill,
} from "react-icons/bs";


const Dashboard = () => {
  return (
    <div className="bg-slate-200 rounded-lg p-2">
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6"> 
        <Widget
          icon={
            <HiOutlineUserGroup className="text-indigo-600 bg-gray-100 rounded-full h-7 w-7" />
          }
          title={"Total No. Of Users"}
          subtitle={"340"}
        />
        <Widget
          icon={
            <RiUserHeartLine className="text-indigo-600 bg-gray-100 rounded-full h-6 w-6" />
          }
          title={"Permium Users"}
          subtitle={"40"}
        />
        <Widget
          icon={
            <RiUserLine className="text-indigo-600 bg-gray-100 rounded-full h-7 w-7" />
          }
          title={"Free Users"}
          subtitle={"300"}
        />
        <Widget
          icon={
            <BsBuildingFillCheck className="text-indigo-600 bg-gray-100 rounded-full h-6 w-6" />
          }
          title={"Venues Booked Today"}
          subtitle={"100"}
        />
        <Widget
          icon={
            <BsFillBuildingFill className="text-indigo-600 bg-gray-100 rounded-full h-7 w-7" />
          }
          title={"Venues Booked Last Month"}
          subtitle={"145"}
        />
        <Widget
          icon={
            <BsBuildingFillUp className="text-indigo-600 bg-gray-100 rounded-full h-6 w-6" />
          }
          title={"Active Listing"}
          subtitle={"433"}
        />
      </div>

      {/* Traffic chart & Pie Chart */}

      {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2 mt-5">
        <TaskCard />
        <div className="grid grid-cols-1 rounded-[20px]">
          <MiniCalendar />
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
