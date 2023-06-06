const { newConversation, getConversation,getMessages,newMessage } = require("../controller/chatController");

let route= require("express").Router();


route.post("/conversation/add", newConversation);
route.post("/conversation/get", getConversation);

route.post("/message/add", newMessage);
route.get("/message/get/:id", getMessages);

module.exports = route;