import { useEffect } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { useMemo, useState } from "react";
import CardMenu from "../../../../components/card/CardMenu";
import Card from "../../../../components/card/index";
import Progress from "../../../../components/progress/index";
import View from "../components/View";
import Edit from "../components/Edit";
import axios from "axios";

const ComplexTable = (props) => {
  const { columnsData, tableName } = props;

  const columns = useMemo(() => columnsData, [columnsData]);

  const [tableData, setTableData] = useState([]);
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
  initialState.pageSize = 5;

  async function fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/getAllSellers"
      );
      let resData = response.data.Seller;
      console.log(resData);
      setTableData(resData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
        <div className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 ">{tableName}</div>
          <CardMenu />
        </div>

        <div className="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
          <table {...getTableProps()} className="w-full">
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={index}
                      className="border-b border-gray-200 pr-20 pb-[10px] text-start "
                    >
                      <p className="text-xs tracking-wide text-gray-600">
                        {column.render("Header")}
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

                      if (cell.column.Header === "Name") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 ">
                            {cell.value}
                          </p>
                        );
                      }

                      if (cell.column.Header === "Email") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 ">
                            {cell.value}
                          </p>
                        );
                      }

                      if (cell.column.Header === "Total Spots Listed") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 ">
                            {cell.value}
                          </p>
                        );
                      }

                      if (cell.column.Header === "Actions") {
                        data = (
                          <p className="text-sm font-bold text-navy-700 ">
                            {cell.value}
                          </p>
                        );
                      }

                      if (cell.column.Header === "Active") {
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
                              {cell.value ? "Active" : "Blocked"}
                            </p>
                          </div>
                        );
                      }
                      return (
                        <td
                          className="pt-[14px] pb-[18px] sm:text-[14px]"
                          {...cell.getCellProps()}
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
      </Card>
    </>
  );
};

export default ComplexTable;
