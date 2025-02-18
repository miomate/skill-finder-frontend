import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(SessionContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold">
          Skill Finder
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`lg:flex space-x-6 items-center ${
            menuOpen ? "block mt-4 lg:mt-0" : "hidden lg:flex"
          }`}
        >
          <li>
            <Link to="/skills" className="hover:text-gray-200 transition">
              All Skills
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/skills/new"
                  className="hover:text-gray-200 transition"
                >
                  Add a Skill
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-gray-200 transition">
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
                <Link to="/signup" className="hover:text-gray-200 transition">
                  Signup
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-gray-200 transition">
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
