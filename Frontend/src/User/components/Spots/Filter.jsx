import React, { Fragment, useContext, useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import searchContext from "../../../context/search/searchContext";

export default function Filter() {
  const {
    query,
  } = useContext(searchContext);

  const [spots, setSpots] = useState([]);

  const getAllSpots = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/getallspots${query}`
    );
    const data = res.data.spots;
    // console.log({spots: data})
    setSpots(data);
    console.log(data, "%spots");
  };

  useEffect(() => {
    getAllSpots();
  }, [query]);

  const [areaRange, setAreaRange] = useState([]);

  useEffect(() => {
    setAreaRange([
      Math.min(...spots.map((data) => data.SqFt)),
      Math.max(...spots.map((data) => data.SqFt)),
    ]);
  }, []);


  return (
    <div className="bg-white">
      <div className="h-fit flex flex-col">
        <main className="mx-auto max-w-full px-1 sm:px-6 lg:w-screen lg:px-32">
          <section
            aria-labelledby="products-heading"
            className="pt-6 pb-6 ml-0"
          >

            {/* Product grid */}
            <div className="lg:col-span-3 flex flex-col gap-12">
              {/* Your content */}
              {spots.map((item, index) => {
                console.log(item);
                return <Cards key={index} {...item} />;
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
