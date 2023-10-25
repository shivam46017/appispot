import AllUser from "./components/AllUser";

import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex2,
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataColumns from "./variables/tableDataColumns.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import DevelopmentTable from "./components/DevelopmentTable";
import ColumnsTable from "./components/ColumnsTable";
import ComplexTable from "./components/ComplexTable";
import { useEffect, useState } from "react";
import axios from "axios";

const Tables = () => {
  const [data, setData] = useState([]);
  const [blockedUser, setBlockedUser] = useState([]);
  const [myListings, setMyListings] = useState([]);


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
  }, []);

  return (
    <div>
      {/* <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <ComplexTable
          tableName={"User Table"}
          columnsData={columnsDataComplex}
          tableData={data}
        />

        <AllUser
          tableName="Blocked User"
          columnsData={columnsDataCheck}
          tableData={blockedUser}
        />
      </div> */}

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        {/* <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        /> */}

        <ComplexTable
          columnsData={columnsDataComplex2}
          tableData={myListings}
        />
      </div>
    </div>
  );
};

export default Tables;
