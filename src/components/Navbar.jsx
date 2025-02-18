import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(SessionContext);

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold tracking-wide">
          Skill Finder
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/skills" className="hover:text-gray-400 transition">
              All Skills
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/skills/new"
                  className="hover:text-gray-400 transition"
                >
                  Add a Skill
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-gray-400 transition">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup" className="hover:text-gray-400 transition">
                  Signup
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-gray-400 transition">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { SessionContext } from "../contexts/SessionContext";

// const Navbar = () => {
//   const { isAuthenticated, logout } = useContext(SessionContext);

//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/skills">All skills</Link>
//         </li>
//         {isAuthenticated ? (
//           <>
//             <li>
//               <Link to="/skills/new">Add a Skill</Link>
//             </li>
//             <li>
//               <Link to="/profile">Profile</Link>
//             </li>
//             <li>
//               <button type="button" onClick={logout}>
//                 Logout
//               </button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <Link to="/signup">Signup</Link>
//             </li>
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
