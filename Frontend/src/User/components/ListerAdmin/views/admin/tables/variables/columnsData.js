export const columnsDataDevelopment = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "TECH",
    accessor: "tech",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
];

export const columnsDataCheck = [
  {
    Header: "FIRSTNAME",
    accessor: "firstName",
  },
  {
    Header: "LASTNAME",
    accessor: "lastName",
  },
  {
    Header: "EMAIL",
    accessor: "emailId",
  },
  {
    Header: "STATUS",
    accessor: "isActive",
  },
];

export const columnsDataColumns = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
];

export const columnsDataComplex = [
  {
    Header: "IMAGE",
    accessor: "coverImage",
  },
  {
    Header: "SPOT NAME",
    accessor: "Name",
  },
  {
    Header: "PRICE/HOUR",
    accessor: "Price",
  },
  {
    Header: "LOCATION",
    accessor: "Location",
  },
  {
    Header: "DESCRIPTION",
    accessor: "Description",
  },
  {
    Header: "RULES",
    accessor: "Rules",
  },
  {
    Header: "AMENITIES",
    accessor: "Amenities",
  },
  {
    Header: "CATEGORIES",
    accessor: "Categories",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "EDIT",
    accessor: "timing",
  }
];

export const columnsDataComplex2 = [
  {
    Header: "SPOT NAME",
    accessor: "Name",
  },
  {
    Header: "PRICE/HOUR",
    accessor: (row) => `$${row.Price}/hr`,
  },
  {
    Header: "HOURS",
    accessor: "hours",
  },
  {
    Header: "GUESTS",
    accessor: "guests",
  }
];