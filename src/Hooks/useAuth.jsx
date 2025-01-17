import AuthContext from "@/providers/ContextProvider";
import { useContext } from "react";


const useAuth = () => {
    const data= useContext(AuthContext)
    return data;
};
export default useAuth;