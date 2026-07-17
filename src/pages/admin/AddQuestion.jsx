import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
    addQuestion,
    getQuestions,
    updateQuestion,
    getQuestionById
} from "../../services/storage";
import { successToast, errorToast } from "../../services/toast";

const AddQuestion = () => {
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (!isEditMode) return;
        const selectedQuestion = getQuestionById(id);
        if (!selectedQuestion) return;
        setValue("question", selectedQuestion.question);
        setValue("optionOne", selectedQuestion.options[0]);
        setValue("optionTwo", selectedQuestion.options[1]);
        setValue("optionThree", selectedQuestion.options[2]);
        setValue("optionFour", selectedQuestion.options[3]);
        setValue(
            "correctAnswer",
            String(selectedQuestion.correctAnswer)
        );
    }, [id]);

    const handleAddQuestion = (formData) => {
        const questions = getQuestions();
        if (!isEditMode && questions.length >= 10) {
            errorToast("Maximum 10 Questions Allowed");
            return;
        }
        const options = [
            formData.optionOne,
            formData.optionTwo,
            formData.optionThree,
            formData.optionFour
        ];
        if (isEditMode) {
            const updatedQuestion = {
                id: Number(id),
                question: formData.question,
                options,
                correctAnswer: Number(formData.correctAnswer)
            };
            console.log("updatedQuestion", updatedQuestion)
            updateQuestion(updatedQuestion);
            successToast("Question Updated Successfully");
        } else {
            const newQuestion = {
                id: Date.now(),
                question: formData.question,
                options,
                correctAnswer: Number(formData.correctAnswer)
            };
            addQuestion(newQuestion);
            successToast("Question Added Successfully");
        }
        reset();
        navigate("/admin/manage-questions");
    };

    return (
        <div className="min-h-screen bg-slate-100 py-10">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-8">
                    {isEditMode ? "Edit Question" : "Add New Question"}
                </h1>
                <form onSubmit={handleSubmit(handleAddQuestion)}>
                    <div className="mb-5">
                        <label className="font-medium block mb-2">
                            Question
                        </label>
                        <textarea
                            rows="3"
                            placeholder="Enter Question"
                            className="w-full border rounded p-3 outline-none focus:border-blue-500"
                            {...register("question", {
                                required: "Question is required"
                            })}
                        />
                        <p className="text-red-500 text-sm mt-1">
                            {errors.question?.message}
                        </p>
                    </div>
                    <div className="mb-5">
                        <label className="font-medium block mb-2">
                            Option 1
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Option 1"
                            className="w-full border rounded p-3"
                            {...register("optionOne", {
                                required: "Option 1 is required"
                            })}
                        />
                        <p className="text-red-500 text-sm mt-1">
                            {errors.optionOne?.message}
                        </p>
                    </div>
                    <div className="mb-5">
                        <label className="font-medium block mb-2">
                            Option 2
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Option 2"
                            className="w-full border rounded p-3"
                            {...register("optionTwo", {
                                required: "Option 2 is required"
                            })}
                        />
                        <p className="text-red-500 text-sm mt-1">
                            {errors.optionTwo?.message}
                        </p>
                    </div>
                    <div className="mb-5">
                        <label className="font-medium block mb-2">
                            Option 3
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Option 3"
                            className="w-full border rounded p-3"
                            {...register("optionThree", {
                                required: "Option 3 is required"
                            })} />
                        <p className="text-red-500 text-sm mt-1">
                            {errors.optionThree?.message}
                        </p>
                    </div>
                    <div className="mb-5">
                        <label className="font-medium block mb-2">
                            Option 4
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Option 4"
                            className="w-full border rounded p-3"
                            {...register("optionFour", {
                                required: "Option 4 is required"
                            })}
                        />
                        <p className="text-red-500 text-sm mt-1">
                            {errors.optionFour?.message}
                        </p>
                    </div>
                    <div className="mb-6">
                        <label className="font-medium block mb-2">
                            Correct Answer
                        </label>
                        <select
                            className="w-full border rounded p-3"
                            defaultValue=""
                            {...register("correctAnswer", {
                                required: "Please select correct answer"
                            })}>
                            <option value="" disabled>
                                Select Correct Answer
                            </option>
                            <option value="0">Option 1</option>
                            <option value="1">Option 2</option>
                            <option value="2">Option 3</option>
                            <option value="3">Option 4</option>
                        </select>
                        <p className="text-red-500 text-sm mt-1">
                            {errors.correctAnswer?.message}
                        </p>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/dashboard")}
                            className="px-6 py-3 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
                            {
                                isEditMode
                                    ? "Update Question"
                                    : "Save Question"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddQuestion;