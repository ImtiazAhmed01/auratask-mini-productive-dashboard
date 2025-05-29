import React, { createContext, useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase.init";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = async (email, password, userDetails) => {
        try {
            const response = await fetch("https://auratasks-mini-productive-dasboard-server.onrender.com/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    displayName: userDetails.displayName,
                    firstName: userDetails.firstName,
                    lastName: userDetails.lastName,
                    photoURL: userDetails.photoURL,
                    isGoogleUser: false,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Registration failed");

            const updatedUser = {
                email: data.user.email,
                displayName: data.user.displayName,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                photoURL: data.user.photoURL,
            };

            setUser(updatedUser);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userProfile", JSON.stringify(updatedUser));
            return updatedUser;
        } catch (error) {
            console.error("Error creating user:", error.message);
            throw error;
        }
    };

    const signInUser = async (email, password) => {
        try {
            const response = await fetch("https://auratasks-mini-productive-dasboard-server.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Login failed");

            const updatedUser = {
                email: data.user.email,
                displayName: data.user.displayName,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                photoURL: data.user.photoURL,
            };

            setUser(updatedUser);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userProfile", JSON.stringify(updatedUser));
            return updatedUser;
        } catch (error) {
            console.error("Error signing in:", error.message);
            throw error;
        }
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const response = await fetch("https://auratasks-mini-productive-dasboard-server.onrender.com/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    displayName: user.displayName || "Google User",
                    photoURL: user.photoURL || "default-url",
                    email: user.email,
                    firstName: user.displayName?.split(" ")[0] || "Google",
                    lastName: user.displayName?.split(" ")[1] || "User",
                    isGoogleUser: true,
                    registrationDate: new Date().toISOString(),
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to register Google user");

            const updatedUser = {
                email: user.email,
                displayName: user.displayName,
                firstName: user.displayName?.split(" ")[0] || "Google",
                lastName: user.displayName?.split(" ")[1] || "User",
                photoURL: user.photoURL,
            };

            setUser(updatedUser);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userProfile", JSON.stringify(updatedUser));
            return updatedUser;
        } catch (error) {
            console.error("Google Sign-In error:", error.message);
            throw error;
        }
    };

    const signOutUser = async () => {
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem("token");
            localStorage.removeItem("userProfile");
        } catch (error) {
            console.error("Sign-out error:", error.message);
        }
    };

    const handleForgotPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return true;
        } catch (error) {
            console.error("Password reset failed:", error.message);
            throw error;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch("https://auratasks-mini-productive-dasboard-server.onrender.com/profile", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.email) {
                        setUser(data);
                    } else {
                        setUser(null);
                        localStorage.removeItem("token");
                        localStorage.removeItem("userProfile");
                    }
                    setLoading(false);
                })
                .catch(() => {
                    setUser(null);
                    localStorage.removeItem("token");
                    localStorage.removeItem("userProfile");
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                createUser,
                signInUser,
                signOutUser,
                signInWithGoogle,
                handleForgotPassword,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;