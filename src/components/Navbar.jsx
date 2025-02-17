import { Link } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

const Navbar = () => {
  const { user, logout } = useContext(SessionContext);

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/all-skills" className="navbar-link">
            All Skills
          </Link>
        </li>
        {user ? (
          <>
            <li className="navbar-item">
              <Link to="/add-skill" className="navbar-link">
                Add a Skill
              </Link>
            </li>
            <li className="navbar-item">
              <button onClick={logout} className="navbar-link">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/signup" className="navbar-link">
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
