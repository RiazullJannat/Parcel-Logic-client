const TopDeliveryMan = () => {
    const deliveryMen = [
        {
            name: "John Smith",
            image: "https://i.ibb.co.com/K0tVtjb/deliveryman3.jpg",
            parcelsDelivered: 120, // This would be fetched from the database
            averageRating: 4.8,   // Calculated from database reviews
        },
        {
            name: "Michael Johnson",
            image: "https://i.ibb.co.com/5sMZ8j4/deliveryman2.jpg",
            parcelsDelivered: 95, // This would be fetched from the database
            averageRating: 4.5,   // Calculated from database reviews
        },
        {
            name: "David Williams",
            image: "https://i.ibb.co.com/Dz9m7Vg/deliveryman1.jpg",
            parcelsDelivered: 130, // This would be fetched from the database
            averageRating: 4.9,    // Calculated from database reviews
        },
    ];

    return (
        <div className="container mx-auto py-12 grid md:grid-cols-3 gap-5">
            {
                deliveryMen.map((man, ind) => (
                    <div key={ind} className="card bg-base-100  shadow-xl">
                        <figure>
                            <img
                                src={man.image}
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                Shoes!
                                <div className="badge badge-secondary">NEW</div>
                            </h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline">Fashion</div>
                                <div className="badge badge-outline">Products</div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default TopDeliveryMan;