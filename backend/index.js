import express from 'express';
import cookieParser from 'cookie-parser';
import connectDb from './config/mongodb.js';
import userRoutes from './router/userRoutes.js';
import ownerRoutes from './router/ownerRoutes.js'
import userDataRoute from './router/userRoutes.js'
import pgRoutes from './router/pgRoutes.js'
import filterroutes from './router/filterRoutes.js'
// import testRoutes from './router/testRoutes.js'
import messageRoutes from './router/messageroutes.js'
import authRoute from './router/authRoute.js';
import cors from 'cors';
import "dotenv/config"
import http from 'http';
import {Server} from 'socket.io';

import { chatSocket } from './socket/chatSocket.js';
import cloudinary from './config/cloudinary.js';
const app=express();
const server=http.createServer(app);

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

connectDb();


// socketio
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true,
    }
})
// socket connection
io.on("connection",(socket)=>{
    console.log("socket connected",socket.id);
    chatSocket(io,socket);
});


// app.get('/',(req,res)=>{
//     res.send("hello");
// })
app.use('/pg/user',userRoutes);
app.use('/pg/owner',ownerRoutes);
app.use('/pg/users',userDataRoute);
app.use('/pg/owners',pgRoutes);
app.use('/pg',filterroutes);
// app.use("/test", testRoutes);
app.use("/auth",authRoute);
app.use("/message",messageRoutes);
const port=3000;
server.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})