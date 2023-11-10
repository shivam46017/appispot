const conversationSchema = require("../schema/conversationSchema");
const userSchema = require("../schema/userSchema");
const sellerSchema = require("../schema/sellerSchema");
const Chat = require("../schema/chatSchema");

exports.newConversation = async (request, response) => {
  const senderId = request.body.senderId;
  const receiverId = request.body.receiverId;

  const newConversation = new conversationSchema({
    senderId: senderId,
    receiverId: receiverId,
    receiverName: request.body.receiverName,
    senderName: request.body.senderName,
    message: {
      timestamps: Date.now(),
      text: request.body.message,
    },
  });

  // newConversation.save();
  const converstion = await newConversation.save();
  // console.log(response)
  response.status(200).json({
    success: true,
    converstion,
  });
};

exports.getConversation = async (request, response) => {
  try {
    //      const senderId = request.body.senderId;
    //        const reciverId = request.body.reciverId;
    let conversation = await conversationSchema.find({
      _id: { $all: request.body.conversations },
    });
    // console.log(conversation)
    return response.status(200).json(conversation);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

exports.getallConversation = async (request, response) => {
  try {
    console.log("Query", request.query);
    const senderId = request.query.senderId;
    const receiverId = request.query.receiverId;
    let conversation = "";
    senderId
      ? (conversation = await conversationSchema.find(
          receiverId
            ? { senderId: senderId, receiverId: receiverId }
            : { $or: [{ senderId: senderId }, { receiverId: senderId }] }
        ))
      : receiverId
      ? (conversation = await conversationSchema.find({
          $or: [{ receiverId: receiverId }, { senderId: receiverId }],
        }))
      : (conversation = await conversationSchema.find());
    console.log(conversation);
    return response.status(200).json(conversation);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

exports.broadcast = async (req, res) => {
  try {
    const senderId = "admin";
    const message = req.body.message;
    const receivers = [];

    // Getting all receivers
    const allUsers = await userSchema.find();
    allUsers.forEach((user) => {
      receivers.push(user._id);
    });

    Promise.all(
      receivers.map(async (receiverId) => {
        const newConversation = new conversationSchema({
          senderId: senderId,
          receiverId: receiverId,
          message: {
            timestamps: Date.now(),
            text: message,
          },
        });
        await newConversation.save();
      })
    );
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.newMessage = async (request, response) => {
  try {
    const conversation = await conversationSchema.findOne({
      _id: request.body.conversationId,
    });
    if (conversation) {
      // console.log(conversation);
      let prvMsg = [];
      if (conversation) prvMsg = conversation.message;
      prvMsg.push({
        timestamps: Date.now(),
        text: request.body.message,
      });
      await conversationSchema.findByIdAndUpdate(request.body.conversationId, {
        message: prvMsg,
      });
      return response.status(200).json(prvMsg);
    } else {
      return response.status(500).json("Conversation Not found");
    }
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

exports.newBroadCastMsg = async (request, response) => {
  try {
    request.body.receivers.forEach(async (id) => {
      const conversation = await conversationSchema.findOne({
        receiverId: id.receiverId,
        senderId: request.body.senderId,
      });
      if (conversation) {
        // console.log(conversation);
        let prvMsg = [];
        if (conversation.message) prvMsg = conversation.message;
        newMsg = { timestamps: Date.now(), text: request.body.text };
        prvMsg.push(newMsg);
        await conversationSchema.findByIdAndUpdate(conversation._id, {
          message: prvMsg,
        });
      }
    });
    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

exports.newBroadConversation = async (request, response) => {
  const senderId = request.body.senderId;
  request.body.receivers.forEach(async (id) => {
    const newConversation = new conversationSchema({
      senderId: senderId,
      receiverId: id.receiverId,
      receiverName: id.receiverName,
      senderName: request.body.senderName,

      timestamps: Date.now(),
    });

    // newConversation.save();
    const converstion = await newConversation.save();
  });
  response.status(200).json({
    success: true,
  });

  // console.log(response)
};

exports.getMessagebyID = async (request, response) => {
  try {
    const messages = await conversationSchema.findOne({
      _id: request.params.id,
    });
    //console.log(conversationId);
    //console.log(messages);
    if (messages) return response.status(200).json(messages);
    return response
      .status(200)
      .json({ success: false, msg: "No ConversationFound" });
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

exports.initializeUserForChat = async (payload) => {
  try {
    console.log(payload);
    if (payload.role === "user") {
      const user = await userSchema.findById(payload.id);
      if (!user)
        return socket.emit(
          "chat-error",
          "cannot create chat room for this user"
        );
      user.chatId = socket.id;
      await user.save();
    } else {
      const seller = await SellerSchema.findById(payload.id);
      if (!seller)
        return socket.emit("chat-error", "cannot create chat room for you");
      seller.chatId = socket.id;
      await seller.save();
    }
  } catch (err) {
    console.log("Its a error");
  }
};


exports.getChats = async (req, res) => {
  const { id } = req.params;
  const { role } = req.query;
  try {
    if (role === "user") {
      const user = await userSchema.findById(id).populate({
        path: "queries",
        populate: {
          path: "respondent inquirer",
          select: "firstName lastName",
        },   
      });
      const chats = user.queries;
      console.log(chats);
      return res.status(200).json({
        success: true,
        chats,
      });
    }

    if (role === "seller") {
      const seller = await sellerSchema.findById(id).populate({
        path: "queries",
        populate: {
          path: "inquirer",
          select: "firstName lastName",
        },
      });
      const chats = seller.queries; 
      console.log(chats);

      return res.status(200).json({
        success: true,
        chats,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getChat = async (req, res) => {
  const { spotId, userId } = req.params;
  const { role } = req.query
  try {
    if(role === 'user') {
      const chat = await Chat.findOne({ spot: spotId, inquirer: userId });
      if (!chat) {
        return res.status(500).json({ success: false, chat });
      }
      res.status(200).json({ success: true, chat });
    } else {
      const chat = await Chat.findOne({ spot: spotId, respondent: userId });
      if (!chat) {
        return res.status(500).json({ success: false, chat });
      }
      res.status(200).json({ success: true, chat });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
