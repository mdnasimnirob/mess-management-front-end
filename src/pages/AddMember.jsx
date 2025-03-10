import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const AddMember = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        fetch('http://localhost:5000/memberAdd', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Member Added Succesfully');
                    reset();
                }
                console.log(data)
            })

    };
    return (
        <div className="card mb-4 bg-gray-100">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0 font-semibold pt-4 px-6 text-xl">Add Member</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 ">

                        <div className="">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="basic-default-fullname">
                                    Person Name
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    {...register("name", { required: true })}
                                    name="name"
                                    type="text"
                                    className="form-control w-full"
                                    id="basic-default-fullname"
                                    placeholder="Person Name"

                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="basic-default-fullname">
                                    Address
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    {...register("address", { required: true })}
                                    name="address"
                                    type="text"
                                    className="form-control w-full"
                                    id="basic-default-fullname"
                                    placeholder="Address"
                                />
                            </div>
                        </div>
                        <div className="">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="basic-default-fullname">
                                    Profession
                                </label>
                                <input
                                    {...register("profession", { required: false })}
                                    name="profession"
                                    type="text"
                                    className="form-control w-full"
                                    id="basic-default-fullname"
                                    placeholder="Profession"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="basic-default-fullname">
                                    Joining Date
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    {...register("joiningDate", { required: true })}
                                    name="joiningDate"
                                    type="date"
                                    className="form-control w-full"
                                    id="basic-default-fullname"
                                    placeholder="Joining Date"
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="basic-default-fullname">
                                    NID No <span className="text-[10px] text-red-600">Not mandatory</span>
                                </label>
                                <input
                                    {...register("nid_no", { required: false })}
                                    name="nid_no"
                                    type="text"
                                    className="form-control w-full "
                                    id="basic-default-fullname"
                                    placeholder="NID No"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <input type="submit" className="btn btn-primary mt-4 w-full shadow-lg shadow-stone-500 border-gray-600 p-2" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMember;