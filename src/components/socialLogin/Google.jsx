import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Google = () => {
    const {googleLogin, setLoading, Toast} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    function handleGoogle(){
        googleLogin()
        .then((res)=>{
            const user = {
                name:res.user.displayName,
                email:res.user.email,
                photoURL:res.user.photoURL,
                role:'user'
            }
            axiosPublic.post('/add-user',user)
            .then(res=>{
                if(res.data.insertedId){
                      Toast.fire({
                        icon: "success",
                        title: "Sign up successfully"
                      });
                }
                else{
                    Toast.fire({
                        icon: "success",
                        title: "Sign in successfully"
                      });
                }
                navigate('/');
                setLoading(false)
            })
            .catch(error=>{
                Toast.fire({
                    icon: "error",
                    title: error.message
                  });
                setLoading(false)
            })
        })
        .catch(err=>{
            toast.error(err.message)
        })
    }
    return (
        <div className="mx-auto my-2">
            <button className="btn " onClick={handleGoogle}>
                <FaGoogle></FaGoogle>
                oogle...
            </button>
        </div>
    );
};

export default Google;