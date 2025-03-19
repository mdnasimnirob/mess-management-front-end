import { useState, useEffect } from "react";

const Home = () => {
    const [meals, setMeals] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);

    const getCurrentMonth = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        return `${year}-${month}`;
    };

    const fetchMeals = async () => {
        try {
            const response = await fetch("http://localhost:5000/meals");
            const data = await response.json();
            setMeals(data);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    };
    console.log(selectedMeal)

    useEffect(() => {
        fetchMeals();
        setSelectedMonth(getCurrentMonth());
    }, []);

    // Handle date selection
    const handleDateChange = (event) => {
        const date = event.target.value;
        setSelectedDate(date);
        fetchMeals(date);
    };

    // Handle month selection
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        setSelectedDate(""); // Reset selected date when month changes
    };

    // Open modal with selected meal details
    const handleMealDetails = (meal) => {
        setSelectedMeal(meal);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMeal(null);
    };

    // Filter meals by selected month and date
    const filteredMeals = meals.filter((meal) => {
        const mealDate = new Date(meal._id);
        const mealMonth = mealDate.getMonth() + 1;
        const mealYear = mealDate.getFullYear();
        const mealDay = mealDate.getDate();

        if (selectedMonth) {
            const [selectedYear, selectedMonthValue] = selectedMonth.split("-");
            if (mealMonth !== parseInt(selectedMonthValue) || mealYear !== parseInt(selectedYear)) {
                return false;
            }
        }

        if (selectedDate) {
            const selectedDateObj = new Date(selectedDate);
            if (
                mealDay !== selectedDateObj.getDate() ||
                mealMonth !== selectedDateObj.getMonth() + 1 ||
                mealYear !== selectedDateObj.getFullYear()
            ) {
                return false;
            }
        }

        return true;
    });

    return (
        <div className="bg-gray-100 p-4">
            <div className="p-4 bg-white shadow-md rounded-lg">
                <div className="flex justify-between gap-1 p-3 ">
                    <div>
                        <input
                            type="month"
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            className="border px-2 py-1 rounded mb-4"
                        />
                    </div>
                    <div>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="border px-2 py-1 rounded mb-4"
                        />
                    </div>
                </div>

                {!meals || meals.length === 0 ? (
                    <div>No meal data available</div>
                ) : (
                    <table className="table text-center">
                        <thead>
                            <tr className="text-black">
                                <th>Date</th>
                                <th>Total Meals</th>
                                <th>Guests</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMeals?.map((meal) => {
                                const totalCount = meal.meals.reduce((total, individualMeal) => {
                                    const guestMeals = Number(individualMeal.guestMeals);
                                    return total + (isNaN(guestMeals) ? 0 : guestMeals);
                                }, 0);

                                return (
                                    <tr key={meal._id}>
                                        <td>{meal._id}</td>
                                        <td>{meal.totalMeals}</td>
                                        <td>{totalCount}</td>
                                        {/* <td>
                                        <button
                                            onClick={() => console.log(meal.meals)}
                                            className="px-2 bg-blue-600 text-white rounded-sm"
                                        >
                                            Details
                                        </button>
                                    </td> */}
                                        <td>
                                            <button
                                                onClick={() => handleMealDetails(meal)}
                                                className="px-2 bg-blue-600 text-white rounded-sm"
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}

                {/* Modal for Meal Details */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg lg:w-1/3 w-full relative">
                            <div>
                                <button
                                    className="absolute -top-3 -right-3 bg-gray-200 rounded-sm text-black shadow-md hover:bg-white hover:translate-y-0.5 w-6 h-6 flex items-center justify-center"
                                    onClick={() => closeModal(null)}
                                >
                                    x
                                </button>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <h2 className="text-xl font-bold mb-3">Meal Details</h2>
                                    <p><strong>Total Meals:</strong> {selectedMeal.totalMeals}</p>
                                </div>
                                <div>
                                    <p><strong>Date:</strong> {selectedMeal._id}</p>

                                </div>
                            </div>
                            <table className="w-full mt-4 text-center ">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Joining Date</th>
                                        <th>Guest Meals</th>
                                    </tr>
                                </thead>
                                <tbody className="text-start pl-5">
                                    {selectedMeal.meals.map((individualMeal) => (
                                        <tr key={individualMeal._id}>
                                            <td className="text-start pl-4">{individualMeal.memberName}</td>
                                            <td className="text-start pl-7">{individualMeal.memberAddress}</td>
                                            <td className="text-start pl-3">{individualMeal.memberJoiningDate}</td>
                                            <td className="text-start pl-9">{individualMeal.guestMeals}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button
                                onClick={closeModal}
                                className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;




// {
//     meals.map((meal) => (

//         <>
//             <tr key={meal._id}>
//                 <td>{meal._id}</td>
//                 <td>{meal.totalMeals}</td>
//                 <td>{meal.meals.reduce((total, individualMeal) => total + individualMeal.count, 1)}</td>
//                 <td>
//                     <button
//                         onClick={() => console.log(meal.meals)}
//                         className="px-2 bg-blue-600 text-white rounded-sm"
//                     >
//                         Details
//                     </button>
//                 </td>
//             </tr>
//             {/* Nested table for individual meals */}
//             <tr>
//                 <td colSpan={4}>
//                     <table className="w-full">
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Count</th>
//                                 <th>Address</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {meal.meals.map((individualMeal) => (
//                                 <tr key={individualMeal._id}>
//                                     <td>{individualMeal.name}</td>
//                                     <td>{individualMeal.count}</td>
//                                     <td>{individualMeal.address}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </td>
//             </tr>
//         </>
//     ))
// } 
