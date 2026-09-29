import mongoose from "mongoose";
const messageSchema=new mongoose.Schema({
    conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true
   },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    senderRole:{
        type:String,
        enum:["User","Owner"],
        required:true,
    },
    text:{
        type:String,
        required:true,
        trim:true,
    },
    isRead:{
        type:Boolean,
        default:false,
    },
},{timestamps:true});

const messageModel=mongoose.model("Message",messageSchema);

export default messageModel;