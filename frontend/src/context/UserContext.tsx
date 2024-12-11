import React, { createContext, ReactNode, useState } from "react";

// Define context type
interface UserContextType {
    isSignupForm: boolean;
    setIsSignupForm: (isSignupForm: boolean) => void;
    toggleSignupForm: () => void;
    loginFormModal: boolean;
    setLoginFormModal: (loginFormModal: boolean) => void;
    toggleLoginModal: () => void;
}

// Default context value
const defaultValue: UserContextType = {
    isSignupForm: false,
    setIsSignupForm: () => { },
    toggleSignupForm: () => { },
    loginFormModal: false,
    setLoginFormModal: () => { },
    toggleLoginModal: () => { }
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
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
