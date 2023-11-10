import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import SupportTable from "./tables/supportTable";

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
                fontSize: '1rem',
                padding: '0.5rem',
                border: '1px solid silver',
                borderRadius: '4px',
                marginBottom: '0.5rem',
                display: 'block',
                width: '150px' // Updated from 100% to 250px
            }}
        />
    );
}


function RefundManagement() {
    const supportTableHeader = [
        {
            Header: 'Booking ID',
            accessor: 'bookingId',
            Filter: DefaultColumnFilter, 
            disableFilters: false,
            width: 200 
        },
        {
            Header: 'Client',
            accessor: 'client',
            Filter: DefaultColumnFilter, 
            disableFilters: false,
            width: 200 
        },
        {
            Header: 'Spot',
            accessor: 'spot',
            Filter: DefaultColumnFilter, 
            disableFilters: false,
            width: 200 
        },
        {
            Header: 'Refund Amt',
            accessor: 'refundAmt',
            Filter: DefaultColumnFilter, 
            disableFilters: false, 
            width: 200
        },
        {
            Header: 'Status',
            accessor: 'status',
            Filter: DefaultColumnFilter, 
            disableFilters: false, 
            width: 200
        },
        {
            Header: 'Actions',
            disableFilters: true, 
        }
    ]    

    return (
        <div>
            <SupportTable
                columnsData={supportTableHeader}
                tableName="Refund"
            />
        </div>
    );
}

export default RefundManagement;
