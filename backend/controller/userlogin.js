import express from 'express'
import jwt from 'jsonwebtoken'
import userLoginModel from '../models/userLogin.js'
import bcrypt from 'bcryptjs';

import "dotenv/config";
import cookieParser from 'cookie-parser';

// user register
export const userregister = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.json({ success: false, message: "please fill required detail complete" });
        }
        const existEmail = await userLoginModel.findOne({ email });
        if (existEmail) {
            return res.json({ success: false, message: "email is already registered" });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const user = await userLoginModel({
            name, email, password:hashpassword
        })
        await user.save();
        // create token 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 5 * 24 * 60 * 60 * 1000,
        })


        return res.json({ success: true, message: 'user register successfully' });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}


// user login
export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "please fill the required details" });
    }
    try {

        const user = await userLoginModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "email is incorrect" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Password is incorrect"
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });

        res.cookie("token", token, {
            httpOnly: true,
            secure:false,
            sameSite: 'strict',
            maxAge: 5 * 24 * 60 * 60 * 1000,
        })
        return res.json({ success: true, message: "login successfully" });

    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }

}


// user logout
export const userLogout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        })

        return res.json({ success: true, message: "logout successfully" });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}