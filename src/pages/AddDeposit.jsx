import { useEffect, useState } from "react";


const AddDeposit = () => {
    const [allMember, setAllMember] = useState(null)

    useEffect(() => {
        fetch("https://mess-management-back-end.vercel.app/allMember")
            .then(res => res.json())
            .then(data => {
                setAllMember(data);
                console.log(data)
            }
            )
    }, [allMember])

    console.log(allMember)


    const handleDepositSubmit = (e, memberId) => {
        e.preventDefault();
        const amount = parseFloat(e.target.amount.value);
        const depositDate = new Date();

        fetch('https://mess-management-back-end.vercel.app/addDeposit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ memberId, amount: parseFloat(amount), depositDate }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Deposit added', data);
                // Re-fetch members after update
                fetch("https://mess-management-back-end.vercel.app/allMember")
                    .then(res => res.json())
                    .then(data => setAllMember(data));
            });

        e.target.reset(); // Clear input field
    };


    return (
        <div>
            <h3 className="p-6 text-blue-600 font-medium text-2xl ml-3">Money Deposit</h3>
            <table className="table text-center">
                <thead>
                    <tr className="text-black border-b text-[12px]">
                        {/* <th>Serial</th> */}
                        <th>Name</th>
                        {/* <th>Address</th> */}
                        {/* <th>Joining</th> */}
                        <th>Money</th>
                        <th>Add Money</th>
                    </tr>
                </thead>
                <tbody>
                    {allMember?.map((member) => (
                        <tr key={member._id}>
                            <td>{member.name}</td>
                            <td>
                                <h2 className="px-2 py-1 bg-gray-200 text-black">
                                    {member.deposit || 0}
                                </h2>
                            </td>
                            <td>
                                <form
                                    onSubmit={(e) => handleDepositSubmit(e, member._id)}
                                >
                                    <div className="lg:flex lg:gap-4 gap-2 justify-center">
                                        <input
                                            className="no-arrow w-2/4 h-8 border-none bg-gray-200 text-black px-2"
                                            placeholder="Enter TK"
                                            type="number"
                                            name="amount"
                                            required
                                        />
                                        <button
                                            className="px-2 lg:px-4 py-1 bg-blue-600 text-white rounded-md"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
};

export default AddDeposit;