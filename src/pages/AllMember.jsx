import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
// import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const AllMember = () => {
    // const loadedMember = useLoaderData();
    const [allMember, setAllMember] = useState();
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        const fetchAllMembers = async () => {
            try {
                const response = await fetch("https://mess-management-back-end.vercel.app/allMember",);
                const data = await response.json();
                setAllMember(data);
            } catch (error) {
                console.error("Error fetching Member:", error);
            }
        };
        fetchAllMembers();
    }, []);
    console.log(allMember)

    const handleEdit = (member) => {
        setSelectedMember({ ...member }); // Ensure a copy of the object is set
    };

    const handleUpdate = async () => {
        if (!selectedMember) return;

        const res = await fetch(`https://mess-management-back-end.vercel.app/memberUpdate/${selectedMember._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedMember),
        });

        const data = await res.json();

        if (data.success) {
            toast.success("Member updated successfully!");
            // Update state without reloading
            setAllMember(allMember.map(member =>
                member._id === selectedMember._id ? selectedMember : member
            ));
            setSelectedMember(null); // Close modal
        } else {
            toast.error(data.message || "Update failed");
        }
    };

    const handleDelete = (_id) => {
        // Show confirmation dialog
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // If user confirms, proceed with deletion
                fetch(`https://mess-management-back-end.vercel.app/memberDelete/${_id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            // Show success message
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                            });

                            // Update the state to remove the deleted member
                            const remainingMember = allMember.filter((member) => member._id !== _id);
                            setAllMember(remainingMember);
                        } else {
                            // Show error message if deletion fails
                            Swal.fire({
                                title: "Error!",
                                text: "Something went wrong. Please try again.",
                                icon: "error",
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting member:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong. Please try again.",
                            icon: "error",
                        });
                    });
            }
        });
    };


    return (
        <div>
            {/* Table */}
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-14">
                <table className="table text-center">
                    <thead>
                        <tr className="text-black">
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
                                    <div className="flex gap-4 text-center justify-center">
                                        <button onClick={() => handleEdit(member)}>
                                            <FaEdit className="tooltip-top  text-lg text-[#2544f1]" />
                                        </button>
                                        <button onClick={() => handleDelete(member._id)}>
                                            <RiDeleteBin2Fill className="text-lg text-red-700" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedMember && (
                <div className="fixed z-40 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative"> {/* Add relative here */}
                        {/* Close button positioned absolutely in the top-right corner */}
                        <button
                            className="absolute -top-3 -right-3 bg-gray-200 rounded-sm text-black shadow-md hover:bg-white hover:translate-y-0.5 w-6 h-6 flex items-center justify-center"
                            onClick={() => setSelectedMember(null)}
                        >
                            x
                        </button>

                        <h2 className="text-xl font-semibold mb-4">Edit Member</h2>
                        <input
                            type="text"
                            className="border p-2 w-full mb-2 border-none bg-gray-200"
                            value={selectedMember.name}
                            onChange={(e) => setSelectedMember({ ...selectedMember, name: e.target.value })}
                        />
                        <input
                            type="text"
                            className="border p-2 w-full mb-2 border-none bg-gray-200"
                            value={selectedMember.address}
                            onChange={(e) => setSelectedMember({ ...selectedMember, address: e.target.value })}
                        />
                        <div className="flex justify-end gap-4 mt-3">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleUpdate}>
                                Save
                            </button>
                            {/* <button className="bg-gray-400 text-white px-4 py-2 rounded-md" onClick={() => setSelectedMember(null)}>
                                Cancel
                            </button> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllMember;
