import axios from "axios";
import React, { createContext, ReactNode, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

// Define the context type
interface UserContextType {
    baseUrl: string;
    isSignupForm: boolean;
    setIsSignupForm: (isSignupForm: boolean) => void;
    toggleSignupForm: () => void;
    loginFormModal: boolean;
    setLoginFormModal: (loginFormModal: boolean) => void;
    toggleLoginModal: () => void;
    showToast: (message: string, type: "success" | "error") => void;
    isUserLogin: boolean;
    setIsUserLogin: (isUserLogin: boolean) => void;
    handleUserLogin: () => void;
    handleUserLogout: () => void;
    getLoggedInUserData: () => any;
}

// Default context value
const defaultValue: UserContextType = {
    baseUrl: "",
    isSignupForm: false,
    setIsSignupForm: () => { },
    toggleSignupForm: () => { },
    loginFormModal: false,
    setLoginFormModal: () => { },
    toggleLoginModal: () => { },
    showToast: () => { },
    isUserLogin: false,
    setIsUserLogin: () => { },
    handleUserLogin: () => { },
    handleUserLogout: () => { },
    getLoggedInUserData: () => { },
};

// Create context
export const UserContext = createContext<UserContextType>(defaultValue);

// Context provider props
interface UserContextProviderProps {
    children: ReactNode;
}

// Provider component
export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {

    // server url
    const baseUrl = "http://localhost:9797/";

    // Toast function
    const showToast = (message: string, type: "success" | "error") => {
        if (type === "success") {
            toast.success(message);
        } else if (type === "error") {
            toast.error(message);
        }
    };

    // user is sign in or not

    const [isUserLogin, setIsUserLogin] = useState<boolean>(false);
    const handleUserLogin = () => {
        setIsUserLogin(true);
    }
    const handleUserLogout = () => {
        setIsUserLogin(false);
    }

    // get logged in user information
    const getLoggedInUserData = async () => {
        try {
            // Check if the user is logged in
            if (!isUserLogin) {
                showToast("Please login", "error");
                return null; // Return early if the user is not logged in
            }
            const response = await axios.post(
                `${baseUrl}api/user/getLoggedInUser`,
                {}, // Empty payload
                { withCredentials: true }
            );
            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                // Handle Axios-specific errors
                if (err.response) {
                    if (err.response.status === 400) {
                        showToast(err.response.data.message || "An error occurred", "error");
                    }
                }
            } else {
                console.error("Unexpected error:", err);
            }

            return null; // Return null in case of an error
        }
    };


    // Signup form state
    const [isSignupForm, setIsSignupForm] = useState(false);
    const toggleSignupForm = () => {
        setIsSignupForm((prev) => !prev);
        setLoginFormModal(false);
    };

    // Login form state
    const [loginFormModal, setLoginFormModal] = useState(false);
    const toggleLoginModal = () => {
        setLoginFormModal((prev) => !prev);
        setIsSignupForm(false);
    };

    return (
        <UserContext.Provider
            value={{
                baseUrl,
                isSignupForm,
                setIsSignupForm,
                toggleSignupForm,
                loginFormModal,
                setLoginFormModal,
                toggleLoginModal,
                showToast,
                isUserLogin,
                setIsUserLogin,
                handleUserLogin,
                handleUserLogout,
                getLoggedInUserData,
            }}
        >
            {children}
            <Toaster />
        </UserContext.Provider>
    );
};
