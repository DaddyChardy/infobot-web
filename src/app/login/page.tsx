"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(45deg, #7F00FF 0%, #6000ED 25%, #4000C0 50%, #000080 75%, #000051 100%)",
      }}
    >
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/10 shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          Welcome to DepEd Infobot
        </h1>
        <p className="text-center text-white/90 mb-8">
          Log in to access division resources, announcements, and more.
        </p>
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {/* If you have a Google icon in /public/google-icon.svg */}
          <img
            src="/google.png"
            alt="Google icon"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
