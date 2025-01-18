import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useRole = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data:role="", isLoading:loadingRole}= useQuery({
        queryKey:['role', user?.email],
        queryFn:async()=>{
            const res = await axiosSecure.get('/role',{params:{email:user?.email}})
            return res.data
        }
    })
    return {role:role.role, loadingRole}
};

export default useRole;