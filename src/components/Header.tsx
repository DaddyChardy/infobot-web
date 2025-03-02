// File: src/components/Header.tsx
"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";

import UserDropdownMenu from "./UserDropdownMenu";
import AppearanceSettingsModal from "./AppearanceSettingsModal";
import ContactUsModal from "./ContactUsModal";
import GradientText from "./GradientText"; // Import the gradient text component

export default function Header() {
  const { data: session } = useSession();
 
  const [showMenu, setShowMenu] = useState(false);
  const [showAppearanceModal, setShowAppearanceModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const closeMenu = () => setShowMenu(false);

  const openAppearanceModal = () => {
    setShowAppearanceModal(true);
    closeMenu();
  };
  const closeAppearanceModal = () => setShowAppearanceModal(false);

  const openContactModal = () => {
    setShowContactModal(true);
    closeMenu();
  };
  const closeContactModal = () => setShowContactModal(false);

  const userName = session?.user?.name || "DAddy Chard";
  const userImage =
    session?.user?.image && session.user.image.trim() !== ""
      ? session.user.image
      : null;
  const userEmail = session?.user?.email;

  // Dropdown callbacks
  const handleSettings = () => {
    openAppearanceModal();
  };
  const handleDeleteAllChats = () => {
    console.log("Delete all chats triggered");
    // Your delete-all-chats logic here.
    closeMenu();
  };
  const handleContactUs = () => {
    openContactModal();
  };

  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2 relative">
      {/* Left: Infobot Icon & Gradient Text */}
      <div className="flex items-center space-x-1">
        <Image
          src="/infobot.png"
          alt="Infobot Icon"
          width={40}
          height={40}
          className="rounded"
          priority
        />
        <GradientText
          colors={["#40ffaa, #4079ff,rgb(238, 55, 255), #4079ff,rgb(217, 64, 255)"]}
          animationSpeed={8 }
          showBorder={false}
          className="text-2xl font-extrabold"
        >
          Infobot
        </GradientText>
      </div>

      {/* Right: User profile */}
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
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <span className="text-sm text-gray-700">{userEmail}</span>
          <i className="fas fa-chevron-down text-gray-500" />
          {showMenu && (
            <UserDropdownMenu
              isOpen={showMenu}
              userName={userName}
              userImage={userImage}
              onSettings={handleSettings}
              onDeleteAllChats={handleDeleteAllChats}
              onContactUs={handleContactUs}
              onClose={closeMenu}
            />
          )}
        </div>
      ) : (
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      )}

      <AppearanceSettingsModal
        isOpen={showAppearanceModal}
        onClose={closeAppearanceModal}
        onThemeChange={(theme) => console.log("Theme:", theme)}
        onFontChange={(font) => console.log("Font:", font)}
      />

      <ContactUsModal isOpen={showContactModal} onClose={closeContactModal} />
    </header>
  );
}
