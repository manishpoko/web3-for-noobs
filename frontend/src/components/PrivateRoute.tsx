import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute() {
    const {isLoggedIn} = useAuth(); //check the global state

    if(!isLoggedIn) {
        return <Navigate to="/login" replace></Navigate>
    }

    return <Outlet/>
}