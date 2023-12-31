const { newConversation, getConversation,getallConversation,getMessagebyID,newMessage,newBroadCastMsg,newBroadConversation, broadcast, getChats, getChat } = require("../controller/chatController");

let route= require("express").Router();


route.post("/conversation/add", newConversation);
route.post("/conversation/get", getConversation);
route.post("/broadconversation/add", newBroadConversation);
route.post("/message/broadcast", newBroadCastMsg);

route.post("/broadcast", broadcast)

route.get("/conversation/getall", getallConversation);
route.post("/message/add", newMessage);
route.post("/message/get/:id", getMessagebyID);

route.get('/chats/:id', getChats)
route.get('/chat/:spotId/:userId', getChat)

module.exports = route;