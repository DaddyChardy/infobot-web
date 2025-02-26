// File: src/components/UserDropdownMenu.tsx
"use client";

import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { FaCog, FaTrash, FaPaperPlane, FaSignOutAlt } from "react-icons/fa";

interface UserDropdownMenuProps {
  isOpen: boolean;
  userName: string;
  userImage: string | null;
  onSettings: () => void;
  onDeleteAllChats: () => void;
  onContactUs: () => void;
  onClose: () => void;
}

export default function UserDropdownMenu({
  isOpen,
  userName,
  userImage,
  onSettings,
  onDeleteAllChats,
  onContactUs,
  onClose,
}: UserDropdownMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-48 z-50">
      <div className="bg-white/20 backdrop-blur-md border border-white/10 shadow-xl rounded-xl p-2 text-gray-700">
        {/* User Info */}
        <div className="flex items-center px-3 py-2 rounded-lg bg-white/10 hover:bg-white/30 transition-colors duration-200 cursor-default mb-2">
          {userImage ? (
            <Image
              src={userImage}
              alt={userName}
              width={32}
              height={32}
              className="rounded-full mr-2"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-300 rounded-full mr-2" />
          )}
          <span className="text-sm font-semibold truncate">{userName}</span>
        </div>

        {/* Menu Items */}
        <button
          onClick={() => {
            onSettings();
            onClose();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/30 hover:text-blue-600 transition-colors duration-200 text-sm active:scale-95"
        >
          <FaCog />
          Settings
        </button>
        <button
          onClick={() => {
            onDeleteAllChats();
            onClose();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/30 hover:text-blue-600 transition-colors duration-200 text-sm active:scale-95"
        >
          <FaTrash />
          Delete all chats
        </button>
        <button
          onClick={() => {
            onContactUs();
            onClose();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/30 hover:text-blue-600 transition-colors duration-200 text-sm active:scale-95"
        >
          <FaPaperPlane />
          Contact us
        </button>
        <button
          onClick={() => {
            signOut();
            onClose();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/30 hover:text-blue-600 transition-colors duration-200 text-sm active:scale-95"
        >
          <FaSignOutAlt />
          Log out
        </button>
      </div>
    </div>
  );
}
