
import {
  columnsDataComplex2,
} from "./variables/columnsData";
import ComplexTable from "./components/ComplexTable";
import { useEffect, useState } from "react";

const Tables = () => {
  const [myListings, setMyListings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/getMyBookings/${localStorage.getItem(
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
  }, []);

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <ComplexTable
          columnsData={columnsDataComplex2}
          tableData={myListings}
        />
      </div>
    </div>
  );
};

export default Tables;
