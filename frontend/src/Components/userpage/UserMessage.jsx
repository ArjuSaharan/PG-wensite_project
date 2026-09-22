import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiSearch, FiPhone, FiVideo, FiMoreVertical, FiSend, FiPaperclip, FiSmile } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import { useContext } from "react";
import { AppConetxt } from "../../context/AppContext";
import ChatWindow from "./ChatWindow";

const UserMessage = () => {
  const { conversationId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppConetxt);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [loading, setloading] = useState(true);
  const [activetab, setactivetab] = useState("all");
  const[search,setserach]=useState("");
  // get user conversation
  const getconversations = async () => {
    try {
      setloading(true);
      const response = await axios.get(`${backendUrl}/message/conversation`, {
        withCredentials: true
      })
      if (response.data.success) {
        setConversations(response.data.conversations)
      }
    }
    catch (error) {
      console.log(
        "GET CONVERSATIONS ERROR:",
        error.response?.data || error.message
      );
    }
    finally {
      setloading(false);
    }
  }
  useEffect(() => {
    getconversations();
  }, []);

  const [message, setMessage] = useState("");
  useEffect(() => {
    const newConversation = location.state?.conversation;
    if (newConversation) {
      setConversations((prev) => {
        const alreadyExists = prev.some(
          (item) => item._id === newConversation._id
        );

        if (alreadyExists) {
          return prev;
        }
        return [newConversation, ...prev];
      });

      setActiveConversation(newConversation);
    }

  }, [location.state]);

  /*
    Select conversation from left sidebar
  */
  useEffect(() => {
    if (!conversationId) {
      setActiveConversation(null);
      return;
    }
    const conversation = conversations.find((item) => item._id === conversationId);
    setActiveConversation(conversation || null)
  }, [conversationId, conversations]);



  const openConversation = (conversation) => {
    navigate(`/messages/${conversation._id}`)
  }
  const filterConversation = conversations.filter((conversation) => {
    if (!conversation.lastMessage?.trim()) {
      return false;
    }
    if (activetab === "unread") {
      return conversation.userUnreadCount > 0;
    }
    if(search.trim()){
      const ownerName = conversation.ownerId?.name?.toLowerCase() || "";      const serachName=search.toLowerCase().trim();
      if(!ownerName.includes(serachName)){
        return false;
      }
    }
    return true;
  })
  return (
    <div className="h-[calc(100vh-70px)] bg-gray-100 p-4">

      <div className="h-full max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex">
        {/* LEFT SIDEBAR */}
        <div className="w-[320px] border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900 mb-4">
              Messages
            </h1>
            <div className="relative">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e)=>setserach(e.target.value)}
                placeholder="Search"
                className="w-full bg-gray-100 rounded-lg pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300"
              />

            </div>
            {/* Tabs */}
            <div className="flex gap-5 mt-4 text-sm">
              <button onClick={() => setactivetab("all")}
                className={activetab === "all" ? "font-semibold text-violet-700" : "text-gray-500"}>
                All
              </button>
              <button onClick={() => setactivetab("unread")}
                className={activetab === "unread" ? "font-semibold text-violet-700" : "text-gray-500"}>
                Unread
              </button>

            </div>
          </div>
          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto p-3">
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
                        <p className="text-xs mt-2">
                          Click Message on a PG to start a conversation.
                        </p>
                      </>
                    )
                  }

                </div>
              ) : (
                  filterConversation.map((conversation) => {
                    const isActive =
                      conversation._id === conversationId;
                    return (
                      <div
                        key={conversation._id}
                        onClick={() => openConversation(conversation)}
                        className={` shadow
                      flex items-center gap-3 p-3 mb-2 rounded-xl cursor-pointer
                      transition ${conversationId === conversation._id ? "bg-violet-50" : ""}  `}
                      >
                        {/* Avatar */}

                        <div className="w-11 h-11 rounded-full bg-violet-200 flex items-center justify-center flex-shrink-0 text-voilet-700 font-semibold">
                          {conversation.ownerId?.name?.charAt(0).toUpperCase()}
                          {/* <FaRegUserCircle
                        className="text-violet-600 w-6 h-6"
                      /> */}
                        </div>
                        {/* Conversation information */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <h3 className="font-semibold text-sm text-gray-900 truncate">
                              {conversation.ownerId?.name || "Owner"}
                            </h3>
                            {
                              conversation.userUnreadCount > 0 && (
                                <span
                                  className="bg-green-600 text-white text-xs
                                   min-w-5 h-5 px-1 rounded-full
                                   flex items-center justify-center"
                                >{conversation.userUnreadCount} </span>
                              )
                            }
                          </div>
                          <div className="flex justify-between items-center mt-1 w-full">
                            <p className="text-xs text-gray-400 truncate mt-1  max-w-[75%]">
                              {conversation.lastMessage ||
                                "Start a conversation"}
                            </p>
                            <span className={`text-xs text-gray-400 ml-2 ${conversation.userUnreadCount > 0 ? "text-green-600 font-bold" : ""} `}>
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
                    );
                  })
              )}
          </div>
        </div>
        {/* RIGHT CHAT AREA */}
        <div className="flex-1">

          {activeConversation ? (

            <ChatWindow
              conversation={activeConversation}
              backendUrl={backendUrl}
              onMessageSent={getconversations}
            />

          ) : (

            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-28 h-28 rounded-full bg-violet-100 flex items-center justify-center mx-auto">
                  <span className="text-5xl text-violet-500">
                    ⌕
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mt-8">
                  Your Messages
                </h2>
                <p className="text-gray-500 mt-4 text-lg">
                  Select a conversation to start chatting.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserMessage;