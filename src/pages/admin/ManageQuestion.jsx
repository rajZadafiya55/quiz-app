import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuestionCard from "../../components/QuestionCard";
import { getQuestions, deleteQuestion } from "../../services/storage";
import { successToast } from "../../services/toast";

const ManageQuestion = () => {
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = () => {
        const allQuestions = getQuestions();
        setQuestions(allQuestions);
    };

    const handleDeleteQuestion = (id) => {
        const isDelete = window.confirm(
            "Are you sure you want to delete this question?"
        );
        if (!isDelete) return;
        deleteQuestion(id);
        successToast("Question Deleted Successfully");
        loadQuestions();
    };

    return (
        <div className="min-h-screen bg-slate-100 py-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">
                        Manage Questions
                    </h1>
                    <Link
                        to="/admin/add-question"
                        className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
                    >
                        Add Question
                    </Link>
                </div>
                {questions.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-10 text-center">
                        <h2 className="text-2xl font-semibold">
                            No Questions Found
                        </h2>
                    </div>
                ) : (<div className="space-y-5">
                    {questions.map((question, index) => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            index={index}
                            onDelete={handleDeleteQuestion}
                        />
                    ))}
                </div>
                )}
            </div>
        </div>
    );
};

export default ManageQuestion;