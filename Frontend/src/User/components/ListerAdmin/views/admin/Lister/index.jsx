import { columnsDataComplex } from "./../tables/variables/columnsData";

import ComplexTable from "../tables/components/ComplexTable";
import { useEffect, useState } from "react";

const Marketplace = () => {
  const [myListings, setMyListings] = useState([]);

  async function getMyListings() {
    console.log(localStorage.getItem("userId"));
    try {
      const response = await fetch(
        `http://localhost:5000/api/getMySpots/${localStorage.getItem("userId")}`
      );
      const resData = await response.json();
      if (resData.success !== false) {
        setMyListings(resData.yourSpots);
        console.log(resData.yourSpots);
      } else {
        console.log("No spots found");
      }
      console.log("Responses:");
      console.log(resData);
      console.log(resData.yourSpots);
    } catch (err) {
      console.log(err);
      console.log("bhai nhi chal rha yaar");
    }
  }

  useEffect(() => {
    getMyListings();
  }, []);

  return (
    //
    <>
      <div>
        <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
          {/* tableData=data */}
          <ComplexTable
            tableName={"My Listings"}
            columnsData={columnsDataComplex}
            tableData={myListings}
          />
        </div>
        <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2"></div>
      </div>
    </>
  );
};

export default Marketplace;
