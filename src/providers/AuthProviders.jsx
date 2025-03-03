import { createContext, useEffect, useState, } from "react";
import app from "../firebase/firebase.config";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

export const AuthContexts = createContext(null)

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider;
const facebookProvider = new FacebookAuthProvider;

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
            setUser(currentUser);
            setLoading(false)
            console.log(currentUser)
        });
        return () => {
            unSubscribe();
        }
    }, [])

    const info = {
        user,
        googleLogin,
        facebookLogin,
        LogOut,
        loading

    }

    return (
        <AuthContexts.Provider value={info}>
            {children}
        </AuthContexts.Provider>
    );
};

export default AuthProviders;