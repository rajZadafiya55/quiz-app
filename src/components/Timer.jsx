import { useEffect, useState } from "react";

const Timer = ({ onTimeUp, isQuizStarted }) => {
    const [timeLeft, setTimeLeft] = useState(() => {
        const saved = localStorage.getItem("quizTimeLeft");
        return saved !== null ? JSON.parse(saved) : 300;
    });

    useEffect(() => {
        localStorage.setItem("quizTimeLeft", JSON.stringify(timeLeft));
    }, [timeLeft]);

    useEffect(() => {
        if (!isQuizStarted) return;
        if (timeLeft === 0) {
            onTimeUp();
            return;
        }
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft, isQuizStarted]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return (
        <div className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
};

export default Timer;