import DropDownMenuForActions from "../components/DropDown";

export const ListingsManagementVar = [
  {
    Header: "Created At",
    accessor: (row) => new Date(row.createdAt).toLocaleString(),
  },
  {
    Header: "Lister",
    accessor: (row) => row.lister.firstName + " " + row.lister.lastName,
  },
  {
    Header: "Name",
    accessor: "Name",
  },
  {
    Header: "Description",
    accessor: (row) => row.Description.slice(0, 80) + "...",
  },
  {
    Header: "Price",
    accessor: "Price",
  },
  {
    Header: "Images",
    accessor: "Images",
  },
  {
    Header: "Documents",
    accessor: "docs",
  },
  {
    Header: "Amenities",
    accessor: (row) => row.Amenities.map((data) => data.amenityIcon),
  },
  {
    Header: "Categories",
    accessor: (row) => row.Categories.map((data) => data.categoryIcon),
  },
  {
    Header: "Area (SqFt)",
    accessor: (row) => `${row.SqFt} SqFt`,
  },
  {
    Header: "City",
    accessor: (row) => row.Location.city,
  },
  {
    Header: "State",
    accessor: (row) => row.Location.state,
  },
  {
    Header: "Road Name",
    accessor: (row) => row.Location.roadName,
  },
  {
    Header: "Address",
    accessor: (row) => row.Location.address,
  },
  {
    Header: "Opening Time",
    accessor: (row) => {
      let opening = []
      for (const key in row.Timing) {
        if (row.Timing[key].open !== 'hh:mm' && row.Timing[key].open) {
          opening.push({ day: key, val: row.Timing[key].open })
        }
      }
      return opening
    }
  },
  {
    Header: "Closing Time",
    accessor: (row) => {
      let closing = []
      for (const key in row.Timing) {
        if (row.Timing[key].close !== 'hh:mm' && row.Timing[key].close) {
          closing.push({ day: key, val: row.Timing[key].close })
        }
      }
      return closing
    }
  },
  {
    Header: "Holiday's",
    accessor: (row) =>
      Object.entries(row.Timing).map((data) => {
        if (data[1].holiday === true) {
        return { day: data[0], val: "Holiday" };
        } else return
      }),
    width: 500,
  },
  {
    Header: "Status",
    accessor: "isApproved",
  },
  {
    Header: "Actions",
  },
];
