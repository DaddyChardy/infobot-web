// File: src/components/Sidebar.tsx

"use client";

import React from "react";

interface Chat {
  id: string;
  title: string;
  lastMessageTime: string;
}

interface SidebarProps {
  chats: Chat[];
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
}

export default function Sidebar({ chats, onNewChat, onSelectChat }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      {/* New Chat Button */}
      <button
        onClick={onNewChat}
        className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition mb-4"
      >
        + New Chat
      </button>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="w-full text-left bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2"
          >
            <div className="font-medium">{chat.title}</div>
            <div className="text-xs text-gray-500">{chat.lastMessageTime}</div>
          </button>
        ))}
      </div>
    </aside>
  );
}
