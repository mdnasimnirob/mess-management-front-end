import { createContext, useEffect, useState, } from "react";
import app from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const AuthContexts = createContext(null)

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider;
const facebookProvider = new FacebookAuthProvider;

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const userRegister = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // 🔹 Function to send OTP using Firebase Authentication
    // const userRegister = async (phoneNumber) => {
    //     setLoading(true);
    //     try {
    //         // Initialize reCAPTCHA only once
    //         if (!window.recaptchaVerifier) {
    //             window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    //                 size: "invisible",
    //                 callback: (response) => {
    //                     console.log("Recaptcha Verified", response);
    //                 },
    //                 "expired-callback": () => {
    //                     console.error("Recaptcha expired");
    //                 },
    //             });
    //             await window.recaptchaVerifier.render();
    //         }

    //         // Send OTP to phone number
    //         const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
    //         setLoading(false);
    //         return confirmationResult; // Required for OTP verification
    //     } catch (error) {
    //         setLoading(false);
    //         console.error("Firebase Registration Error:", error);
    //         throw error;
    //     }
    // };

    const userSignIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const facebookLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, facebookProvider)
    }

    const LogOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('user state change', currentUser);
            setUser(currentUser);
            setLoading(false)

        });
        return () => {
            unSubscribe();
        }
    }, []);


    const info = {
        userRegister,
        userSignIn,
        user,
        googleLogin,
        facebookLogin,
        LogOut,
        loading,

    }

    return (
        <AuthContexts.Provider value={info}>
            {children}
        </AuthContexts.Provider>
    );
};

export default AuthProviders;