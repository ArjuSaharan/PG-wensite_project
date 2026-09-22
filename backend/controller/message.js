import pgModel from "../models/addpgModel.js";
import conersationalModel from "../models/conversation.js";
import messageModel from "../models/messageModel.js";

export const createConersation=async (req,res)=>{
    try{
        const userId=req.userId;
        const {pgId}=req.body;
        if(!userId){
            return res.status(401).json({success:false,message:"user not authenticated"});
        }
         if (!pgId) {
            return res.status(400).json({
                success: false,
                message: "PG id is required"
            });
        }
        const pg=await pgModel.findById(pgId);
        if(!pg){
            return res.status(400).json({
                success:false,
                message:"PG not found"
            })
        }
        const ownerId=pg.ownerId;

        let conversation=await conersationalModel.findOne({
            userId,
            ownerId,
            pgId,
        })
        if(!conversation){
            conversation=await conersationalModel.create({
                userId,
                ownerId,
                pgId
            })
        }
        return res.status(200).json({
            success:true,
            conversation
        })
    }
    catch(error){
        console.log("create :",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// send messag api

export const sendMessage= async(req,res)=>{
    try{
        const userId=req.userId;
        const {conversationId}=req.params;
        const {text}=req.body;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
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
            userId
        });
        if(!conversation){
             return res.status(404).json({
                success: false,
                message: "Conversation not found"
            });
        }
       
        const message= await messageModel.create({
            conversationId,
            senderId:userId,
            senderRole:"User",
            text:text.trim()
        })
            conversation.userUnreadCount+=1;
        conversation.lastMessage=text.trim();
        conversation.lastMessageAt=new Date();
    

        await conversation.save();
        return res.status(201).json({
            success:true,
            message
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// get message api
export const getMessage= async(req,res)=>{
    try{
        const userId=req.userId;
        const {conversationId}=req.params;
        
        const conversation=await conersationalModel.findOne({
            _id:conversationId,
            userId,
        });
        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found"
            });
        }
       conversation.userUnreadCount=0;
       await conversation.save();
        const messages=await messageModel
                        .find({conversationId})
                        .sort({createdAt: 1});
        return res.status(200).json({
            success:true,
            messages
        })
    }
    catch(error){
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// get chat history
export const getUserConversations=async (req,res)=>{
    try{
        const userId=req.userId;
        const conversations=await conersationalModel.find({userId}).populate(
            "ownerId","name email phone"
        ).sort({lastMessageAt:-1})

        return res.status(200).json({
            success:true,
            conversations
        })
    }
    catch(error){
        console.log("GET CONVERSATIONS ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// unread message
export const getUnreadMessageCount= async(req,res)=>{
    try{
        const userId=req.userId;
        if(!userId){
             return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }
        const count=await messageModel.countDocuments({
            senderRole:"Owner",
            isRead:false,
            conversationId:{
                $in: await conersationalModel.find({userId}).distinct("_id")
            }
        })
        return res.status(200).json({
            success:true,
            count
        })

    }
    catch(error){
         console.log("UNREAD COUNT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}