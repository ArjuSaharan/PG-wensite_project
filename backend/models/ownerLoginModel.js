import mongoose from "mongoose";

const ownerSchema= new mongoose.Schema({
    // userId:{
    //     type:mongoose.Types.ObjectId,
    //     required:true,
    // },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        maxLength:10,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const ownerLModel= mongoose.model("ownerLogin",ownerSchema);
export default ownerLModel;