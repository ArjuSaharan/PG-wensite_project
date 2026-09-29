import React, { useRef } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';
import { io } from 'socket.io-client';
const ChatWindow = ({ conversation, backendUrl, onMessageSent }) => {

  const [messages, setMessage] = useState([]);
  const [text, settext] = useState("");
  const socketRef = useRef(null);

  const getMessage = async () => {
    try {
      const response = await axios.get(`${backendUrl}/message/${conversation._id}`, {
        withCredentials: true
      })
      if (response.data.success) {
        setMessage(response.data.messages);
      }
    }
    catch (error) {
      console.log(
        "GET MESSAGES ERROR:",
        error.response?.data || error.message);
    }
  }
  useEffect(() => {
    if (!conversation?._id) return;
    getMessage();
  }, [conversation?._id]);


  // socket io
  useEffect(() => {
    if (!conversation?._id) return;
    const socket = io(backendUrl, {
      withCredentials: true
    })
    socketRef.current = socket;
    console.log("connection socket ...");
    // connect
    socket.on("connect", () => {
      console.log("socket connected", socket.id);
      socket.emit("joinConversation", conversation._id)
    })

    socket.on("receiveMessage", (newMessage) => {
      console.log("new message revieved: ", newMessage);
      setMessage((prev) => {
        const alreadyexist = prev.some((message) => message._id === newMessage._id);
        if (alreadyexist) {
          return prev;
        }

        return [...prev, newMessage];
      });
    });

    // socket error
    socket.on("messageError", (error) => {
      console.log("socket message error", error);
    })

    return () => {
      console.log("disconnect socekt")
      socket.disconnect();
      socketRef.current = null;
    }
  }, [conversation?._id, backendUrl]);
  // send message
  const sendMessage = async () => {
    if (!text.trim()) {
      return;
    }
    if (!socketRef.current) {
      console.log("socket is not connected");
      return;
    }
    const messageData = {
      conversationId: conversation._id,
      senderId: conversation.userId,
      senderRole: "User",
      text: text.trim()
    }
    console.log("message :", messageData);
    socketRef.current.emit("sendMessage", messageData);
    settext("");

    if (onMessageSent) {
      onMessageSent();
    }
  }
  const handleKey = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }
  return (
    <>
      <div className='h-full flex flex-col'>
        {/* /hat header */}
        <div className='h-[80px] border-b border-gray-200 flex items-center px-7'>
          <div className='w-11 h-11 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-semibold'>
            {conversation.ownerId?.name.charAt(0).toUpperCase() || "O"}
          </div>
          <div className="ml-4">
            <h2 className="font-semibold text-gray-900">
              {conversation.ownerId?.name ||
                "Owner"}
            </h2>
            <p className="text-sm text-gray-500">
              {conversation.pgId?.pgName}</p>
          </div>
        </div>
        {/* messasge */}
        <div className='flex-1 overflow-y-auto p-7 space-y-4 bg-gray-50'>
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500">
                  No messages yet
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Send a message to start the conversation.
                </p>
              </div>
            </div>
          ) : (
            messages.map((message) => {
              const isUser =
                message.senderRole === "User";
              return (
                <div
                  key={message._id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-[65%] px-4 py-3 rounded-2xl ${isUser
                        ? "bg-violet-600 text-white rounded-br-md"
                        : "bg-white text-gray-800 rounded-bl-md shadow-sm"
                      }`}
                  >{message.text}
                    <div
                      className={`text-[10px] text-right mt-1 ${isUser
                          ? "text-violet-200"
                          : "text-gray-400"
                        }`}
                    >
                      {message.createdAt &&
                        new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })
                      }
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* input */}
        <div className="border-t border-gray-200 p-5 flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => settext(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a message..."
            className="flex-1 border border-gray-200 rounded-xl px-5 py-3 outline-none focus:border-violet-500"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700"
          > Send</button>
        </div>

      </div>
    </>
  )
}

export default ChatWindow