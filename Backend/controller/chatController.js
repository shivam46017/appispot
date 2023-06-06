

const conversationSchema = require("../schema/conversationSchema");

exports.newConversation = async (request, response)=>{
    
        const senderId = request.body.senderId;
        const reciverId = request.body.reciverId;

            
        const newConversation = new conversationSchema({
            members: {senderId:senderId, 
                reciverId:reciverId,
                reciverName:request.body.reciverName,
                senderName:request.body.senderName,
            },
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
            
        return response.status(500).json("Conv Not found");
        }
    } catch (error) {
        return response.status(500).json(error.message);
    }
}


exports.getMessagebyID = async (request, response) => {
    try {

        const messages = await conversationSchema.findOne({ _id: request.params.id });
        //console.log(conversationId);
        //console.log(messages);
        return response.status(200).json(messages);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}