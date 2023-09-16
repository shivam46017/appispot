import React, { useEffect, useState } from 'react'
import ReviewsTable from '../tables/components/ReviewsTable'
import axios from 'axios';
import { reviewListColumns } from '../default/variables/columnsData';

function ReviewManagement() {

    const [reviews, setreviews] = useState([])

    async function fetchData() {
        try {
            const data = await axios.get(
                "https://many-aerial-innovation-programming.trycloudflare.com/api/get-all-reviews"
            );
            console.log(data.data)
            if (data.data.success === true) {
                setreviews(data.data.reviews);
            } else {
                console.log("Error")
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchData()
    }, [])

  return (
    <div>
        <ReviewsTable
            tableName="All Reviews"
            columnsData={reviewListColumns}
            tableData={reviews}
        />
    </div>
  )
}

export default ReviewManagement