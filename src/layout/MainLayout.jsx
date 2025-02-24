import { Outlet } from "react-router-dom";
// import MainContent from "../component/MainContent";
import Navbar from "../component/Navbar";
import TopNavbar from "../component/TopNavbar";
import Sidebar from "../component/Sidebar";



const MainLayout = () => {

    return (
        <div>
            <TopNavbar />
            {/* <Sidebar /> */}
            <Outlet />
            <Navbar />
            {/* <MainContent></MainContent> */}




        </div>
    );
};

export default MainLayout;