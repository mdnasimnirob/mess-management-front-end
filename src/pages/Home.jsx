import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const Home = () => {
    // const meals = useLoaderData();
    const [meals, setMeals] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");

    // Fetch meals for selected date
    // const fetchMeals = async (date) => {
    //     if (!date) return;
    //     try {
    //         const response = await fetch(`http://localhost:5000/meals?date=${date}`);
    //         const data = await response.json();
    //         setMeals(data);
    //     } catch (error) {
    //         console.error("Error fetching meals:", error);
    //     }
    // };

    const fetchMeals = async () => {
        try {
            const response = await fetch("http://localhost:5000/meals");
            const data = await response.json();
            setMeals(data);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    };

    useEffect(() => {
        fetchMeals();
    }, []);

    // Handle date selection
    // const handleDateChange = (event) => {
    //     const date = event.target.value;
    //     setSelectedDate(date);
    //     fetchMeals(date);
    // };

    console.log(meals)
    return (
        <div className="p-4">
            {/* Date Picker */}
            {/* <label className="block mb-2 font-bold">Select Date:</label>
            <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="border px-2 py-1 rounded mb-4"
            /> */}

            {/* Meal Table */}
            {/* <table className="table text-center">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total Meals</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {meals?.map((meal, index) => (
                        <tr key={index}>
                            <td>{meal.mealDate}</td>
                            <td>{meals.length}</td>
                            <td>
                                <button className="px-2 bg-blue-600 text-white rounded-sm">
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}

            <table className="table text-center">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total Meals</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {meals?.map((meal, index) => (
                        <tr key={index}>
                            <td>{meal._id}</td>
                            <td>{meal.totalMeals}</td>
                            <td>
                                <button
                                    onClick={() => console.log(meal.meals)} // Replace with modal or navigation
                                    className="px-2 bg-blue-600 text-white rounded-sm"
                                >
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default Home;