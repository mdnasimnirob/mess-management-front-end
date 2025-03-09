import { Outlet } from "react-router-dom";
// import MainContent from "../component/MainContent";
import Navbar from "../component/Navbar";
import TopNavbar from "../component/TopNavbar";
import Sidebar from "../component/Sidebar";
import { useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { Toaster } from "react-hot-toast";




const MainLayout = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle state


    return (
        // <div className=" mx-auto">
        //     <div className="lg:hidden visible md:hidden sm:visible  fixed -top-1 z-40 w-full ml-0 ">

        //         <TopNavbar />

        //     </div>
        //     <div className=" lg:flex  " >
        //         <div className="hidden sm:hidden md:block lg:block fixed z-40 ">
        //             <Sidebar />
        //         </div>
        //         <div className="lg:pt-20 pt-20 w-full  md:pt-20 px-4 md:px-0 lg:px-0 ml-16 ">
        //             <Outlet />
        //         </div>

        //     </div>
        //     <Navbar />
        // </div>




        <div className="mx-auto">

            <Toaster position="top-center" />

            <div className={`fixed  top-0 z-40 w-full bg-white lg:rounded-xl shadow-md transition-all duration-300  ml-0   ${isSidebarOpen ? "lg:w-[calc(100%-230px)] lg:left-[224px] lg:transition-all lg:duration-500" : "lg:w-[calc(100%-72px)]  lg:left-[72px] transition-all duration-500"}`}>
                <TopNavbar />
            </div>

            <div className="lg:flex">

                <div className={`lg:fixed hidden bg-gray-100 lg:block md:block sm:hidden left-0 top-0 h-screen bg- px-1 z-40 ${isSidebarOpen ? "w-52 transition-all duration-500 overflow-hidden " : "w-[57px] transition-all duration-500  overflow-hidden"}`}>
                    <Sidebar />
                </div>

                <div className={`lg:pt-20 pt-20 w-full md:pt-20   ${isSidebarOpen ? "lg:ml-56 lg:pr-4 transition-all duration-500 " : "lg:ml-16 lg:pl-2 lg:pr-2 transition-all duration-500"}`}>

                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={`lg:fixed hidden lg:block md:block sm:hidden z-40 -top-2 left-0 mt-4 bg-gray-200 p-2 rounded-md  text-blue-800 ${isSidebarOpen ? "lg:left-40 transition-all duration-500" : "lg:left-3 transition-all duration-500"}`}
                    >
                        <RiMenu2Line className="text-xl" />
                    </button>

                    <Outlet />
                </div>
            </div>

            <Navbar />
        </div>


    );
};

export default MainLayout;