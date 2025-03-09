// File: src/components/FeedbackWidget.tsx
"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Image from "next/image";

const RATINGS = [
  { label: "Terrible", icon: "/feedback/terrible.png" },
  { label: "Bad", icon: "/feedback/bad.png" },
  { label: "Neutral", icon: "/feedback/neutral.png" },
  { label: "Good", icon: "/feedback/good.png" },
  { label: "Great", icon: "/feedback/great.png" },
];

export default function FeedbackWidget() {
  const [showModal, setShowModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [suggestionText, setSuggestionText] = useState("");

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRating(null);
    setHoverRating(null);
    setFeedbackText("");
    setSuggestionText("");
  };

  const handleConfirm = async () => {
    if (selectedRating === null) return;
    try {
      await addDoc(collection(db, "feedback"), {
        rating: selectedRating,
        feedback: feedbackText.trim(),
        suggestion: suggestionText.trim(),
        createdAt: serverTimestamp(),
      });
      handleCloseModal();
    } catch (err) {
      console.error("Error saving feedback:", err);
    }
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <button
        onClick={handleOpenModal}
        className="fixed bottom-1 md:bottom-8 left-4 md:left-6 z-[60] bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white rounded-full px-3 py-1.5 md:px-6 md:py-3 inline-flex items-center justify-center shadow-lg hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 transition-all duration-200 space-x-1.5 md:space-x-3 min-w-[120px] md:min-w-[140px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <div className="text-left">
          <div className="text-[11px] md:text-sm font-medium uppercase leading-tight">
            Feedback
          </div>
          <div className="text-[9px] md:text-xs font-normal lowercase leading-tight">
            &amp; Suggestions
          </div>
        </div>
      </button>

      {/* Feedback Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative w-[400px] max-w-full bg-white/20 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              User Feedback
            </h2>
            <p className="text-sm text-gray-700 mb-3 text-center">
              How was your chat with Infobot?
            </p>
            
            {/* Rating Icons */}
            <div className="flex justify-center gap-3 mb-4">
              {RATINGS.map((item, index) => {
                // Color if hovered OR selected
                const isColored = hoverRating === index || selectedRating === index;
                return (
                  <button
                    key={index}
                    onMouseEnter={() => setHoverRating(index)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => setSelectedRating(index)}
                    className="flex flex-col items-center justify-center p-2 rounded-lg transition"
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={32}
                      height={32}
                      className={isColored ? "filter-none" : "filter grayscale"}
                    />
                    <span className="text-xs mt-1 text-gray-800">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Two text areas */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feedback
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Share your feedback..."
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none text-sm bg-white/50 backdrop-blur-sm"
                rows={3}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Suggestions
              </label>
              <textarea
                value={suggestionText}
                onChange={(e) => setSuggestionText(e.target.value)}
                placeholder="Share your suggestions..."
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none text-sm bg-white/50 backdrop-blur-sm"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-white/30 transition active:scale-95"
              >
                Maybe Later
              </button>
              <button
                onClick={handleConfirm}
                disabled={selectedRating === null}
                className={`px-4 py-2 bg-blue-600 text-white rounded-md transition active:scale-95 ${
                  selectedRating === null
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
