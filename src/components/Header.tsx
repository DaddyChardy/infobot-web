// File: src/components/Header.tsx
"use client";

import Image from "next/image";
import { useSession} from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UserDropdownMenu from "./UserDropdownMenu";
import AppearanceSettingsModal from "./AppearanceSettingsModal";
import ContactUsModal from "./ContactUsModal";
import ConfirmDeleteAllChatsModal from "./ConfirmDeleteAllChatsModal";
import GradientText from "./GradientText";
import { deleteAllChats } from "@/services/chatService";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showAppearanceModal, setShowAppearanceModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

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

  const userName = session?.user?.name || "Guest User";
  const userImage = session?.user?.image || null;
  const userEmail = session?.user?.email;

  // Handler for delete-all-chats from the dropdown
  const handleDeleteAllChats = async () => {
    if (userEmail) {
      try {
        await deleteAllChats(userEmail);
        router.refresh(); // Reload the page to update the chat list
      } catch (err) {
        console.error("Error deleting all chats:", err);
      }
    }
    setShowDeleteAllModal(false);
  };

  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2 relative">
      <div className="flex items-center space-x-2">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 mr-1 text-gray-600 hover:text-gray-800"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo Section */}
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
            colors={[
              "#40ffaa",
              "#4079ff",
              "rgb(238, 55, 255)",
              "#4079ff",
              "rgb(217, 64, 255)",
            ]}
            animationSpeed={8}
            showBorder={false}
            className="text-2xl font-extrabold"
          >
            Infobot
          </GradientText>
        </div>
      </div>

      {/* User Section */}
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
          <span className="text-sm text-gray-700 hidden md:inline">
            {userEmail}
          </span>
          <i className="fas fa-chevron-down text-gray-500" />
          {showMenu && (
            <UserDropdownMenu
              isOpen={showMenu}
              userName={userName}
              userImage={userImage}
              onSettings={openAppearanceModal}
              onDeleteAllChats={() => {
                setShowDeleteAllModal(true);
                closeMenu();
              }}
              onContactUs={openContactModal}
              onClose={closeMenu}
            />
          )}
        </div>
      ) : (
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      )}

      {/* Modals */}
      <AppearanceSettingsModal
        isOpen={showAppearanceModal}
        onClose={closeAppearanceModal}
        onThemeChange={(theme) => console.log("Theme:", theme)}
        onFontChange={(font) => console.log("Font:", font)}
      />
      <ContactUsModal isOpen={showContactModal} onClose={closeContactModal} />
      {showDeleteAllModal && (
        <ConfirmDeleteAllChatsModal
          isOpen={showDeleteAllModal}
          onConfirm={handleDeleteAllChats}
          onCancel={() => setShowDeleteAllModal(false)}
        />
      )}
    </header>
  );
}
