import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";


const Login = () => {
    const { handleSubmit, register } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <div className="mt-20 lg:mt-2 ">
            <div className="card flex justify-center mb-4 bg-gray-100">
                <div className="card-header d-flex justify-content-between align-items-center ">
                    <h5 className="mb-2 font-semibold pt-4 px-6 text-center mt-4 text-3xl">Login Please</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-3 px-6 ">


                            <div className="mb-3">
                                <label className="form-label" htmlFor="email-default-fullname">
                                    Email
                                </label>
                                <input
                                    {...register("email", { required: true })}
                                    name="email"
                                    type="email"
                                    className="form-control w-full"
                                    id="email-default-fullname"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="password-default-fullname">
                                    Password
                                </label>
                                <input
                                    {...register("password", { required: true })}
                                    name="password"
                                    type="password"
                                    className="form-control w-full"

                                    placeholder="password"
                                />
                            </div>

                            <div>
                                <input type="submit" value='Register' className="btn btn-primary mt-4 w-full shadow-lg shadow-stone-500 border-gray-600 p-2" />
                            </div>

                        </div>
                    </form>
                    <div>
                        <h3>Do not have Account ? please <NavLink to='/register'><span className="font-bold">Register</span></NavLink></h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;