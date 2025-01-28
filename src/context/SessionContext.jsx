import { createContext, useState, useEffect } from "react";

export const SessionContext = createContext();

const SessionContextProvider = ({children}) => {
    const [token, setToken] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
            localStorage.setItem("authToken", token);
        } else {
            setIsAuthenticated(false);
        }
    }, [token]);

    useEffect(() => {
        const storageToken = localStorage.getItem("authToken");
        if (storageToken) {
            setToken(token);
        }
    }, []);

    return ( <SessionContext.Provider value={{setToken, isAuthenticated}}>{children}</SessionContext.Provider> );
}
 
export default SessionContextProvider;