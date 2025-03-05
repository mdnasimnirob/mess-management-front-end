import { useContext } from "react";
import { useForm } from "react-hook-form";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContexts } from "../providers/AuthProviders";
// import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'



const Register = () => {
    const navigate = useNavigate();
    // const [phone, setPhone] = useState('');
    // const [otp, setOtp] = useState("");
    // const [confirmationResult, setConfirmationResult] = useState(null);
    const { googleLogin, facebookLogin, userRegister } = useContext(AuthContexts);
    const { handleSubmit, register } = useForm();


    const onSubmit = async (data) => {
        const name = data.name;
        const email = data.email;
        const password = data.password;
        console.log(name, email, password);
        try {
            const result = await userRegister(name, email, password);
            console.log(result.user);
            alert("User registered successfully!");
        } catch (error) {
            console.error(error);
            alert(error.message || "Something went wrong!");
        }
    };

    // const handleRegister = (e) => {
    //     e.preventDefault();
    //     console.log(e.currentTarget);
    //     const form = new FormData(e.currentTarget);
    //     console.log(form);
    //     const name = form.get('name');
    //     const phone = form.get('phone');
    //     const password = form.get('password');
    //     console.log(name, phone, password);

    //     userRegister(name, phone, password)
    //         .then(result => {
    //             console.log(result.user)
    //             alert('user create succesfully')
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             alert('something with wrong')

    //         })
    // }


    // const handleRegister = async (e) => {
    //     e.preventDefault();
    //     const form = new FormData(e.currentTarget);
    //     const name = form.get("name");
    //     const password = form.get("password");

    //     if (!phone) {
    //         alert("Please enter a valid phone number");
    //         return;
    //     }

    //     try {
    //         // 🔹 Ensure the phone number starts with "+"
    //         const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
    //         console.log("Formatted Phone:", formattedPhone); // Debugging
    //         const result = await userRegister(formattedPhone);
    //         setConfirmationResult(result);
    //         alert("OTP sent to your phone. Enter OTP to verify.");
    //     } catch (error) {
    //         console.error("Registration Error:", error);
    //         alert(error.message || "Something went wrong!");
    //     }
    // };

    // const handleVerifyOtp = async (e) => {
    //     e.preventDefault();
    //     if (!confirmationResult) {
    //         alert("First request an OTP!");
    //         return;
    //     }

    //     try {
    //         const result = await confirmationResult.confirm(otp);
    //         console.log("User Verified:", result.user);
    //         alert("User registered successfully!");
    //     } catch (error) {
    //         console.error("OTP Verification Error:", error);
    //         alert(error.message || "Invalid OTP!");
    //     }
    // };

    const handleGoogle = () => {
        googleLogin()
            .then(result => {
                console.log(result.user)
                navigate('/');
                alert('user create succesfully')
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
                alert('something with wrong')

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
                                    className="form-control w-full pl-2 lg:h-12 py-3 rounded-md border-[#CACACA]"
                                    id="name-default-fullname"
                                    placeholder="User Name"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email-default-fullname">
                                    Email
                                </label>
                                <input
                                    {...register("email", { required: true })}
                                    name="email"
                                    type="email"
                                    className="form-control w-full pl-2 lg:h-12 py-3 rounded-md border-[#CACACA]"
                                    id="email-default-fullname"
                                    placeholder="User Name"
                                />
                            </div>


                            {/* <div className="mb-3 ">
                                <label className="form-label" htmlFor="name-default-fullname">
                                    Phone
                                </label>
                                <PhoneInput
                                    value={phone}
                                    onChange={(value) => {
                                        const formattedPhone = value.startsWith("+") ? value : `+${value}`;
                                        setPhone(formattedPhone); // Ensure the phone number is properly formatted with a "+"
                                    }}
                                    country={'bd'}
                                    containerStyle={{ width: '100 %', }}
                                    inputStyle={{ width: '100%', paddingLeft: "3rem", height: "3rem" }}
                                    buttonStyle={{ borderRadius: "0.375rem" }}
                                />

                            </div> */}
                            <div className="mb-3">
                                <label className="form-label" htmlFor="password-default-fullname">
                                    Password
                                </label>
                                <input
                                    {...register("password", { required: true })}
                                    name="password"
                                    type="password"
                                    className="form-control w-full pl-2 lg:h-12 py-3 rounded-md border-[#CACACA]"
                                    id="password-default-fullname"
                                    placeholder="Password"
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
                    <div id="recaptcha-container"></div> {/* Firebase reCAPTCHA */}

                    {/* {confirmationResult && (
                        <form onSubmit={handleVerifyOtp} className="mt-4 space-y-4">
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                onChange={(e) => setOtp(e.target.value)}
                                className="input input-bordered w-full"
                            />
                            <button type="submit" className="btn btn-success w-full">Verify OTP</button>
                        </form>
                    )} */}

                    <div className="text-center">
                        <h3 className="text-sm font-normal text-gray-700">Alrealy have an Account ?  please <NavLink to='/login'><span className="font-bold text-blue-600">Login</span></NavLink></h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;