import { Outlet } from "react-router-dom";
// import MainContent from "../component/MainContent";
import Navbar from "../component/Navbar";
import TopNavbar from "../component/TopNavbar";
import Sidebar from "../component/Sidebar";




const MainLayout = () => {

    return (
        <div className="container mx-auto">
            <TopNavbar />

            <div className=" pt-20  px-4 md:px-0 lg:px-0" >
                {/* <Sidebar /> */}
                <Outlet />
            </div>
            <Navbar />
            {/* <MainContent></MainContent> */}




        </div>
    );
};

export default MainLayout;