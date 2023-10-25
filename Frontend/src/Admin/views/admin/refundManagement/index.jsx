import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import RefundTable from "./tables/refundTable";

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
            Header: 'Sr No.',
            accessor: 'srno',
            Filter: DefaultColumnFilter, 
            disableFilters: false,
            width: 200 
        },
        {
            Header: 'Issue',
            accessor: 'issue',
            Filter: DefaultColumnFilter, 
            disableFilters: false,
            width: 200 
        },
        {
            Header: 'From',
            accessor: (row) => row.from.firstName + " " + row.from.lastName,
            Filter: DefaultColumnFilter, 
            disableFilters: false,
            width: 200 
        },
        {
            Header: 'Note',
            accessor: 'note',
            Filter: DefaultColumnFilter, 
            disableFilters: false,
            width: 200 
        },
        {
            Header: 'Resolved',
            accessor: 'resolved',
            Filter: DefaultColumnFilter, 
            disableFilters: false,
            width: 200 
        },
        {
            Header: 'Screenshots',
            accessor: 'screenshots',
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
            <RefundTable
                columnsData={supportTableHeader}
                tableName="Refunds"
            />
        </div>
    );
}

export default RefundManagement;
