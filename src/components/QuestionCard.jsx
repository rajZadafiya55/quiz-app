import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const QuestionCard = ({ question, index, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Q.{index + 1} {question.question}
                    </h2>
                </div>
                <div className="flex gap-3">
                    <Link to={`/admin/edit-question/${question.id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
                        <FaEdit />
                    </Link>
                    <button
                        onClick={() => onDelete(question.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded cursor-pointer"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
            <div className="mt-5 space-y-3">
                {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className={`border rounded-lg px-4 py-3 ${optionIndex === question.correctAnswer ? "bg-green-100 border-green-500 text-green-700" : "bg-gray-50"}`}>
                        <span className="font-medium">
                            Option {optionIndex + 1} :
                        </span>{" "}
                        {option}
                        {optionIndex === question.correctAnswer && (
                            <span className="ml-3 text-sm font-semibold">
                                Correct Answer
                            </span>)}
                    </div>))}
            </div>
        </div>
    );
};
export default QuestionCard;