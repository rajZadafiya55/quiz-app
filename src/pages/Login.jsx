import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { validateLogin, saveLoggedInUser } from "../services/auth";
import { successToast, errorToast } from "../services/toast";

const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        const response = validateLogin(
            data.email,
            data.password
        );
        if (!response.success) {
            errorToast(response.message);
            return;
        }

        saveLoggedInUser({
            name: response.user.name,
            email: response.user.email
        });

        successToast("Login Successfully");
        localStorage.setItem("role", "user");
        window.dispatchEvent(new Event("storage"));
        navigate("/quiz");
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white w-[420px] p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Login
                </h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded mb-2"
                    {...register("email", {
                        required: "Email is required"
                    })} />
                <p className="text-red-500 text-sm">
                    {errors.email?.message}
                </p>
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded mt-4 mb-2"
                    {...register("password", {
                        required: "Password is required"
                    })}
                />
                <p className="text-red-500 text-sm">
                    {errors.password?.message}
                </p>
                <button
                    className="w-full bg-green-600 text-white p-3 rounded mt-6 hover:bg-green-700 cursor-pointer">
                    Login
                </button>
                <p className="text-center mt-5">
                    Don't have an account ?
                    <Link
                        to="/signup"
                        className="text-blue-600 ml-2">
                        Signup
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;