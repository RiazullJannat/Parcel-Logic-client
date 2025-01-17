import {  Navigate, useLocation,} from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loading from "@/components/ui/Loading";


const PrivateRouts = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    if(user){
        return children
    }
    if(loading){
        return <Loading></Loading>
    }
    return <Navigate to={'/login'} state={location.pathname}></Navigate>;
};

export default PrivateRouts;