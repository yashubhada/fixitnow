import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { io, Socket } from "socket.io-client";

// Define the context type
interface UserContextType {
    baseUrl: string;
    isSignupForm: boolean;
    setIsSignupForm: (isSignupForm: boolean) => void;
    openSignupForm: () => void;
    closeSignupForm: () => void;
    loginFormModal: boolean;
    setLoginFormModal: (loginFormModal: boolean) => void;
    openLoginModal: () => void;
    closeLoginModal: () => void;
    showToast: (message: string, type: "success" | "error") => void;
    userData: any;
    setUserData: (userData: any | null) => void;
    handleLogout: () => void;
    isLoading: boolean;

    // Socket
    socket: Socket | null;
    socketData: any | null;
    setSocketData: (socketData: any | null) => void;
    handleSocketRegister: (id: string) => void;
    handleEmitServiceRequest: (fromUserId: string, toUserId: string, requestData: any) => void;
    handleOnServiceRequest: () => void;
    handleEmitServiceRequestResponse: (
        toUserId: string,
        fromUserId: string,
        status: "accepted" | "declined",
        verificationCode: string
    ) => void;
    handleOnServiceRequestResponse: () => void;
    handleChatSendMessage: (
        fromUserId: string,
        toUserId: string,
        message: string
    ) => void;
    handleChatReceiveMessage: () => void;

    // timmer component
    isShowTimmer: boolean | null;
    setIsShowTimmer: (isShowTimmer: boolean) => void;
    handleEmitTimmerComponent: (
        fromUserId: string,
        toUserId: string,
        action: string
    ) => void;
    handleOnTimmerComponent: () => void;
}

// Default context value
const defaultValue: UserContextType = {
    baseUrl: "",
    isSignupForm: false,
    setIsSignupForm: () => { },
    openSignupForm: () => { },
    closeSignupForm: () => { },
    loginFormModal: false,
    setLoginFormModal: () => { },
    openLoginModal: () => { },
    closeLoginModal: () => { },
    showToast: () => { },
    userData: null,
    setUserData: () => { },
    handleLogout: async () => { },
    isLoading: false,

    // Socket
    socket: null,
    socketData: null,
    setSocketData: () => { },
    handleSocketRegister: () => { },
    handleEmitServiceRequest: () => { },
    handleOnServiceRequest: () => { },
    handleEmitServiceRequestResponse: () => { },
    handleOnServiceRequestResponse: () => { },
    handleChatSendMessage: () => { },
    handleChatReceiveMessage: () => { },

    // Timmer component
    isShowTimmer: null,
    setIsShowTimmer: () => { },
    handleEmitTimmerComponent: () => { },
    handleOnTimmerComponent: () => { },
};

// Create context
export const UserContext = createContext<UserContextType>(defaultValue);

// Context provider props
interface UserContextProviderProps {
    children: ReactNode;
}

// Provider component
export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    // Server URL
    const baseUrl = "https://fixitnow.onrender.com/"; // http://localhost:9797/

    // Toast function
    const showToast = (message: string, type: "success" | "error") => {
        toast[type](message, {
            style: { maxWidth: "900px" },
            duration: 5000,
        });
    };

    // State for signup and login forms
    const [isSignupForm, setIsSignupForm] = useState(false);
    const [loginFormModal, setLoginFormModal] = useState(false);

    // Signup form handlers
    const openSignupForm = () => {
        setIsSignupForm(true);
        setLoginFormModal(false);
    };
    const closeSignupForm = () => setIsSignupForm(false);

    // Login form handlers
    const openLoginModal = () => {
        setLoginFormModal(true);
        setIsSignupForm(false);
    };
    const closeLoginModal = () => setLoginFormModal(false);

    // User data and loading state
    const [userData, setUserData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch logged-in user data
    const getLoggedInUserData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${baseUrl}api/user/getLoggedInUser`, {}, { withCredentials: true });
            setUserData(response.data.user);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 400) {
                showToast(err.response.data.message || "An error occurred", "error");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch user data on mount
    useEffect(() => {
        getLoggedInUserData();
    }, []);

    const [isLogoutLoading, setIsLogoutLoading] = useState<boolean>(false);
    // Logout function
    const handleLogout = async () => {
        setIsLogoutLoading(true);
        try {
            const response = await axios.post(`${baseUrl}api/user/logout`, {}, { withCredentials: true });
            if (response.data.success) {
                socket?.disconnect();
                showToast(response.data.message, "success");
                setUserData(null);
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 400) {
                showToast(err.response.data.message || "An error occurred", "error");
            }
        } finally {
            setIsLogoutLoading(false);
        }
    };

    // Socket state
    const [socket, setSocket] = useState<Socket | null>(null);
    const [socketData, setSocketData] = useState<any | null>(null);

    // Initialize socket connection
    useEffect(() => {
        const newSocket = io("https://fixitnow.onrender.com", { withCredentials: true });
        setSocket(newSocket);

        const storedRequestData = localStorage.getItem("requestData");
        if (storedRequestData) {
            const parsedData = JSON.parse(storedRequestData);
            setSocketData(parsedData); // Update socketData state
            newSocket.emit('reconnect', parsedData); // Emit reconnect event to the server
        }

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleSocketRegister = (id: string) => {
        if (socket) {
            socket.emit('register', id);
        }
    };

    const handleEmitServiceRequest = (fromUserId: string, toUserId: string, requestData: any) => {
        if (socket) {
            socket.emit('serviceRequest', {
                fromUserId,
                toUserId,
                requestData,
            });
        }
    };

    const handleOnServiceRequest = () => {
        if (socket) {
            const listener = (data: any) => {
                setSocketData(data);
            };
            socket.on('serviceRequest', listener);

            // Cleanup listener
            return () => {
                socket.off('serviceRequest', listener);
            };
        }
    };

    const handleEmitServiceRequestResponse = (
        toUserId: string,
        fromUserId: string,
        status: 'accepted' | 'declined',
        verificationCode: string
    ) => {
        if (socket) {
            socket.emit('serviceRequestResponse', {
                toUserId,
                fromUserId,
                status,
                verificationCode,
            });
        }
    };

    const handleOnServiceRequestResponse = () => {
        if (socket) {
            const listener = (data: any) => {
                setSocketData(data);
            };
            socket.on('serviceRequestResponse', listener);

            // Cleanup listener
            return () => {
                socket.off('serviceRequestResponse', listener);
            };
        }
    };

    const handleChatSendMessage = (
        fromUserId: string,
        toUserId: string,
        message: string
    ) => {
        if (socket) {
            socket.emit('sendMessage', {
                fromUserId,
                toUserId,
                message
            });
        }
    }

    const handleChatReceiveMessage = () => {
        if (socket) {
            const listener = () => { };
            socket.on('receiveMessage', listener);

            // Cleanup listener
            return () => {
                socket.off('receiveMessage', listener);
            };
        }
    }

    // manage timmer component
    const [isShowTimmer, setIsShowTimmer] = useState<boolean | null>(null);

    const handleEmitTimmerComponent = (
        fromUserId: string,
        toUserId: string,
        action: string
    ) => {
        if (socket) {
            socket.emit('toggleTimmerComponent', {
                fromUserId,
                toUserId,
                action
            });
        }
    }

    const handleOnTimmerComponent = () => {
        if (socket) {
            const listener = ({ action }: { action: 'open' | 'close' }) => {
                if (action === 'open') {
                    setIsShowTimmer(true);
                    setSocketData(null);
                } else if (action === 'close') {
                    setIsShowTimmer(false);
                }
            };

            // Attach the listener to the 'componentToggled' event
            socket.on('TimmerComponentToggled', listener);

            // Cleanup: Remove the listener when the component unmounts or `socket` changes
            return () => {
                socket.off('TimmerComponentToggled', listener);
            };
        }
    };

    return (
        <>
            {
                isLogoutLoading
                    ?
                    (
                        <div className='h-screen w-full flex items-center justify-center bg-white'>
                            <div className="spinner">
                                {Array.from({ length: 12 }, (_, i) => (
                                    <div
                                        key={i}
                                        className="spinner-blade"
                                        style={{
                                            animationDelay: `${i * 0.083}s`,
                                            transform: `rotate(${i * 30}deg)`,
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    )
                    :
                    (
                        <UserContext.Provider
                            value={{
                                baseUrl,
                                isSignupForm,
                                setIsSignupForm,
                                openSignupForm,
                                closeSignupForm,
                                loginFormModal,
                                setLoginFormModal,
                                openLoginModal,
                                closeLoginModal,
                                showToast,
                                userData,
                                setUserData,
                                handleLogout,
                                isLoading,

                                // Socket
                                socket,
                                socketData,
                                setSocketData,
                                handleSocketRegister,
                                handleEmitServiceRequest,
                                handleOnServiceRequest,
                                handleEmitServiceRequestResponse,
                                handleOnServiceRequestResponse,
                                handleChatSendMessage,
                                handleChatReceiveMessage,

                                //timmer component
                                isShowTimmer,
                                setIsShowTimmer,
                                handleOnTimmerComponent,
                                handleEmitTimmerComponent
                            }}
                        >
                            {children}
                        </UserContext.Provider>
                    )
            }
            <Toaster />
        </>

    );
};
