import React, { useState, useEffect } from "react";
import DiscountCouponTable from "../../../../../../Admin/views/admin/discountCouponManagement/DiscountCouponTable";
import axios from "axios";
import { toast } from "react-toastify";
import Select from 'react-select';
import { Button } from "@mui/material";
import ChatBox from "./ChatBox";
import { MdAccountCircle } from "react-icons/md";

function DiscountMangament() {
  
  const [selectedChat, setSelectedChat] = useState(null);

  const [message, setMessage] = useState("")
    const [chats, setChats] = useState([])
    const [currentChats, setCurrentChats] = useState([])
    const [currentChatName, setCurrentChatName] = useState("")


    async function sendMessage () {
        const response = await fetch( chats?.length == 0 ? "http://192.168.1.104:5000/api/conversation/add" : "http://192.168.1.104:5000/api/message/add", {
            method: "POST",
            body: JSON.stringify(chats?.length == 0 ? {
                senderId: localStorage.getItem("userId"),
                senderName: JSON.parse(localStorage.getItem("user")).firstName + " " + JSON.parse(localStorage.getItem("user")).lastName,
                // receiverId: spotDetails?.lister,
                message: message
            } : {
                conversationId: chats[0]._id,
                message: message,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.data;
        console.log(data)
    }



    async function getAllMessages () {
        const response = await fetch(`http://192.168.1.104:5000/api/conversation/getAll?senderId=${localStorage.getItem("userId")}`)
        const data = await response.json();
        console.log("Messages", data);
        setChats(data);
        console.log("This is chats", chats)
    }



    useEffect(() => {
      const interval = setInterval(() => {
          getAllMessages();
      }, 1000)
      setTimeout(() => {
          clearInterval(interval);
      }, 100000)
    }, [])

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  
  return (
          <div className="max-h-full flex w-full">
            <div className="chatsList border-l min-w-fit border-l-gray-500 px-3">
              <div className="flex flex-col max-h-full bg-[#eee] overflow-y-auto mr-6">
                <div className="p-4 bg-white border-b border-b-gray-500 pt-5">
                  <h1 className="text-2xl font-semibold">Chats</h1>
                </div>
                {
                  [chats].map((chat) => ( chat.map((chat2) => (
                    <div className="flex pt-4 p-3 min-w-fit items-center gap-3 bg-white drop-shadow-lg" onClick={()=>{setSelectedChat(chat2.receiverId); setCurrentChats(chat2.message); setCurrentChatName(chat2.senderId!="admin" ? chat2.senderName : "Admin")}}>
                      <MdAccountCircle className="text-4xl text-blue-500" />
                      <span className="font-semibold">{chat2.receiverId != localStorage.getItem("userId") ? chat2.senderName : "Admin"}</span>
                    </div>
                  ))))
                }
              </div>
            </div>
            <div className="max-h-full w-full grow flex relative">
            <div className="flex flex-col min-w-full grow pr-auto h-[70vh] bg-[#eee] px-4 py-2 pb-4 overflow-y-scroll">
              <div className="flex pt-4 p-3 items-center gap-3 bg-white drop-shadow-lg">
                <MdAccountCircle className="text-4xl text-blue-500" />
                <span className="font-semibold">{currentChatName}</span>  
              </div>              
              {
                // Show the selected chats chats
                currentChats.map((chat) => (
                  <ChatBox message={chat.text} sender={0} />
                ))
              }
            </div>

            <div className="flex fixed mb-5 w-full md:pl-[36rem] z-10 bottom-0 right-0 flex-row gap-2">
              <input type="text" placeholder="Write a message" className="p-3 grow" />
              <button className="bg-blue-500 border border-blue-500 h-fit p-2 self-center px-4 rounded-lg text-white font-semibold" variant="gradient">Send</button>
            </div>
            </div>

           </div>
  );
}

export default DiscountMangament;
