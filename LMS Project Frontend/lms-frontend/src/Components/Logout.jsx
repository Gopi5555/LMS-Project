import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

function Logout() {
    const logout = useNavigate();
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }, [])
    return (
        <h1>Logout Sucessfully ,......</h1>
    )
}
export default Logout;