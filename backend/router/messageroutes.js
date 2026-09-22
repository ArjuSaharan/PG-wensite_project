import express from 'express';
import userAuth from '../middleware/userAuth.js'
import ownerAuth from '../middleware/ownerAuth.js';
import { createConersation, getMessage, getUnreadMessageCount, getUserConversations, sendMessage } from '../controller/message.js';
import { getOnwerConversations, getOwnerMessage, ownerSendMEssage } from '../controller/ownermessage.js';
const router=express.Router();


router.get("/conversation",userAuth,getUserConversations);
router.post("/conversation",userAuth,createConersation);
router .get("/unread-count",userAuth,getUnreadMessageCount);

router.get("/owner/conversation",ownerAuth,getOnwerConversations);
router.get("/owner/:conversationId",ownerAuth,getOwnerMessage);
router.post("/owner/send",ownerAuth,ownerSendMEssage);


router.get("/:conversationId",userAuth,getMessage);
router.post("/:conversationId",userAuth,sendMessage);

export default router;

