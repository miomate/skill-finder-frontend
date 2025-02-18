import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import AnonymousRoute from "./components/AnonymousRoute";
import AllSkillsPage from "./pages/AllSkillsPage";
import NewSkillPage from "./pages/NewSkillPage";
import Homepage from "./components/Homepage";

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
      <Homepage />
    </>
  );
}

export default App;
