import React, { useMemo, useState, useEffect } from "react";
import CardMenu from "../../../../components/card/CardMenu";
import Card from "../../../../components/card/index";
import Checkbox from "../../../../components/checkbox/index";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import DropDownMenuForActions from "../components/DropDown";
import axios from "axios";
import { useLocation } from "react-router-dom";
import View from "../components/View"

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";
import Edit from "../components/Edit";

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
  const [imagePreview, setImagePreview] = useState(null);
  const [showView, setShowView] = useState(false)
  const [viewData, setViewData] = useState(undefined)
  const [showEdit, setShowEdit] = useState(false)

  const toggleView = (id) => {
    console.log(id)
    setViewData(() => {
      return (tableData.filter((value) => value._id === id))[0]
    })
    setShowView(!showView)
  }

  const toggleEdit = (id) => {
    console.log(id)
    setViewData(() => {
      return (tableData.filter((value) => value._id === id))[0]
    })
    console.log((tableData.filter((value) => value._id === id))[0])
    setShowEdit(!showEdit)
  }

  let searchParams = useLocation().search;

  async function fetchData() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/spots?${searchParams}}`
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
      <div className="overflow-x-scroll w-full">
        <Card extra={"sm:overflow-auto p-4 w-fit"}>
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
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="border-b border-gray-200 pr-16 pb-[10px] text-center "
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

                        if (cell.column.Header === "Created At") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 ">
                              {cell.value}
                            </p>
                          );
                        }

                        if (cell.column.Header === "Lister") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 ">
                              {cell.value}
                            </p>
                          );
                        }

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
                            <div className="flex justify-start mx-4">
                              <AvatarGroup max={3}>
                                {cell.value.map((data) => {
                                  return (
                                    <Avatar
                                      alt="Remy Sharp"
                                      src={`${data}`}
                                    />
                                  );
                                })}
                              </AvatarGroup>
                            </div>
                          );
                        }

                        if (cell.column.Header === "Documents") {
                          data = (
                            <div className="flex justify-start mx-4">
                              <AvatarGroup max={3}>
                                {cell.value.map((data) => {
                                  return (
                                    <Avatar
                                      alt="Remy Sharp"
                                      src={`${data}`}
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

                        if (cell.column.Header === "Amenities") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 mx-4">
                              <AvatarGroup max={3}>
                                {cell.value.map((data) => {
                                  return (
                                    <Avatar
                                      alt="Remy Sharp"
                                      src={`${data}`}
                                    />
                                  );
                                })}
                              </AvatarGroup>
                            </p>
                          );
                        }

                        if (cell.column.Header === "Categories") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 mx-4">
                              <AvatarGroup max={3}>
                                {cell.value.map((data) => {
                                  return (
                                    <Avatar
                                      alt="Remy Sharp"
                                      src={`${data}`}
                                    />
                                  );
                                })}
                              </AvatarGroup>
                            </p>
                          );
                        }

                        if (cell.column.Header === "Actions") {
                          console.log(row.original._id)
                          data = (
                            <DropDownMenuForActions
                              id={row.original._id}
                              isApproved={row.original.isApproved}
                              refresh={fetchData}
                              toggleView={toggleView}
                              toggleEdit={toggleEdit}
                            />
                          );
                        }

                        if (cell.column.Header === "City") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 mx-4">
                              {cell.value}
                            </p>
                          );
                        }

                        if (cell.column.Header === "State") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 mx-4">
                              {cell.value}
                            </p>
                          );
                        }

                        if (cell.column.Header === "Address") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 mx-4">
                              {cell.value}
                            </p>
                          );
                        }

                        if (cell.column.Header === "Road Name") {
                          data = (
                            <p className="text-sm font-bold text-navy-700 mx-4">
                              {cell.value}
                            </p>
                          );
                        }

                        if (cell.column.Header === "Opening Time") {
                          data = (
                            <div className="!min-w-[200px] mx-4">
                              {cell?.value?.map((data) => {
                                return (
                                  <div className="h-full flex justify-between">
                                    <div>{data?.day}</div>
                                    <div>{new Date(data?.val).toLocaleTimeString()}</div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }

                        if (cell.column.Header === "Closing Time") {
                          data = (
                            <div className="!min-w-[200px] mx-4">
                              {cell?.value?.map((data) => {
                                return (
                                  <div className="h-full flex justify-between">
                                    <div>{data?.day}</div>
                                    <div>{new Date(data?.val).toLocaleTimeString()}</div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }

                        if (cell.column.Header === "Holiday's") {
                          data = (
                            <div className="!min-w-[200px] mx-4">
                              {cell?.value?.map((data) => {
                                return (
                                  <div className="h-full flex justify-between">
                                    <div>{data?.day}</div>
                                    <div>{data?.val}</div>
                                  </div>
                                );
                              })}
                            </div>
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
      </div>
      <View open={showView} viewData={viewData} toggleView={toggleView} />
      <Edit open={showEdit} viewData={viewData} toggleEdit={toggleEdit}/>
    </>
  );
};

export default Listings;
