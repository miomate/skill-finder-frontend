import { createContext, useEffect, useState } from "react";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = async (tokenToVerify) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${tokenToVerify}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json(); // Expect the verify endpoint to return user data
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Store user data
        setToken(tokenToVerify);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      verifyToken(token);
    } else {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token && user) {
      setIsAuthenticated(true);
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user)); // Store user persistently
    } else {
      setIsAuthenticated(false);
    }
  }, [token, user]);

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <SessionContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        isAuthenticated,
        isLoading,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;

// import { createContext, useEffect, useState } from "react";

// export const SessionContext = createContext();

// const SessionContextProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null); // Added state for user data
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const verifyToken = async (tokenToVerify) => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/auth/verify`,
//         {
//           headers: {
//             Authorization: `Bearer ${tokenToVerify}`,
//           },
//         }
//       );
//       if (response.ok) {
//         const userData = await response.json(); // Expect the verify endpoint to return user data
//         setUser(userData);
//         setToken(tokenToVerify);
//         setIsAuthenticated(true);
//       } else {
//         localStorage.removeItem("authToken");
//         setUser(null);
//       }
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error);
//       localStorage.removeItem("authToken");
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const storageToken = localStorage.getItem("authToken");
//     if (storageToken) {
//       verifyToken(storageToken);
//     } else {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (token) {
//       setIsAuthenticated(true);
//       localStorage.setItem("authToken", token);
//     } else {
//       setIsAuthenticated(false);
//       setUser(null);
//     }
//   }, [token]);

//   const logout = () => {
//     setToken(null);
//     setIsAuthenticated(false);
//     setUser(null);
//     localStorage.removeItem("authToken");
//   };

//   return (
//     <SessionContext.Provider
//       value={{ token, setToken, user, isAuthenticated, isLoading, logout }}
//     >
//       {children}
//     </SessionContext.Provider>
//   );
// };

// export default SessionContextProvider;
