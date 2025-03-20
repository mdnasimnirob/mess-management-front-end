import { useEffect, useState } from "react";
import Chart from "../chart/Chart";

const MainContent = () => {
    const [monthlyMeals, setMonthlyMeals] = useState(null);
    const [weeklyMeals, setWeeklyMeals] = useState(null);
    const [todayMeals, setTodayMeals] = useState(null);

    const [todayGuestMeals, setTodayGuestMeals] = useState(null);


    useEffect(() => {
        fetch('http://localhost:5000/meals/monthly')
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                setMonthlyMeals(data)
            }
            )
            .catch(error => console.error(error)
            );

        fetch('http://localhost:5000/meals/weekly')
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                setWeeklyMeals(data)
            }
            )
            .catch(error => console.error(error)
            );

        fetch('http://localhost:5000/meals/today')
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                setTodayMeals(data)
            }
            )
            .catch(error => console.error(error)
            );


        fetch('http://localhost:5000/guest-meals/today')
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                setTodayGuestMeals(data)
            }
            )
            .catch(error => console.error(error)
            );



    }, [])

    console.log(monthlyMeals, weeklyMeals, todayMeals, todayGuestMeals)

    return (


        <div className="min-h-screen bg-gray-100 p-4">
            <div className=" mx-auto space-y-6">
                {/* Header */}
                {/* <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold">Mess Management Dashboard</h1>
                </div> */}

                {/* Overview Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Total Meals Served Monthly</h2>
                        <p className="text-2xl text-blue-600">{monthlyMeals?.meals?.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Today Meals</h2>
                        <p className="text-2xl text-blue-600">{
                            todayMeals?.meals?.length === 0 ? <><span className="text-[16px] text-red-600 bg-yellow-100 px-3 py-1 rounded-md">No Meal Today</span></> : todayMeals?.meals?.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex text-center items-center gap-3">
                            <h2 className="text-xl font-semibold">Today guest Meals:</h2>
                            <p className="text-2xl text-center text-blue-600">{todayGuestMeals?.totalGuestMeals}</p>
                        </div>
                        <div className="flex text-center items-center gap-3">
                            <h2 className="text-xl font-semibold">Monthly guest Meals:</h2>
                            <p className="text-xl text-center text-blue-600">{todayGuestMeals?.totalGuestMeals}</p>
                        </div>

                    </div>

                </div>

                {/* Add the Chart Component */}
                <Chart />

                {/* Menu Management Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Today's Menu</h2>
                    <ul className="space-y-3">
                        <li>Breakfast: Pancakes, Eggs, and Toast</li>
                        <li>Lunch: Grilled Chicken, Rice, and Veggies</li>
                        <li>Snacks: Sandwiches and Fresh Juices</li>
                    </ul>
                </div>


                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Current Today Meals </h2>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="px-4 py-2 text-left">Order ID</th>
                                <th className="px-4 py-2 text-left">User</th>
                                <th className="px-4 py-2 text-left">Meal</th>
                                <th className="px-4 py-2 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="px-4 py-2">101</td>
                                <td className="px-4 py-2">John Doe</td>
                                <td className="px-4 py-2">Grilled Chicken</td>
                                <td className="px-4 py-2">Pending</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-4 py-2">102</td>
                                <td className="px-4 py-2">Jane Smith</td>
                                <td className="px-4 py-2">Pancakes</td>
                                <td className="px-4 py-2">Completed</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* User Management Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Registered Users</h2>
                    <ul className="space-y-3">
                        <li>John Doe - Meal Plan A</li>
                        <li>Jane Smith - Meal Plan B</li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default MainContent;