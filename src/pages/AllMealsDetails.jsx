import { useEffect, useState } from "react";





const AllMealsDetails = () => {

    const [allMealsDetails, setAllMealsDetaisl] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [mealRate, setMealRate] = useState("");
    const [blance, setBlance] = useState("");

    console.log(blance)

    // const getMemberDeposit = (memberId) => {
    //     const member = blance?.find((m) => m._id === memberId);
    //     return member?.deposit || 0;
    // };

    const getMemberDeposit = (memberId) => {
        const member = blance?.find((m) => m._id === memberId);
        if (!member || !member.depositHistory) return 0;

        const [selectedYear, selectedMonthValue] = selectedMonth.split("-");
        const filteredDeposit = member.depositHistory.filter((entry) => {
            const depositDate = new Date(entry.depositDate);
            return (
                depositDate.getFullYear() === parseInt(selectedYear) &&
                depositDate.getMonth() + 1 === parseInt(selectedMonthValue)
            );
        });

        const total = filteredDeposit.reduce((sum, entry) => sum + entry.amount, 0);
        return total;
    };

    console.log(mealRate)

    console.log(allMealsDetails)
    const getCurrentMonth = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        return `${year}-${month}`;
    };

    const fetchMemberBlance = async () => {
        try {
            const response = await fetch("http://localhost:5000/allMember");
            const data = await response.json();
            setBlance(data);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }

    }

    const fetchData = async () => {
        try {
            const response = await fetch("https://mess-management-back-end.vercel.app/meals/monthly/by-member");
            const data = await response.json();
            setAllMealsDetaisl(data);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }

    }

    const fetchMealsRate = async () => {
        try {
            const response = await fetch("https://mess-management-back-end.vercel.app/mealRate");
            const data = await response.json();
            const rate = data.rate.mealRate;

            if (rate) {
                return setMealRate(rate);
            }

        } catch (error) {
            console.error("Error fetching meals:", error);
        }

    }

    useEffect(() => {
        fetchMemberBlance()
        fetchData()
        fetchMealsRate()
        setSelectedMonth(getCurrentMonth());
    }, [mealRate]);

    // Handle date selection
    const handleDateChange = (event) => {
        const date = event.target.value;
        setSelectedDate(date);

    };

    // Handle month selection
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        setSelectedDate(""); // Reset selected date when month changes
    };



    // Filter meals by selected month and date

    const filteredMeals = allMealsDetails.filter((meal) => {
        // Check by selected month
        if (selectedMonth) {
            const [selectedYear, selectedMonthValue] = selectedMonth.split("-");
            if (
                meal.year !== parseInt(selectedYear) ||
                meal.month !== parseInt(selectedMonthValue)
            ) {
                return false;
            }
        }

        // Check by selected date
        if (selectedDate) {
            const selectedDateObj = new Date(selectedDate);
            const selectedDay = selectedDateObj.getDate();
            const selectedMonth = selectedDateObj.getMonth() + 1;
            const selectedYear = selectedDateObj.getFullYear();

            const matchedDate = meal.mealDates.find((dateStr) => {
                const date = new Date(dateStr);
                return (
                    date.getDate() === selectedDay &&
                    date.getMonth() + 1 === selectedMonth &&
                    date.getFullYear() === selectedYear
                );
            });

            if (!matchedDate) return false;
        }

        return true;
    });

    return (
        <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">All Meals Details </h2>

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
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="border-b">
                            {/* <th className="px-4 py-2 text-left">Serial</th> */}
                            <th className="px-4 py-2 text-left">User</th>
                            <th className="px-4 py-2 text-left">Meal</th>
                            <th className="px-4 py-2 text-left">Guest</th>
                            {/* <th className="px-4 py-2 text-left">Month</th> */}
                            <th className="px-4 py-2 text-left">Total Meals</th>
                            <th className="px-4 py-2 text-left">Total Cost</th>
                            <th className="px-4 py-2 text-left">Remaining Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredMeals?.map((meals, index) => {
                                const deposite = getMemberDeposit(meals.memberId) || 0;
                                const totalCost = mealRate * (meals?.totalMeals + meals?.guestMeals);
                                const remaining = deposite - totalCost;
                                console.log(deposite);
                                return (
                                    <tr key={index} className="border-b ">
                                        {/* <td className="px-4 py-2">{index + 1}</td> */}
                                        <td className="px-4 py-2">{meals?.memberName}</td>
                                        <td className="px-8 py-2 ">{meals?.totalMeals}</td>
                                        <td className="px-8 py-2">{meals?.guestMeals}</td>
                                        {/* <td className="px-4 py-2">{meals?.month}</td> */}
                                        <td className="px-10 py-2">{meals?.totalMeals + meals?.guestMeals}</td>
                                        <td className="px-10 py-2">{totalCost}</td>
                                        <td className="px-10 py-2">{remaining.toFixed(2)}</td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllMealsDetails;