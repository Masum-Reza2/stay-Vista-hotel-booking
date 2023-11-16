/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useGlobal from "../hooks/useGlobal"
import Loader from "../components/Shared/Loader";

const PrivateRoute = ({ children }) => {
    const location = useLocation()
    const { user, loading } = useGlobal();
    if (loading) return <Loader />
    if (user) {
        return children
    }
    else return <Navigate state={{ from: location }} to={'/login'} replace='true'></Navigate>
}

export default PrivateRoute