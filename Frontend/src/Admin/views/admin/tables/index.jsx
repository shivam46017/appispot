import AllUser from "./components/AllUser";

import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataColumns from "./variables/tableDataColumns.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import DevelopmentTable from "./components/DevelopmentTable";
import ColumnsTable from "./components/ColumnsTable";
import ComplexTable from "./components/HostTable";
import { useEffect, useState } from "react";
import axios from "axios";

const Tables = () => {
  const [data, setData] = useState([]);
  const [blockedUser, setBlockedUser] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "/api/getAllUsers"
        );
        let resData = response.data.user;
        setData(resData);
        if (resData) {
          let data = [];
          resData.forEach((element) => {
            if (element.isActive === false) {
              data.push(element);
              setBlockedUser(data);
              console.log("Block", blockedUser);
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5">
        <ComplexTable
          tableName={"User Table"}
          columnsData={columnsDataComplex}
          tableData={data}
        />

        {/* <AllUser
          tableName="Blocked User"
          columnsData={columnsDataCheck}
          tableData={blockedUser}
        /> */}
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        {/* <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}
      </div>
    </div>
  );
};

export default Tables;
