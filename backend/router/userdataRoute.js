import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../models/userdata.js';
import { getAllOwners } from '../controller/getAllOwner.js';
const router =express.Router();

router.get('/userdata',userAuth,getUserData);
router.get('/all-owners',userAuth,getAllOwners);
export default router ;