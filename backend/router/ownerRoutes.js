import express from 'express'
import { ownerLogin, ownerLogout, ownerregister } from '../controller/ownerlogin.js';
import ownerAuth from '../middleware/ownerAuth.js'
import { getownerdata } from '../models/ownerdata.js';
const router=express.Router();


router.post('/register',ownerregister);
router.post('/login',ownerLogin);
router.post('/logout',ownerLogout);
router.get('/getdata',ownerAuth,getownerdata);
export default router