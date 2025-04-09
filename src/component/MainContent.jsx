import { useContext, useEffect, useState } from "react";
import Chart from "../chart/Chart";
import { AuthContexts } from "../providers/AuthProviders";
import toast from "react-hot-toast";

const MainContent = () => {
    const { user } = useContext(AuthContexts)

    // const [load, setLoad] = useState(loading)
    const [monthlyMeals, setMonthlyMeals] = useState([]);
    const [weeklyMeals, setWeeklyMeals] = useState([]);
    const [todayMeals, setTodayMeals] = useState([]);

    const [todayGuestMeals, setTodayGuestMeals] = useState([]);
    const [todayMonthlyMeals, setMonthlyGuestMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mealRate, setMealRate] = useState("");
    const [changeValue, setChangeValue] = useState("");
    console.log(changeValue)



    useEffect(() => {
        fetch('https://mess-management-back-end.vercel.app/meals/monthly')
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setMonthlyMeals(data)
                setLoading(false);

            }
            )
            .catch(error => console.error(error)
            );

        fetch('https://mess-management-back-end.vercel.app/meals/weekly')
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                setWeeklyMeals(data)
                setLoading(false)
            }
            )
            .catch(error => console.error(error)
            );

        fetch('https://mess-management-back-end.vercel.app/meals/today')
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                setTodayMeals(data)
                setLoading(false)
            }
            )
            .catch(error => console.error(error)
            );


        fetch('https://mess-management-back-end.vercel.app/guest-meals/today')
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                setTodayGuestMeals(data)
                setLoading(false)
            }
            )
            .catch(error => console.error(error)
            );
        fetch('https://mess-management-back-end.vercel.app/guest-meals/monthly')
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                setMonthlyGuestMeals(data)
                setLoading(false)
            }
            )
            .catch(error => console.error(error)
            );



    }, [monthlyMeals, todayMeals, todayGuestMeals])

    // console.log(monthlyMeals, weeklyMeals, todayMeals, todayGuestMeals)

    const handleMealRate = (e) => {
        e.preventDefault();
        const form = e.target;
        const rate = form.mealRate.value;

        console.log(rate)
        const melaRatee = { mealRate: rate }

        if (!changeValue) {
            return toast.error("Please enter a meal rate.");
        }

        fetch("https://mess-management-back-end.vercel.app/mealRate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(melaRatee),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.result.modifiedCount > 0) {
                    toast.success("Meal rate set successfully!");
                    setMealRate('');
                }
                if (data.result.modifiedCount === 0) {
                    toast.error("Meal rate not Changing!");
                    setMealRate('');
                }

            })
            .catch((err) => {
                console.error(err);
                alert("Error setting meal rate.");
            });

    }

    useEffect(() => {
        fetch('https://mess-management-back-end.vercel.app/mealRate', {
            method: 'get'
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setMealRate(data.rate.mealRate)
                if (data.rate.mealRate) {
                    setChangeValue(data.rate.mealRate)
                }
            })

    }, [mealRate])


    return (


        <div className="min-h-screen bg-gray-100 p-4">
            <div className=" mx-auto space-y-6">
                {/* Header */}
                {/* <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold">Mess Management Dashboard</h1>
                </div> */}

                {/* Overview Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-md flex gap-2 text-start ">
                        <h2 className="text-xl font-semibold text-start">Monthly Total Meals:</h2>
                        <p className="text-2xl text-blue-600"> {loading ? 'loading' : ((monthlyMeals?.meals?.length) + (todayMonthlyMeals?.totalGuestMeals) || 'server error')} </p>

                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className=" flex  gap-2">
                            <h2 className="text-xl font-semibold">Today Meals:</h2>
                            <p className="text-2xl text-blue-600">{loading ? 'loading' : todayMeals?.meals?.length === 0 ? <><span className="text-[16px] text-red-600 bg-yellow-100 px-3 py-1 rounded-md">No Meal Today</span></> : todayMeals?.meals?.length}
                                {/* { todayMeals?.meals?.length === 0 ? <><span className="text-[16px] text-red-600 bg-yellow-100 px-3 py-1 rounded-md">No Meal Today</span></> : todayMeals?.meals?.length} */}
                            </p>
                        </div>
                        <div className="flex  items-center gap-3 text-start">
                            <h2 className="text-xl font-semibold">Today guest Meals:</h2>
                            <p className="text-2xl text-center text-blue-600">{loading ? 'loading' : todayGuestMeals?.totalGuestMeals} </p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">

                        {/* <div className="flex text-center items-center gap-3">
                            <h2 className="text-xl font-semibold">Monthly guest Meals:</h2>
                            <p className="text-xl text-center text-blue-600">{loading ? 'loading' : todayMonthlyMeals?.totalGuestMeals}</p>
                        </div> */}

                        <div className="flex items-center text-center ">
                            <div className="text-start flex flex-col">
                                <div>
                                    <p className="font-semibold text-xl text-start ">Set Today Meal Rate : <span className="text-blue-600">{loading ? 'loading' : mealRate}</span></p>
                                </div>
                                <form onSubmit={handleMealRate}>
                                    <div className="lg:flex gap-2">
                                        <input
                                            className="w-3/4 h-8 border-none bg-gray-200 text-black mt-2 cursor-pointer px-2"
                                            placeholder="Enter MR"
                                            type="number"
                                            name="mealRate"
                                            value={changeValue}
                                            defaultValue={mealRate}
                                            onChange={(e) => setChangeValue(e.target.value)}
                                        />
                                        <button
                                            className="px-2 py-1 bg-blue-600 text-white rounded-md mt-2"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Add the Chart Component */}
                <Chart />

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Current Today Meals </h2>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="px-4 py-2 text-left">Serial</th>
                                <th className="px-4 py-2 text-left">User</th>
                                <th className="px-4 py-2 text-left">Meal</th>
                                <th className="px-4 py-2 text-left">Guest</th>
                                <th className="px-4 py-2 text-left">Total Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                todayMeals?.meals?.map((meal, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{meal?.memberName}</td>
                                        <td className="px-4 py-2">{1}</td>
                                        <td className="px-4 py-2">{meal?.guestMeals}</td>
                                        <td className="px-4 py-2"></td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                </div>

                {/* Menu Management Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Today's Menu</h2>
                    <ul className="space-y-3">
                        <li>Breakfast: Pancakes, Eggs, and Toast</li>
                        <li>Lunch: Grilled Chicken, Rice, and Veggies</li>
                        <li>Snacks: Sandwiches and Fresh Juices</li>
                    </ul>
                </div>




                {/* User Management Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Registered Users</h2>
                    <ul className="space-y-3">
                        <li><b>Name</b> : {user.displayName}</li>
                        <li><b className="">Email</b>  : {user.email}</li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default MainContent;