import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/contexts/FirebaseAuth";
import styles from "./Home.module.css";

function Home() {
  const { currentUser, userLoggedIn, signOut } = useAuth();

  return (
    <div className={styles.container}>
      <h1>Home Page</h1>
      {currentUser && (
        <div className={styles.welcomeMessage}>Welcome {currentUser.email}</div>
      )}
      {userLoggedIn && (
        <div className={styles.buttonContainer}>
          <button className={styles.signOutButton} onClick={signOut}>
            Sign Out
          </button>
        </div>
      )}
      {!currentUser && (
        <div className={styles.loginMessage}>
          Please login{" "}
          <Link to={"login"} className={styles.loginLink}>
            here
          </Link>{" "}
          to continue
        </div>
      )}
    </div>
  );
}

export default Home;
