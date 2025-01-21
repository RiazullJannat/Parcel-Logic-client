import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: reviews = [] } = useQuery({
        queryKey: ['myReviews'],
        queryFn: async () => {
            const res = await axiosSecure('/my-reviews', { params: { email: user.email } })
            return res.data;
        }
    });
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {
                reviews.map(review =>
                    <div key={review.reviewId} className="max-w-sm rounded overflow-hidden shadow-lg  p-4">
                        <div className="flex items-center mb-4">
                            <img src={review.reviewerImage} alt={review.reviewer} className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h3 className="font-semibold text-lg">{review.reviewer}</h3>
                                <p className="text-sm black">{review.reviewDate}</p>
                            </div>
                        </div>

                        <div className="flex items-center mb-2">
                            <Rating style={{ maxWidth: 150 }} value={review.rating} readOnly/>
                        </div>

                        <p className="text-gray-700 mb-4">{review.feedback}</p>
                    </div>
                )
            }
        </div>
    );
};

export default MyReviews;