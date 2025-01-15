import HomeStatistics from "./HomeStatistics";

const OurFeature = () => {
    // features list of objects
    const features = [
        {
            icon: "https://i.ibb.co/rvZx146/382715-PCGRW9-187.jpg",
            title: "Fast Delivery",
            description: "Experience quick and reliable delivery services right at your doorstep.",
        },
        {
            icon: "https://i.ibb.co/tmy6q5R/GIU-NIC-1014-16.jpg",
            title: "Real-Time Tracking",
            description: "Track your packages in real time and stay updated on their status.",
        },
        {
            icon: "https://i.ibb.co/gwjnZdL/32597.jpg",
            title: "Secure Payment",
            description: "Enjoy secure and hassle-free payment options for all your orders.",
        },
    ];
    

    return (
        <div className="container mx-auto py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center text-center bg-white shadow-md p-6 rounded-lg">
                        <div className="mb-4">
                            <img src={feature.icon} alt={feature.title} className="w-18 md:w-32 lg:w-40 h-20 md:h-32 lg:h-40" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
            {/* TODO: HAVE TO MAKE THIS SECTION DYNAMIC */}
            <HomeStatistics></HomeStatistics>
        </div>
    );
};

export default OurFeature;