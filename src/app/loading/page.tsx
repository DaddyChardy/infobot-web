"use client";

import Image from "next/image";

export default function LoadingPage() {
  return (
    <div
      className="relative w-screen h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(45deg, #7F00FF 0%, #6000ED 25%, #4000C0 50%, #000080 75%, #000051 100%)",
      }}
    >
      {/* Glassmorphic Container */}
      <div className="relative w-[250px] h-[250px] rounded-2xl bg-white/20 backdrop-blur-lg border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl">
        {/* Display the GIF */}
        <img
          src="/animation.gif"
          alt="Animation"
          className="w-full h-full object-contain"
        />

        {/* Logo Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/icon-512x512.png"
            alt="DepEd Logo"
            width={50}
            height={50}
            className="animate-pulse"
          />
        </div>
      </div>
    </div>
  );
}
