import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const TopDeliveryMan = () => {
    const axiosPublic = useAxiosPublic();
    const {data:deliveryMen=[]}=useQuery({
        queryKey:['deliveryMen'],
        queryFn:async()=>{
            const res = await axiosPublic('/top-delivery-stat')
            return res.data
        }
    })

    return (
        
        <div className="container mx-auto py-12 grid md:grid-cols-3 gap-5">
            {
                deliveryMen.map((man) => (
                    <div key={man._id} className="card bg-base-100  shadow-xl">
                        <figure>
                            <img
                                src={man.image}
                                alt={man.name} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {man.name}
                                <div className="badge badge-secondary">{man.averageRating}</div>
                            </h2>
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline">Avg Rating: {man.averageRating}</div>
                                <div className="badge badge-outline">Total delivery: {man.totalDelivered}</div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default TopDeliveryMan;