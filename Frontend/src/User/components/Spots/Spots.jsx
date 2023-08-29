import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import SearchBox from "./SearchBox";
import { Grid } from "@mui/material";
import axios from "axios";
import AminitiesBar from "./AminitiesBar";

function Spots() {
  return (
    // <>
    //   <section className="text-black body-font lg:px-16 py-10 mt-20">
    //     <SearchBox />
    //     <Filter />
    //   </section>
    // </>

    <Grid container paddingTop={15} rowGap={3}>
      <Grid xs={12} display={'flex'} justifyContent={'center'}>
        <SearchBox />
      </Grid>
      <Grid xs={12} display={'flex'} justifyContent={'center'}>
        <AminitiesBar/>
      </Grid>
      <Grid xs={12}>
        <Filter />
      </Grid>
    </Grid>
  );
}

export default Spots;
