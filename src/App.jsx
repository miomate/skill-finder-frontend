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

      <h1>Welcome to Skill Finder</h1>
      <p>
        Skill Finder is a platform that helps people connect with others based
        on their skills.
      </p>
      <h2>How It Works</h2>
      <p>
        <strong>1. Sign Up / Log In:</strong> Create an account to add and
        search for skills.
      </p>
      <p>
        <strong>2. Add a Skill:</strong> Share your skills by adding them along
        with your city.
      </p>
      <p>
        <strong>3. Search for Skills:</strong> Find people with specific skills
        in your city.
      </p>
      <p>
        <strong>4. Edit or Delete Skills:</strong> Manage your skills easily
        from your profile.
      </p>
      <h2>Start Connecting Today!</h2>
      <p>Join Skill Finder and connect with talented individuals near you.</p>
    </>
  );
}

export default App;
