import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../auth/contexts/FirebaseAuth";

function Navbar() {
  const { userLoggedIn } = useAuth();
  return (
    <ul className={styles.navContainer}>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {!userLoggedIn && (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
    </ul>
  );
}

export default Navbar;
