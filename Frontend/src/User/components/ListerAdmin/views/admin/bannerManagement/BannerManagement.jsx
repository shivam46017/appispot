import React, { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import { MdAccountCircle } from "react-icons/md";

function Messages() {
  
  const [selectedChat, setSelectedChat] = useState(null);

  const [message, setMessage] = useState("")
    const [chats, setChats] = useState([])
    const [incomeChats, setIncomeChats] = useState([])
    const [myChat, setMyChat] = useState([])
    const [currentChats, setCurrentChats] = useState([])

    async function sendMessage () {
        const response = await fetch(myChat?.length == 0 ? "http://localhost:5000/api/conversation/add" : "http://localhost:5000/api/message/add", {
            method: "POST",
            body: JSON.stringify(myChat?.length == 0 ? {
                senderId: localStorage.getItem("userId"),
                // senderName: JSON.parse(localStorage.getItem("user")).firstName + " " + JSON.parse(localStorage.getItem("user")).lastName,
                receiverId: selectedChat,
                message: message
            } : {
                conversationId: myChat[0]._id,
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
      console.log("Getting messages")
        const response = await fetch(`http://localhost:5000/api/conversation/getAll?receiverId=${localStorage.getItem("userId")}`)
        const data = await response.json();
        console.log("Messages", data);
        console.log("This is chats", currentChats)

        data.map((chat)=>{
          console.log("This is chattt", chat)
          console.log("This is chat sender", chat.senderId)
          if (chat.receiverId === localStorage.getItem("userId")) {
            console.log("matched")
            incomeChats.length == 0 ? setIncomeChats([chat]) : setIncomeChats([...incomeChats, chat])
            console.log("This is income chats", incomeChats)
          } else {
            console.log("not matched")
            myChat.length == 0 ? setMyChat([chat]) : setMyChat([...myChat, chat])
            console.log("This is my chats", myChat)
          }
        })
        console.log("This is income chats", incomeChats)
        console.log("This is my chats", myChat)
    }

    const selectChat = (senderId) => {
      setSelectedChat(senderId)

      incomeChats.map((chat)=>{
        if (chat.senderId === senderId) {
          myChat.map((myChat)=>{
            if (myChat.receiverId === senderId) {
              chat.message.map((msg1)=>{
                myChat.message.map((msg2)=>{
                  if (msg1.timestamps < msg2.timestamps) {
                    setCurrentChats([...currentChats, {...msg1, sender: 1}, {...msg2, sender: 0}])
                  } else {
                    setCurrentChats([...currentChats, {...msg2, sender: 0}, {...msg1, sender: 1}])
                  }
                })
              })
            }
          })
        }
      })

      console.log("This is current chats", currentChats)
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
                  incomeChats.length!=0 && [incomeChats]?.map((chat) => ( chat?.map((chat2) => (
                    <div className="flex pt-4 p-3 min-w-fit items-center gap-3 bg-white drop-shadow-lg" onClick={()=>{setSelectedChat(chat2.receiverId); setCurrentChats(chat2.message)}}>
                      <MdAccountCircle className="text-4xl text-blue-500" />
                      <span className="font-semibold">{chat2.senderName}</span>
                    </div>
                  ))))
                }
              </div>
            </div>
            <div className="max-h-full w-full grow flex relative">
            <div className="flex flex-col min-w-full grow pr-auto h-[70vh] bg-[#eee] px-4 py-2 pb-4 overflow-y-scroll">
              <div className="flex pt-4 p-3 items-center gap-3 bg-white drop-shadow-lg">
                <MdAccountCircle className="text-4xl text-blue-500" />
                <span className="font-semibold">Alex Friedman</span>  
              </div>              
              {
                // Show the selected chats chats
                currentChats.map((chat) => (
                  <ChatBox message={chat.text} sender={chat.sender} />
                ))
              }
              {/* <ChatBox message="Hello" sender={0} /> */}
            </div>

            <div className="flex fixed mb-5 w-full md:pl-[36rem] z-10 bottom-0 right-0 flex-row gap-2">
              <input type="text" placeholder="Write a message" className="p-3 grow" />
              <button className="bg-blue-500 border border-blue-500 h-fit p-2 self-center px-4 rounded-lg text-white font-semibold" onClick={sendMessage} variant="gradient">Send</button>
            </div>
            </div>

           </div>
  );
}

export default Messages;
