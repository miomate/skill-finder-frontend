import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  const { setToken } = useContext(SessionContext);
  const [error, setError] = useState("");

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setToken(data.token);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid username or password.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <AuthForm submitCallback={handleLogin} />
    </div>
  );
};

export default LoginPage;
