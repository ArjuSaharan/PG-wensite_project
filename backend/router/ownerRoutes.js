import express from 'express'
import { ownerLogin, ownerLogout, ownerregister } from '../controller/ownerlogin.js';
import userAuth from '../middleware/userAuth.js'
import { getownerdata } from '../models/ownerdata.js';
const router=express.Router();


router.post('/register',ownerregister);
router.post('/login',ownerLogin);
router.post('/logout',ownerLogout);
router.get('/getdata',userAuth,getownerdata);
export default router