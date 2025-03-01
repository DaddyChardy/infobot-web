// File: src/app/chat/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  createChat,
  deleteChat,
  addMessage,
  updateChatTitle,
  fetchBotReply,
} from "@/services/chatService";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  time: string;
}

interface Chat {
  id: string;
  title: string;
  lastMessageTime: string;
}

function TypingIndicator() {
  return (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.2s]" />
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.1s]" />
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
    </div>
  );
}

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Real-time listener for chats
  useEffect(() => {
    if (session?.user?.email) {
      const chatsRef = collection(db, "users", session.user.email, "chats");
      const q = query(chatsRef, orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const loadedChats: Chat[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            title: data.title || "New Chat",
            lastMessageTime: data.lastMessageTime || "",
          };
        });
        setChats(loadedChats);
      });
      return () => unsubscribe();
    }
  }, [session]);

  // Real-time listener for messages in selected chat
  useEffect(() => {
    if (currentChatId && session?.user?.email) {
      const messagesRef = collection(
        db,
        "users",
        session.user.email,
        "chats",
        currentChatId,
        "messages"
      );
      const q = query(messagesRef, orderBy("createdAt", "asc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const loadedMessages: Message[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            content: data.text || "",
            sender: data.sender || "bot",
            time: data.time || new Date().toISOString(),
          };
        });
        setMessages(loadedMessages);
      });
      return () => unsubscribe();
    } else {
      setMessages([]);
    }
  }, [currentChatId, session]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botTyping]);

  // Create new chat
  const handleNewChat = async () => {
    if (!session?.user?.email) return;
    const userEmail = session.user.email;
    const chatId = Date.now().toString();
    try {
      await createChat(userEmail, chatId, "New Chat");
      setCurrentChatId(chatId);
      setMessages([]);
    } catch (err) {
      console.error("Error creating chat:", err);
    }
  };

  // Select a chat
  const handleSelectChat = (id: string) => {
    setCurrentChatId(id);
  };

  // Delete a chat (and its messages)
  const handleDeleteChat = async (id: string) => {
    if (!session?.user?.email) return;
    try {
      await deleteChat(session.user.email, id);
      if (currentChatId === id) {
        setCurrentChatId(null);
        setMessages([]);
      }
    } catch (err) {
      console.error("Error deleting chat:", err);
    }
  };

  // Copy text to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Failed to copy text:", err);
    });
  };

  // Send message and update chat title if needed
  const handleSendMessage = async () => {
    if (!input.trim() || !currentChatId || !session?.user?.email) return;
    const userEmail = session.user.email;

    // If chat title is "New Chat", rename it
    const currentChat = chats.find((chat) => chat.id === currentChatId);
    if (currentChat && currentChat.title === "New Chat") {
      const updatedTitle =
        input.trim().length > 20 ? input.trim().slice(0, 20) + "..." : input.trim();
      try {
        await updateChatTitle(userEmail, currentChatId, updatedTitle);
      } catch (err) {
        console.error("Error updating chat title:", err);
      }
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      time: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setBotTyping(true);

    try {
      await addMessage(
        userEmail,
        currentChatId,
        userMsg.content,
        userMsg.sender,
        userMsg.time,
        session?.user?.image || undefined
      );
      const botReply = await fetchBotReply(userMsg.content);
      const botMsg: Message = {
        id: Date.now().toString() + "_bot",
        content: botReply, // This will be Markdown formatted
        sender: "bot",
        time: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);
      await addMessage(
        userEmail,
        currentChatId,
        botMsg.content,
        botMsg.sender,
        botMsg.time,
        "/infobot.png"
      );
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMsg: Message = {
        id: Date.now().toString() + "_err",
        content: "Error: Unable to get response",
        sender: "bot",
        time: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      await addMessage(
        userEmail,
        currentChatId,
        errorMsg.content,
        errorMsg.sender,
        errorMsg.time,
        "/infobot.png"
      );
    } finally {
      setBotTyping(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading chat...
      </div>
    );
  }
  if (status === "unauthenticated" || !session) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Header */}
      <Header />

      {/* Row layout: Sidebar on left, chat on right */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          chats={chats}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
        />

        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-transparent relative">
          {!currentChatId ? (
            // Welcome Screen
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6">
                <Image
                  src="/infobot.png"
                  alt="Infobot"
                  width={60}
                  height={60}
                  className="h-15 w-15"
                  priority
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to the DepEd <br /> Tandag City Division Infobot! 🌟
              </h2>
              <p className="text-gray-500 mb-8 max-w-md">
                Hello there! I&apos;m INFOBOT, your official DepEd Tandag City Division
                chatbot. I&apos;m here to help you!!
              </p>
              <button
                onClick={handleNewChat}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/20 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Start a New Chat
              </button>
            </div>
          ) : (
            // Active Chat UI
            <>
              <div className="flex-1 p-4 overflow-y-auto relative">
                <div
                  className="absolute inset-0 bg-no-repeat bg-center opacity-50"
                  style={{
                    backgroundImage: "url('/icon-512x512.png')",
                    backgroundSize: "400px",
                  }}
                />
                {messages.map((msg) => {
                  const isUser = msg.sender === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`mb-3 flex items-end ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      {/* Bot icon */}
                      {!isUser && (
                        <Image
                          src="/infobot.png"
                          alt="Infobot"
                          width={32}
                          height={32}
                          className="w-8 h-8 mr-2"
                        />
                      )}
                      <div
                        className={`relative max-w-[70%] px-4 py-2 rounded-lg text-sm shadow ${
                          isUser
                            ? "bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white rounded-br-none"
                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                        }`}
                      >
                     {isUser ? (
  <p>{msg.content}</p>
) : (
  <ReactMarkdown
    components={{
      a: ({ ...props }) => (
        <a {...props} className="text-blue-600 uppercase hover:underline" />
      ),
      p: ({ ...props }) => <p className="mb-2" {...props} />,
    }}
  >
    {msg.content}
  </ReactMarkdown>
)}


                        <div className="absolute -bottom-5 flex items-center gap-1 text-xs text-gray-500">
                          <span>{formatTime(msg.time)}</span>
                          <button
                            onClick={() => handleCopy(msg.content)}
                            className="hover:text-gray-700 transition"
                          >
                            <i className="fas fa-copy" />
                          </button>
                        </div>
                      </div>
                      {/* User icon */}
                      {isUser && session?.user?.image && (
                        <Image
                          src={session.user.image}
                          alt="User"
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full ml-2"
                        />
                      )}
                    </div>
                  );
                })}
                {botTyping && (
                  <div className="mb-3 flex items-end justify-start">
                    <Image
                      src="/infobot.png"
                      alt="Infobot"
                      width={32}
                      height={32}
                      className="w-8 h-8 mr-2"
                    />
                    <div className="relative max-w-[70%] px-4 py-2 rounded-lg text-sm shadow bg-gray-200 text-gray-800 rounded-bl-none">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <footer className="bg-transparent p-5 flex items-center space-x-5">
                <input
                  type="text"
                  className="flex-1 px-5 py-2 rounded-full border border-gray-300 focus:outline-none bg-transparent"
                  placeholder="Ask anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white rounded-full hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 transition"
                >
                  Send
                </button>
              </footer>
              <div className="text-center text-xs text-gray-500 py-2 bg-transparent">
                Infobot can make mistakes. Check important info.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
