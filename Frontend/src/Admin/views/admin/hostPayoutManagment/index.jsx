import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import SupportTable from "./tables/payoutTable";

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


function HostPayoutManagement() {
    const supportTableHeader = [
        {
            Header: 'refund ?',
            width: 200 
        },
        {
            Header: 'spot',
            width: 200 
        },
        {
            Header: 'seller',
            width: 200 
        },
        {
            Header: 'amt',
            width: 200 
        },
        {
            Header: 'approve',
            width: 200 
        },
        ]    

    return (
        <div>
            <SupportTable
                columnsData={supportTableHeader}
                tableName="Payout"
            />
        </div>
    );
}

export default HostPayoutManagement;
