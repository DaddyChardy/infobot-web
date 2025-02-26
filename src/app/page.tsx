// File: src/app/login/page.tsx
"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If user is logged in, redirect to chat
  useEffect(() => {
    if (session) {
      router.push("/chat");
    }
  }, [session, router]);

  // Loading effect (3 seconds)
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white">
        <div className="w-full max-w-md p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-xl text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="/infobot.png"
              alt="Infobot Logo"
              width={80}
              height={80}
              className="rounded-full"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to DepEd Infobot
          </h1>
          <p className="text-gray-600 mb-8">
            Log in to access division resources, announcements, and more.
          </p>
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 transition"
          >
            <Image
              src="/google.png"
              alt="Google Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return null;
}
