import { Link } from "react-router-dom";
import { getQuestions } from "../../services/storage";

const Dashboard = () => {
    const questions = getQuestions();
    return (
        <div className="min-h-screen bg-slate-100">
            <div className="max-w-6xl mx-auto py-10">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold">
                        Admin Dashboard
                    </h1>
                    <div className="flex gap-3">
                        <Link
                            to="/admin/add-question"
                            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                        >
                            Add Question
                        </Link>
                        <Link
                            to="/admin/manage-questions"
                            className="bg-indigo-600 text-white px-5 py-3 rounded hover:bg-indigo-700"
                        >
                            Manage Questions
                        </Link>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 mt-10">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-gray-500">
                            Total Questions
                        </h2>
                        <p className="text-4xl font-bold mt-3">
                            {questions.length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-gray-500">
                            Maximum Allowed
                        </h2>
                        <p className="text-4xl font-bold mt-3">
                            10
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-gray-500">
                            Remaining
                        </h2>
                        <p className="text-4xl font-bold mt-3">
                            {10 - questions.length}
                        </p>
                    </div>
                </div>
                <div className="mt-12 bg-white rounded-lg shadow p-8">
                    <h2 className="text-2xl font-semibold">
                        Quick Actions
                    </h2>
                    <div className="flex gap-5 mt-6">
                        <Link
                            to="/admin/add-question"
                            className="bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700"
                        >
                            Add New Question
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
};
export default Dashboard;