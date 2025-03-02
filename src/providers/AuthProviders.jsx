import { createContext, } from "react";
import app from "../firebase/firebase.config";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const AuthContexts = createContext(null)

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider;
const facebookProvider = new FacebookAuthProvider;

const AuthProviders = ({ children }) => {
    // const [loading, setLoading] = useState(true)

    const googleLogin = () => {

        return signInWithPopup(auth, googleProvider)
    }

    const facebookLogin = () => {
        return signInWithPopup(auth, facebookProvider)
    }

    const info = {
        googleLogin,
        facebookLogin

    }

    return (
        <AuthContexts.Provider value={info}>
            {children}
        </AuthContexts.Provider>
    );
};

export default AuthProviders;