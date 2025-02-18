import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(SessionContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/skills">All skills</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/skills/new">Add a Skill</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button type="button" onClick={logout}>
                Logout
              </button>
            </li>
          </>
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
      </ul>
    </nav>
  );
};

export default Navbar;

// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { SessionContext } from "../contexts/SessionContext";

// const Navbar = () => {
//   const { user, logout } = useContext(SessionContext);

//   return (
//     <nav className="navbar">
//       <ul className="navbar-list">
//         <li className="navbar-item">
//           <Link to="/" className="navbar-link">
//             Home
//           </Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/all-skills" className="navbar-link">
//             All Skills
//           </Link>
//         </li>
//         {user ? (
//           <>
//             <li className="navbar-item">
//               <Link to="/add-skill" className="navbar-link">
//                 Add a Skill
//               </Link>
//             </li>
//             <li className="navbar-item">
//               <button onClick={logout} className="navbar-link">
//                 Logout
//               </button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li className="navbar-item">
//               <Link to="/login" className="navbar-link">
//                 Login
//               </Link>
//             </li>
//             <li className="navbar-item">
//               <Link to="/signup" className="navbar-link">
//                 Signup
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
