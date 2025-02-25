// File: src/app/chat/page.tsx

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

interface Message {
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

  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botTyping]);

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: Chat = {
      id: newChatId,
      title: "New Chat",
      lastMessageTime: new Date().toLocaleString(),
    };
    setChats((prev) => [...prev, newChat]);
    setCurrentChatId(newChatId);
    setMessages([]);
  };

  const handleSelectChat = (id: string) => {
    setCurrentChatId(id);
    setMessages([]);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Failed to copy text:", err);
    });
  };

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input.trim(),
      sender: "user",
      time: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setBotTyping(true);

    try {
      const response = await fetch(
        "https://deped.depedtandagn8n.shop/webhook/5f1c0c82-0ff9-40c7-9e2e-b1a96ffe24cd/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: "test-session",
            action: "sendMessage",
            chatInput: userMessage.content,
          }),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const botReply = data.output || "Sorry, I didn't understand that.";

      const botMessage: Message = {
        content: botReply,
        sender: "bot",
        time: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        content: "Error: Unable to get response",
        sender: "bot",
        time: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
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
  if (!session) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          chats={chats}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
        />

        <div className="flex-1 flex flex-col bg-transparent relative">
          {!currentChatId ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6">
                <img src="/infobot.png" alt="Infobot" className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to the DepEd <br /> Tandag City Division Infobot! 🌟
              </h2>
              <p className="text-gray-500 mb-8 max-w-md">
                "Hello there! I’m INFOBOT, your official DepEd Tandag City Division
                chatbot. I’m here to help you with enrollment details, class
                schedules, policies, and the latest updates. How can I assist you today?"
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
            <>
              <div className="flex-1 p-4 overflow-y-auto relative">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-no-repeat bg-center opacity-50"
                  style={{
                    backgroundImage: "url('/icon-512x512.png')",
                    backgroundSize: "400px",
                  }}
                />
                
                {messages.map((msg, index) => {
                  const isUser = msg.sender === "user";
                  return (
                    <div
                      key={index}
                      className={`mb-3 flex items-end ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isUser && (
                        <img
                          src="/infobot.png"
                          alt="Infobot"
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
                        <p>{msg.content}</p>
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
                      {isUser &&
                        (session?.user?.image ? (
                          <img
                            src={session.user.image}
                            alt="User"
                            className="w-8 h-8 rounded-full ml-2"
                          />
                        ) : (
                          <i className="fas fa-user text-2xl text-gray-500 ml-2" />
                        ))}
                    </div>
                  );
                })}
                {botTyping && (
                  <div className="mb-3 flex items-end justify-start">
                    <img
                      src="/infobot.png"
                      alt="Infobot"
                      className="w-8 h-8 mr-2"
                    />
                    <div className="relative max-w-[70%] px-4 py-2 rounded-lg text-sm shadow bg-gray-200 text-gray-800 rounded-bl-none">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <footer className="bg-transparent p-5 flex items-center space-x-5 w-300 h-11">
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
                  className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition"
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