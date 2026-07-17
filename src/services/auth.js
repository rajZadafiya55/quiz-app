const USERS_KEY = "users";
const LOGIN_USER_KEY = "loggedUser";

export const registerUser = (user) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    const existingUser = users.find(
        (item) => item.email === user.email
    );
    if (existingUser) {
        return {
            success: false,
            message: "Email already exists"
        };
    }
    users.push(user);
    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );
    return {
        success: true,
        message: "Signup Successfully"
    };
};

export const validateLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const user = users.find(
        (item) =>
            item.email === email &&
            item.password === password
    );
    if (!user) {
        return {
            success: false,
            message: "Invalid Email or Password"
        };
    }
    return {
        success: true,
        user
    };
};

export const saveLoggedInUser = (user) => {
    localStorage.setItem(
        LOGIN_USER_KEY,
        JSON.stringify(user)
    );
};

export const getLoggedInUser = () => {
    return JSON.parse(
        localStorage.getItem(LOGIN_USER_KEY)
    );
};

export const logoutUser = () => {
    localStorage.removeItem(LOGIN_USER_KEY);
};

export const isAuthenticated = () => {
    return !!localStorage.getItem(LOGIN_USER_KEY);
};