import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import LoadingSpinner from "../components/LoadingSpinner"; // Optional: only if there is a loading state

export default function PrivateRoute() {
    // Ideally, useAuth should also return an 'isLoading' boolean (commenting out right now, will come back later to check)
    const { isLoggedIn } = useAuth(); 

    // OPTIONAL: Prevent kicking user out while checking token
    // if (isLoading) {
    //    return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
    // }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}