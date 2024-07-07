// Login.tsx
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import styles from "./Login.module.css";
import { useAuth } from "../auth/contexts/FirebaseAuth";

function Login() {
  const { userLoggedIn, sendSignInEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await sendSignInEmail(email);
        alert("Sign-in link sent! Check your email.");
      } catch (error) {
        setErrorMessage((error as Error).message);
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div>
      {userLoggedIn && <Navigate to="/" replace={true} />}
      <main className={styles.main}>
        <div className={styles.container}>
          <h3 className={styles.title}>Welcome Back</h3>
          <form onSubmit={onSubmit}>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
            {errorMessage && (
              <span className={styles.error}>{errorMessage}</span>
            )}
            <button
              type="submit"
              disabled={isSigningIn}
              className={
                isSigningIn
                  ? `${styles.button} ${styles.buttonDisabled}`
                  : styles.button
              }
            >
              {isSigningIn ? "Sending Link..." : "Send Sign-In Link"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
