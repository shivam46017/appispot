import React, { useMemo } from "react";
import CardMenu from '../../../../components/card/CardMenu';
import Checkbox from '../../../../components/checkbox/index';
import Card from '../../../../components/card/index';
import { ExportToCsv } from 'export-to-csv';
// import { generate } from 'csv-generate'
// import assert from 'assert'


import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const CheckTable = (props) => {
  const { columnsData, tableData } = props;

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

  function downloadInCsv() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'AppiSpot Reports',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(props.tableData);
    console.log("Gebnerated CSV")

  }


  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6 border-2 rounded-lg px-1 py-3 mt-2 mx-2"}>
      <header className="relative flex items-center justify-between pt-4 ">
        <div className="text-xl font-bold text-navy-700">
          {
            props.title ? props.title : "Report Management"
          }
        </div>

        <div className="flex flex-row">
        <CardMenu />
        <div className="flex items-center justify-center">
          <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer ">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <button className="mb-3 border-2 px-3 border-[#797979] mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer" onClick={downloadInCsv}>
          Download in CSV/Excel
        </button>
        </div>
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden h-96 overflow-y-scroll  no-scrollbar">
        <table
          {...getTableProps()}
          className="w-full "
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
          <tbody {...getTableBodyProps()} >
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "SPOT NAME") {
                      data = (
                        <div className="flex ">
                          <p className="text-sm font-bold text-navy-700 mr-2 pr-2.5">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "BOOKED BY") {
                      data = (
                        <div className="flex">
                          <p className="text-sm font-bold text-navy-700">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "LISTED BY") {
                      data = (
                        <div className="flex">
                          <p className="text-sm font-bold text-navy-700">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "BOOKED ON") {
                      data = (
                        <p className="text-sm font-bold text-navy-700">
                          {" "}
                          {cell.value}{" "}
                        </p>
                      );
                    } else if (cell.column.Header === "DATE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "SPOT ADDRESS") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 pr-3">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "PRICE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700">
                          ${cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "LISTER") {
                      data = (
                        <p className="text-sm font-bold text-navy-700">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "NO. OF BOOKINGS") {
                      data = (
                        <p className="text-sm font-bold text-navy-700">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "NO. OF LISTINGS") {
                      data = (
                        <p className="text-sm font-bold text-navy-700">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "TOTAL EARNINGS") {
                      data = (
                        <p className="text-sm font-bold text-navy-700">
                          ${cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "PRICE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700">
                          ${cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "PRICE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700">
                          ${cell.value}
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
      {
      !props.title && <span className={
        "font-bold text-lg self-end mr-20 mt-2 pt-2.5 border-black pl-32 pr-1 border-t-2"
      }>This Month's Total: ${props.total}</span>
      }
    </Card>
  );
};

export default CheckTable;
