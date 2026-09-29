import React, {useEffect,useRef,useState} from "react";
import axios from "axios";
import {FiSend} from "react-icons/fi";
import { io } from "socket.io-client";


const OwnerChatWindow = ({conversation,backendUrl,onMessageSent}) => {

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const socketRef = useRef(null);
    const getMessages = async () => {
        try {

            const response = await axios.get(
                `${backendUrl}/message/owner/${conversation._id}`,
                {
                    withCredentials: true
                }
            );
            if (response.data.success) {
                setMessages(
                    response.data.messages
                );
            }
        } catch (error) {
            console.log(
                "GET OWNER MESSAGES ERROR:",
                error.response?.data || error.message
            );
        }
    };

    useEffect(() => {
        if (!conversation?._id) return;
        getMessages();
    }, [conversation?._id]);
    useEffect(() => {

        if (!conversation?._id) return;
        const socket = io(
            backendUrl,
            {
                withCredentials: true
            }
        );
        socketRef.current = socket;
        socket.on("connect", () => {
            console.log(
                "OWNER SOCKET CONNECTED:",
                socket.id
            );
            socket.emit(
                "joinConversation",
                conversation._id
            );
        });
        socket.on(
            "receiveMessage",
            (newMessage) => {
                setMessages(prev => {
                    if (prev.some(message =>
                                message._id ===newMessage._id)) {
                        return prev;
                    }
                    return [
                        ...prev,
                        newMessage
                    ];

                });
                if (onMessageSent) {
                    onMessageSent();
                }
            }
        );
        socket.on(
            "messageError",
            error => {
                console.log(
                    "SOCKET MESSAGE ERROR:",
                    error
                );

            }
        );


        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, [
        conversation?._id,
        backendUrl
    ]);
    const sendMessage = () => {
        if (!text.trim()) return;
        if (!socketRef.current) return;
        socketRef.current.emit(
            "sendMessage",
            {
                conversationId:conversation._id,
                senderId:conversation.ownerId,
                senderRole: "Owner",
                text: text.trim()
            }
        );
        setText("");

    };
    const handleKeyDown = (e) => {

        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();

        }
    };

    return (

        <div className="h-full flex flex-col bg-gray-50">
            <div className="h-[70px] bg-white border-b flex items-center px-6">
                <div className="w-11 h-11 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-semibold">
                    {
                        conversation.userId?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"
                    }

                </div>
                <div className="ml-3">
                    <h2 className="font-semibold">{conversation.userId?.name ||   "User"}</h2>
                    <p className="text-xs text-gray-500">{conversation.pgId?.pgName}</p>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {messages.map(message => {
                    const isOwner =
                        message.senderRole === "Owner";
                    return (
                        <div
                            key={message._id}
                            className={`flex ${
                                isOwner
                                    ? "justify-end"
                                    : "justify-start"
                            }`} >
                            <div
                                className={`max-w-[65%] px-4 py-2 rounded-2xl ${
                                    isOwner
                                        ? "bg-violet-600 text-white rounded-br-sm"
                                        : "bg-white border text-gray-800 rounded-bl-sm"
                                }`}>
                            <p className="text-sm">{message.text}</p>
                                <p
                                    className={`text-[10px] mt-1 ${
                                        isOwner
                                            ? "text-violet-200"
                                            : "text-gray-400"
                                    }`}>
                                    {new Date(
                                        message.createdAt
                                    ).toLocaleTimeString(
                                        [],
                                        {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        }
                                    )}

                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="bg-white border-t p-4">
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={text}
                        onChange={e =>
                            setText(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="flex-1 border rounded-full px-5 py-3 outline-none focus:border-violet-500"/>
                    <button
                        onClick={sendMessage}
                        className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center hover:bg-violet-700"                    >
                        <FiSend size={19} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OwnerChatWindow;