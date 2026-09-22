import mongoose from "mongoose";
const ownerSchema= new mongoose.Schema({
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
        match: /^[0-9]{10}$/,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});

const ownerLModel= mongoose.model("Owner",ownerSchema);
export default ownerLModel;