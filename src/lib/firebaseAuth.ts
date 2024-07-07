import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  UserCredential,
  ActionCodeSettings,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

const actionCodeSettings: ActionCodeSettings = {
  url: `${window.location.origin}/finishSignIn`,
  handleCodeInApp: true, // This must be true for passwordless sign-in
};

// Function to send sign-in link to email
export const sendSignInEmail = async (email: string): Promise<void> => {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    // Save the email to localStorage to complete sign-in later
    window.localStorage.setItem("emailForSignIn", email);
  } catch (error) {
    console.error("Error sending sign-in email:", error);
  }
};

// Function to complete sign-in with the email link
export const completeSignInWithEmailLink = async (
  email: string,
  emailLink: string
): Promise<UserCredential> => {
  try {
    const result = await signInWithEmailLink(auth, email, emailLink);
    // Clear email from localStorage after successful sign-in
    window.localStorage.removeItem("emailForSignIn");
    return result;
  } catch (error) {
    console.error("Error signing in with email link:", error);
    throw error;
  }
};

// Function to sign out
export const doSignOut = (): Promise<void> => {
  return auth.signOut();
};
