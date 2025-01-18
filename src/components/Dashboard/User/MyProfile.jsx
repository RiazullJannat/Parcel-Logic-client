import useAuth from "@/Hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UpdateProfile from "./UpdateProfile";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const MyProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const {data:currentUser={}, refetch} = useQuery({
        queryKey:['currentUser',user?.email],
        queryFn:async()=>{
            const res = await axiosSecure('/user-info',{params:{email:user?.email}})
            return res.data
        }
    })
    return (
        <div className="">
            <div className="flex justify-center items-center">
                <Avatar className={'w-20 h-20 '}>
                    <AvatarImage src={currentUser.photoURL} />
                    <AvatarFallback>{currentUser.displayName}</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex justify-center items-center">
                <h3>{user.displayName}</h3>
            </div>
            <UpdateProfile currentUser={currentUser} refetch={refetch}></UpdateProfile>
        </div>
    );
};

export default MyProfile;