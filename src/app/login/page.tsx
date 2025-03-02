// File: src/app/login/page.tsx
"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // If the user is already logged in, redirect them to the chat page
  useEffect(() => {
    if (session) {
      router.push("/chat");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white relative">
      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <Image
          src="/icon-512x512.png"
          alt="Background Logo"
          width={800}
          height={800}
          className="object-contain"
        />
      </div>

      {/* Glassmorphic Container */}
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/10 shadow-2xl">
        <div className="flex justify-center mb-4">
          <Image
            src="/infobot.png"
            alt="Infobot Logo"
            width={80}
            height={80}
            className="rounded-full"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Welcome to DepEd Infobot
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Log in to access division resources, announcements, and more.
        </p>
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white rounded-md hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 transition active:scale-95"
        >
          <Image
            src="/google.png"
            alt="Google icon"
            width={20}
            height={20}
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
