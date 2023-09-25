import { HostManagementVar } from "./variables/hostmanagement.jsx"
import HostTable from "./table/HostTable.jsx";
import AllUser from "../tables/components/AllUser.jsx";
import DevelopmentTable from "../tables/components/DevelopmentTable.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import { MdDownload } from "react-icons/md";

const HostManagement = () => {
  const [data, setData] = useState([]);
  const [blockedLister, setBlockedLister] = useState([]);



  return (
    <Grid container>
    <Grid item xs={12} display={'flex'} justifyContent={'end'}>
    <Button variant="contained">Download<MdDownload className="h-5 w-5 mx-2"/></Button>
    </Grid>
      <Grid item xs={12}>
        <HostTable
          tableName={"Hosts"}
          columnsData={HostManagementVar}
        />
      </Grid>
    </Grid>
  );
};

export default HostManagement;
