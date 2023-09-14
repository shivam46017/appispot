import React, { useMemo, useState, useEffect } from "react";
import CardMenu from "../../../../components/card/CardMenu";
import Card from "../../../../components/card/index";
import Checkbox from "../../../../components/checkbox/index";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import DropDownMenuForActions from "../../Listings/components/DropDown";
import axios from "axios";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";

const Listings = (props) => {
  const { columnsData, tableName, pageNo } = props;

  const [tableData, setTableData] = useState([]);

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const [blockedLister, setBlockedLister] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/getallspots?page=${pageNo}`
      );
      let resData = response.data.spots;
      console.log(resData);
      setTableData(resData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  return (
    <>
      <Card extra={"w-full sm:overflow-auto p-4"}>
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 ">{tableName}</div>

          <CardMenu />
        </header>

        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
          <table
            {...getTableProps()}
            className="w-full"
            variant="simple"
            color="gray-500"
            mb="24px"
          >
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="border-b border-gray-200 pr-16 pb-[10px] text-start "
                      key={index}
                    >
                      <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                        {column.render("Header")}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                      let data = "";

                      if (cell.column.Header === "Name") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 ">
                            {cell.value}
                          </p>
                        );
                      }

                      if (cell.column.Header === "Description") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 ">
                            {cell.value}
                          </p>
                        );
                      }

                      if (cell.column.Header === "Price") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 ">
                            {cell.value}
                          </p>
                        );
                      }

                      if (cell.column.Header === "Images") {
                        data = (
                          <div className="flex justify-start">
                            <AvatarGroup max={3}>
                              {cell.value.map((data) => {
                                return (
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={`http://localhost:5000${data}`}
                                  />
                                );
                              })}
                            </AvatarGroup>
                          </div>
                        );
                      }

                      if (cell.column.Header === "Area (SqFt)") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 mx-4">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.Header === "Status") {
                        data = (
                          <div className="flex items-center gap-2">
                            <div className={`rounded-full text-xl`}>
                              {cell.value === true ? (
                                <MdCheckCircle className="text-green-500" />
                              ) : cell.value === false ? (
                                <MdCancel className="text-red-500" />
                              ) : cell.value === "Error" ? (
                                <MdOutlineError className="text-orange-500" />
                              ) : null}
                            </div>
                            <p className="text-sm font-bold text-navy-700 ">
                              {cell.value ? "Approved" : "Not Approved"}
                            </p>
                          </div>
                        );
                      }

                      if (cell.column.Header === "Actions") {
                        data = (
                          <DropDownMenuForActions
                            id={row.original._id}
                            isApproved={row.original.isApproved}
                            refresh={fetchData}
                          />
                        );
                      } else if (cell.column.Header === "DATE") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 ">
                            {cell.value.startDate}
                            &nbsp;to&nbsp;
                            {cell.value.endDate}
                          </p>
                        );
                      } else if (cell.column.Header === "TIME") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 ">
                            {cell.value.startTime}
                            &nbsp;to&nbsp;
                            {cell.value.endTime}
                          </p>
                        );
                      } else if (cell.column.Header === "ORDER ID") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 ">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.Header === "BOOKED BY USERID") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 ">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.Header === "GUESTS QTY") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 ">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.Header === "PRICE") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 ">
                            {cell.value}
                          </p>
                        );
                      }
                      return (
                        <td
                          {...cell.getCellProps()}
                          key={index}
                          className="pt-[14px] pb-[16px] sm:text-[14px]"
                        >
                          {data}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {imagePreview >= 0 && imagePreview != null && (
        <div className="absolute h-full w-full bg-black bg-opacity-25">
          <img
            src={`http://localhost:5000${spotDetails?.Images[imagePreview]}`}
            alt=""
            srcSet=""
            className="m-auto h-full"
          />
          <button
            onClick={() => setImagePreview(null)}
            className="absolute right-3 top-3 bg-white rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
          >
            <RxCross2 className="text-xl font-semibold" />
          </button>

          <button
            disabled={imagePreview === 0}
            onClick={() => setImagePreview(imagePreview - 1)}
            className="absolute left-3 top-[45%] bg-white disabled:bg-neutral-300 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
          >
            <FiChevronLeft className="text-xl font-semibold " />
          </button>
          <button
            disabled={imagePreview === spotDetails?.Images.length - 1}
            onClick={() => setImagePreview(imagePreview + 1)}
            className="absolute right-3 top-[45%] bg-white disabled:bg-neutral-300 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
          >
            <FiChevronRight className="text-xl font-semibold " />
          </button>
        </div>
      )}
    </>
  );
};

export default Listings;
