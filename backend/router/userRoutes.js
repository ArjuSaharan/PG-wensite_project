import express from 'express'
import { userLogin, userLogout, userregister } from '../controller/userlogin.js';
const router=express.Router();

router.post('/register',userregister);
router.post('/login',userLogin);
router.post('/logout',userLogout);


export default router;