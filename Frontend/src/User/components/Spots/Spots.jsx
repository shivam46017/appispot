import { useEffect, useState } from "react";
import Filter from "./Filter";
import SearchBox from "./SearchBox";
import { Grid } from "@mui/material";
import AminitiesBar from "./CategoryFilterBar";
import axios from "axios";
import { useLocation } from "react-router-dom";

// assets
import addressNotFound from '../../../../public/searchpage/Adress Not Found Graphic.svg'

function Spots() {
  const location = useLocation();
  const [spots, setSpots] = useState([]);

  const getAllSpots = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/getallspots${location.search}`
    );
    const data = res.data.spots;
    // console.log({spots: data})
    setSpots(data);
    console.log(data, "%spots");
  };

  useEffect(() => {
    getAllSpots();
  }, []);

  return (
    <Grid container paddingTop={15} rowGap={3}>
      <Grid xs={12} display={"flex"} justifyContent={"center"}>
        <SearchBox />
      </Grid>
      <Grid xs={12} display={"flex"} justifyContent={"center"}>
        <AminitiesBar />
      </Grid>
      <Grid xs={12}>
        {spots.length === 0 ? (
          <div className="w-full h-full grid place-items-center">
            <img src={addressNotFound} alt="" className="w-1/2"/>
            <h1 className="font-bold text-5xl">Not found</h1>
          </div>
        ) : (
          <Filter spots={spots} />
        )}
      </Grid>
    </Grid>
  );
}

export default Spots;
