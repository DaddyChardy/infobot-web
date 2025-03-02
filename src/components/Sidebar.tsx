// File: src/components/Sidebar.tsx
"use client";

import React from "react";
import { FaTrash } from "react-icons/fa";


interface Chat {
  id: string;
  title: string;
  lastMessageTime: string;
}

interface SidebarProps {
  chats: Chat[];
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
}

export default function Sidebar({
  chats,
  onNewChat,
  onSelectChat,
  onDeleteChat,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      {/* New Chat Button with updated glassmorphic style */}
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/20 font-medium mb-4"
      >
        + New Chat
      </button>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {chats.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">No chats yet.</p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className="group relative w-full bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2 flex items-center justify-between transition"
            >
              {/* Clicking on the left part selects the chat */}
              <button
                onClick={() => onSelectChat(chat.id)}
                className="flex-1 text-left overflow-hidden"
              >
                <div className="font-medium truncate">{chat.title}</div>
                <div className="text-xs text-gray-500 truncate">
                  {chat.lastMessageTime}
                </div>
              </button>

              {/* Delete icon appears on hover */}
              <button
                onClick={() => onDeleteChat(chat.id)}
                className="ml-2 opacity-0 group-hover:opacity-100 transition"
              >
                <FaTrash className="text-gray-400 hover:text-red-500" />
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
    
  );

}
