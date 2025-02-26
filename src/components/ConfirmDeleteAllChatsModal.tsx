// File: src/components/ConfirmDeleteAllChatsModal.tsx
"use client";

import React from "react";

interface ConfirmDeleteAllChatsModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteAllChatsModal({
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmDeleteAllChatsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative w-[320px] p-6 bg-white/20 backdrop-blur-md border border-white/10 rounded-xl shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Delete all chats
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          If you confirm, all chat history for this account will be permanently
          erased and cannot be recovered. <br />
          Are you sure you want to delete all chat history?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-white/20 transition active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition active:scale-95"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
