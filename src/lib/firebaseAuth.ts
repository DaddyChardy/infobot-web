// Example: src/lib/firebaseAuth.ts
import { getAuth } from "firebase/auth";
import app from "./firebase";

const auth = getAuth(app);

export { auth };
