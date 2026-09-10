import mongoose from "mongoose";
import 'dotenv/config'

const connectDb=async()=>{
    mongoose.connect(process.env.MONGO_URI);
    console.log("connect db");
}

export default connectDb;
