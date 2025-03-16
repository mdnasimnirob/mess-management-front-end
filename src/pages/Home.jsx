// import { useEffect, useState } from "react";
// import { useLoaderData } from "react-router-dom";

// const Home = () => {
//     // const meals = useLoaderData();
//     const [meals, setMeals] = useState([]);
//     const [selectedDate, setSelectedDate] = useState("");

//     // Fetch meals for selected date
//     // const fetchMeals = async (date) => {
//     //     if (!date) return;
//     //     try {
//     //         const response = await fetch(`http://localhost:5000/meals?date=${date}`);
//     //         const data = await response.json();
//     //         setMeals(data);
//     //     } catch (error) {
//     //         console.error("Error fetching meals:", error);
//     //     }
//     // };

//     const fetchMeals = async () => {
//         try {
//             const response = await fetch("http://localhost:5000/meals");
//             const data = await response.json();
//             setMeals(data);
//         } catch (error) {
//             console.error("Error fetching meals:", error);
//         }
//     };

//     useEffect(() => {
//         fetchMeals();
//     }, []);

//     // Handle date selection
//     // const handleDateChange = (event) => {
//     //     const date = event.target.value;
//     //     setSelectedDate(date);
//     //     fetchMeals(date);
//     // };

//     console.log(meals)
//     return (
//         <div className="p-4">
//             {/* Date Picker */}
//             {/* <label className="block mb-2 font-bold">Select Date:</label>
//             <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={handleDateChange}
//                 className="border px-2 py-1 rounded mb-4"
//             /> */}

//             {/* Meal Table */}
//             {/* <table className="table text-center">
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Total Meals</th>
//                         <th>Details</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {meals?.map((meal, index) => (
//                         <tr key={index}>
//                             <td>{meal.mealDate}</td>
//                             <td>{meals.length}</td>
//                             <td>
//                                 <button className="px-2 bg-blue-600 text-white rounded-sm">
//                                     Details
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table> */}

//             <table className="table text-center">
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Total Meals</th>
//                         <th>Gest</th>
//                         <th>Details</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {meals?.map((meal, index) => (
//                         <tr key={index}>
//                             <td>{meal._id}</td>
//                             <td>{meal.totalMeals}</td>
//                             <td>{meal.meals.length}</td>
//                             <td>
//                                 <button
//                                     onClick={() => console.log(meal.meals)} // Replace with modal or navigation
//                                     className="px-2 bg-blue-600 text-white rounded-sm"
//                                 >
//                                     Details
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}



//                 </tbody>
//             </table>

//         </div>
//     );
// };

// export default Home;



import { useEffect, useState } from "react";

const Home = () => {
    const [meals, setMeals] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");

    const getCurrentMonth = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        // const day = String(today.getDate()).padStart(2, "0");
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

    useEffect(() => {
        fetchMeals();
        setSelectedMonth(getCurrentMonth());
        // setSelectedDate(getCurrentMonth())
    }, []);

    console.log(meals);


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



    console.log(getCurrentMonth)



    // Filter meals by selected date
    // const filteredMeals = selectedDate
    //     ? meals.filter((meal) => {
    //         const mealDate = new Date(meal._id);
    //         const mealMonth = mealDate.getMonth() + 1; // Months are 0-indexed
    //         const mealYear = mealDate.getFullYear();
    //         const [selectedYear, selectedMonthValue] = selectedDate.split("-");
    //         return (
    //             mealMonth === parseInt(selectedMonthValue) &&
    //             mealYear === parseInt(selectedYear)
    //         );
    //     })
    //     : meals;


    // Filter meals by selected month and date
    const filteredMeals = meals.filter((meal) => {
        const mealDate = new Date(meal._id);
        const mealMonth = mealDate.getMonth() + 1; // Months are 0-indexed
        const mealYear = mealDate.getFullYear();
        const mealDay = mealDate.getDate();

        // Filter by month
        if (selectedMonth) {
            const [selectedYear, selectedMonthValue] = selectedMonth.split("-");
            if (
                mealMonth !== parseInt(selectedMonthValue) ||
                mealYear !== parseInt(selectedYear)
            ) {
                return false;
            }
        }

        // Filter by date
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




    console.log("Filtered Meals:", filteredMeals);


    return (
        <div className="p-4">
            <div className="flex justify-between p-3">
                {/* Month Picker */}
                <div>
                    {/* <label className="block mb-2 font-bold">Select Month:</label> */}
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="border px-2 py-1 rounded mb-4"
                    />
                </div>
                {/* Date Picker */}
                <div>
                    {/* <label className="block mb-2 font-bold">Select Date:</label> */}
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


                        {!filteredMeals || filteredMeals.length === 0 ? (
                            <tr className="">
                                <td colSpan="4" className=" text-center text-xl bg-gray-200 text-red-600 py-">
                                    No meal data available
                                </td>
                            </tr>
                        ) : (filteredMeals?.map((meal) => {
                            const totalCount = meal.meals.reduce((total, individualMeal) => {
                                const count = Number(individualMeal.count);
                                return total + (isNaN(count) ? 0 : count);
                            }, 0);

                            return (
                                <tr key={meal._id}>
                                    <td>{meal._id}</td>
                                    <td>{meal.totalMeals}</td>
                                    <td>{totalCount}</td>
                                    <td>
                                        <button
                                            onClick={() => console.log(meal.meals)}
                                            className="px-2 bg-blue-600 text-white rounded-sm"
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            );
                        }))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Home;



{/* {meals.map((meal) => (

                            <>
                                <tr key={meal._id}>
                                    <td>{meal._id}</td>
                                    <td>{meal.totalMeals}</td>
                                    <td>{meal.meals.reduce((total, individualMeal) => total + individualMeal.count, 1)}</td>
                                    <td>
                                        <button
                                            onClick={() => console.log(meal.meals)}
                                            className="px-2 bg-blue-600 text-white rounded-sm"
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr> */}
{/* Nested table for individual meals */ }
{/* <tr>
                                    <td colSpan={4}>
                                        <table className="w-full">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Count</th>
                                                    <th>Address</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {meal.meals.map((individualMeal) => (
                                                    <tr key={individualMeal._id}>
                                                        <td>{individualMeal.name}</td>
                                                        <td>{individualMeal.count}</td>
                                                        <td>{individualMeal.address}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr> */}
{/* </>
                        ))} */}
