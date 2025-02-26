// File: src/components/Header.tsx
"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UserDropdownMenu from "./UserDropdownMenu";
import ConfirmDeleteAllChatsModal from "./ConfirmDeleteAllChatsModal";
import AppearanceSettingsModal from "./AppearanceSettingsModal";
import ContactUsModal from "./ContactUsModal";
import { deleteAllChats } from "@/services/chatService";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmDeleteAll, setShowConfirmDeleteAll] = useState(false);

  // For the appearance settings modal
  const [showAppearanceModal, setShowAppearanceModal] = useState(false);

  // For the contact us modal
  const [showContactModal, setShowContactModal] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);
  const closeMenu = () => setShowMenu(false);

  // "Delete all chats" -> open confirm modal
  const handleDeleteAllChats = () => {
    setShowConfirmDeleteAll(true);
  };

  // Called when user confirms deletion
  const handleConfirmDeleteAll = async () => {
    if (!session?.user?.email) return;
    try {
      await deleteAllChats(session.user.email);
      console.log("All chats deleted");
      // Optionally redirect to /chat to reset to default
      router.push("/chat");
    } catch (err) {
      console.error("Error deleting all chats:", err);
    } finally {
      setShowConfirmDeleteAll(false);
    }
  };

  const handleCancelDeleteAll = () => {
    setShowConfirmDeleteAll(false);
  };

  // "Settings" -> open appearance modal
  const handleSettings = () => {
    setShowAppearanceModal(true);
  };
  const handleCloseAppearanceModal = () => {
    setShowAppearanceModal(false);
  };

  // "Contact us" -> open contact modal
  const handleContactUs = () => {
    setShowContactModal(true);
  };
  const handleCloseContactModal = () => {
    setShowContactModal(false);
  };

  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2 relative">
      {/* Left: Infobot Logo & Title */}
      <div className="flex items-center space-x-0">
        <Image
          src="/infobot.png"
          alt="Infobot Icon"
          width={40}
          height={40}
          className="rounded"
          priority
        />
        <span className="text-2xl font-bold bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          Infobot
        </span>
      </div>

      {/* Right: User profile */}
      {session?.user ? (
        <div
          className="relative flex items-center space-x-2 p-2 rounded-full border border-gray-200 bg-white shadow-sm cursor-pointer"
          onClick={toggleMenu}
        >
          {/* User avatar */}
          <div className="relative">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.email || "User Avatar"}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
            )}
            {/* Online indicator */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <span className="text-sm text-gray-700">{session.user.email}</span>
          <i className="fas fa-chevron-down text-gray-500" />
          {showMenu && (
            <UserDropdownMenu
              isOpen={showMenu}
              userName={session.user.name || "Unknown"}
              userImage={session.user.image || null}
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

      {/* Confirm Delete All Chats Modal */}
      <ConfirmDeleteAllChatsModal
        isOpen={showConfirmDeleteAll}
        onConfirm={handleConfirmDeleteAll}
        onCancel={handleCancelDeleteAll}
      />

      {/* Appearance Settings Modal */}
      <AppearanceSettingsModal
        isOpen={showAppearanceModal}
        onClose={handleCloseAppearanceModal}
        onThemeChange={(theme) => console.log("Theme changed to:", theme)}
        onFontChange={(font) => console.log("Font changed to:", font)}
        onLanguageChange={(lang) => console.log("Language changed to:", lang)}
      />

      {/* Contact Us Modal */}
      <ContactUsModal
        isOpen={showContactModal}
        onClose={handleCloseContactModal}
      />
    </header>
  );
}
