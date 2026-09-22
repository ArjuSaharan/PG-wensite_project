import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const userLoginModel= mongoose.model("userLogin",userSchema);

export default userLoginModel;