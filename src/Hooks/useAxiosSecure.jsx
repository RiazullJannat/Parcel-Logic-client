import axios from "axios";
import useAuth from "./useAuth";
import { Navigate } from "react-router-dom";

export const axiosSecure = axios.create({
    baseURL:"https://parcel-logic-server.vercel.app"
})
const useAxiosSecure = () => {
    const {logout} = useAuth();
    // intercept request 
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token');
        config.headers.authorization=`bearer ${token}`;
        return config;
    },function(error){
        return Promise.reject(error);
    })
    // intercept response
    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, function(error){
        if(error.response.status===401 || error.response.status===403){
            logout();
            return <Navigate to={'/login'}></Navigate>
        }
    })
   return axiosSecure
};

export default useAxiosSecure;