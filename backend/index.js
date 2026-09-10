import express from 'express';
import cookieParser from 'cookie-parser';
import connectDb from './confi/mongodb.js';
import userRoutes from './router/userRoutes.js';
import ownerRoutes from './router/ownerRoutes.js'
import userDataRoute from './router/userRoutes.js'
import cors from 'cors';
const app=express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

connectDb();

// app.get('/',(req,res)=>{
//     res.send("hello");
// })
app.use('/pg/user',userRoutes);
app.use('/pg/owner',ownerRoutes);
app.use('/pg/users',userDataRoute);

const port=3000;
app.listen((port),()=>{
    console.log(`server is running on http://localhost:${port}`);
})