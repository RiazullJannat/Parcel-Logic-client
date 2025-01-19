import useAxiosPublic from '@/Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';
const HomeStatistics = () => {
    const axiosPublic = useAxiosPublic();
    // TODO: LOAD DATA FORM DATA BASE AND SHOW THE DATA HERE.
    // get the value from the data base 
    const {data:statData=[]}=useQuery({
        queryKey:['statData'],
        queryFn:async()=>{
            const res=await axiosPublic('/stat-data')
            return res.data
        }
    })
    return (
        <div className="stats shadow flex flex-col md:flex-row"> 
            <div className="stat place-items-center">
                <div className="stat-title">Parcels Booked</div>
                <div className="stat-value"><CountUp start={0} end={statData.totalBookings} duration={8}></CountUp></div>
            </div>

            <div className="stat place-items-center">
                <div className="stat-title"> Parcels Delivered
                </div>
                <div className="stat-value "><CountUp start={2000} end={statData.totalDelivered} duration={8}></CountUp></div>
            </div>

            <div className="stat place-items-center">
                <div className="stat-title">Total Users</div>
                <div className="stat-value"><CountUp start={1000} end={statData.totalUsers} duration={8}></CountUp></div>
            </div>
        </div>
    );
};

export default HomeStatistics;