import mongoose from "mongoose";
import ownerLModel from "../models/ownerLoginModel.js";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";


// login 
export const ownerregister=async(req,res)=>{
    const {name,email,phone,password,confirmPassword}=req.body;
    if(!name || !email || !phone || !password ||!confirmPassword){
        return res.json({success:false,message:"fill the complete required details"});
    }
    try{
        const emailExist=await ownerLModel.findOne({email});
        if(emailExist){
            return res.json({success:false,message:"email is already registered"});
        }
        if(password!=confirmPassword){
            return res.json({success:false,message:"passowrd doest not match"});
        }
        const hashpassword=await bcrypt.hash(password,10);
        const user=await ownerLModel({
            name,email,phone,
            password:hashpassword,
        })
        await user.save();

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'5d'});
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.JWT_SECRET,
            sameSite:'strict',
            maxAge:5 * 24* 60 *60 *1000,
        })

        return res.json({success:true,message:"register successfully"});

    }
    catch(error){
        return res.json({success:false,message:error.message});
    }
}

// login
export const ownerLogin=async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await ownerLModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"email incorrect"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"password incorrect"});
        }

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'5d'});

        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.JWT_SECRET,
            sameSite:'strict',
            maxAge:5 * 24* 60 *60 *1000,
        })

        return res.json({success:true,message:"login successfully"});


    }
    catch(error){
        return res.json({success:false,message:error.message});
    }
}

// logout 
export const ownerLogout=async(req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.JWT_SECRET,
            sameSite:'strict',
        })
        res.json({success:true,message:"logout successfully"});
    }
    catch(error){
        return res.json({success:false,message:error.message});
    }
}