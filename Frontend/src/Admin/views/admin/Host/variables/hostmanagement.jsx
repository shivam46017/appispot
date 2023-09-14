import DropDownMenuForActions from '../components/DropDown';

export const HostManagementVar = [
  {
    Header: "Name",
    accessor: (row) => row.firstName + " " + row.lastName,
  },
  {
    Header: "Email",
    accessor: "emailId",
  },
  {
    Header: "Active",
    accessor: "isActive",
  },
  {
    Header: "Total Spots Listed",
    accessor: (row) => row.yourSpots.length,
  },
  {
    Header: "Actions",
    accessor: (row) => (
      <DropDownMenuForActions id={row._id}/>
    ),
  },
];
