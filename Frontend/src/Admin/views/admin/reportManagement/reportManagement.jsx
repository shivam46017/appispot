import React, { useEffect, useState } from 'react'
import CheckTable from './components/CheckTable'
import { columnsDataCheck, columnsDataListers, columnsDataSpots } from './variables/columnsData'
import tableDataCheck from './variables/tableDataCheck'
import DailyTraffic from '../default/components/DailyTraffic'
import PieChartCard from '../default/components/PieChartCard'
import Widget from '../../../components/widget/Widget'

function ReportManagement() {

    const [users, setusers] = useState([
        {
            "spotName": ["Astrid Farmhouse", false],
            "user": "Kumar",
            "date": "Apr 26, 2022",
            "spotAddress": "Some Address, Some City, Some State, 123456",
            "price": 39,
            "lister": "Tony Stark",
            "progress": 150
          },
          {
            "spotName": ["Apex City 1", true],
            "user": "Yadav",
            "date": "Jul 20, 2022",
            "spotAddress": "C-234, West Patel Nagar, New Delhi, 110008",
            "price": 59,
            "lister": "Gregory K.",
            "progress": 59
          },
          {
            "spotName": ["Random Spot", true],
            "user": "Nitish",
            "date": "Sep 30, 2022",
            "spotAddress": "Some Address, Some City, Some State, 123456",
            "price": 149,
            "lister": "John D. Rockerfeller",
            "progress": 149
          },
          {
            "spotName": ["Apex City 2", true],
            "user": "Rajeev",
            "date": "Oct 24, 2022",
            "spotAddress": "Trial Address, Trial City, Trial State, 123456",
            "price": 299,
            "lister": "Flinch A.",
            "progress": 100
          },
          {
            "spotName": ["Guest Spot", false],
            "user": "User 2",
            "date": "Nov 29, 2022",
            "spotAddress": "A-40, Tagore Garden, New Delhi, 110027",
            "price": 119,
            "lister": "Rodrick Ample",
            "progress": 75.5
          },
          {
            "spotName": ["Marketplace", false],
            "user": "User 3",
            "date": "Apr 26, 2022",
            "spotAddress": "Thruway Shopping Center, Some State, 123456",
            "price": 89,
            "lister": "Tyrion Lannister",
            "progress": 75.5
          },
          {
            "spotName": ["Venus DB PRO", true],
            "user": "User 4",
            "date": "Jul 20, 2022",
            "spotAddress": "Asgard, Flat No. 123, Some City, Some State, 123456",
            "price": 399,
            "lister": "Stephenn A.",
            "progress": 35.4
          }
    ])

    const [bestSpots, setbestSpots] = useState([
        {
            "spotName": ["Astrid Farmhouse", false],
            "spotAddress": "Some Address, Some City, Some State, 123456",
            "price": 39,
            "lister": "Tony Stark",
            "noOfBookings": 150
        },
        {
            "spotName": ["Apex City 1", true],
            "spotAddress": "C-234, West Patel Nagar, New Delhi, 110008",
            "price": 59,
            "lister": "Gregory K.",
            "noOfBookings": 59
        },
        {
            "spotName": ["Random Spot", true],
            "spotAddress": "Some Address, Some City, Some State, 123456",
            "price": 149,
            "lister": "John D. Rockerfeller",
            "noOfBookings": 149
        },
        {
            "spotName": ["Apex City 2", true],
            "spotAddress": "Trial Address, Trial City, Trial State, 123456",
            "price": 299,
            "lister": "Flinch A.",
            "noOfBookings": 100
        },
        {
            "spotName": ["Guest Spot", false],
            "spotAddress": "A-40, Tagore Garden, New Delhi, 110027",
            "price": 119,
            "lister": "Rodrick Ample",
            "noOfBookings": 75.5
        }
    ])

    const [bestListers, setbestListers] = useState([
        {
            "lister": "Tony Stark",
            "noOfListings": 20,
            "noOfBookings": 1500,
            "totalEarnings": 39
        },
        {
            "lister": "Gregory K.",
            "noOfListings": 10,
            "noOfBookings": 590,
            "totalEarnings": 59
        },
        {
            "lister": "John D. Rockerfeller",
            "noOfListings": 5,
            "noOfBookings": 1490,
            "totalEarnings": 149
        },
        {
            "lister": "Flinch A.",
            "noOfListings": 2,
            "noOfBookings": 1000,
            "totalEarnings": 299
        },
    ])

    const [ordersDaywise, setordersDaywise] = useState([])

    async function fetchBookings() {
        const response = await fetch("http://localhost:5000/api/get-all-orders")
        const data = await response.json()

        setusers(data.allBookings)
        console.log("data", data)
    }

    async function fetchTopSpots() {
        const response = await fetch("http://localhost:5000/api/get-most-booked-spots")
        const data = await response.json()

        console.log("data", data)

        let obj=[]
        data.mostBookedArr.map((spot)=>{
            obj = [...obj, spot[1]]
        })
        setbestSpots(obj)
        console.log(bestSpots)
    }

    async function fetchTopListers(){
      const response = await fetch("http://localhost:5000/api/get-most-booked-listers")
      const data = await response.json()

      console.log("data", data)

      let obj=[]
      data.mostBookedListersArr.map((lister)=>{
          obj = [...obj, lister[1]]
      })
      setbestListers(obj)
      console.log(bestListers)
      
    }

    useEffect(() => {
        fetchBookings()
        fetchTopSpots()
        fetchTopListers()

        // Making the daywise orders array
        let obj = []
        let date = new Date()
        let today = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        let day = date.getDay()
        let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        let dayNum = [0, 1, 2, 3, 4, 5, 6]
        let daywiseOrders = []
        let daywiseOrdersObj = {}
        let daywiseOrdersObjArr = []
        let daywiseOrdersObjArrFinal = []

        users.map((user) => {
            let date = user.date.split(" ")
            let day = date[1].split(",")[0]
            let month = date[0]
            let year = date[2]
            let dayNum = new Date(`${month} ${day}, ${year}`).getDay()
            obj = [...obj, dayNum]
        }
        )

        for (let i = 0; i < 7; i++) {
            daywiseOrders.push(obj.filter((num) => num === i).length)
        }

        for (let i = 0; i < 7; i++) {
            daywiseOrdersObj = {
                "day": dayName[i],
                "orders": daywiseOrders[i]
            }
            daywiseOrdersObjArr = [...daywiseOrdersObjArr, daywiseOrdersObj]
        }

        for (let i = 0; i < 7; i++) {
            daywiseOrdersObjArrFinal = [...daywiseOrdersObjArrFinal, daywiseOrdersObjArr[dayNum.indexOf(i)]]
        }

        setordersDaywise(daywiseOrdersObjArrFinal)
        console.log("daywiseOrdersObjArrFinal", daywiseOrdersObjArrFinal)

    }, [])

  return (
    <div className='flex-row grid grid-cols-1'>
        <CheckTable 
            columnsData={columnsDataCheck}
            tableData={users}
            total={users.map((user) => user.price).reduce((prev, next) => prev + next, 0)}
          />
          <div className='my-8 grid grid-cols-2 gap-5'>
            <CheckTable title="Best Selling Spots" columnsData={columnsDataSpots} tableData={bestSpots} />
            <CheckTable title="Top Spots Listers" columnsData={columnsDataListers} tableData={bestListers} />
            <DailyTraffic />
            <PieChartCard />
          </div>
            
    </div>
  )
}

export default ReportManagement