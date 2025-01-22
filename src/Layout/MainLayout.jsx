import { Outlet } from "react-router-dom";
import Navbar from "../components/Common/Navbar";
import Footer from "@/components/Common/Footer";
const Layout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layout;