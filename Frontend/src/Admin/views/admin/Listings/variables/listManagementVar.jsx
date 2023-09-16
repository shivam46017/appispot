import DropDownMenuForActions from '../components/DropDown';

export const ListingsManagementVar = [
  {
    Header: "Created At",
    accessor: (row) => new Date(row.createdAt).toLocaleString()
  },
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
    Header: "Amenities",
    accessor: (row) => row.Amenities.map((data) => data.amenityIcon)
  },
  {
    Header: "Categories",
    accessor: (row) => row.Categories.map((data) => data.categoryIcon)
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
    Header: "City",
    accessor: (row) => row.Location.city
  },
  {
    Header: "State",
    accessor: (row) => row.Location.state
  },
  {
    Header: "Road Name",
    accessor: (row) => row.Location.roadName
  },
  {
    Header: "Address",
    accessor: (row) => row.Location.address
  },
  {
    Header: "Actions",
  }
];
