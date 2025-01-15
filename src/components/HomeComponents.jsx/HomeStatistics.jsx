import CountUp from 'react-countup';
const HomeStatistics = () => {
    // TODO: LOAD DATA FORM DATA BASE AND SHOW THE DATA HERE.
    // get the value from the data base 
    return (
        <div className="stats shadow flex flex-col md:flex-row"> 
            <div className="stat place-items-center">
                <div className="stat-title">Parcels Booked</div>
                <div className="stat-value"><CountUp start={0} end={31} duration={8}></CountUp>K</div>
            </div>

            <div className="stat place-items-center">
                <div className="stat-title"> Parcels Delivered
                </div>
                <div className="stat-value text-secondary"><CountUp start={2000} end={2221} duration={8}></CountUp></div>
            </div>

            <div className="stat place-items-center">
                <div className="stat-title">Total Users</div>
                <div className="stat-value"><CountUp start={1000} end={1200} duration={8}></CountUp></div>
            </div>
        </div>
    );
};

export default HomeStatistics;