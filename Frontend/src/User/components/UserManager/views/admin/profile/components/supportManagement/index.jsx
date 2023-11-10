import { useState } from "react";
import InputField from "../../../../../components/fields/InputField";
import Card from "../../../../../components/card";
import SupportTable from "./tables/supportTable";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
      style={{
        fontSize: "1rem",
        padding: "0.5rem",
        border: "1px solid silver",
        borderRadius: "4px",
        marginBottom: "0.5rem",
        display: "block",
        width: "150px", // Updated from 100% to 250px
      }}
    />
  );
}

function SupportManagement() {
  const supportTableHeader = [
    {
      Header: "Sr No.",
      accessor: "srno",
      Filter: DefaultColumnFilter,
      disableFilters: false,
      width: 200,
    },
    {
      Header: "Booking ID",
      accessor: "bookingId",
      Filter: DefaultColumnFilter,
      disableFilters: false,
      width: 200,
    },
    {
      Header: "Issue",
      accessor: "issue",
      Filter: DefaultColumnFilter,
      disableFilters: false,
      width: 200,
    },
    {
      Header: "From",
      accessor: (row) => row.from.firstName + " " + row.from.lastName,
      Filter: DefaultColumnFilter,
      disableFilters: false,
      width: 200,
    },
    {
      Header: "Note",
      accessor: "note",
      Filter: DefaultColumnFilter,
      disableFilters: false,
      width: 200,
    },
    {
      Header: "Resolved",
      accessor: "resolved",
      Filter: DefaultColumnFilter,
      disableFilters: false,
      width: 200,
    },
    {
      Header: "Screenshots",
      accessor: "screenshots",
      Filter: DefaultColumnFilter,
      disableFilters: false,
      width: 200,
    },
    {
      Header: "Actions",
      disableFilters: true,
    },
  ];

  const [issueNo, setIssueNo] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <Card extra="w-full p-4">
        <form className="container grid grid-cols-2 gap-2">
          <div className="flex flex-col col-span-2 w-1/3">
            <label htmlFor="issue-no">Issue Number</label>
            <input
              label={"Country"}
              value={issueNo}
              className={"h-full drop-shadow-md p-4 rounded-xl border-0"}
              onChange={(e) => setIssueNo(e.target.value)}
              name="issue No"
              id="issue-no"
            />
          </div>
          <hr className="col-span-2 " />
          <Button variant="contained" className="!w-1/3" onClick={() => {
            if(issueNo.toLocaleLowerCase() === 'sr001') {
              toast.success('Issue is already resolved')
            } else {
              toast.error('No issue found with this number')
            }
          }}>
            Know Status
          </Button>
        </form>
      </Card>
      <SupportTable columnsData={supportTableHeader} tableName="Support" />
    </div>
  );
}

export default SupportManagement;
