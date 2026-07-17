import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";
import { getQuestions } from "../services/storage";
import { errorToast, infoToast } from "../services/toast";

const Quiz = () => {
    const navigate = useNavigate();
    const questions = getQuestions();
    const [quizStarted, setQuizStarted] = useState(() => {
        return JSON.parse(localStorage.getItem("quizStarted")) || false;
    });
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
        return JSON.parse(localStorage.getItem("currentQuestionIndex")) || 0;
    });
    const [selectedAnswer, setSelectedAnswer] = useState(() => {
        const saved = localStorage.getItem("selectedAnswer");
        return saved !== null ? JSON.parse(saved) : "";
    });
    const [answers, setAnswers] = useState(() => {
        return JSON.parse(localStorage.getItem("quizResult")) || [];
    });

    useEffect(() => {
        localStorage.setItem("quizStarted", JSON.stringify(quizStarted));
    }, [quizStarted]);

    useEffect(() => {
        localStorage.setItem("currentQuestionIndex", JSON.stringify(currentQuestionIndex));
    }, [currentQuestionIndex]);

    useEffect(() => {
        localStorage.setItem("selectedAnswer", JSON.stringify(selectedAnswer));
    }, [selectedAnswer]);

    useEffect(() => {
        localStorage.setItem("quizResult", JSON.stringify(answers));
    }, [answers]);

    const startQuiz = () => {
        if (questions.length === 0) {
            errorToast("No questions available now");
            return;
        }
        if (questions.length < 10) {
            infoToast("Please add 10 questions before starting the quiz");
            return;
        }
        localStorage.removeItem("quizTimeLeft");
        localStorage.removeItem("quizResult");
        localStorage.removeItem("currentQuestionIndex");
        localStorage.removeItem("selectedAnswer");

        setAnswers([]);
        setCurrentQuestionIndex(0);
        setSelectedAnswer("");
        setQuizStarted(true);
    };

    const handleTimeUp = () => {
        const updatedAnswers = [...answers];
        if (selectedAnswer !== "") {
            updatedAnswers[currentQuestionIndex] = selectedAnswer;
        }
        localStorage.setItem(
            "quizResult",
            JSON.stringify(updatedAnswers)
        );
        localStorage.setItem(
            "quizQuestions",
            JSON.stringify(questions)
        );
        localStorage.removeItem("quizStarted");
        localStorage.removeItem("currentQuestionIndex");
        localStorage.removeItem("selectedAnswer");
        localStorage.removeItem("quizTimeLeft");
        infoToast("Time Over");
        navigate("/result");
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex === 0) return;
        const previousIndex = currentQuestionIndex - 1;
        setCurrentQuestionIndex(previousIndex);
        setSelectedAnswer(
            answers[previousIndex] ?? ""
        );
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === "") {
            errorToast("Please Select Answer");
            return;
        }
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = selectedAnswer;
        setAnswers(updatedAnswers);

        console.log("updatedAnswers", updatedAnswers)
        if (currentQuestionIndex === questions.length - 1) {
            localStorage.setItem(
                "quizResult",
                JSON.stringify(updatedAnswers)
            );

            console.log("currentQuestionIndex", currentQuestionIndex);
            localStorage.removeItem("quizStarted");
            localStorage.removeItem("currentQuestionIndex");
            localStorage.removeItem("selectedAnswer");
            localStorage.removeItem("quizTimeLeft");
            navigate("/result");
            return;
        }

        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        setSelectedAnswer(
            updatedAnswers[nextIndex] ?? ""
        );

    }
    return (
        <div className="min-h-screen bg-slate-100">
            {!quizStarted ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-lg text-center">
                        <h1 className="text-4xl font-bold text-gray-800">
                            Quiz Application
                        </h1>
                        <p className="text-gray-500 mt-5">
                            Total Questions : {questions.length}
                        </p>
                        <button
                            onClick={startQuiz}
                            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg cursor-pointer">
                            Start Quiz
                        </button>
                    </div>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto py-10 px-5">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">
                            Question {currentQuestionIndex + 1} / {questions.length}
                        </h2>
                        <Timer
                            onTimeUp={handleTimeUp}
                            isQuizStarted={quizStarted}
                        />
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-3 mt-6">
                        <div className="bg-green-600 h-3 rounded-full transition-all duration-300"
                            style={{
                                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                            }}
                        />
                    </div>

                    <div className="bg-white rounded-xl shadow-lg mt-8 p-8">
                        <h2 className="text-2xl font-semibold leading-9">
                            {questions[currentQuestionIndex].question}
                        </h2>
                        <div className="mt-8 space-y-4">
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <label
                                    key={index}
                                    className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer transition-all
                                            ${selectedAnswer === index
                                            ? "border-blue-600 bg-blue-50"
                                            : "hover:bg-gray-100"
                                        }`}>
                                    <input
                                        type="radio"
                                        checked={selectedAnswer === index}
                                        onChange={() => setSelectedAnswer(index)}
                                    />
                                    <span>
                                        {option}
                                    </span>
                                </label>))}
                        </div>
                        <div className="flex justify-between mt-10">
                            <button
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestionIndex === 0}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 cursor-pointer">
                                Previous
                            </button>

                            <button
                                onClick={handleNextQuestion}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer">
                                {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                            </button>
                        </div>
                    </div>
                </div>)}
        </div>)
}

export default Quiz;