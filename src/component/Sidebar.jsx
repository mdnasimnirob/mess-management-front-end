import { useContext, useState } from "react";
import { BsPeopleFill, BsPersonFillAdd } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { FaPersonBooth, FaShoppingCart } from "react-icons/fa";
import { MdOutlineSoupKitchen } from "react-icons/md";
import { RiDashboardHorizontalFill, RiHome4Fill, RiMoneyDollarBoxFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { AuthContexts } from "../providers/AuthProviders";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";
// import TopNavbar from "./TopNavbar";

const Sidebar = () => {
    const [open, setOpen] = useState();
    const { user, LogOut } = useContext(AuthContexts);

    const handleMenu = () => {
        setOpen((prev) => !prev)
    }

    const handleLogOut = () => {
        LogOut()
            .then(() => {
                toast.success('Logged out successfully!')

            })
            .catch(error => {
                console.error(error);
                toast.error('Failed to log out. Please try again.');
            });
    }
    return (



        <div className=" ">
            {/* <div ><TopNavbar></TopNavbar></div> */}
            {/* <div onClick={handleMenu} className="   flex items-center flex-row bg-white text-center justify-center ">

                <h1 className="border">X</h1>
                
            </div> */}
            <div className={` ${open ? "w-16" : "w-56"} mt-[60px]  h-screen bg-gray-100 p-1  dark:bg-gray-800`}>
                {/* <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5> */}
                {/* <button onClick={handleMenu} type="button" className=" h-16 w-full bg-white text-black ">

                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close menu</span>
                </button> */}
                {/* <div className="shadow-[rgba(0,0,15,0.5)_0px_2px_0px_0px] shadow-gray-200 pb-2 bg-gray-100 mt- ">
                    <h5 id="drawer-navigation-label" className="text-md  text-transparent bg-gradient-to-r bg-clip-text  from-fuchsia-500 to-cyan-500 font-semibold text-gray-900  dark:text-gray-400 p-2 ">Mess Management</h5>
                    <img className="w-9 ms-1.5  " src="/src/assets/logo (2).png" alt="" />
                </div> */}
                <div className=" overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        <li className="flex p- items-center">
                            <NavLink to='/dashboard' onClick={() => { (setOpen(false)) }} className={`flex p-2 items-center hover:bg-gray-100 w-full`}>
                                <RiDashboardHorizontalFill className=" text-3xl text-gray-600" />
                                <span className="ms-3">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="flex p- items-center">
                            <NavLink to='/home' onClick={() => { (setOpen(false)) }} className={`flex p-2 items-center hover:bg-gray-100 w-full`}>
                                <RiHome4Fill className=" text-3xl text-gray-600" />
                                <span className="ms-3">Home</span>
                            </NavLink>
                        </li>
                        {/* <li>
                    
                                                <div className="flex justify-between">
                                                    <span className="flex-1 ms-3 whitespace-nowrap">Update 2.0</span>
                                                    <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                    
                                                </div>
                                            </li> */}
                        <li>
                            <NavLink to='/addMember' onClick={() => { (setOpen(false)) }} className="flex items-center pl-2 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <BsPersonFillAdd className=" text-3xl text-gray-600" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Add Mess Member</span>
                                {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/addDeposit' onClick={() => { (setOpen(false)) }} className="flex items-center pl-2 p-2  text-gray-900 rounded-lg  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <RiMoneyDollarBoxFill className=" text-3xl text-gray-600" />
                                <span className="flex-1 ms-3 whitespace-nowrap dark:text-white">Add Money</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/mealRequest' onClick={() => { (setOpen(false)) }} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className=" shrink-0 w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Meal Request</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/addMeal' onClick={() => { (setOpen(false)) }} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <MdOutlineSoupKitchen className=" text-3xl text-gray-700" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Add Meal</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => { (setOpen(false)) }} to='/addCost' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaShoppingCart className=" text-3xl text-gray-600" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Add Cost</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/allMember' onClick={() => { (setOpen(false)) }} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <BsPeopleFill className=" text-3xl text-gray-600" />
                                <span className="flex-1 ms-3 whitespace-nowrap">All Member</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => { (setOpen(false)) }} to='/changeManager' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaPersonBooth className=" text-3xl text-gray-600" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Change Manager</span>
                            </NavLink>
                        </li>
                        {
                            user ?
                                <>
                                    <li>
                                        <NavLink onClick={() => { (setOpen(false)) }} to='/login' className="mb-10 flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                                            <BiLogOut className=" text-3xl text-gray-950" />
                                            <span onClick={handleLogOut} className="flex-1 ms-4 whitespace-nowrap">Log Out</span>
                                        </NavLink>
                                    </li>
                                </> :
                                <>
                                    <li>
                                        <NavLink onClick={() => { (setOpen(false)) }} to='/login' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <svg className="shrink-0 w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                            </svg>
                                            <span className="flex-1 ms-3 whitespace-nowrap">Login</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink onClick={() => { (setOpen(false)) }} to='/register' className="mb-10 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <svg className="shrink-0 w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                                <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                                <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                                            </svg>
                                            <span className="flex-1 ms-3 whitespace-nowrap">Register</span>
                                        </NavLink>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default Sidebar;