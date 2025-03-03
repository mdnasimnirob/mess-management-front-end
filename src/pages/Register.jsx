import { useContext } from "react";
import { useForm } from "react-hook-form";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { AuthContexts } from "../providers/AuthProviders";
import { Alert } from "flowbite-react";


const Register = () => {
    const { googleLogin, facebookLogin } = useContext(AuthContexts);
    const { handleSubmit, register } = useForm();
    const onSubmit = (data) => {
        console.log(data);


    }

    const handleGoogle = () => {
        googleLogin()
            .then(result => {
                console.log(result.user)
                Alert('user create succesfully')
            })
            .catch(error => {
                console.error(error);
            })

    };

    const handleFacebook = () => {
        facebookLogin()
            .then(result => {
                console.log(result.user)
                alert('user create succesfully')
            })
            .catch(error => {
                console.error(error)
                Alert('something with wrong')

            })
    }
    return (
        <div className="lg:mt-0 mt-10">
            <div className="card mb-4 bg-gray-100">
                <div className="card-header d-flex justify-content-between align-items-center ">
                    <h5 className="mb-2 font-semibold pt-4 px-6 text-center mt-4 text-3xl">Register Here</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-3 px-6 ">

                            <div className="mb-3">
                                <label className="form-label" htmlFor="name-default-fullname">
                                    User Name
                                </label>
                                <input
                                    {...register("name", { required: true })}
                                    name="name"
                                    type="text"
                                    className="form-control w-full"
                                    id="name-default-fullname"
                                    placeholder="User Name"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email-default-fullname">
                                    Phone
                                </label>
                                <input
                                    {...register("phone", { required: true })}
                                    name="phone"
                                    type="number"
                                    className="form-control w-full"
                                    id="email-default-fullname"
                                    placeholder="phone"
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

                            <div className="text-center">
                                <button type="submit" className="btn hover:bg-blue-500 bg-blue-600 border-none rounded-md  my-4 w-full shadow-lg shadow-stone-300 border-gray-300 p-2 text-white text-lg font-normal">Register</button>
                                {/* <input type="submit" value='Register' className=" btn hover:bg-blue-500 bg-blue-600 border-none rounded-md my-4 w-full shadow-lg shadow-stone-500 border-gray-600 p-2" /> */}
                                <h2 className="font-medium text-base py-1">or sign in with</h2>
                                <div className="flex flex-row gap-1 items-center justify-center text-center">
                                    <button onClick={handleGoogle} className="btn"><span><FcGoogle /> </span> <span>Google</span></button>
                                    <button onClick={handleFacebook} className="btn"><span><BsFacebook className="text-blue-600" /></span>
                                        <span>Facebook</span></button>
                                </div>
                            </div>

                        </div>
                    </form>
                    <div className="text-center">
                        <h3 className="text-sm font-normal text-gray-700">Alrealy have an Account ?  please <NavLink to='/login'><span className="font-bold text-blue-600">Login</span></NavLink></h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;