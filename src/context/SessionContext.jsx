import { createContext, useState } from "react";

export const SessionContext = createContext();

const SessionContextProvider = ({children}) => {
    const [token, setToken] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [token]);

    return ( <SessionContext.Provider value={{setToken}}>{children}</SessionContext.Provider> );
}
 
export default SessionContextProvider;