import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser, logoutUser } from "../services/auth";
import { successToast } from "../services/toast";
import logo from "../assets/logo.jpg"

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [role, setRole] = useState("");

    const handleUser = () => {
        localStorage.setItem("role", "user");
        setRole("user");
        const loggedUser = getLoggedInUser();
        if (loggedUser) {
            setUser(loggedUser);
            navigate("/quiz");
        } else {
            navigate("/login");
        }

        console.log("loggedUser", loggedUser)
    };

    const handleAdmin = () => {
        localStorage.setItem("role", "admin");
        setRole("admin");
        navigate("/admin/dashboard");
    };

    const handleLogout = () => {
        logoutUser();
        localStorage.removeItem("role");
        setUser(null);
        setRole("");
        successToast("Logout Successfully");
        navigate("/");
    };

    useEffect(() => {
        const updateNavbar = () => {
            setUser(getLoggedInUser());
            setRole(localStorage.getItem("role"));
        };
        updateNavbar();
        window.addEventListener("storage", updateNavbar);
        return () => {
            window.removeEventListener("storage", updateNavbar);
        };
    }, []);
    return (
        <nav className="bg-white shadow-md">
            <div className="px-6 py-4 flex justify-between items-center">
                <img src={logo} alt="Quiz Logo" className="w-30 h-full" />
                {role === "admin" ? (
                    <div className="flex items-center gap-5">
                        <span className="font-semibold">
                            Welcome Admin
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                ) : role === "user" && user ? (
                    <div className="flex items-center gap-5">
                        <span className="font-semibold">
                            Welcome {user.name}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <button
                            onClick={handleUser}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                            User
                        </button>
                        <button
                            onClick={handleAdmin}
                            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 cursor-pointer">
                            Admin
                        </button>
                    </div>)}
            </div>
        </nav>);
};

export default Navbar;