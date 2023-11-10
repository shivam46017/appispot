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


function SupportManagement() {
    const supportTableHeader = [
        {
            Header: 'Sr No.',
            accessor: 'srno',
            Filter: DefaultColumnFilter, 
            disableFilters: false,
            width: 200 
        },
        {
            Header: 'Booking ID',
            accessor: 'bookingId',
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
            <SupportTable
                columnsData={supportTableHeader}
                tableName="Support"
            />
        </div>
    );
}

export default SupportManagement;
