import express from 'express'
import { addPgData, deletePg, editData, getAllPgs, getPgforEdit, getPgs } from '../controller/pgform.js'
import upload from '../middleware/upload.js';
import ownerAuth from '../middleware/ownerAuth.js';
const router=express.Router();

// add pg 
router.post('/addpg',ownerAuth,upload.array("images",6),addPgData);
router.get('/my-pgs',ownerAuth,getPgs);
router.get("/all-pgs",getAllPgs);
router.get('/editdata/:id',ownerAuth,getPgforEdit);
router.put('/editdata/:id',ownerAuth,editData);
router.delete('/delete/:id',ownerAuth,deletePg);

export default router