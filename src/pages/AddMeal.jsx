import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const AddMeal = () => {
    const allMember = useLoaderData();
    const [selectedMembers, setSelectedMembers] = useState([]);

    // Handle checkbox selection
    const handleSelect = (member) => {
        setSelectedMembers((prev) => {
            if (prev.some((m) => m._id === member._id)) {
                return prev.filter((m) => m._id !== member._id); // Remove if already selected
            } else {
                return [...prev, member]; // Add if not selected
            }
        });
    };
    console.log(selectedMembers)

    // Handle submitting selected members
    const handleSubmit = async () => {
        if (selectedMembers.length === 0) {
            toast.error("No members selected");
            return;
        }

        const dateMeal = selectedMembers.map(member => ({
            member_id: member._id,
            name: member.name,
            address: member.address,
            joiningDate: member.joiningDate,
            mealDate: new Date().toISOString().split("T")[0],
        }))
        console.log(dateMeal);

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
                setSelectedMembers([]); // Reset selection
            } else {
                toast.error("Error adding meals: " + data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong!");
        }
    };


    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-14">
            <table className="table text-center">
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Joining</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allMember?.map((member, index) => (
                        <tr key={member._id}>
                            <th>{index + 1}</th>
                            <td>{member.name}</td>
                            <td>{member.address}</td>
                            <td><span className="text-[12px]">{member.joiningDate}</span></td>
                            <td>
                                <div className="flex items-center justify-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedMembers.some((m) => m._id === member._id)}
                                        onChange={() => handleSelect(member)}
                                    />
                                    <h3>Add Meal</h3>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="text-end mr-9 text-white fixed bottom-3 right-0 ">
                <button
                    onClick={handleSubmit}
                    className="p-3 rounded-lg bg-blue-500 mt-4 mb-1"
                >
                    Submit Selected Meals
                </button>
            </div>
        </div>
    );
};

export default AddMeal;
