import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { useMemo } from "react";
import CardMenu from "../../../../components/card/CardMenu";
import Card from "../../../../components/card/index";
import Progress from "../../../../components/progress/index";
import { PencilIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { BsFilePdf } from "react-icons/bs";
const ComplexTable = (props) => {
  const { columnsData, tableData, tableName } = props;

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
  initialState.pageSize = 5;

  return (
    <Card extra={"w-full h-full p-4 overflow-x-scroll"}>
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 ">{tableName}</div>
        <CardMenu />
      </div>

      <div className="mt-8 h-full">
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

                    if (cell.column.Header === "SPOT NAME") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "PRICE/HOUR") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          $ {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "STATUS") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "TOTAL PRICE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          $ {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "DOWNLOAD INVOICE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 text-center w-full">
                          <a href={cell.value} target="_blank">
                            <BsFilePdf className="w-6 h-8 text-gray-500 cursor-pointer" />
                          </a>
                        </p>
                      );
                    } else if (cell.column.Header === "HOURS") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "GUESTS") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "DATE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "IMAGE") {
                      data = <img src={cell.value} className="w-14 h-10" />;
                    } else if (cell.column.Header === "LOCATION") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "RULES") {
                      data = cell.value?.map((item, index) => {
                        return (
                          <p className="text-sm font-bold text-navy-700 ">
                            {item}
                          </p>
                        );
                      });
                    } else if (cell.column.Header === "AMENITIES") {
                      data = cell?.value?.map((item, index) => {
                        return (
                          <p className="text-sm font-bold text-navy-700 ">
                            {item}
                          </p>
                        );
                      });
                    } else if (cell.column.Header === "CATEGORIES") {
                      data = cell?.value?.map((item, index) => {
                        return (
                          <p className="text-sm font-bold text-navy-700 ">
                            {item}
                          </p>
                        );
                      });
                    } else if (cell.column.Header === "EDIT") {
                      data = (
                        <Link
                          to="/listspot"
                          state={{
                            spotId: cell.row.original._id,
                            spotName: cell.row.original.spotName,
                            spotDescription: cell.row.original.spotDescription,
                            spotPrice: cell.row.original.spotPrice,
                            spotAddress: cell.row.original.spotAddress,
                            spotCity: cell.row.original.spotCity,
                            spotState: cell.row.original.spotState,
                            spotZip: cell.row.original.spotZip,
                            spotRules: cell.row.original.spotRules,
                            spotAmenities: cell.row.original.spotAmenities,
                            spotCategories: cell.row.original.spotCategories,
                          }}
                        >
                          <PencilIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                        </Link>
                      );
                    } else if (cell.column.Header === "DESCRIPTION") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 ">
                          {cell.value}
                        </p>
                      );
                    }
                    // else if (cell.column.Header === "STATUS") {
                    //   data = (
                    //     <div className="flex items-center gap-2">
                    //       <div className={`rounded-full text-xl`}>
                    //         {cell.value === true ? (
                    //           <MdCheckCircle className="text-green-500" />
                    //         ) : cell.value === false ? (
                    //           <MdCancel className="text-red-500" />
                    //         ) : cell.value === "Error" ? (
                    //           <MdOutlineError className="text-orange-500" />
                    //         ) : null}
                    //       </div>
                    //       <p className="text-sm font-bold text-navy-700 ">
                    //         {cell.value}
                    //       </p>
                    //     </div>
                    //   );
                    // }
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
  );
};

export default ComplexTable;
