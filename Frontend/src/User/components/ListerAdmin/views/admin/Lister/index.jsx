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
  //         "https://appispot-server.onrender.com/api/getAllSellers"
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

  useEffect(() => {
    setFeaturedList([
      {
        title: 'Aesthetic Content Creation Studio and Event Space in Venice',
        banner: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        price: '$300/hr',
        tags: ['#travel', '#winter'],
        ratting: 3
      },
      {
        title: 'DeSoto State Park, Fort Payne, Alabama, Resort State',
        banner: 'https://th.bing.com/th/id/OIP.Kbqbz9DoLl7ytOsGjNgKZAHaE7?pid=ImgDet&rs=1',
        price: '$250/hr',
        tags: ['#camping', '#hike'],
        ratting: 4
      },
      {
        title: 'Bartlett River Trail, Glacier Bay National Park, Alaska',
        banner: 'https://th.bing.com/th/id/OIP.yufhEteBqqmb_hFXARNJqgHaE6?pid=ImgDet&rs=1',
        price: '$200/hr',
        tags: ['#travel', '#alaska'],
        ratting: 2
      },
      {
        title: 'Grandview Point, Grand Canyon National Park, Arizona',
        banner: 'https://th.bing.com/th/id/OIP.8PIGNJdGaubig2c-nhWnrAHaEK?pid=ImgDet&rs=1',
        price: '$150/hr',
        tags: ['#mountain', '#station'],
        ratting: 5
      }
    ]);
  }, [])

  return (
    // 
    <>
      <div>
      <div className="flex flex-wrap  justify-center">
          <div className="flex flex-wrap w-full mb-14 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-semibold title-font mb-2 text-gray-900">
              Exclusive List of Property
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table.
            </p>
          </div>
          {featuredlist.map((item) => (<div className="xl:w-1/4 md:w-1/2 p-4">
            <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
              <img
                className=" h-[42vh] mx-auto w-full hover:scale-105  transition duration-300 ease-in-out "
                src={item.banner}
                alt="Mountain"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-base mb-2">
                  {item.title}
                </div>
                <p className="text-gray-700 text-base">{item.price}</p>
              </div>
              <div className="flex items-center justify-between px-2">
                <div className="">
                  {item.tags.map((tag) => (<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {tag}
                  </span>))}
                </div>
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className={item.ratting > 0 ? ("w-5 h-5 text-yellow-400") : ("w-5 h-5 dark:text-gray-500 text-gray-300")}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>First star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className={item.ratting > 1 ? ("w-5 h-5 text-yellow-400") : ("w-5 h-5 dark:text-gray-500 text-gray-300")}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Second star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className={item.ratting > 2 ? ("w-5 h-5 text-yellow-400") : ("w-5 h-5 dark:text-gray-500 text-gray-300")}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Third star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className={item.ratting > 3 ? ("w-5 h-5 text-yellow-400") : ("w-5 h-5 dark:text-gray-500 text-gray-300")}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Fourth star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className={item.ratting > 4 ? ("w-5 h-5 text-yellow-400") : ("w-5 h-5 dark:text-gray-500 text-gray-300")}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Fifth star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>))}
        </div>
        <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
          {/* tableData=data */}
          <ComplexTable
            tableName={"Spot Table"}
            columnsData={columnsDataComplex}
            tableData={tableDataColumns}  
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
