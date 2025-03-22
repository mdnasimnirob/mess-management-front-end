import { Outlet } from "react-router-dom";
// import MainContent from "../component/MainContent";
import Navbar from "../component/Navbar";
import TopNavbar from "../component/TopNavbar";
import Sidebar from "../component/Sidebar";
import { useContext, useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { Toaster } from "react-hot-toast";
import { AuthContexts } from "../providers/AuthProviders";
import logo from '../../public/logo.png'




const MainLayout = () => {

    // const { loading } = useContext(AuthContexts);


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

            <div className={`fixed  top-0 z-40 w-full bg-white lg:rounded-lg shadow-md transition-all duration-300  ml-0   ${isSidebarOpen ? "lg:w-[calc(100%-230px)] lg:left-[224px] lg:transition-all lg:duration-500" : "lg:w-[calc(100%-72px)]  lg:left-[72px] transition-all duration-500"}`}>
                <TopNavbar />
            </div>

            <div className="lg:flex">

                {/* <div className={`lg:fixed hidden bg-gray-100 lg:block md:block sm:hidden left-0 top-0 h-screen px-1 z-40 ${isSidebarOpen ? "w-52 transition-all duration-500 overflow-hidden" : "w-[57px] transition-all duration-500 overflow-hidden"}`}>
                    <div className={`${isSidebarOpen ? 'shadow-[rgba(0,0,15,0.5)_0px_2px_0px_0px] shadow-gray-200 pb-9' : ''}  bg-gray-100 mt-3`}>
                        <img className="w-10 ms-2" src="/src/assets/logo (2).png" alt="Logo" />
                        <h5 id="drawer-navigation-label" className={`lg:fixed ${isSidebarOpen ? ' visible  transition-all duration-500 ' : ' hidden transition-all duration-500 overflow-hidden'} text-xl text-transparent bg-gradient-to-r bg-clip-text from-fuchsia-500 to-cyan-500 font-semibold text-gray-900 dark:text-gray-400 p-2`}>
                            Mess Management
                        </h5>
                    </div>
                    <Sidebar />
                </div> */}


                <div className={`lg:fixed hidden bg-gray-100 lg:block md:block sm:hidden left-0 top-0 h-screen px-1 z-40 
                     ${isSidebarOpen ?
                        "w-52 transition-all duration-500 overflow-hidden" :
                        "w-[57px] transition-all duration-500 overflow-hidden"}`}>

                    <div className={`${isSidebarOpen ? 'shadow-[rgba(0,0,15,0.5)_0px_2px_0px_0px] shadow-gray-200 pb-' : 'pb-2'} bg-gray-100 mt-3`}>

                        {/* Logo */}
                        <img
                            // onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="w-10 ms-2 " src={logo} alt="Logo" />

                        {/* Text */}
                        <h5 id="drawer-navigation-label"
                            className={` text-xl text-transparent bg-gradient-to-r bg-clip-text from-fuchsia-500 to-cyan-500 font-semibold text-gray-900 dark:text-gray-400 p-2 transition-opacity duration-500
                         ${isSidebarOpen ?
                                    'opacity-100 w-[250px] ml-1  visible' :
                                    'hidden duration-1000 opacity-0 -w-9'}`}>
                            Mess Management
                        </h5>
                    </div>

                    {/* Sidebar Component */}
                    <Sidebar />
                </div>











                <div className={`lg:pt-[72px] pt-20 w-full md:pt-20   ${isSidebarOpen ? "lg:w-[calc(100%-230px)] lg:ml-56 lg:pr- transition-all duration-500  " : "lg:w-[calc(100%-72px)] w-full lg:ml-16 lg:pl-2 lg:pr- transition-all duration-500"}`}>

                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={`lg:fixed hidden lg:block md:block sm:hidden z-40 -top-2 left-0 mt-6 bg-gray-200 p-2 rounded-md  text-blue-800 ${isSidebarOpen ? "lg:left-[235px] transition-all duration-500 " : "lg:left-[83px] transition-all duration-500 "}`}
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

// w-[1127px]