import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import logoImage from "../../assets/banner/images.png";
import { useState } from "react";

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOutUser();
            console.log("User logged out successfully");
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error.message);
            alert("Failed to log out. Please try again.");
        }
    };
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };


    // const links = (
    //     <>
    //         <li>
    //             <NavLink to="/" className={({ isActive }) => isActive ? "text-[#00C853] font-bold" : "hover:text-[#00C853]"}>
    //                 Home
    //             </NavLink>
    //         </li>
    //         <li>
    //             <NavLink to="/roomspage" className={({ isActive }) => isActive ? "text-[#00C853] font-bold" : "hover:text-[#00C853]"}>
    //                 Rooms
    //             </NavLink>
    //         </li>
    //         <li>
    //             <NavLink to="/aboutus" className={({ isActive }) => isActive ? "text-[#00C853] font-bold" : "hover:text-[#00C853]"}>
    //                 About Us
    //             </NavLink>
    //         </li>
    //         {user && user.displayName && (
    //             <>
    //                 <li>
    //                     <NavLink to="/mybookings" className={({ isActive }) => isActive ? "text-[#00C853] font-bold" : "hover:text-[#00C853]"}>
    //                         My Bookings
    //                     </NavLink>
    //                 </li>
    //                 <li>
    //                     <NavLink to="/myreviews" className={({ isActive }) => isActive ? "text-[#00C853] font-bold" : "hover:text-[#00C853]"}>
    //                         My Reviews
    //                     </NavLink>
    //                 </li>
    //             </>
    //         )}
    //     </>
    // );

    return (

        <div className="sticky top-0 z-50 shadow-md bg-[#2C2C2C]">
            {user && user.displayName && (
                <div className="bg-[#C8F7DC] text-center py-2">
                    <span className="text-sm font-medium text-[#2C2C2C]">
                        Welcome, {user.displayName}!
                    </span>
                </div>
            )}
            <nav className="navbar px-4 py-3 flex justify-between items-center text-[#FAFAFA]">
                <div className="flex items-center">
                    {/* Mobile Dropdown */}
                    <div className="dropdown lg:hidden">
                        <button tabIndex={0} className="btn btn-ghost text-[#FAFAFA]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </button>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#C8F7DC] rounded-box text-[#2C2C2C]">
                            {/* {links} */}
                            {user ? (
                                <button
                                    className="btn bg-[#00C853] text-white border-none hover:bg-[#009944]"
                                    onClick={handleLogout}
                                >
                                    Log Out
                                </button>
                            ) : (
                                <div>
                                    <NavLink to="/register" className="btn btn-outline border-[#00C853] text-[#00C853] hover:bg-[#00C853] hover:text-white">
                                        Sign Up
                                    </NavLink>
                                    <NavLink to="/login" className="btn btn-outline border-[#00C853] text-[#00C853] hover:bg-[#00C853] hover:text-white">
                                        Log In
                                    </NavLink>
                                </div>
                            )}
                        </ul>
                    </div>

                    <NavLink to="/" className="text-2xl font-bold text-[#FAFAFA] flex gap-2">
                        <img className="w-8 h-8 bg-white" src={logoImage} alt="" /> AuraTasks
                    </NavLink>
                </div>

                {/* Desktop Links */}
                {/* <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal space-x-4 text-[#FAFAFA]">{links}</ul>
                </div> */}

                {/* User Actions */}
                <div className="flex items-center gap-4">
                    {user && user.photoURL && (
                        <div className="relative group">
                            <img src={user.photoURL} alt="User Avatar" className="w-8 h-8 rounded-full" />
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm bg-[#1E1E1E] py-1 px-2 rounded-lg text-[#FAFAFA] opacity-0 group-hover:opacity-100 transition-opacity">
                                {user.displayName}
                            </div>
                        </div>
                    )}
                    {user ? (
                        <div>
                            <button onClick={toggleTheme} className="btn btn-outline px-3 py-1 border-[#00C853] text-[#00C853] hover:bg-[#00C853] hover:text-white">
                                {theme === "light" ? "🌙" : "☀️"}
                            </button>
                            <button
                                className="hidden md:inline-flex ml-2 btn bg-[#00C853] text-white border-none hover:bg-[#009944]"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <button onClick={toggleTheme} className="btn btn-outline px-3 py-1 border-[#00C853] text-[#00C853] hover:bg-[#00C853] hover:text-white">
                                {theme === "light" ? "🌙" : "☀️"}
                            </button>
                            <NavLink to="/register" className="hidden md:inline-flex btn btn-outline border-[#00C853] text-[#00C853] hover:bg-[#00C853] hover:text-white">
                                Sign Up
                            </NavLink>
                            <NavLink to="/login" className="hidden md:inline-flex btn btn-outline border-[#00C853] text-[#00C853] hover:bg-[#00C853] hover:text-white">
                                Log In
                            </NavLink>
                        </div>
                    )}
                </div>
            </nav>
        </div>

    );
};

export default Navbar;
