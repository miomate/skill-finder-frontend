import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import AnonymousRoute from "./components/AnonymousRoute";
import AllSkillsPage from "./pages/AllSkillsPage";
import NewSkillPage from "./pages/NewSkillPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route
          path="/signup"
          element={
            <AnonymousRoute>
              <SignupPage />
            </AnonymousRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AnonymousRoute>
              <LoginPage />
            </AnonymousRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/skills/new"
          element={
            <PrivateRoute>
              <NewSkillPage />
            </PrivateRoute>
          }
        />

        <Route path="/skills" element={<AllSkillsPage />} />

        <Route path="*" element={<h1>404 Page</h1>} />
      </Routes>
    </>
  );
}

export default App;

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
