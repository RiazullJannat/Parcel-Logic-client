import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: myReviews = [] } = useQuery({
        queryKey: ['myReviews'],
        queryFn: async () => {
            const res = await axiosSecure('/my-reviews', { params: { email: user.email } })
            return res.data;
        }
    });
    console.log(myReviews);
    return (
        <div>
            {/* {
                myReviews.map(review =>
                    <div  key={review._id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
                        <div className="flex items-center mb-4">
                            <img src={reviewGiverImage} alt={reviewGiverName} className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h3 className="font-semibold text-lg">{reviewGiverName}</h3>
                                <p className="text-sm text-gray-500">{date}</p>
                            </div>
                        </div>

                        <div className="flex items-center mb-2">
                            
                        </div>

                        <p className="text-gray-700 mb-4">{feedback}</p>
                    </div>
                )
            } */}
        </div>
    );
};

export default MyReviews;