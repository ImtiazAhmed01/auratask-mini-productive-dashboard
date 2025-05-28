
import { useContext, useState } from "react";
// import { AuthContext } from "../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Provider/authProvider";

const Register = () => {
    const { createUser, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [formErrors, setFormErrors] = useState({});

    // Validate Password
    const validatePassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isLongEnough = password.length >= 6;

        if (!hasUppercase) {
            setPasswordError("Password must contain at least one uppercase letter.");
            return false;
        }
        if (!hasLowercase) {
            setPasswordError("Password must contain at least one lowercase letter.");
            return false;
        }
        if (!isLongEnough) {
            setPasswordError("Password must be at least 6 characters long.");
            return false;
        }

        setPasswordError("");
        return true;
    };

    // Handle Registration
    const handleRegister = async (e) => {
        e.preventDefault();
        const fname = e.target.fname.value.trim();
        const lname = e.target.lname.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value;
        const imageURL = e.target.imageURL.value.trim();

        const errors = {};
        if (!fname) errors.fname = "First name is required.";
        if (!lname) errors.lname = "Last name is required.";
        if (!email) errors.email = "Email is required.";
        if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email address.";

        setFormErrors(errors);

        if (Object.keys(errors).length > 0 || !validatePassword(password)) {
            toast.error("Please fix the errors in the form.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        try {
            await createUser(email, password, {
                displayName: `${fname} ${lname}`,
                firstName: fname,
                lastName: lname,
                photoURL: imageURL,
            });

            toast.success("User registered successfully!", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });

            navigate("/");
        } catch (error) {
            console.error("Error creating user:", error.message);
            toast.error(error.message || "Error creating user. Please try again.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    // Handle Google Sign-In
    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            toast.success("Logged in with Google successfully!", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            navigate("/");
        } catch (error) {
            console.error("Google login failed:", error.message);
            toast.error(error.message || "Google login failed. Please try again.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: `url('https://i.ibb.co/r2ZXRmH9/register.jpg')` }}
        >
            <form onSubmit={handleRegister} className="w-full max-w-lg mx-auto my-7 p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold mb-5 text-center">Register here!</h1>

                {/* First & Last Name */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <input type="text" name="fname" placeholder="First Name" className="input input-bordered w-full" required />
                    <input type="text" name="lname" placeholder="Last Name" className="input input-bordered w-full" required />
                </div>

                {/* Email */}
                <input type="email" name="email" placeholder="Email" className="input input-bordered w-full mb-4" required />

                {/* Image URL */}
                <input type="text" name="imageURL" placeholder="Image URL (Optional)" className="input input-bordered w-full mb-4" />

                {/* Password */}
                <div className="relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="input input-bordered w-full pr-10"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>
                {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}

                {/* Register Button */}
                <button type="submit" className="btn bg-green-500 w-full">Register Now</button>

                {/* Google Sign-In */}
                <div className="mt-3">
                    <hr className="my-3" />
                    <button onClick={handleGoogleSignIn} className="btn btn-outline w-full animate-bounce">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        Register with Google
                    </button>
                    <p className="text-center mt-2">
                        Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
                    </p>
                </div>
            </form>

            <ToastContainer />
        </div>
    );
};

export default Register;