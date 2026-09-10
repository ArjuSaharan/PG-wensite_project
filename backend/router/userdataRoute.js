import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../models/userdata.js';
const router =express.Router();

router.get('/userdata',userAuth,getUserData);

export default router ;