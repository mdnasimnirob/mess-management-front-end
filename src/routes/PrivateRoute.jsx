import { useContext } from "react";
import { AuthContexts } from "../providers/AuthProviders";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import loader from '../../public/loadingProg.json'
import Lottie from "lottie-react";



const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContexts);
    console.log(user)

    if (loading) {
        return <div className="flex items-center justify-center  h-screen"> <Lottie className="w-44" animationData={loader}></Lottie> </div>
    }

    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login"></Navigate>;
};

PrivateRoute.propTypes = {
    children: PropTypes.object.isRequired,
}
export default PrivateRoute;