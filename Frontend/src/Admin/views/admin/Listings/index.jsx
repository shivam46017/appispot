import { ListingsManagementVar } from "./variables/listManagementVar.jsx"
import Listings from "./table/listing-table.jsx";
import AllUser from "../tables/components/AllUser.jsx";
import DevelopmentTable from "../tables/components/DevelopmentTable.jsx";
import { useContext, useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { MdDownload } from "react-icons/md"; 


const ListingManagement = () => {

  const [page, setPage] = useState(1)
  

  return (
    <Grid container>
    <Grid item xs={12} display={'flex'} justifyContent={'end'}>
    <Button variant="contained">Download<MdDownload className="h-5 w-5 mx-2"/></Button>
    </Grid>
      <Grid item xs={12}>
        <Listings
          tableName={"Listings"}
          columnsData={ListingsManagementVar}
          pageNo={page}
        />
      </Grid>
    </Grid>
  );
};

export default ListingManagement;
