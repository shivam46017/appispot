import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserAuth } from "../../../../../../../context/userAuthContext/UserAuthContext";

function ChatBox() {
  const [queries, setQueries] = useState([]);
  const [chatIndex, setChatIndex] = useState(1)
  const { user, userRole } = useUserAuth();

  const getQueries = async () => {
    try {
      const queries = await axios.get("http://localhost:5000/api/chats", {
        withCredentials: true,
      });
      const { chats } = queries.data;
      console.log(chats);
      setQueries(chats);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getQueries();
  }, []);

  const selectChat = () => {};

  return (
    <div className="max-h-[80vh] min-h-[80vh] flex p-4 gap-3">
      <div className="w-1/3 max-h-[100%] flex flex-col gap-2 overflow-y-scroll">
        {queries?.map((value) => (
          <div className="min-h-[4rem] w-full rounded-md bg-slate-200 text-black flex items-center gap-2 p-2">
            <Avatar />
            <div className="flex flex-col">
              soemthing
              <div className="flex gap-2 items-center">
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                <span>online</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative container bg-slate-400 rounded-md flex flex-col">
        <div className="h-16 w-full bg-slate-300 rounded-md shadow-md flex items-center p-2 gap-2">
          <Avatar />
          something
        </div>
        <div className="container p-2">
          <div className="w-full flex flex-col">
            {queries[chatIndex]?.messages?.map((value) => (
              <div
                className={`p-4 rounded-r-xl rounded-l-xl rounded-br-xl ${
                  user?.firstName + " " + user?.lastName === message.name
                    ? "self-end"
                    : "self-start"
                } bg-blue-300 flex flex-col`}
              >
                <div className="flex items-center gap-2">something</div>
                <div className="">{value?.message}</div>
              </div>
            ))}
          </div>
        </div>
        <form className="absolute bottom-0 w-full flex">
          <input type="text" className="grow" />
          <button className="">something</button>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
