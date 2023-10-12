import React, { useEffect, useState } from "react";
import { Avatar, Button, debounce } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserAuth } from "../../../../../../../context/userAuthContext/UserAuthContext";
import { socket } from "../../../../../../../Hook/socket";
import SendIcon from "@mui/icons-material/Send";
import TypingAnimation from "../../../../../../../../public/Icons/loading.svg";

function ChatBox() {
  const [queries, setQueries] = useState([]);
  const [currentChats, setCurrentChats] = useState([])
  const [chatIndex, setChatIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [timeoutId, setTimeoutId] = useState(undefined);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [respondentOrInquirer, setRespondentOrInquirer] = useState(undefined);

  const { user } = useUserAuth();

  const getQueries = async () => {
    try {
      const queries = await axios.get(
        "http://localhost:5000/api/chats/" +
          localStorage.getItem("userId") +
          "?role=" +
          localStorage.getItem("userRole")
      );
      const { chats } = queries.data;
      console.log(chats);
      setQueries(chats);
      setCurrentChats(chats[0].messages)
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getQueries();
    setRespondentOrInquirer(() =>
      localStorage.getItem("userRole") === "user" ? "respondent" : "inquirer"
    );
  }, []);

  useEffect(() => {
    console.log(user);
    if (user) {
      socket.connect();
      socket.emit("connection", {
        id: user?._id,
        role: localStorage.getItem("userRole"),
      });
    }

    socket.on("typing", (status) => {
      setTyping(status);
    });


  }, [user]);

  useEffect(() => {
    function handleReceivedMessages({ by, message }) {
      setCurrentChats((prev) =>[
        ...prev,
        {
          message, by
        }
      ])
      console.log(by, message)
    }

    socket.on("receive-message", handleReceivedMessages);

    return () => {
      socket.off("receive-message", handleReceivedMessages);
    };
  }, [currentChats]);

  // user online or not 👇
  useEffect(() => {
    function handleOnlineUsers({ id, online }) {
      console.log(id, online);
      if (online === true) {
        setOnlineUsers((prev) => {
          console.log(prev);
          if (prev?.includes(id)) return prev;
          prev.push(id);
          return prev;
        });
      } else {
        setOnlineUsers((prev) => {
          prev?.filter((existingId) => existingId !== id);
        });
      }
    }

    socket.on("online", handleOnlineUsers);

    return () => {
      // socket.disconnect()
      socket.off("online", handleOnlineUsers);
    };
  }, [onlineUsers]);
  // user online or not ☝️

  const emitTypingToReceiver = () => {
    if (timeoutId) clearTimeout(timeoutId);
    console.log("chal rha hu mai");
    socket.emit("typing", {
      toId:
        localStorage.getItem("userRole") === "user"
          ? queries[chatIndex].respondent._id
          : queries[chatIndex].inquirer._id,
      toRole: localStorage.getItem("userRole") === "user" ? "seller" : "user",
      status: true,
    });

    let tId = setTimeout(() => {
      console.log("mai chal rha hu");
      socket.emit("typing", {
        toId:
          localStorage.getItem("userRole") === "user"
            ? queries[chatIndex].respondent._id
            : queries[chatIndex].inquirer._id,
        toRole: localStorage.getItem("userRole") === "user" ? "seller" : "user",
        status: false,
      });
      setTimeoutId(tId);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    socket.emit("send-message", {
      myId: localStorage.getItem("userId"),
      toId:
        localStorage.getItem("userRole") === "seller"
          ? queries[chatIndex].inquirer._id
          : queries[chatIndex].respondent._id,
      message,
      toRole: localStorage.getItem("userRole") === "seller" ? "user" : "seller",
      spot: queries[chatIndex].spot,
    });
    setCurrentChats((prev) => [
      ...prev,
      {
        by: user?.firstName + " " + user?.lastName,
        message: message
      }
    ])
    setMessage("");
  };

  return (
    <>
      <div className="relative min-h-[80vh] max-h-[80vh] flex flex-col mx-auto shadow-lg rounded-lg">
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2"></div>
        <div className="flex flex-row justify-between bg-white max-h-[80vh]">
          <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
            {queries?.map((value) => (
              <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                <div className="w-1/4">
                  <img
                    src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                    className="object-cover h-12 w-12 rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-full">
                  <div className="text-lg font-semibold">
                    {value.respondent.firstName +
                      " " +
                      value.respondent.lastName}
                  </div>
                  <span className="text-gray-500 flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    {typing && (
                      <span className="text-green-400">typing...</span>
                    )}
                    {!typing &&
                    onlineUsers?.includes(
                      queries[chatIndex][respondentOrInquirer]._id
                    )
                      && "online"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full px-5 flex flex-col justify-between max-h-[70vh] min-h-[70vh]">
            <div className="flex flex-col mt-5 max-h-full overflow-y-auto pb-28">
              {queries && currentChats.map((value, i) => {
                if (value?.by === user?.firstName + " " + user?.lastName) {
                  return (
                    <div key={`chat-${i}`} class="flex justify-end mb-4">
                      <div class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                        {value?.message}
                      </div>
                      <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        class="object-cover h-8 w-8 rounded-full"
                        alt=""
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={`chat-${i}`} class="flex justify-start mb-4">
                      <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        class="object-cover h-8 w-8 rounded-full"
                        alt=""
                      />
                      <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                        {value.message}
                      </div>
                    </div>
                  );
                }
              })}
              {typing && (
                <div className={`flex justify-end mb-4`}>
                  <img
                    src={TypingAnimation}
                    width={80}
                    className="mr-2 py-3 px-4 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                  />
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          class="absolute bottom-0 w-full py-5 flex gap-2 px-3"
        >
          <input
            class="grow bg-gray-300 py-3 px-3 rounded-xl"
            type="text"
            placeholder="type your message here..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              emitTypingToReceiver();
            }}
          />
          <Button variant="contained">
            Send <SendIcon className="mx-2" />
          </Button>
        </form>
      </div>
    </>
  );
}

export default ChatBox;
