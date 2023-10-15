
const taxTableHeader = [
    {
        Header: 'State',
        accessor: 'state'
    },
    {
        Header: 'City',
        accessor: (row) => row.cities[0].name
    },
    {
        Header: 'TaxRate',
        accessor: 'city'
    }
]

export default taxTableHeader