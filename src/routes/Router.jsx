import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import MainContent from "../component/MainContent";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Wallet from "../pages/Wallet";
import AddQuestion from "../pages/AddQuestion";
import AddMember from "../pages/AddMember";
import Register from "../pages/Register";
import Login from "../pages/Login";
import MealRequest from "../pages/MealRequest";
import AddDeposit from "../pages/AddDeposit";
import AddMeal from "../pages/AddMeal";
import AddCost from "../pages/AddCost";
import AllMember from "../pages/AllMember";
import ChangeManager from "../pages/ChangeManager";
import Error from "../pages/Error";




const Router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <MainContent />
            },
            {
                path: '/dashboard',
                element: <MainContent />
            },
            {
                path: '/addMember',
                element: <AddMember />
            },
            {
                path: '/home',
                element: <Home />,
                // loader: () => fetch('https://mess-management-back-clal7494o-mdnasimnirobs-projects.vercel.app/meals')
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
            ,
            {
                path: '/register',
                element: <Register />
            }
            ,
            {
                path: '/login',
                element: <Login />
            }
            ,
            {
                path: '/mealRequest',
                element: <MealRequest />
            }
            ,
            {
                path: '/addDeposit',
                element: <AddDeposit />
            }
            ,
            {
                path: '/addMeal',
                element: <AddMeal />,
                // loader: () => fetch('https://mess-management-back-clal7494o-mdnasimnirobs-projects.vercel.app/allMember'),
            }
            ,
            {
                path: '/addCost',
                element: <AddCost />
            }
            ,
            {
                path: '/allMember',
                element: <AllMember />,
                // loader: () => fetch('https://mess-management-back-clal7494o-mdnasimnirobs-projects.vercel.app/allMember'),
            }
            ,
            {
                path: '/changeManager',
                element: <ChangeManager />
            }
        ]
    }
])

export default Router;