import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/auth";
import { successToast } from "../services/toast";

const Result = () => {
    const navigate = useNavigate();
    const answers = JSON.parse(localStorage.getItem("quizResult")) || [];
    const questions = JSON.parse(localStorage.getItem("quizQuestions")) || [];

    useEffect(() => {
        if (questions.length === 0) {
            navigate("/quiz");
        }
    }, []);

    let correctAnswers = 0;
    questions.forEach((question, index) => {
        if (answers[index] === question.correctAnswer) {
            correctAnswers++;
        }
    });

    const incorrectAnswers = questions.length - correctAnswers;
    console.log("incorrectAnswers", incorrectAnswers)
    let emoji = "😔";
    let message = "Better Luck Next Time";
    let bgColor = "bg-red-100";
    let textColor = "text-red-600";

    if (correctAnswers >= 8) {
        emoji = "🎉";
        message = "Excellent";
        bgColor = "bg-green-100";
        textColor = "text-green-600";
    } else if (correctAnswers >= 5) {
        emoji = "😄";
        message = "Good Job";
        bgColor = "bg-yellow-100";
        textColor = "text-yellow-600";
    }

    const handleRestartQuiz = () => {
        localStorage.removeItem("quizResult");
        navigate("/quiz");
    };

    const handleLogout = () => {
        logoutUser();
        localStorage.removeItem("quizResult");
        successToast("Logout Successfully");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-slate-200 flex justify-center items-center p-5">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-10">
                <h1 className="text-4xl font-bold text-center mb-8">
                    Quiz Result
                </h1>
                <div className={`${bgColor} rounded-xl p-8 text-center`}>
                    <div className="text-7xl">
                        {emoji}
                    </div>
                    <h2 className={`text-3xl font-bold mt-5 ${textColor}`}>
                        {message}
                    </h2>
                </div>
                <div className="grid grid-cols-3 gap-5 mt-8">
                    <div className="bg-green-100 rounded-xl p-5 text-center">
                        <h3 className="text-gray-600">
                            Correct
                        </h3>
                        <p className="text-4xl font-bold text-green-600 mt-3">
                            {correctAnswers}
                        </p>
                    </div>
                    <div className="bg-red-100 rounded-xl p-5 text-center">
                        <h3 className="text-gray-600">
                            Incorrect
                        </h3>
                        <p className="text-4xl font-bold text-red-600 mt-3">
                            {incorrectAnswers}
                        </p>
                    </div>
                    <div className="bg-blue-100 rounded-xl p-5 text-center">
                        <h3 className="text-gray-600">
                            Score
                        </h3>
                        <p className="text-4xl font-bold text-blue-600 mt-3">
                            {correctAnswers} / {questions.length}
                        </p>
                    </div>
                </div>
                <div className="mt-10 flex justify-center gap-5">
                    <button
                        onClick={handleRestartQuiz}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer"
                    >
                        Restart Quiz
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Result;