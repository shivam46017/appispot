import React, { useEffect, useState } from 'react'
import AllUser from '../tables/components/AllUser'
import { columnsDataCheck, columnsDataColumns, listingDataHeaders } from '../default/variables/columnsData'
import axios from 'axios';
import Listings from '../tables/components/Listings';

function BookingManagement() {

    const [bookings, setbookings] = useState([]);

    useEffect(()=>{
        async function fetchData() {
            try {
              const data = await axios.get(
                "https://appispot.com/api/get-orders"
              );
              console.log(data.data.success)
                if (data.data.success === true){
                    setbookings(data.data.orders);
                } else {
                    console.log("Error")
                }
            } catch (err) {
              console.log(err);
            }
          }
          fetchData()
    }, [])
  return (
    <div>
        <Listings
          tableName="All Bookings"
          columnsData={listingDataHeaders}
          tableData={bookings}
        />
    </div>
  )
}

export default BookingManagement