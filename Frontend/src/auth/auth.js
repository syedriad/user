import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "./firebaseConfig";

const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    console.log("login successfull")
  } catch (error) {
    console.error("Error logging in with Google:", error);
    throw error
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("logout susscesfull")
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export { loginWithGoogle,  logout, onAuthStateChanged };
