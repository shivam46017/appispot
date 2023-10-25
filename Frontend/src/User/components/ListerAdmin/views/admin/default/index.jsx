import { useState, useEffect } from "react";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import MiniCalendar from './../../../components/calendar/MiniCalendar';
import WeeklyRevenue from './components/WeeklyRevenue';
import TotalSpent from './components/TotalSpent';
import PieChartCard from './components/PieChartCard';
import Widget from './../../../components/widget/Widget';
import CheckTable from './components/CheckTable';
import ComplexTable from './components/ComplexTable';
import DailyTraffic from './components/DailyTraffic';
import TaskCard from './components/TaskCard';
import { RiUserHeartLine, RiUserLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsBuildingFillCheck, BsBuildingFillUp, BsFillBuildingFill } from "react-icons/bs";
import NftCard from "../../../components/card/NftCard";

import NFt2 from "../../../assets/img/nfts/Nft2.png";
import NFt4 from "../../../assets/img/nfts/Nft4.png";
import NFt3 from "../../../assets/img/nfts/Nft3.png";
import avatar1 from "../../../assets/img/avatars/avatar1.png";
import avatar2 from "../../../assets/img/avatars/avatar2.png";
import avatar3 from "../../../assets/img/avatars/avatar3.png";
// import Banner from "./components/Banner";
import Banner1 from './../Lister/components/Banner';
import axios from 'axios'

const Dashboard = () => {

  const [myListings, setMyListings] = useState([]);
  const [bookings, setBookings] = useState([])

  const getBookings = async () => {
    const res = await axios.get(`http://localhost:5000/api/getMyBookings/${localStorage.getItem('userId')}`)
    const { filteredOrders } = res.data
    console.log(filteredOrders, 'iiii')
    setBookings(filteredOrders)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/api/getMySpots/${localStorage.getItem('userId')}`);
        const resData = await response.json();
  
        if (resData.success !== false){
          setMyListings(resData.yourSpots);
          console.log(resData.yourSpots)
        } else {
          console.log("No spots found")
        }
        console.log("REsponses:")
        console.log(resData)
        console.log(resData.yourSpots);
      } catch (err) {
        console.log(err);
        console.log('bhai nhi chal rha yaar')
      }
    }
    fetchData();
    console.log('chal to rha hai ye')
    getBookings()
  }, []);

  return (
    <div className="bg-slate-200 rounded-lg p-2">
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        {/* <Widget
          icon={<HiOutlineUserGroup className="text-indigo-600 bg-gray-100 rounded-full h-7 w-7" />}
          title={"Total No. Of Users"}
          subtitle={"340"}
        />
        <Widget
          icon={<RiUserHeartLine className="text-indigo-600 bg-gray-100 rounded-full h-6 w-6" />}
          title={"Permium Users"}
          subtitle={"40"}
        />
        <Widget
          icon={<RiUserLine className="text-indigo-600 bg-gray-100 rounded-full h-7 w-7" />}
          title={"Free Users"}
          subtitle={"300"}
        /> */}
        <Widget
          icon={<BsBuildingFillCheck className="text-indigo-600 bg-gray-100 rounded-full h-6 w-6" />}
          title={"Venues Booked Today"}
          subtitle={''}
        />
        <Widget
          icon={<BsFillBuildingFill className="text-indigo-600 bg-gray-100 rounded-full h-7 w-7" />}
          title={"Venues Booked Last Month"}
          subtitle={bookings.length}
        />
        <Widget
          icon={<BsBuildingFillUp className="text-indigo-600 bg-gray-100 rounded-full h-6 w-6" />}
          title={"Active Listing"}
          subtitle={myListings.filter((value) => value.isApproved !== false).length}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <CheckTable
          columnsData={columnsDataCheck}
          tableData={tableDataCheck}
        />
        {/* <WeeklyRevenue /> */}
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2"> */}
          {/* NFt Banner */}
          {/* <Banner1 /> */}
        {/* </div> */}
        {/* Check Table */}
        {/* <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Abstract Colors"
            author="Esthera Jackson"
            price="0.91"
            image={NFt3}
          />
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="ETH AI Brain"
            author="Nick Wilson"
            price="0.7"
            image={NFt2}
          />
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Mesh Gradients"
            author="Will Smith"
            price="2.91"
            image={NFt4}
          />
        </div> */}

        {/* Traffic chart & Pie Chart */}



        {/* <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Abstract Colors"
            author="Esthera Jackson"
            price="0.91"
            image={NFt3}
          />
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="ETH AI Brain"
            author="Nick Wilson"
            price="0.7"
            image={NFt2}
          />
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Mesh Gradients"
            author="Will Smith"
            price="2.91"
            image={NFt4}
          />
        </div> */}
        {/* Complex Table , Task & Calendar */}

        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}

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
