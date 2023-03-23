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
  const [data, setData] = useState([]);
  const [blockedLister, setBlockedLister] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/getAllSellers');
        let resData= response.data.user
        setData(resData);
        if (resData) {
          let data=[]
          resData.forEach(element => {
            if (element.isActive===false) {
              console.log(element.isActive)
              data.push(element)
              setBlockedLister(data)
    console.log(blockedLister)

            }

          });
          // setBlockedLister(response.data.user)
          // console.log(blockedLister)
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  
  
  
  return (
    // <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
    //   <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
    //     {/* NFt Banner */}
    //     <Banner />

    //     {/* NFt Header */}
    //     <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
    //       <h4 className="ml-1 text-2xl font-bold text-navy-700 ">
    //         Trending NFTs
    //       </h4>
    //       <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
    //         <li>
    //           <a
    //             className="text-base font-medium text-brand-500 hover:text-brand-500 "
    //             href=" "
    //           >
    //             Art
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             className="text-base font-medium text-brand-500 hover:text-brand-500 "
    //             href=" "
    //           >
    //             Music
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             className="text-base font-medium text-brand-500 hover:text-brand-500 "
    //             href=" "
    //           >
    //             Collection
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             className="text-base font-medium text-brand-500 hover:text-brand-500 "
    //             href=" "
    //           >
    //             <a href=" ">Sports</a>
    //           </a>
    //         </li>
    //       </ul>
    //     </div>

    //     {/* NFTs trending card */}
    //     <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
    //       <NftCard
    //         bidders={[avatar1, avatar2, avatar3]}
    //         title="Abstract Colors"
    //         author="Esthera Jackson"
    //         price="0.91"
    //         image={NFt3}
    //       />
    //       <NftCard
    //         bidders={[avatar1, avatar2, avatar3]}
    //         title="ETH AI Brain"
    //         author="Nick Wilson"
    //         price="0.7"
    //         image={NFt2}
    //       />
    //       <NftCard
    //         bidders={[avatar1, avatar2, avatar3]}
    //         title="Mesh Gradients"
    //         author="Will Smith"
    //         price="2.91"
    //         image={NFt4}
    //       />
    //     </div>

    //     {/* Recenlty Added setion */}
    //     <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
    //       <h4 className="text-2xl font-bold text-navy-700 ">
    //         Recently Added
    //       </h4>
    //     </div>

    //     {/* Recently Add NFTs */}
    //     <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
    //       <NftCard
    //         bidders={[avatar1, avatar2, avatar3]}
    //         title="Abstract Colors"
    //         author="Esthera Jackson"
    //         price="0.91"
    //         image={NFt4}
    //       />
    //       <NftCard
    //         bidders={[avatar1, avatar2, avatar3]}
    //         title="ETH AI Brain"
    //         author="Nick Wilson"
    //         price="0.7"
    //         image={NFt5}
    //       />
    //       <NftCard
    //         bidders={[avatar1, avatar2, avatar3]}
    //         title="Mesh Gradients"
    //         author="Will Smith"
    //         price="2.91"
    //         image={NFt6}
    //       />
    //     </div>
    //   </div>

    //   {/* right side section */}

    //   <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
    //     <TopCreatorTable
    //       extra="mb-5"
    //       tableData={tableDataTopCreators}
    //       columnsData={tableColumnsTopCreators}
    //     />
    //     <HistoryCard />
    //   </div>
    // </div>
    <>
      <div>
        <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
          <ComplexTable
            tableName={"Lister Table"}
            columnsData={columnsDataComplex}
            tableData={data}
          />

          <AllUser
            tableName="Blocked Lister"
            columnsData={columnsDataCheck}
            tableData={blockedLister}
          />
        </div>

        <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
          <ColumnsTable
            columnsData={columnsDataColumns}
            tableData={tableDataColumns}
          />

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
