const QUESTION_KEY = "quizQuestions";

export const getQuestions = () => {
    const questions = localStorage.getItem(QUESTION_KEY);
    return questions ? JSON.parse(questions) : [];
};

export const saveQuestions = (questions) => {
    localStorage.setItem(QUESTION_KEY, JSON.stringify(questions));
};

export const addQuestion = (question) => {
    const questions = getQuestions();
    questions.push(question);
    saveQuestions(questions);
};

export const deleteQuestion = (id) => {
    const questions = getQuestions();
    const updatedQuestions = questions.filter(
        (item) => item.id !== id
    );
    saveQuestions(updatedQuestions);
};

export const updateQuestion = (updatedQuestion) => {
    const questions = getQuestions();
    const updatedData = questions.map((item) =>
        item.id === updatedQuestion.id ? updatedQuestion : item
    );
    saveQuestions(updatedData);
};

export const getQuestionById = (id) => {
    const questions = getQuestions();
    return questions.find(
        (item) => item.id === Number(id)
    );
};