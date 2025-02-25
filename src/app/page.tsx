"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingDone(true);
      if (status !== "loading" && !session) {
        router.push("/login");
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [session, status, router]);

  // While NextAuth is loading or the 3-second timer hasn't finished, show the loading effect.
  if (status === "loading" || !loadingDone) {
    return (
      <div
        className="relative w-screen h-screen flex items-center justify-center"
        style={{
          background:
            "linear-gradient(45deg, #7F00FF 0%, #6000ED 25%, #4000C0 50%, #000080 75%, #000051 100%)",
        }}
      >
        <div className="relative w-[250px] h-[250px] rounded-2xl bg-white/20 backdrop-blur-lg border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl">
          <img
            src="/animation.gif"
            alt="Animation"
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/icon-512x512.png"
              alt="DepEd Logo"
              className="w-16 h-16 animate-pulse"
            />
          </div>
        </div>
      </div>
    );
  }

  if (!session) return null;

  // When session exists, display the Home page content.
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(45deg, #7F00FF 0%, #6000ED 25%, #4000C0 50%, #000080 75%, #000051 100%)",
      }}
    >
      <div className="w-full max-w-lg p-8 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/10 shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Welcome, {session.user?.name}!
        </h1>
        <button
          onClick={() => signOut()}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
