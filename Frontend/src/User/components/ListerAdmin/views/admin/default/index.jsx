import { useState, useEffect } from "react";

import { columnsDataCheck } from "./variables/columnsData";

import tableDataCheck from "./variables/tableDataCheck.json";
import MiniCalendar from "./../../../components/calendar/MiniCalendar";
import TotalSpent from "./components/TotalSpent";
import Widget from "./../../../components/widget/Widget";
import CheckTable from "./components/CheckTable";
import TaskCard from "./components/TaskCard";

import {
  BsBuildingFillCheck,
  BsBuildingFillUp,
  BsFillBuildingFill,
} from "react-icons/bs";
import axios from "axios";

const Dashboard = () => {
  const [myListings, setMyListings] = useState([]);
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/getMyBookings/${localStorage.getItem(
        "userId"
      )}`
    );
    const { filteredOrders } = res.data;
    console.log(filteredOrders, "iiii");
    setBookings(filteredOrders);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/getMySpots/${localStorage.getItem(
            "userId"
          )}`
        );
        const resData = await response.json();

        if (resData.success !== false) {
          setMyListings(resData.yourSpots);
          console.log(resData.yourSpots);
        } else {
          console.log("No spots found");
        }
        console.log("REsponses:");
        console.log(resData);
        console.log(resData.yourSpots);
      } catch (err) {
        console.log(err);
        console.log("bhai nhi chal rha yaar");
      }
    }
    fetchData();
    console.log("chal to rha hai ye");
    getBookings();
  }, []);

  return (
    <div className="bg-slate-200 rounded-lg p-2">
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">

        <Widget
          icon={
            <BsBuildingFillCheck className="text-indigo-600 bg-gray-100 rounded-full h-6 w-6" />
          }
          title={"Venues Booked Today"}
          subtitle={""}
        />
        <Widget
          icon={
            <BsFillBuildingFill className="text-indigo-600 bg-gray-100 rounded-full h-7 w-7" />
          }
          title={"Venues Booked Last Month"}
          subtitle={bookings.length}
        />
        <Widget
          icon={
            <BsBuildingFillUp className="text-indigo-600 bg-gray-100 rounded-full h-6 w-6" />
          }
          title={"Active Listing"}
          subtitle={
            myListings.filter((value) => value.isApproved !== false).length
          }
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        {/* <WeeklyRevenue /> */}
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
