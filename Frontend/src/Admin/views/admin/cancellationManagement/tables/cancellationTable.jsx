import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
  useFilters, // new import
} from "react-table";
import { useMemo } from "react";
import CardMenu from "../../../../components/card/CardMenu";
import Card from "../../../../components/card";
import { Button } from "@mui/material";
import DropDownForSupport from "../components/DropDownForCancellation";
import { useState } from "react";
import View from "../components/View";
import { useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types'


const CancellationTable = (props) => {
  const { columnsData } = props;

  const [cancellations, setCancellation] = useState([
    {
      bookingId: "BK0001",
      client: "Sahil Pal",
      spot: "Safari villa",
      refundAmt: 400,
      status: "Not approved",
      hostName: "Shivam pal",
      hostPhone: "(phone not avl) shivampal468@gmail.com",
      reason: "Personal emergencies",
    },
  ]);

  const getCancellations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/cancellations"
      );
      setCancellation(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCancellations();
  }, []);
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => cancellations, [cancellations]);

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

  const [viewData, setViewData] = useState(undefined);
  const [showView, setShowView] = useState(false);

  const toggleView = (id) => {
    console.log(id);
    setViewData(() => {
      return cancellations.filter((value) => value._id === id)[0];
    });
    setShowView(!showView);
  };

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700">{props.tableName}</div>
        <CardMenu />
      </div>
      <div className="mt-8 overflow-x-scroll">
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
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
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
                    if (cell.column.Header === "Booking ID") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {cell.value}
                        </p>
                      );
                    }
                    if (cell.column.Header === "Spot") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {cell.value}
                        </p>
                      );
                    }
                    if (cell.column.Header === "Client") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {cell.value}
                        </p>
                      );
                    }
                    if (cell.column.Header === "Host Name") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {cell.value}
                        </p>
                      );
                    }
                    if (cell.column.Header === "Host Phone") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {cell.value}
                        </p>
                      );
                    }
                    if (cell.column.Header === "Reason") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {cell.value}
                        </p>
                      );
                    }
                    if (cell.column.Header === "Refund Amt") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {`$${cell.value}`}
                        </p>
                      );
                    }
                    if (cell.column.Header === "Status") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {`${cell.value}`}
                        </p>
                      );
                    }
                    if (cell.column.Header === "Actions") {
                      console.log(row.original._id);
                      data = (
                        <DropDownForSupport
                          id={row.original._id}
                          resolved={row.original.resolved}
                          toggleView={toggleView}
                          refresh={() => ""}
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

CancellationTable.propTypes = {
  tableName: PropTypes.string,
  columnsData: PropTypes.any
}

export default CancellationTable;
