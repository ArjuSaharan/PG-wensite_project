import messageModel from "../models/messageModel.js";
import conersationalModel from "../models/conversation.js";

export const chatSocket = (io, socket) => {
    console.log("chat socket connected", socket.id);
    // join conversation
    socket.on("joinConversation", async (conversationId) => {
        try {
            socket.join(conversationId);
            console.log(`socket ${socket.id} joined ${conversationId}`)
        }
        catch (error) {
            console.log("join error: ", error);
        }
    });
    // send message
    socket.on("sendMessage", async (data) => {
        try {
            console.log("send message :",data);
            const { conversationId, senderId, senderRole, text } = data;
            if (!conversationId || !senderId || !senderRole || !text || !text.trim()) {
                socket.emit("messageError", {
                    message: "Invalid message data"
                })
                return;
            }

            // check conversation
            const conversation = await conersationalModel.findById(conversationId);
            if (!conversation) {
                socket.emit("messageError", {
                    message: "Invalid message data"
                })
                return;
            }

            // create message
            const message = await messageModel.create({
                conversationId,
                senderId,
                senderRole,
                text: text.trim()
            });
            // update conversation
            conversation.lastMessage = text.trim();
            conversation.lastMessageAt = new Date();
            if (senderRole === "User") {
                conversation.ownerUnreadCount =(conversation.ownerUnreadCount || 0) + 1;

                console.log(
                    "OWNER UNREAD COUNT:",
                    conversation.ownerUnreadCount
                );
            }
            if (senderRole === "Owner") {
                conversation.userUnreadCount =(conversation.userUnreadCount || 0) + 1;
                console.log(
                    "USER UNREAD COUNT:",
                    conversation.userUnreadCount
                );
            }
            await conversation.save();
            io.to(conversationId).emit("receiveMessage", message);
        }
        catch (error) {
            console.log("SEND SOCKET MESSAGE ERROR:", error);
            socket.emit("messageError", {
                message: error.message
            });
        }
    })

    socket.on("disconnect", () => {
        console.log("chat socket disconnectes", socket.id);
    })
}