import { useContext, useState, useEffect, ReactNode } from "react";
import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { createContext } from "react";
import { auth } from "../../lib/firebaseConfig";

interface AuthContextType {
  userLoggedIn: boolean;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  sendSignInEmail: (email: string) => Promise<void>;
  completeSignInWithEmailLink: (
    email: string,
    emailLink: string
  ) => Promise<User | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
      }
      setIsAuthenticating(false);
    });
    return unsubscribe;
  }, []);

  const sendSignInEmail = async (email: string): Promise<void> => {
    const actionCodeSettings = {
      url: `${window.location.origin}/finishSignIn`,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
  };

  const completeSignInWithEmailLink = async (
    email: string,
    emailLink: string
  ): Promise<User | null> => {
    try {
      const result = await signInWithEmailLink(auth, email, emailLink);
      window.localStorage.removeItem("emailForSignIn");
      return result.user;
    } catch (error) {
      console.error("Error signing in with email link:", error);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    await auth.signOut();
    setCurrentUser(null);
    setUserLoggedIn(false);
  };

  const value: AuthContextType = {
    userLoggedIn,
    currentUser,
    setCurrentUser,
    sendSignInEmail,
    completeSignInWithEmailLink,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isAuthenticating && children}
    </AuthContext.Provider>
  );
}
