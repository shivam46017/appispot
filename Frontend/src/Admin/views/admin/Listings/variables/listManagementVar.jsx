import DropDownMenuForActions from '../components/DropDown';

export const ListingsManagementVar = [
  {
    Header: "Name",
    accessor: "Name",
  },
  {
    Header: "Description",
    accessor: "Description",
  },
  {
    Header: "Price",
    accessor: "Price",
  },
  {
    Header: "Images",
    accessor: "Images"
  },
  {
    Header: "Area (SqFt)",
    accessor: (row) => `${row.SqFt} SqFt`
  },
  {
    Header: "Status",
    accessor: "isApproved"
  },
  {
    Header: "Actions",
  }
];
