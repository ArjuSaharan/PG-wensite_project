import express from 'express'
import { userLogin, userLogout, userregister } from '../controller/userlogin.js';
import { getRelatedPgs } from '../controller/getRelatedPgs.js';
import userAuth from '../middleware/userAuth.js'
const router=express.Router();

router.post('/register',userregister);
router.post('/login',userLogin);
router.post('/logout',userLogout);

router .get("/related/:id",getRelatedPgs);
export default router;