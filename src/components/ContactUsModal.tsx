// File: src/components/ContactUsModal.tsx
"use client";

import React from "react";
import Image from "next/image";
import { FaPhone, FaFacebook, FaMapMarkerAlt } from "react-icons/fa";

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactUsModal({
  isOpen,
  onClose,
}: ContactUsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white/20 backdrop-blur-md border border-white/10 shadow-xl rounded-xl p-6 w-150">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Contact Information
        </h2>
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {/* Left Column: DepEd ICT Team */}
          <div className="flex-1 p-4">
            <div className="flex flex-col items-center mb-4">
              <Image
                src="/icon-512x512.png"
                alt="DepEd ICT Team Logo"
                width={80}
                height={80}
                className="rounded-full mb-2"
                priority
              />
              <h3 className="text-xl font-semibold text-gray-800">
                DepEd ICT Team
              </h3>
            </div>
            <div className="flex items-center mb-2">
              <FaPhone className="text-gray-600 mr-2" />
              <span className="text-gray-700">(086)-214-5778</span>
            </div>
            <div className="flex items-center mb-2">
              <FaFacebook className="text-gray-600 mr-2" />
              <a
                href="https://www.facebook.com/purefoj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Facebook
              </a>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-gray-600 mr-2" />
              <span className="text-gray-700">
                Office Address: Prk.Narra, Mabua, Tandag
              </span>
            </div>
          </div>

          {/* Right Column: Infobot Team */}
          <div className="flex-1 p-4">
            <div className="flex flex-col items-center mb-4">
              <Image
                src="/infobot.png"
                alt="Infobot Team Logo"
                width={80}
                height={80}
                className="rounded-full mb-2"
                priority
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Infobot Team
              </h3>
            </div>
            <div className="flex items-center mb-2">
              <FaPhone className="text-gray-600 mr-2" />
              <span className="text-gray-700">09078411302</span>
            </div>
            <div className="flex items-center mb-2">
              <FaFacebook className="text-gray-600 mr-2" />
              <a
                href="https://www.facebook.com/realchardyfor3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Facebook
              </a>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-gray-600 mr-2" />
              <span className="text-gray-700">
                Office Address: Telaje, Tandag City
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
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
