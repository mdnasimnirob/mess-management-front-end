import Chart from "../chart/Chart";

const MainContent = () => {
    return (


        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                {/* <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold">Mess Management Dashboard</h1>
                </div> */}

                {/* Overview Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Total Meals Served</h2>
                        <p className="text-2xl">250</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Revenue</h2>
                        <p className="text-2xl">$1,500</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Pending </h2>
                        <p className="text-2xl">5</p>
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

                {/* Orders Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Current Orders</h2>
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


        // <div className="bg-gray-50 p-2">
        //     <h3>Dashboard</h3>
        //     <div className="flex justify-between border py-2">
        //         <div>
        //             <div className="border-2 p-2 bg-gray-200">
        //                 <h1>amount</h1>
        //                 <p></p>
        //                 <p></p>
        //             </div>
        //         </div>
        //         <div>
        //             <div>
        //                 <h1>box 1</h1>
        //             </div>
        //         </div>
        //         <div>
        //             <h1>box 1</h1>
        //         </div>
        //         <div>
        //             <h1>box 1</h1>
        //         </div>
        //     </div>
        // </div>
    );
};

export default MainContent;