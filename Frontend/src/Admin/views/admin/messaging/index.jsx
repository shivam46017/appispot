import React, { useEffect, useState } from 'react'
import CheckTable from './components/CheckTable'
import { columnsDataCheck, columnsDataListers, columnsDataSpots } from './variables/columnsData'
import tableDataCheck from './variables/tableDataCheck'
import DailyTraffic from '../default/components/DailyTraffic'
import PieChartCard from '../default/components/PieChartCard'
import Widget from '../../../components/widget/Widget'
import { BsPeopleFill, BsPerson, BsPersonCircle } from 'react-icons/bs'
import ChatBox from '../../../../User/components/UserManager/views/admin/discountMagement/ChatBox'
import { BiSend } from 'react-icons/bi'

function Messaging() {

    const [currentChat, setCurrentChat] = useState(0)
    const [broadcastChats, setBroadcastChats] = useState(["Hey everyone!"])
    const [message, setMessage] = useState("")

    const [chats, setChats] = useState([
        {
            senderId: 5127312,
            senderName: "User 1",
            receiverId: 3542625,
            receiverName: "User 3",
            message: [
                {
                    text: "Hey!",
                    timestamps: "12:00 PM",
                },
                {
                    text: "Hey 2!",
                    timestamps: "12:00 PM",
                }
            ],
            time: "12:00 PM",
            type: "broadcast",
        },
        {
            senderId: 5127312,
            senderName: "User 1",
            receiverId: 5627644,
            receiverName: "User 5",
            message: [
                {
                    text: "Hey!",
                    timestamps: "12:00 PM",
                },
                {
                    text: "Hey!",
                    timestamps: "12:00 PM",
                }
            ],
            time: "12:00 PM",
            type: "broadcast",
        },
        {
            senderId: 5127312,
            senderName: "User 1",
            receiverId: 63457347,
            receiverName: "Some great user",
            message: [
                {
                    text: "Yo!",
                    timestamps: "12:00 PM",
                },
                {
                    text: "How r you?",
                    timestamps: "12:00 PM",
                }
            ],
            time: "12:00 PM",
            type: "broadcast",
        },
    ])

    async function broadcast () {
        const response = await fetch("https://appispot.com/api/broadcast", {
            method: "POST",
            body: JSON.stringify({
                message: message
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();

        setBroadcastChats([...broadcastChats, message])
        if(data){
            console.log(data)
            setMessage("")
        } else {
            console.log(data)
        }
    }


    useEffect(() => {
        getAllMessages()
    }, [])

    const getAllMessages = async ()=>{
        const response = await fetch(`https://appispot.com/api/conversation/getAll`)
        const data = await response.json()
        console.log(data)

        if(data){
            setChats(data)
        } else {
            console.log(data)
        }
    }

  return (
    <div className='flex flex-row border-t border-gray-400 min-h-[67vh]'>

        <div className="flex flex-col gap-2 border-r border-r-gray-500 overflow-y-auto max-h-[68vh]">
            <input type="text" className="w-full h-10 border-none border-b-2 outline-none bg-transparent" placeholder="Search"/>
                <div className="flex flex-row gap-3 items-center p-1 border-b border-b-gray-300 bg-slate-200 px-5 pr-16 min-w-96" onClick={()=>{setCurrentChat("broadcast")}}>
                    <BsPeopleFill className="text-2xl text-blue-800"/>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-semibold">Broadcast</h1>
                        <p className="text-sm text-gray-500">Last Message</p>
                    </div>
                </div>
            {
                chats.map((chat, index) => (
                    <div key={index} className="flex flex-row gap-3 items-center p-1 border-b border-b-gray-300 px-5 pr-16 min-w-96 cursor-pointer" onClick={()=>{setCurrentChat(index)}}>
                        <BsPersonCircle className="text-2xl text-blue-700"/>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-semibold">{chat.receiverName}</h1>
                            <p className="text-sm text-gray-500">{chat.message[chat.message.length-1].text}</p>
                        </div>
                    </div>
                ))
            }
        </div>
            
        <div className="flex flex-col grow">
            {/* <div className="flex flex-row justify-between items-center p-3 border-b border-b-gray-500"> */}
                <div className="flex flex-row gap-5 p-4 items-center">
                    <BsPersonCircle className="text-2xl text-gray-500"/>
                    <div className="flex flex-col grow">
                        <h1 className="text-lg font-semibold">{currentChat != "broadcast" ? chats[currentChat].receiverName : "Broadcast"}</h1>
                    </div>
                    {
                        currentChat == "broadcast" &&
                    <select name="receiver" id="receiver" className='border flex gap-10 border-gray-300 rounded-md p-2'>
                        <option value="" disabled>Select the receivers</option>
                        <option value="5127312" selected>Users</option>
                        <option value="3542625">Listers</option>
                    </select>
                    }
                </div>

                <div className="flex flex-col px-4 py-1.5 grow bg-gray-300 overflow-y-auto max-h-[52vh]">
                    {
                        currentChat != "broadcast" ? chats[currentChat].message.map((message, index) => (
                            <ChatBox key={index} sender={message.senderId === 5127312 ? 0 : 1} message={message.text}/>
                        )) : broadcastChats.map((message, index) => (
                            <ChatBox key={index} sender={0} message={message}/>
                        ))
                    }
                </div>

                <div className="flex flex-row w-full h-fit items-center">
                    <input type="text" className="w-full h-full border outline-none bg-transparent" placeholder="Type a message" value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
                    <button className="text-gray-500 hover:text-gray-700">
                        <BiSend className="text-2xl fill-amber-600 border mx-2" onClick={broadcast} />
                    </button>
                </div>
            {/* </div> */}
        </div>
    </div>
  )
}

export default Messaging