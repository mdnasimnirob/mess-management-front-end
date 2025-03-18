import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const AllMember = () => {
    const loadedMember = useLoaderData();
    const [allMember, setAllMember] = useState(loadedMember)
    const [selectedMember, setSelectedMember] = useState(null);

    const handleEdit = (member) => {
        setSelectedMember({ ...member }); // Ensure a copy of the object is set
    };

    const handleUpdate = async () => {
        if (!selectedMember) return;

        const res = await fetch(`http://localhost:5000/memberUpdate/${selectedMember._id}`, {
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

    // const handleDelete = _id => {
    //     console.log(_id);
    //     fetch(`http://localhost:5000/memberDelete/${_id}`, {
    //         method: 'delete'
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             if (data.deletedCount > 0) {
    //                 toast.success('Delete Successfully')
    //                 const remainingMember = allMember.filter(member => member._id !== _id)
    //                 setAllMember(remainingMember)
    //             }

    //         })
    // }

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
                fetch(`http://localhost:5000/memberDelete/${_id}`, {
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
                        <tr>
                            <th></th>
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

            {/* Edit Modal */}
            {/* {selectedMember && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="bg-white rounded-lg shadow-lg flex justify-between ">
                            <h2 className="text-xl font-semibold mb-4">Edit Member</h2>
                            <button className="bg-gray-200 rounded-sm text-black shadow-white hover:text-[15px] shadow-md  px-2 mb-4 fixed top-[185px] right-[455px] " onClick={() => setSelectedMember(null)}>
                                x
                            </button>
                        </div>

                        <input
                            type="text"
                            className="border p-2 w-full mb-2"
                            value={selectedMember.name}
                            onChange={(e) => setSelectedMember({ ...selectedMember, name: e.target.value })}
                        />
                        <input
                            type="text"
                            className="border p-2 w-full mb-2"
                            value={selectedMember.address}
                            onChange={(e) => setSelectedMember({ ...selectedMember, address: e.target.value })}
                        />
                        <div className="flex gap-4">
                            <button className="bg-blue-500 text-white px-4 py-2" onClick={handleUpdate}>
                                Save
                            </button>
                            <button className="bg-gray-400 text-white px-4 py-2" onClick={() => setSelectedMember(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )} */}

            {/* {selectedMember && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Edit Member</h2>
                            <button
                                className="bg-gray-200 rounded-sm text-black shadow-md hover:bg-gray-300 px-2"
                                onClick={() => setSelectedMember(null)}
                            >
                                x
                            </button>
                        </div>

                        <input
                            type="text"
                            className="border p-2 w-full mb-2"
                            value={selectedMember.name}
                            onChange={(e) => setSelectedMember({ ...selectedMember, name: e.target.value })}
                        />
                        <input
                            type="text"
                            className="border p-2 w-full mb-2"
                            value={selectedMember.address}
                            onChange={(e) => setSelectedMember({ ...selectedMember, address: e.target.value })}
                        />
                        <div className="flex gap-4">
                            <button className="bg-blue-500 text-white px-4 py-2" onClick={handleUpdate}>
                                Save
                            </button>
                            <button className="bg-gray-400 text-white px-4 py-2" onClick={() => setSelectedMember(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )} */}

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
