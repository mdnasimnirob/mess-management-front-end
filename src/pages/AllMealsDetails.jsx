import { useEffect, useState } from "react";

const AllMealsDetails = () => {
    const [allMealsDetails, setAllMealsDetaisl] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [mealRate, setMealRate] = useState("");
    const [blance, setBlance] = useState([]);

    const getCurrentMonth = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        return `${year}-${month}`;
    };

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

        return filteredDeposit.reduce((sum, entry) => sum + entry.amount, 0);
    };

    const getPreviousBalance = (memberId) => {
        if (!blance || !Array.isArray(blance)) return 0;
        const member = blance.find((m) => m._id === memberId);
        if (!member || !member.depositHistory) return 0;

        const [selectedYear, selectedMonthValue] = selectedMonth.split("-");
        const selectedMonthNum = parseInt(selectedMonthValue);
        const selectedYearNum = parseInt(selectedYear);

        let prevTotalDeposit = 0;
        let prevTotalCost = 0;

        // Previous deposits
        member.depositHistory.forEach((entry) => {
            const date = new Date(entry.depositDate);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            if (
                year < selectedYearNum ||
                (year === selectedYearNum && month < selectedMonthNum)
            ) {
                prevTotalDeposit += entry.amount;
            }
        });

        // Previous cost
        allMealsDetails.forEach((meal) => {
            if (meal.memberId === memberId) {
                if (
                    meal.year < selectedYearNum ||
                    (meal.year === selectedYearNum && meal.month < selectedMonthNum)
                ) {
                    prevTotalCost += mealRate * (meal.totalMeals + meal.guestMeals);
                }
            }
        });

        return prevTotalDeposit - prevTotalCost;
    };

    const fetchMemberBlance = async () => {
        try {
            const response = await fetch("http://localhost:5000/allMember");
            const data = await response.json();
            setBlance(data);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch("https://mess-management-back-end.vercel.app/meals/monthly/by-member");
            const data = await response.json();
            setAllMealsDetaisl(data);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    };

    const fetchMealsRate = async () => {
        try {
            const response = await fetch("https://mess-management-back-end.vercel.app/mealRate");
            const data = await response.json();
            const rate = data.rate.mealRate;
            if (rate) setMealRate(rate);
        } catch (error) {
            console.error("Error fetching meal rate:", error);
        }
    };

    useEffect(() => {
        fetchMemberBlance();
        fetchData();
        fetchMealsRate();
        setSelectedMonth(getCurrentMonth());
    }, []);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        setSelectedDate("");
    };

    const filteredMeals = allMealsDetails.filter((meal) => {
        if (selectedMonth) {
            const [selectedYear, selectedMonthValue] = selectedMonth.split("-");
            if (
                meal.year !== parseInt(selectedYear) ||
                meal.month !== parseInt(selectedMonthValue)
            ) {
                return false;
            }
        }

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
                <h2 className="text-2xl font-semibold mb-4">All Meals Details</h2>
                <div className="flex justify-between gap-1 p-3 ">
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="border px-2 py-1 rounded mb-4"
                    />
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="border px-2 py-1 rounded mb-4"
                    />
                </div>

                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="px-4 py-2 text-left">User</th>
                            <th className="px-4 py-2 text-left">Meal</th>
                            <th className="px-4 py-2 text-left">Guest</th>
                            <th className="px-4 py-2 text-left">Total Meals</th>
                            <th className="px-4 py-2 text-left">Meal Cost</th>
                            <th className="px-4 py-2 text-left">Carried Balance</th>
                            <th className="px-4 py-2 text-left">Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMeals.map((meals, index) => {
                            const currentDeposit = getMemberDeposit(meals.memberId) || 0;
                            const previousBalance = getPreviousBalance(meals.memberId);
                            const totalDeposit = currentDeposit + previousBalance;
                            const totalCost = mealRate * (meals.totalMeals + meals.guestMeals);
                            const remaining = totalDeposit - totalCost;

                            return (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2">{meals.memberName}</td>
                                    <td className="px-4 py-2">{meals.totalMeals}</td>
                                    <td className="px-4 py-2">{meals.guestMeals}</td>
                                    <td className="px-4 py-2">{meals.totalMeals + meals.guestMeals}</td>
                                    <td className="px-4 py-2">{totalCost.toFixed(2)}</td>
                                    <td className="px-4 py-2">{previousBalance.toFixed(2)}</td>
                                    <td className="px-4 py-2">{remaining.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllMealsDetails;
