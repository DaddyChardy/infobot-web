// File: src/services/chatService.ts
import { db } from "@/lib/firebase";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import md5 from "blueimp-md5"; // Ensure this import is correct

// Create a new chat under users/{userEmail}/chats/{chatId}
export async function createChat(
  userEmail: string,
  chatId: string,
  title: string
) {
  const sessionId = md5(userEmail + Date.now()); // Generate unique session ID
  
  const chatDocRef = doc(db, "users", userEmail, "chats", chatId);
  const chatData = {
    title,
    userId: userEmail,
    sessionId, // Store session ID with chat
    createdAt: serverTimestamp(),
    lastMessageTime: new Date().toLocaleString(),
  };
  
  await setDoc(chatDocRef, chatData);
  return { ...chatData, id: chatId }; // Return the sessionId with chat data
}

// Delete a single chat and its messages
export async function deleteChat(userEmail: string, chatId: string) {
  // Delete all messages under the chat
  const messagesRef = collection(db, "users", userEmail, "chats", chatId, "messages");
  const snapshot = await getDocs(messagesRef);
  const deletePromises = snapshot.docs.map((docSnap) =>
    deleteDoc(doc(db, "users", userEmail, "chats", chatId, "messages", docSnap.id))
  );
  await Promise.all(deletePromises);

  // Delete the chat document itself
  const chatDocRef = doc(db, "users", userEmail, "chats", chatId);
  await deleteDoc(chatDocRef);
}

// Delete all chats for a user
export async function deleteAllChats(userEmail: string) {
  const chatsRef = collection(db, "users", userEmail, "chats");
  const snapshot = await getDocs(chatsRef);
  const deletePromises = snapshot.docs.map((docSnap) => {
    const chatId = docSnap.id;
    return deleteChat(userEmail, chatId);
  });
  await Promise.all(deletePromises);
}

// Add a message to a chat's messages subcollection
export async function addMessage(
  userEmail: string,
  chatId: string,
  content: string,
  sender: "user" | "bot",
  time: string,
  sessionId: string,
  avatar?: string
) {
  const messagesColRef = collection(db, "users", userEmail, "chats", chatId, "messages");
  await addDoc(messagesColRef, {
    text: content,
    sender,
    time,
    createdAt: serverTimestamp(),
    avatar: avatar || (sender === "bot" ? "/infobot.png" : ""),
    userId: sender === "user" ? userEmail : "bot",
    sessionId
  });
}

// Update chat title and lastMessageTime
export async function updateChatTitle(
  userEmail: string,
  chatId: string,
  title: string
) {
  const chatDocRef = doc(db, "users", userEmail, "chats", chatId);
  await updateDoc(chatDocRef, {
    title,
    lastMessageTime: new Date().toLocaleString(),
  });
}

// Fetch bot reply from your webhook
export async function fetchBotReply(userInput: string, sessionId: string): Promise<string> {
  const response = await fetch(
    "https://deped.depedtandagn8n.shop/webhook/5f1c0c82-0ff9-40c7-9e2e-b1a96ffe24cd/chat",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        action: "sendMessage",
        chatInput: userInput,
      }),
    }
  );
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return data.output || "Sorry, I didn't understand that.";
}

