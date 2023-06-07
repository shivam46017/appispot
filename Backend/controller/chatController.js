

const conversationSchema = require("../schema/conversationSchema");

exports.newConversation = async (request, response)=>{
    
        const senderId = request.body.senderId;
        const receiverId = request.body.reciverId;

            
        const newConversation = new conversationSchema({
          senderId:senderId, 
                receiverId:receiverId,
                receiverName:request.body.receiverName,
                senderName:request.body.senderName,
            
            timestamps:Date.now()
        })

       // newConversation.save();
        const converstion=await newConversation.save();
       // console.log(response)
        response.status(200).json({
            success: true,
            converstion
        })
    

}

exports.getConversation =async(request, response) =>{
    try {

  //      const senderId = request.body.senderId;
//        const reciverId = request.body.reciverId;
        let conversation = await conversationSchema.find({_id:{$all:request.body.conversations}})
       // console.log(conversation)
        return response.status(200).json(conversation);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

exports.getallConversation =async(request, response) =>{
    try {

  //      const senderId = request.body.senderId;
//        const reciverId = request.body.reciverId;
        let conversation = await conversationSchema.find()
       // console.log(conversation)
        return response.status(200).json(conversation);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

exports.newMessage = async (request, response) => {
    try {
        
        const conversation = await conversationSchema.findOne({ _id: request.body.conversationId })
        if(conversation)
       {// console.log(conversation);
        let prvMsg=[]
        if(conversation)
         prvMsg=conversation.message;
        prvMsg.push(request.body)
        await conversationSchema.findByIdAndUpdate(request.body.conversationId,{message:prvMsg})
        return response.status(200).json(prvMsg);}
        else{
            
        return response.status(500).json("Conversation Not found");
        }
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

exports.newBroadCastMsg = async (request, response) => {
    try {
        request.body.receivers.forEach(async (id)=>{
            const conversation = await conversationSchema.findOne({ receiverId: id.receiverId , senderId:request.body.senderId })
            if(conversation)
           {// console.log(conversation);
            let prvMsg=[]
            if(conversation.message)
             prvMsg=conversation.message;
             newMsg={timestamps:Date.now(),
            text:request.body.text}
            prvMsg.push(newMsg)
            await conversationSchema.findByIdAndUpdate(conversation._id,{message:prvMsg})
           }    
        })
    return response.status(200).json({ success: true,})
}
       
     catch (error) {
        return response.status(500).json(error.message);
    }
}


exports.newBroadConversation = async (request, response)=>{
    
    const senderId = request.body.senderId;
    request.body.receivers.forEach(async (id)=>{
    
     
        const newConversation = new conversationSchema({
            senderId:senderId, 
                receiverId:id.receiverId,
                receiverName:id.receiverName,
                senderName:request.body.senderName,
            
            timestamps:Date.now()
        })
    
       // newConversation.save();
        const converstion=await newConversation.save();
       
    
    })
    response.status(200).json({
        success: true,
       
    })
    
   // console.log(response)
   

}

exports.getMessagebyID = async (request, response) => {
    try {

        const messages = await conversationSchema.findOne({ _id: request.params.id });
        //console.log(conversationId);
        //console.log(messages);
        if(messages)
        return response.status(200).json(messages);
        return response.status(200).json({success:false,msg:"No ConversationFound"})
    } catch (error) {
        return response.status(500).json(error.message);
    }
}