// File: src/components/Header.tsx
"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const handleLogout = () => signOut();

  // Only use user image if it is a non-empty string
  const userImage =
    session?.user?.image && session.user.image.trim() !== ""
      ? session.user.image
      : null;
  const userEmail = session?.user?.email;

  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2 relative">
      {/* Left side: Icon and INFOBOT text */}
      <div className="flex items-center space-x-2">
        <Image
          src="/infobot.png"
          alt="Infobot Icon"
          width={60} 
          height={60}
          className="rounded"
        />
        <span className="text-2xl font-extrabold uppercase tracking-wider bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          INFOBOT
        </span>
      </div>

      {/* Right side: User profile block */}
      {session?.user ? (
        <div
          className="relative flex items-center space-x-2 p-2 rounded-full border border-gray-200 bg-white shadow-sm cursor-pointer"
          onClick={toggleMenu}
        >
          <div className="relative">
            {userImage ? (
              <Image
                src={userImage}
                alt={userEmail || "User Avatar"}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
            )}
            {/* Green dot indicating "online" */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <span className="text-sm text-gray-700">{userEmail}</span>
          <i className="fas fa-chevron-down text-gray-500" />
          {showMenu && (
            <div className="absolute right-0 top-[calc(100%+0.5rem)] w-24 bg-white border border-gray-200 rounded shadow-lg z-10">
              <button
                onClick={handleLogout}
                className="w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      )}
    </header>
  );
}
