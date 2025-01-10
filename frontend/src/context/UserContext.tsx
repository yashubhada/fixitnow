import React, { createContext, ReactNode, useState } from "react";

// Define context type
interface ToasterTheme {
    style: {
        border: string;
        padding: string;
        color: string;
    };
    iconTheme: {
        primary: string;
        secondary: string;
    };
}

interface UserContextType {
    isSignupForm: boolean;
    setIsSignupForm: (isSignupForm: boolean) => void;
    toggleSignupForm: () => void;
    loginFormModal: boolean;
    setLoginFormModal: (loginFormModal: boolean) => void;
    toggleLoginModal: () => void;
    toasterTheme: ToasterTheme;
}

// Default context value
const defaultValue: UserContextType = {
    isSignupForm: false,
    setIsSignupForm: () => { },
    toggleSignupForm: () => { },
    loginFormModal: false,
    setLoginFormModal: () => { },
    toggleLoginModal: () => { },
    toasterTheme: {
        style: {
            border: "",
            padding: "",
            color: "",
        },
        iconTheme: {
            primary: "",
            secondary: "",
        },
    },
};

// Create context
export const UserContext = createContext<UserContextType>(defaultValue);

// Context provider props
interface UserContextProviderProps {
    children: ReactNode;
}

// Provider component
export const UserContextProvider: React.FC<UserContextProviderProps> = ({
    children,
}) => {

    // Toaster theme
    const toasterTheme: ToasterTheme = {
        style: {
            border: "1px solid #000",
            padding: "10px 15px",
            color: "#000",
        },
        iconTheme: {
            primary: "#000",
            secondary: "#FFF",
        },
    };

    // sign up component
    const [isSignupForm, setIsSignupForm] = useState(false);

    const toggleSignupForm = () => {
        setIsSignupForm(!isSignupForm);
        setLoginFormModal(false);
    };

    // login component
    const [loginFormModal, setLoginFormModal] = useState(false);
    const toggleLoginModal = () => {
        setLoginFormModal(!loginFormModal);
        setIsSignupForm(false);
    }

    return (
        <UserContext.Provider
            value={{
                isSignupForm,
                setIsSignupForm,
                toggleSignupForm,
                loginFormModal,
                setLoginFormModal,
                toggleLoginModal,
                toasterTheme
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
