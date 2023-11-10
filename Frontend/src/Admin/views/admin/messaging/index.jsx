import { useEffect, useState } from "react";
import { BsPeopleFill, BsPersonCircle } from "react-icons/bs";
import ChatBox from "../../../../User/components/UserManager/views/admin/discountMagement/ChatBox";
import { BiSend } from "react-icons/bi";
import axios from "axios";
import { socket } from "../../../../Hook/socket";

function Messaging() {
  const [currentChat, setCurrentChat] = useState(0);
  const [chatParticipants, setChatParticipants] = useState([]);
  const [chats, setChats] = useState([]);
  const [broadcastChats, setBroadcastChats] = useState([]);
  const [broadcastToWhom, setBroadcastToWhom] = useState("");
  const [message, setMessage] = useState("");

  const getAllChatsParticipants = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/all-chat-participants"
    );
    setChatParticipants(res.data.chats);
    console.log(res.data.chats);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setChats((prev) => [
      ...prev.map((value, i) => {
        if (currentChat === i)
          return {
            ...prev[i],
            messages: [
              ...(Object(prev[i]).hasOwnProperty("messages")
                ? prev[i].messages
                : []),
              {
                by: "admin",
                message,
              },
            ],
          };
        else return value;
      }),
    ]);
    console.log(currentChat);
    socket.emit("admin-send-message", {
      toId: chatParticipants[currentChat]._id,
      to: "seller",
      message,
    });
    setMessage("");
  };

  const broadcast = async (e) => {
    e.preventDefault();
    if (broadcastToWhom === "") return;
    if (broadcastToWhom === "users") {
      socket.emit("admin-send-message-to-every-seller", { message });
    }

    if (broadcastToWhom === "sellers") {
      socket.emit("admin-send-message-to-every-user", { message });
    }
    setMessage("");
  };

  const getAllAdminChats = async () => {
    try {
      const res = await axios("http://localhost:5000/api/admin/all-chats");
      setChats(res.data.chats);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllChatsParticipants();
    getAllAdminChats();
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-row border-t border-gray-400 min-h-[67vh]">
      <div className="flex flex-col gap-2 border-r border-r-gray-500 overflow-y-auto max-h-[68vh]">
        <input
          type="text"
          className="w-full h-10 border-none border-b-2 outline-none bg-transparent"
          placeholder="Search"
        />
        <div
          className="flex flex-row gap-3 items-center p-1 border-b border-b-gray-300 bg-slate-200 px-5 pr-16 min-w-96 cursor-pointer"
          onClick={() => setCurrentChat("broadcast")}
        >
          <BsPeopleFill className="text-2xl text-blue-800" />
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Broadcast</h1>
            <p className="text-sm text-gray-500">Last Message</p>
          </div>
        </div>
        {chatParticipants?.map((chat, index) => (
          <div
            key={index}
            className={`flex flex-row gap-3 items-center p-1 border-b border-b-gray-300 ${
              currentChat === index && "bg-slate-300"
            } px-5 pr-16 min-w-96 cursor-pointer`}
            onClick={(e) => setCurrentChat(index)}
          >
            <BsPersonCircle className="text-2xl text-blue-700" />
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">{`${chat.firstName} ${chat.lastName}`}</h1>
              <p className="text-sm text-gray-500">last text</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col grow">
        {/* <div className="flex flex-row justify-between items-center p-3 border-b border-b-gray-500"> */}
        <div className="flex flex-row gap-5 p-4 items-center">
          <BsPersonCircle className="text-2xl text-gray-500" />
          <div className="flex flex-col grow">
            <h1 className="text-lg font-semibold">
              {currentChat !== "broadcast"
                ? `${chatParticipants[currentChat]?.firstName} ${chatParticipants[currentChat]?.lastName}`
                : "Brodcast"}
            </h1>
          </div>
          {currentChat == "broadcast" && (
            <select
              name="receiver"
              id="receiver"
              className="border flex gap-10 border-gray-300 rounded-md p-2"
              onChange={(e) => setBroadcastToWhom(e.target.value)}
            >
              <option value="" disabled selected>
                Select the receivers
              </option>
              <option value="users">Users</option>
              <option value="sellers">Sellers</option>
            </select>
          )}
        </div>

        <div className="flex flex-col px-4 py-1.5 grow bg-gray-300 overflow-y-auto max-h-[52vh]">
          {currentChat != "broadcast"
            ? chats[currentChat]?.messages?.map((message, index) => (
                <ChatBox
                  key={index}
                  sender={message.by === "admin" ? 0 : 1}
                  message={message.message}
                />
              ))
            : broadcastChats?.map((message, index) => (
                <ChatBox
                  key={index}
                  sender={message.by === "admin" ? 0 : 1}
                  message={message}
                />
              ))}
        </div>

        <form
          onSubmit={currentChat === "broadcast" ? broadcast : sendMessage}
          className="flex flex-row w-full h-fit items-center"
        >
          <input
            type="text"
            className="w-full h-full border outline-none bg-transparent"
            placeholder="Type a message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit" className="text-gray-500 hover:text-gray-700">
            <BiSend className="text-2xl fill-amber-600 border mx-2" />
          </button>
        </form>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Messaging;
