import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import OwnerChatWindow from "./OwnerchatWindow";
import { AppConetxt } from "../context/AppContext";

const OwnerMessages = () => {
    const { conversationId } = useParams();
    const navigate = useNavigate();
    const { backendUrl } = useContext(AppConetxt);
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activetab, setactivetab] = useState("all");
    const getConversations = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${backendUrl}/message/owner/conversation`,
                {
                    withCredentials: true
                }
            );
            if (response.data.success) {
                setConversations(
                    response.data.conversations
                );
            }
        } catch (error) {
            console.log(
                "GET OWNER CONVERSATIONS ERROR:",
                error.response?.data || error.message
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getConversations();
    }, []);
    useEffect(() => {
        if (!conversationId) {
            setActiveConversation(null);
            return;
        }
        const conversation =
            conversations.find(
                item => item._id === conversationId
            );

        setActiveConversation(
            conversation || null
        );
    }, [conversationId, conversations]);
    const openConversation = (conversation) => {
        navigate(
            `/ownerDashbord/messages/${conversation._id}`
        );

    };

    const filterConversation = conversations.filter((conversation) => {
        if (!conversation.lastMessage?.trim()) {
            return false;
        }
        if (activetab === "unread") {
            return conversation.ownerUnreadCount > 0;
        }
        return true;
    })

    return (
        <div className="flex h-[calc(100vh-70px)] bg-gray-100">
            {/* ================= LEFT SIDEBAR ================= */}
            <div className="w-[330px] bg-white border-r flex flex-col">
                <div className="p-5 shadow">
                    <h1 className="text-xl font-semibold">
                        Messages
                    </h1>
                    <p className="text-sm text-gray-500">
                        Chat with your customers
                    </p>
                </div>
                <div className="flex gap-6 px-5 py-4 shadow text-sm">
                    <button onClick={() => setactivetab("all")}
                        className={activetab === "all" ? "font-semibold text-violet-700" : "text-gray-500"}>
                        All
                    </button>
                    <button onClick={() => setactivetab("unread")}
                        className={activetab === "unread" ? "font-semibold text-violet-700" : "text-gray-500"}>
                        Unread
                    </button>

                </div>
            <div className="overflow-y-auto  flex-1 h-[calc(100%-90px)]">
                
                {loading ? (
                    <div className="p-5 text-gray-500">
                        Loading conversations....
                    </div>
                ) :
                    filterConversation.length === 0 ? (
                        <div className="text-center text-gray-400 mt-10 px-5">
                            {
                                activetab === "unread" ? (
                                    <>
                                        <p className="text-sm">
                                            No unread messages
                                        </p>
                                        <p className="text-xs mt-2">
                                            You are all caught up.
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm">
                                            No conversations yet
                                        </p>

                                    </>
                                )
                            }

                        </div>
                    ) : (
                            filterConversation.map(conversation => (

                                <div
                                    key={conversation._id}
                                    onClick={() =>
                                        openConversation(conversation)
                                    }
                                    className={`flex gap-3 p-4 cursor-pointer shadow mt-1 rounded-full hover:bg-gray-50 ${conversationId === conversation._id
                                        ? "bg-violet-50"
                                        : ""
                                        }`}>
                                    <div className="w-11 h-11 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-semibold">
                                        {
                                            conversation.userId?.name
                                                ?.charAt(0)
                                                ?.toUpperCase() || "U"
                                        }
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium">{conversation.userId?.name || "User"}</h3>
                                        <div className="flex justify-between items-center mt-1 w-full">
                                            <p className="text-xs text-gray-400 truncate mt-1  max-w-[75%]">
                                                {conversation.lastMessage ||
                                                    "Start a conversation"}
                                            </p>
                                            <span className={`text-xs text-gray-400 ml-2 ${conversation.ownerUnreadCount > 0 ? "text-green-600 font-bold" : ""} `}>
                                                {conversation.lastMessageAt &&
                                                    new Date(conversation.lastMessageAt).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })
                                                }
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            ))
                    )}
        </div>
        </div>
            {/* ================= CHAT AREA ================= */ }
    <div className="flex-1">
        {activeConversation ? (
            <OwnerChatWindow
                conversation={activeConversation}
                backendUrl={backendUrl}
                onMessageSent={getConversations}
            />

        ) : (

            <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                    <h2 className="text-xl font-medium">
                        Select a conversation
                    </h2>
                    <p className="text-sm mt-2">
                        Select a customer to start chatting
                    </p>
                </div>
            </div>
        )}
    </div>
        </div >
    );
};

export default OwnerMessages;