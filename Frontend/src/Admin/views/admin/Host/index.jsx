import { HostManagementVar } from "./variables/hostmanagement.jsx"
import ComplexTable from "../tables/components/HostTable.jsx";
import AllUser from "../tables/components/AllUser.jsx";
import DevelopmentTable from "../tables/components/DevelopmentTable.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import { MdDownload } from "react-icons/md";

const Marketplace = () => {
  const [data, setData] = useState([]);
  const [blockedLister, setBlockedLister] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getAllSellers"
        );
        let resData = response.data.Seller;
        console.log(resData)
        setData(resData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <Grid container>
    <Grid item xs={12} display={'flex'} justifyContent={'end'}>
    <Button variant="contained">Download<MdDownload className="h-5 w-5 mx-2"/></Button>
    </Grid>
      <Grid item xs={12}>
        <ComplexTable
          tableName={"Hosts"}
          columnsData={HostManagementVar}
          tableData={data}
        />
      </Grid>
    </Grid>
  );
};

export default Marketplace;
