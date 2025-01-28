import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";

const Navbar = () => {
  const { isAuthenticated } = useContext(SessionContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {isAuthenticated ? (
          <li>
            <Link to="/prifle">Profile</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}

        {/* {!isAuthenticated && (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
         {isAuthenticated && <li>
          <Link to="/prifle">Profile</Link>
        </li>} */}
      </ul>
    </nav>
  );
};

export default Navbar;
