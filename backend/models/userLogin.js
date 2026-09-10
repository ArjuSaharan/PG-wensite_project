import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        require:true,
    },
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
        require:true,
    }
})

const userLoginModel= mongoose.model("userlogin",userSchema);

export default userLoginModel;