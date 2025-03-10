import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useLoaderData } from "react-router-dom";


const AllMember = () => {
    const allMember = useLoaderData();
    console.log(allMember)
    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-14">
            <table className="table">
                {/* head */}
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
                    {
                        allMember?.map((member, index) => (

                            <tr key={member._id}>
                                <th>{index + 1}</th>
                                <td>{member.name}</td>
                                <td>{member.address}</td>
                                <td><span className="text-[12px]">{member.joiningDate}</span></td>
                                <td>
                                    <div className="flex gap-2">
                                        <FaEdit className="text-lg text-[#2544f1]" />
                                        <RiDeleteBin2Fill className="text-lg text-red-700" />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }


                </tbody>
            </table>
        </div>
    );
};

export default AllMember;