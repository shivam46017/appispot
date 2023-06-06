const { newConversation, getConversation,getMessagebyID,newMessage } = require("../controller/chatController");

let route= require("express").Router();


route.post("/conversation/add", newConversation);
route.post("/conversation/get", getConversation);

route.post("/message/add", newMessage);
route.post("/message/get/:id", getMessagebyID);

module.exports = route;