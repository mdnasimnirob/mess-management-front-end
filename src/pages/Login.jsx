import { useContext } from "react";
import { useForm } from "react-hook-form";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContexts } from "../providers/AuthProviders";
import toast from "react-hot-toast";
import loginData from '../../src/assets/login.json'
import Lottie from "lottie-react";


const Login = () => {
    const { googleLogin, facebookLogin, userSignIn } = useContext(AuthContexts);
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        console.log(email, password);

        userSignIn(email, password)
            .then(result => {
                if (result) {

                    navigate('/')
                    toast.success('Loging succesfully')
                }

                // console.log(result.user)
            })
            .catch(error => {
                // console.error(error);
                if (error) {
                    return toast.error('User Not Found')
                }

            })

    }

    const handleGoogle = () => {
        googleLogin()
            .then(result => {
                if (result) {
                    navigate('/')
                    toast.success('Loging succesfully')
                }
            })
            .catch(error => {
                if (error) {
                    return toast.error('User Not Found')
                }
            })

    };

    const handleFacebook = () => {
        facebookLogin()
            .then(result => {
                // console.log(result.user)
                if (result) {
                    navigate('/')
                    toast.success('Loging succesfully')
                }
            })
            .catch(error => {
                // console.error(error)
                if (error) {
                    return toast.error('User Not Found')
                }
            })
    }
    return (
        <div className="mt-10 lg:mt-0  ">
            <div className="card flex justify-center lg:mb-0 mb-4 bg-gray-100">
                <div className="card-header d-flex justify-content-between align-items-center ">
                    <h5 className="mb-2 font-semibold pt-4 px-6 text-center mt- text-3xl">Login Please</h5>
                </div>
                <div className="flex justify-center items-center">
                    <div className="card-body flex-1">
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
                                        className="form-control w-full pl-2  py-3 rounded-md border-[#CACACA] text-sm"
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
                                        className="form-control w-full pl-2  py-3 rounded-md border-[#CACACA] text-sm"

                                        placeholder="Password"
                                    />
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn hover:bg-blue-500 bg-blue-600 border-none rounded-md  my-3 w-full shadow-lg shadow-stone-300 border-gray-300 p-2 text-white text-lg font-normal">Login</button>
                                    <h2 className="font-medium text-base py-1">or sign in with</h2>
                                    <div className="flex flex-row gap-3 items-center justify-center text-center">
                                        <button onClick={handleGoogle} className="btn"><span><FcGoogle /> </span> <span>Google</span></button>
                                        <button onClick={handleFacebook} className="btn"><span><BsFacebook className="text-blue-600" /></span>
                                            <span>Facebook</span></button>
                                        <button></button>
                                    </div>
                                </div>

                            </div>
                        </form>
                        <div className="text-center mb-4">
                            <h3 className="font-normal text-sm text-gray-700">Do not have Account ? please <NavLink to='/register'><span className="font-bold text-blue-600">Register</span></NavLink></h3>
                        </div>
                    </div>
                    <div className="flex-1 ">
                        <Lottie className="h-[550px]" animationData={loginData}></Lottie>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;