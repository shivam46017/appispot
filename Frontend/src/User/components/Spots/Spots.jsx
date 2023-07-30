import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import axios from "axios";

function Spots() {
  return (
    <>
      <section className="text-black body-font lg:px-16 py-10 mt-20">
        <Filter />
      </section>
    </>
  );
}

export default Spots;
