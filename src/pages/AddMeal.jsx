import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const AddMeal = () => {
    const allMember = useLoaderData(); // Load all members
    const [selectedMeals, setSelectedMeals] = useState({});
    // const [existingMeals, setExistingMeals] = useState([]);
    const navigate = useNavigate();

    // Fetch today's meals to prevent duplicate entries
    // useEffect(() => {
    //     const fetchExistingMeals = async () => {
    //         try {
    //             const response = await fetch("http://localhost:5000/meals/today");
    //             const data = await response.json();
    //             setExistingMeals(data); // Store members who already added meals
    //         } catch (error) {
    //             console.error("Error fetching today's meals:", error);
    //         }
    //     };
    //     fetchExistingMeals();
    // }, []);
    // console.log(existingMeals)

    // Check if a member has already added a meal today
    const hasMealToday = (memberId) => (m => m.member_id === memberId);

    // Handle selection & guest count
    const handleSelect = (memberId) => {
        setSelectedMeals((prev) => {
            const updated = { ...prev };

            if (updated[memberId]) {
                delete updated[memberId]; // Remove if already selected
            } else {
                updated[memberId] = { guestMeals: 0 }; // Default guest meals 0
            }
            return updated;

        });
    };


    // Handle guest meal count change
    const handleGuestChange = (memberId, value) => {
        setSelectedMeals((prev) => ({
            ...prev,
            [memberId]: { guestMeals: parseInt(value) || 0 },
        }));
    };

    // Handle submitting selected meals
    const handleSubmit = async () => {
        if (Object.keys(selectedMeals).length === 0) {
            toast.error("No members selected");
            return;
        }

        // Map the selected meals to include member details (name, address)
        const dateMeal = Object.keys(selectedMeals).map(memberId => {
            const member = allMember.find(m => m._id === memberId); // Find the member by ID
            return {
                member_id: memberId,
                mealDate: new Date().toISOString().split("T")[0],
                guestMeals: selectedMeals[memberId].guestMeals || 0,
                memberName: member?.name, // Include member's name
                memberAddress: member?.address, // Include member's address
                memberJoiningDate: member?.joiningDate
            };
        });


        // const dateMeal = Object.keys(selectedMeals).map(memberId => ({
        //     member_id: memberId,
        //     mealDate: new Date().toISOString().split("T")[0],
        //     guestMeals: selectedMeals[memberId].guestMeals || 0,
        // }));

        try {
            const response = await fetch("http://localhost:5000/addMeal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dateMeal),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("Meals added successfully!");
                setSelectedMeals({});
                navigate("/home");
            } else {
                toast.error("Error adding meals: " + data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 lg:mb-14 mb-32 ">
            <table className="table text-center">
                <thead>
                    <tr className="text-black">
                        <th>Serial</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th className="hidden sm:block">Joining</th>
                        <th>Guest Meals</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allMember?.map((member, index) => (
                        <tr key={member._id}>
                            <th>{index + 1}</th>
                            <td>{member.name}</td>
                            <td>{member.address}</td>
                            <td className="hidden sm:table-cell">
                                <span className="text-[12px]">{member.joiningDate}</span>
                            </td>
                            <td >
                                <input
                                    type="number"
                                    min="0"
                                    value={selectedMeals[member._id]?.guestMeals || ""}
                                    onChange={(e) => handleGuestChange(member._id, e.target.value)}
                                    className="border-none bg-gray-200 px-0.5 py-0.5 w-12 text-center"
                                    disabled={hasMealToday(member._id)}
                                />
                            </td>
                            <td>
                                <div className="flex items-center justify-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={!!selectedMeals[member._id]}
                                        onChange={() => handleSelect(member._id)}
                                        disabled={hasMealToday(member._id)}
                                    />
                                    <h3 className={hasMealToday(member._id) ? "text-gray-500" : ""}>
                                        {hasMealToday(member._id) ? "Meal Added" : "Add Meal"}
                                    </h3>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="text-end mr-9 text-white fixed bottom-3 right-0  ">
                <button
                    onClick={handleSubmit}
                    className="p-3 rounded-lg bg-blue-500 mt-4 lg:mb-1 mb-16  disabled:opacity-50"
                    disabled={Object.keys(selectedMeals).length === 0}
                >
                    Submit Selected Meals
                </button>
            </div>
        </div>
    );
};

export default AddMeal;



// import { useLoaderData, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import toast from "react-hot-toast";

// const AddMeal = () => {
//     const allMember = useLoaderData();
//     const [selectedMembers, setSelectedMembers] = useState([]);
//     const [mealType, setMealType] = useState("total"); // Default to total meal
//     const navigate = useNavigate();

//     // Handle checkbox selection
//     const handleSelect = (member) => {
//         setSelectedMembers((prev) => {
//             if (prev.some((m) => m._id === member._id)) {
//                 return prev.filter((m) => m._id !== member._id); // Remove if already selected
//             } else {
//                 return [...prev, member]; // Add if not selected
//             }
//         });
//     };

//     // Handle submitting selected members
//     const handleSubmit = async () => {
//         if (selectedMembers.length === 0) {
//             toast.error("No members selected");
//             return;
//         }

//         const dateMeal = selectedMembers.map(member => ({
//             member_id: member._id,
//             name: member.name,
//             address: member.address,
//             joiningDate: member.joiningDate,
//             mealDate: new Date().toISOString().split("T")[0],
//             type: mealType, // Assign the selected meal type
//         }));

//         console.log(dateMeal);

//         try {
//             const response = await fetch("http://localhost:5000/addMeal", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(dateMeal),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 toast.success("Meals added successfully!");
//                 setSelectedMembers([]); // Reset selection
//                 navigate('/home');
//             } else {
//                 toast.error("Error adding meals: " + data.message);
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             toast.error("Something went wrong!");
//         }
//     };

//     return (
//         <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-14">
//             <div className="flex justify-between p-4">
//                 <h2 className="text-lg font-bold">Select Meal Type:</h2>
//                 <select
//                     className="border p-2 rounded-md"
//                     value={mealType}
//                     onChange={(e) => setMealType(e.target.value)}
//                 >
//                     <option value="total">Total Meal</option>
//                     <option value="guest">Guest Meal</option>
//                 </select>
//             </div>

//             <table className="table text-center">
//                 <thead>
//                     <tr>
//                         <th>Serial</th>
//                         <th>Name</th>
//                         <th>Address</th>
//                         <th>Joining</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {allMember?.map((member, index) => (
//                         <tr key={member._id}>
//                             <th>{index + 1}</th>
//                             <td>{member.name}</td>
//                             <td>{member.address}</td>
//                             <td><span className="text-[12px]">{member.joiningDate}</span></td>
//                             <td>
//                                 <div className="flex items-center justify-center gap-2">
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedMembers.some((m) => m._id === member._id)}
//                                         onChange={() => handleSelect(member)}
//                                     />
//                                     <h3>Add Meal</h3>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <div className="text-end mr-9 text-white fixed bottom-3 right-0 ">
//                 <button
//                     onClick={handleSubmit}
//                     className="p-3 rounded-lg bg-blue-500 mt-4 mb-1"
//                 >
//                     Submit Selected Meals
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AddMeal;



// import { useLoaderData, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import toast from "react-hot-toast";

// const AddMeal = () => {
//     const allMember = useLoaderData();
//     const [selectedMembers, setSelectedMembers] = useState([]);
//     const navigate = useNavigate()

//     // Handle checkbox selection
//     const handleSelect = (member) => {
//         setSelectedMembers((prev) => {
//             if (prev.some((m) => m._id === member._id)) {
//                 return prev.filter((m) => m._id !== member._id); // Remove if already selected
//             } else {
//                 return [...prev, member]; // Add if not selected
//             }
//         });
//     };
//     console.log(selectedMembers)

//     // Handle submitting selected members
//     const handleSubmit = async () => {
//         if (selectedMembers.length === 0) {
//             toast.error("No members selected");
//             return;
//         }

//         const dateMeal = selectedMembers.map(member => ({
//             member_id: member._id,
//             name: member.name,
//             address: member.address,
//             joiningDate: member.joiningDate,
//             mealDate: new Date().toISOString().split("T")[0],
//         }))
//         console.log(dateMeal);

//         try {
//             const response = await fetch("http://localhost:5000/addMeal", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(dateMeal),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 toast.success("Meals added successfully!");
//                 setSelectedMembers([]); // Reset selection
//                 navigate('/home')
//             } else {
//                 toast.error("Error adding meals: " + data.message);
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             toast.error("Something went wrong!");
//         }
//     };


//     return (
//         <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-14">
//             <table className="table text-center">
//                 <thead>
//                     <tr>
//                         <th>Serial</th>
//                         <th>Name</th>
//                         <th>Address</th>
//                         <th>Joining</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {allMember?.map((member, index) => (
//                         <tr key={member._id}>
//                             <th>{index + 1}</th>
//                             <td>{member.name}</td>
//                             <td>{member.address}</td>
//                             <td><span className="text-[12px]">{member.joiningDate}</span></td>
//                             <td>
//                                 <div className="flex items-center justify-center gap-2">
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedMembers.some((m) => m._id === member._id)}
//                                         onChange={() => handleSelect(member)}
//                                     />
//                                     <h3>Add Meal</h3>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <div className="text-end mr-9 text-white fixed bottom-3 right-0 ">
//                 <button
//                     onClick={handleSubmit}
//                     className="p-3 rounded-lg bg-blue-500 mt-4 mb-1"
//                 >
//                     Submit Selected Meals
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AddMeal;
