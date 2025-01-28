import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignUp";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage></ProfilePage>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
}

export default App;
