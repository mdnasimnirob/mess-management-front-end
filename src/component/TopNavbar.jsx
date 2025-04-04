
import { useContext, useEffect, useRef, useState } from "react";
import { BsPeopleFill, BsPersonFillAdd } from "react-icons/bs";
import { FaPersonBooth, FaShoppingCart } from "react-icons/fa";
import { IoCloseSharp, IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineFindReplace, MdOutlineSoupKitchen } from "react-icons/md";

import { RiFindReplaceLine, RiHome4Fill, RiMenu2Line, RiMoneyDollarBoxFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { AuthContexts } from "../providers/AuthProviders";
import { CiLogout } from "react-icons/ci";
import toast from "react-hot-toast";
import logo from '../../public/logo.png';


const TopNavbar = () => {

    const { user, LogOut, loading } = useContext(AuthContexts);


    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);



    const handleToggleMenu = () => {
        setOpen((prev) => !prev);
    };



    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
    console.log(user)

    return (


        <nav className=" rounded-lg  bg-gray-50 border-gray-200 dark:bg-gray-800">
            {/* <div className="  lg:rounded-2xl  w-full h-13 bg-white shadow-sm  shadow-gray-200 navbar p-4">
                <div className="navbar-start flex items-center space-x-3 rtl:space-x-reverse">
                    <button onClick={handleToggleMenu} className=" bg-gray-100 p-2 px-3 visible lg:hidden md:hidden  ">
                        <RiMenu2Line className="text-3xl text-black hover:text-blue-600" />
                    </button>
                    <NavLink to='/profile'>
                        <IoPersonCircleOutline className="text-5xl visible lg:hidden md:hidden " />
                    </NavLink>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Demo</span>
                </div>
                <div className="navbar-end flex items-start gap-3">

                    <a>n</a>
                    <a>n</a>
                    <a>n</a>
                    <a>n</a>
                    <a>n</a>
                    <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
                    </button>

                </div>

            </div> */}


            <div className="  flex justify-between items-center w-full px-6 py-3 lg:shadow-none shadow-sm">

                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleToggleMenu}
                        className="bg-gray-100 p-2 px-3 lg:hidden md:hidden"
                    >
                        <RiMenu2Line className="text-2xl text-black hover:text-blue-600" />
                    </button>



                    {/* <span className="text-2xl font-semibold"><h5 id="drawer-navigation-label" className="text-xl text-transparent bg-gradient-to-r bg-clip-text  from-fuchsia-500 to-cyan-500 font-semibold text-gray-900  dark:text-gray-400 p-2">Mess Management</h5></span> */}
                    <div className="relative">
                        <input className=" lg:ml-7 md:ml-3 px-4  pr-9 py-[6px] focus:border-none focus: lg:w-[320px] w-40 rounded-full border-[#eaedf1] bg-[#f7f8f9]" type="search" placeholder="Search for results.." />
                        <button className="absolute bottom-[9px] right-4  z-30 text-gray-500"><RiFindReplaceLine /></button>
                    </div>
                </div>


                <div className="flex items-center gap-2 ">
                    <div>
                        <h2>{user?.displayName}</h2>
                    </div>
                    <NavLink to="/profile" className=" btn btn-ghost btn-circle avatar">
                        {/* {
                            user?.photoURL ?
                                <img className="w-9 rounded-3xl" src={user.photoURL} alt="photo" /> : <IoPersonCircleOutline className="text-4xl" />
                        } */}
                        <div className="w-10 rounded-full">
                            {loading ? <IoPersonCircleOutline className="text-4xl" /> : user?.reloadUserInfo.photoUrl ? (
                                // Display user profile picture
                                <img src={user?.reloadUserInfo?.photoUrl} alt="" className="rounded-full" />
                            ) : (
                                <IoPersonCircleOutline className="text-4xl w-[40px]" />
                            )}


                        </div>
                    </NavLink>
                </div>
            </div>





            <div ref={menuRef} className={`fixed top-0 left-0 z-40 w-[250px] h-screen p-4 overflow-y-auto transition-transform ${open ? 'translate-x-0' : '-translate-x-80 '} bg-gray-100 dark:bg-gray-800`}>
                <div className="shadow-[rgba(0,0,15,0.5)_0px_2px_0px_0px] shadow-gray-200 bg-gray-100">
                    <img className="w-12 ms-2" src={logo} alt="" />
                    <h5 id="drawer-navigation-label" className="text-xl text-transparent bg-gradient-to-r bg-clip-text  from-fuchsia-500 to-cyan-500 font-semibold text-gray-900  dark:text-gray-400 p-2">Mess Management</h5>
                </div>
                <button onClick={handleToggleMenu} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <IoCloseSharp className="text-3xl text-blue-600" />
                    <span className="sr-only">Close menu</span>
                </button>
                <div className="py-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        <li className="flex p- items-center">
                            <NavLink to='/dashboard' onClick={() => { (setOpen(false)) }} className={`flex p-2 items-center hover:bg-gray-100 w-full`}>
                                <RiHome4Fill className=" text-xl text-gray-600" />
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
                            <NavLink to='/addMember' onClick={() => { (setOpen(false)) }} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <BsPersonFillAdd className=" text-xl text-gray-600" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Add Mess Member</span>
                                {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/addDeposit' onClick={() => { (setOpen(false)) }} className="flex items-center p-2 text-gray-900 rounded-lg  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <RiMoneyDollarBoxFill className=" text-xl text-gray-600" />
                                <span className="flex-1 ms-3 whitespace-nowrap dark:text-white">Add Money Deposit</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/mealRequest' onClick={() => { (setOpen(false)) }} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Meal Request</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/addMeal' onClick={() => { (setOpen(false)) }} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <MdOutlineSoupKitchen className=" text-xl text-gray-700" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Add Meal</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => { (setOpen(false)) }} to='/addCost' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaShoppingCart className=" text-xl text-gray-600" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Add Cost</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/allMember' onClick={() => { (setOpen(false)) }} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <BsPeopleFill className=" text-xl text-gray-600" />
                                <span className="flex-1 ms-3 whitespace-nowrap">All Member</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => { (setOpen(false)) }} to='/changeManager' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaPersonBooth className=" text-xl text-gray-600" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Change Manager</span>
                            </NavLink>
                        </li>
                        {
                            user ?
                                <>
                                    <li>
                                        <NavLink onClick={() => { (setOpen(false)) }} to='/login' className="mb-10 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <CiLogout className=" text-xl text-gray-950" />
                                            <span onClick={handleLogOut} className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
                                        </NavLink>
                                    </li>
                                </> :
                                <>
                                    <li>
                                        <NavLink onClick={() => { (setOpen(false)) }} to='/login' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                            </svg>
                                            <span className="flex-1 ms-3 whitespace-nowrap">Login</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink onClick={() => { (setOpen(false)) }} to='/register' className="mb-10 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
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
        </nav >

    );
};

export default TopNavbar;