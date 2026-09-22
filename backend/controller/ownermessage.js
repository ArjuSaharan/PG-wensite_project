import conersationalModel from "../models/conversation.js";
import messageModel from "../models/messageModel.js";

export const getOnwerConversations=async(req,res)=>{
    try{
        const ownerId=req.ownerId;
        if (!ownerId) {
            return res.status(401).json({
                success: false,
                message: "Owner not authenticated"
            });
        }
        const conversations=await conersationalModel.find({ownerId}).populate("userId","name email").populate("pgId","pgName address").sort({lastMessageAt:-1});
        return res.status(200).json({
            success:true,
            conversations
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export const getOwnerMessage=async (req,res)=>{
    try{
        const {conversationId}=req.params;
        const ownerId=req.ownerId;
        const conversation=await conersationalModel.findOne({
            _id:conversationId,
            ownerId:ownerId
        })
        if(!conversation){
            return res.status(403).json({
                success:false,
                message:"you are not part of this conversation"
            })
        }
        conversation.ownerUnreadCount=0;
        await conversation.save();
        const messages=await messageModel.find({conversationId}).sort({createdAt:1});

        return res.status(200).json({
            success:true,
            messages
        })
    }
    catch(error){
         console.log("GET OWNER MESSAGES ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const ownerSendMEssage=async(req,res)=>{
    try{
        const ownerId=req.ownerId;
        const {conversationId}=req.params;
        const {text}=req.body
        
         if (!ownerId) {
            return res.status(401).json({
                success: false,
                message: "Owner not authenticated"
            });
        }
        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message cannot be empty"
            });
        }
        const conversation=await conersationalModel.findOne({
            _id:conversationId,
            ownerId:ownerId
        })

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found"
            });
        }

        // owner can reply only to his owne onversayion
        if(conversation.ownerId.toString()!==ownerId.toString()){
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }
        const message=await messageModel.create({
            conversationId,
            senderId:ownerId,
            senderRole:"Owner",
            text:text.trim()
        })
       conversation.userUnreadCount = (conversation.userUnreadCount || 0) + 1;
        conversation.lastMessage=text.trim();
        conversation.lastMessageAt=new Date();
       
        await conversation.save();

        return res.status(201).json({success:true,message});
    }
    catch(error){
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}