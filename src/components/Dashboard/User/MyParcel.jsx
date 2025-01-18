import Loading from "@/components/ui/Loading";
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyParcel = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: myParcel = [], isLoading, isError, error } = useQuery({
        queryKey: ['myParcels', user.email],
        queryFn: async () => {
            const { data } = await axiosSecure('/my-parcels', { params: { email: user.email } });
            return data
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    if (isError) {
        console.log(error)
    }
    // Have to show the bookings data when admin can assign a delivery man for the bookings
    return (
        <div>
            Have to show the bookings data when admin can assign a delivery man for the bookings
            my bookings {myParcel.length}
        </div>
    );
};

export default MyParcel;