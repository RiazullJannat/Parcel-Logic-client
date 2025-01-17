import Loading from "@/components/ui/Loading";
import useAuth from "@/Hooks/useAuth";
import useRole from "@/Hooks/useRole";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({children}) => {
    const { loading,user } = useAuth();
    const {role, loadingRole} = useRole();
    const location = useLocation();
    if (user && role==="admin") {
        return children
    }
    if (loading || loadingRole) {
        return <Loading></Loading>
    }
    return <Navigate to={'/login'} state={location.pathname}></Navigate>;
};

export default AdminRoute;