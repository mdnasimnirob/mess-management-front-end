import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import MainContent from "../component/MainContent";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Wallet from "../pages/Wallet";
import AddQuestion from "../pages/AddQuestion";




const Router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/dashboard',
                element: <MainContent />
            },
            {
                path: '/home',
                element: <Home />
            }
            ,
            {
                path: '/profile',
                element: <Profile />
            }
            ,
            {
                path: '/profile',
                element: <Home />
            }
            ,
            {
                path: '/wallet',
                element: <Wallet />
            }
            ,
            {
                path: '/question',
                element: <AddQuestion />
            }
        ]
    }
])

export default Router;