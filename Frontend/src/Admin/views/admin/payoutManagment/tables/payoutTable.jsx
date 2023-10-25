import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
  useFilters // new import
} from "react-table";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { useMemo } from "react";
import CardMenu from "../../../../components/card/CardMenu";
import Card from "../../../../components/card";
import Progress from "../../../../components/progress";
import { Button } from "@mui/material";
import { Avatar, AvatarGroup } from "@mui/material";
import DropDownForSupport from "../components/DropDownForPayout";
import { useState, useEffect } from "react";
import View from "../components/View";
import { toast } from 'react-toastify'
import axios from 'axios'



const SupportTable = (props) => {
  const { columnsData } = props;

  const [supports, setSupports] = useState([])
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => supports, [supports]);

  const getSupportData = async () => {
      try {
          const res = await axios('http://localhost:5000/api/support')
          console.log(res.data)
          setSupports(res.data.supports)
      } catch (err) {
          toast.error(err.res.message)
      }
  }

  useEffect(() => {
      getSupportData()
  }, [])

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useFilters, // new addition
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
    nextPage, 
    previousPage, 
    canNextPage, 
    canPreviousPage, 
  } = tableInstance;
  
  initialState.pageSize = 5;

  const [viewData, setViewData] = useState(undefined)
  const [showView, setShowView] = useState(false)

  const toggleView = (id) => {
    console.log(id)
    setViewData(() => {
      return (supports.filter((value) => value._id === id))[0]
    })
    setShowView(!showView)
  }

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div class="relative flex items-center justify-between pt-4">
        <div class="text-xl font-bold text-navy-700">Complex Table</div>
        <CardMenu />
      </div>
      <div class="mt-8 overflow-x-scroll">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <p className="text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                      {/* Render the columns filter UI */}
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </p>
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
                    if (cell.column.Header === "Sr No.") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {cell.value}
                        </p>
                      );
                    }
                    if (cell.column.Header === "Issue") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {cell.value}
                        </p>
                      );
                    }
                    if (cell.column.Header === "From") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {cell.value}
                        </p>
                      );
                    }
                    if (cell.column.Header === "Note") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {cell.value}
                        </p>
                      );
                    }
                    if (cell.column.Header === "Screenshots") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 mx-4">
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
                             </p>
                      );
                    }
                    if (cell.column.Header === "Resolved") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {`${cell.value}`}
                        </p>
                      );
                    }
                    if (cell.column.Header === "Actions") {
                      console.log(row.original._id)
                      data = (
                        <DropDownForSupport
                          id={row.original._id}
                          resolved={row.original.resolved}
                          toggleView={toggleView}
                          refresh={getSupportData}
                        />
                      );
                    }

                    return (
                      <td
                        className="pt-[14px] pb-[18px] sm:text-[14px]"
                        {...cell.getCellProps()}
                        style={{ width: `${cell.column.width}px` }}
                        key={index}
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
      <div className="flex justify-between">
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          back ←
        </Button>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          next →
        </Button>
      </div>
      <View open={showView} viewData={viewData} toggleView={toggleView} />
    </Card>
  );
};

export default SupportTable;
