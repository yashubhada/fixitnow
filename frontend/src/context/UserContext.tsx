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
    userData: any;
    setUserData: (userData: any) => void;
    getLoggedInUserData: () => void;
    handleLogout: () => void;
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
    userData: null,
    setUserData: () => { },
    getLoggedInUserData: async () => { },
    handleLogout: async () => { },
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

    const [userData, setUserData] = useState<any>(null);
    const getLoggedInUserData = async () => {
        try {
            const response = await axios.post(
                `${baseUrl}api/user/getLoggedInUser`,
                {}, // Empty payload
                { withCredentials: true }
            );
            setUserData(response.data);
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
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                `${baseUrl}api/user/logout`,
                {}, // Empty payload
                { withCredentials: true }
            );
            if (response.data.success) {
                showToast("Logout successfully!", "success");
                setUserData(null);
            }
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
        }
    }

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
                userData,
                setUserData,
                getLoggedInUserData,
                handleLogout
            }}
        >
            {children}
            <Toaster />
        </UserContext.Provider>
    );
};
