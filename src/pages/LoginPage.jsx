import { useContext } from "react";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
    const {setToken} = useContext(SessionContext);

    const handleLogin = async(credentials) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                setToken(data.token);
            } else {
                console.error("Failed");
            }

        } catch (error) {
            console.error(error);
        }
    return ( 
        <>
        <h1>Login</h1>
        <AuthForm submitCallback={handleLogin}> </AuthForm>
        </>
     );
}
}
export default LoginPage;