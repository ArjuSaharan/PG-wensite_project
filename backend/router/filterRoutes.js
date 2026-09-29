import express from 'express'
import upload from '../middleware/upload.js';
import ownerAuth from '../middleware/ownerAuth.js';
import { filterPgs } from '../controller/filterpgs.js';
const router=express.Router();


router.get("/filter",filterPgs);

export default router