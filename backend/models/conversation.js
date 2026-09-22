import mongoose from "mongoose";

const conversationschema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userLogin",
        required:true,
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Owner",
        required:true,
    },
    pgId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Pg",
        required:true,
    },
    lastMessage:{
        type:String,
        default:"",
    },
    lastMessageAt:{
        type:Date,
        default:Date.now,
    },
    ownerUnreadCount:{
        type:Number,
        default:0
    },
    userUnreadCount:{
        type:Number,
        default:0
    }
},{timestamps:true});

conversationschema.index(
    {userId:1,ownerId:1,pgId:1},
   { unique:true}
)

const conersationalModel=mongoose.model("Conversation",conversationschema);


export default conersationalModel;