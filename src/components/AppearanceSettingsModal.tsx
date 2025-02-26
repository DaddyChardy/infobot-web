// File: src/components/AppearanceSettingsModal.tsx
"use client";

import React from "react";

interface AppearanceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeChange: (theme: string) => void;
  onFontChange: (font: string) => void;
  // Removed onLanguageChange since it’s not used
}

export default function AppearanceSettingsModal({
  isOpen,
  onClose,
  onThemeChange,
  onFontChange,
}: AppearanceSettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white/20 backdrop-blur-md border border-white/10 shadow-xl rounded-xl p-6 w-96">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Chat &amp; Appearance Settings
        </h2>

        {/* Theme Selection */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Theme Selection
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => onThemeChange("light")}
              className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition active:scale-95"
            >
              Light
            </button>
            <button
              onClick={() => onThemeChange("dark")}
              className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition active:scale-95"
            >
              Dark
            </button>
            <button
              onClick={() => onThemeChange("glass")}
              className="flex-1 px-3 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition active:scale-95"
            >
              Glass
            </button>
          </div>
        </div>

        {/* Font Size / Style */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Font Size / Style
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => onFontChange("small")}
              className="flex-1 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition active:scale-95"
            >
              Small
            </button>
            <button
              onClick={() => onFontChange("medium")}
              className="flex-1 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition active:scale-95"
            >
              Medium
            </button>
            <button
              onClick={() => onFontChange("large")}
              className="flex-1 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition active:scale-95"
            >
              Large
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/20 font-medium active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
