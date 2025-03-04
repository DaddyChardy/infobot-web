"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import GradientText from "@/components/GradientText"; // Adjust the path if necessary

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/chat");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left Section - Compact Layout */}
<div className="flex-1 p-6 md:p-8 space-y-6">
  <div className="flex items-center gap-3">
    <Image
      src="/infobot.png"
      width={40}
      height={40}
      alt="Infobot Logo"
      className="rounded-lg"
    />
    <GradientText
      colors={["#40ffaa", "#4079ff", "rgb(238, 55, 255)", "#4079ff", "rgb(217, 64, 255)"]}
      animationSpeed={8}
      showBorder={false}
      className="text-xl font-extrabold"
    >
      Infobot
    </GradientText>
  </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Smart Division Assistant
          </h1>
          
          <p className="text-gray-600 text-base">
            Official AI Chatbot for DepEd Tandag City Division. Access documents
            and updates through intelligent chat.
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              {[
                { icon: '📄', text: 'Updates to new memorandums' },
                { icon: '🔍', text: 'Advanced document search' },
                { icon: '📊', text: 'Institutional insights' },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <span className="text-xl">{feature.icon}</span>
                  <span className="text-gray-700 text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Image
                src="/google.png"
                width={20}
                height={20}
                alt="Google"
              />
              <span className="font-medium text-sm">Continue with Google</span>
            </button>
          </div>

          {/* Footer inside main card */}
          <div className="mt-6 text-center text-sm text-gray-400">
            © 2025 Department of Education - Tandag City Division
          </div>
        </div>

        {/* Right Section - Responsive Illustration */}
<div className="hidden md:flex flex-1 bg-gradient-to-br from-blue-50 to-purple-50 p-6 items-center justify-center relative">
  <motion.div 
    className="relative w-full max-w-xs"
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.8 }}
  >
    {/* Floating Elements Above Logo */}
    <motion.div 
      className="absolute -top-8 left-0"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <div className="p-3 bg-white rounded-lg shadow flex items-center gap-2">
        <span className="text-xl">🏫</span>
        <span className="text-sm">School ID Inquiry</span>
      </div>
    </motion.div>

    <motion.div 
      className="absolute -top-8 right-0"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
    >
      <div className="p-3 bg-white rounded-lg shadow flex items-center gap-2">
        <span className="text-xl">📜</span>
        <span className="text-sm">Latest Memo</span>
      </div>
    </motion.div>

    {/* Central Logo */}
    <Image
      src="/icon-512x512.png"
      width={400}
      height={400}
      alt="AI Assistant"
      className="object-contain mx-auto"
      priority
    />

    {/* Floating Elements Below Logo */}
    <motion.div 
      className="absolute -bottom-8 left-0"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <div className="p-3 bg-white rounded-lg shadow flex items-center gap-2">
        <span className="text-xl">🎯</span>
        <span className="text-sm">DepEd Vision</span>
      </div>
    </motion.div>

    <motion.div 
      className="absolute -bottom-8 right-0"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
    >
      <div className="p-3 bg-white rounded-lg shadow flex items-center gap-2">
        <span className="text-xl">🏛️</span>
        <span className="text-sm">Division Mission</span>
      </div>
    </motion.div>
  </motion.div>
</div>
      </motion.div>
    </div>
  );
}