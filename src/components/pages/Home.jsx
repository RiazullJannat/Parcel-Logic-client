import Navbar from "../Common/Navbar";
import Banner from "../HomeComponents.jsx/Banner";
import OurFeature from "../HomeComponents.jsx/OurFeature";
import TopDeliveryMan from "../HomeComponents.jsx/TopDeliveryMan";


const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <OurFeature></OurFeature>
            {/* TODO: make the top delivery man section. get the data from data base  */}
            <TopDeliveryMan></TopDeliveryMan>
        </div>
    );
};

export default Home;