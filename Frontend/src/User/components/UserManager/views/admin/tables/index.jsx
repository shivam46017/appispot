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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "/api/get-my-users-orders/"+localStorage.getItem("userId"),
        );
        let resData = await response.json();
        console.log(resData);
        setData(resData);
        if (resData.success) {
          setData(resData.allBookings);
          console.log(data);
        }
      } catch (err) {
        console.log(err);
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
          tableData={data}
        />
      </div>
    </div>
  );
};

export default Tables;
