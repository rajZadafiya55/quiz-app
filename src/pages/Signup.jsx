import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/auth";
import { successToast, errorToast } from "../services/toast";

const Signup = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        const response = registerUser(data);
        if (!response.success) {
            errorToast(response.message);
            return;
        }
        successToast(response.message);
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white w-[420px] p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Signup
                </h2>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border p-3 rounded mb-2"
                    {...register("name", {
                        required: "Name is required"
                    })} />
                <p className="text-red-500 text-sm">
                    {errors.name?.message}
                </p>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded mt-4 mb-2"
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
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Minimum 6 characters"
                        }
                    })} />
                <p className="text-red-500 text-sm">
                    {errors.password?.message}
                </p>
                <button
                    className="w-full bg-blue-600 text-white p-3 rounded mt-6 hover:bg-blue-700 cursor-pointer">
                    Signup
                </button>
                <p className="text-center mt-5">
                    Already have an account ?
                    <Link
                        to="/login"
                        className="text-blue-600 ml-2">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;