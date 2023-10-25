import Banner from "./components/Banner";
import NFt2 from "../../../assets/img/nfts/Nft2.png";
import NFt4 from "../../../assets/img/nfts/Nft4.png";
import NFt3 from "../../../assets/img/nfts/Nft3.png";
import NFt5 from "../../../assets/img/nfts/Nft5.png";
import NFt6 from "../../../assets/img/nfts/Nft6.png";
import avatar1 from "../../../assets/img/avatars/avatar1.png";
import avatar2 from "../../../assets/img/avatars/avatar2.png";
import avatar3 from "../../../assets/img/avatars/avatar3.png";

import tableDataTopCreators from "./variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "./variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "./../../../components/card/NftCard";

import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "./../tables/variables/columnsData";
import tableDataDevelopment from "../tables/variables/tableDataDevelopment.json";
import tableDataCheck from "../tables/variables/tableDataCheck.json";
// import tableDataColumns from "../../variables/tableDataColumns.json";
import tableDataColumns from "../tables/variables/tableDataColumns.json";
import tableDataComplex from "../tables/variables/tableDataComplex.json";
// import DevelopmentTable from "../table/components/DevelopmentTable";
import ColumnsTable from "../tables/components/ColumnsTable";
import ComplexTable from "../tables/components/ComplexTable";
import AllUser from "../tables/components/AllUser";
import DevelopmentTable from "./../tables/components/DevelopmentTable";
import { useEffect, useState } from "react";
import axios from "axios";

const Marketplace = () => {
  const [data, setData] = useState([{}]);
  const [blockedLister, setBlockedLister] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/api/getAllSellers"
  //       );
  //       let resData = response.data.Seller;
  //       setData(resData);
  //       if (resData) {
  //         let data = [];
  //         resData.forEach((element) => {
  //           if (element.isActive === false) {
  //             console.log(element.isActive);
  //             data.push(element);
  //             setBlockedLister(data);
  //             console.log(blockedLister);
  //           }
  //         });
  //         // setBlockedLister(response.data.user)
  //         // console.log(blockedLister)
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchData();
  // }, []);
  const [featuredlist, setFeaturedList] = useState([]);
  const [myListings, setMyListings] = useState([]);

  async function getMyListings() {
    console.log(localStorage.getItem("userId"))
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

  useEffect(() => {
    getMyListings()
  }, [])

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


          {/* <AllUser
            tableName="Blocked Lister"
            columnsData={columnsDataCheck}
            tableData={blockedLister}
          /> */}
        </div>

        <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
          {/* <ColumnsTable
            columnsData={columnsDataColumns}
            tableData={tableDataColumns}
          /> */}

          {/* <ComplexTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Marketplace;
