import { useContext } from "react";
import { SessionContext } from "../context/SessionContext";
import { Route, Navigate } from "react-router-dom";

const AnonymousRoute = ({children}) => {
    const { isAuthenticated } = useContext(SessionContext);

    if (isAuthenticated) {
        return <Navigate to="/profile" />;
    }

    return children;
}
 
export default AnonymousRoute;