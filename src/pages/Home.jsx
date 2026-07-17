import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const Home = () => {
    const navigate = useNavigate();
    return (
        <section className="bg-slate-100 min-h-screen flex items-center">
            <div className="px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                            Test Your Knowledge <br />
                            <span className="text-blue-600">With Interactive Quizzes</span>
                        </h1>
                        <p className="text-gray-600 mt-6 text-lg">
                            Create quizzes as an Admin and participate as a User.
                            Complete the quiz within 5 minutes and check your score instantly.
                        </p>
                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={() => navigate("/quiz")}
                                className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition cursor-pointer">
                                Start Quiz
                            </button>
                            <button
                                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition">
                                About
                            </button>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-8 shadow-sm w-[400px] mx-auto">
                            <h2 className="text-xl font-bold text-gray-800 border-b border-blue-200 pb-4 mb-6">
                                Platform Features
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    "10 Engaging Questions",
                                    "5 Minute Time Limit",
                                    "Instant Results & Scoring",
                                    "Detailed Score Analysis",
                                    "Secure Login System"
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-center text-gray-700 font-medium">
                                        <FaCheck className="text-blue-600 mr-3" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;