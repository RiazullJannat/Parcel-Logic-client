import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "@/firebase/Firebase.config";
import AuthContext from "./ContextProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    // createUser
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // login user
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // login with google
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }
    // log out
    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }
    // update profile
    const update = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }
    // watch man
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser){
                axiosPublic.post('/login',{user:{email:currentUser?.email}})
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
            }
            else{
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    const data = {
        user,
        loading,
        Toast,
        setLoading,
        setUser,
        createUser,
        login,
        googleLogin,
        logout,
        update
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

// Validate Props
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;