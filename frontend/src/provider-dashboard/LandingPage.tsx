import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../images/fixitnow-logo-black.png';
import Home from './Home';
import RequestModal from './RequestModal';
import axios from 'axios';
import Timmer from './Timmer';


const LandingPage: React.FC = () => {
    const { baseUrl, userData, handleLogout, showToast, isLoading, socketData, handleSocketRegister, handleOnServiceRequest, handleEmitServiceRequestResponse } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    const [requestData, setRequestData] = useState<any>(() => {
        const storedData = localStorage.getItem("requestData");
        return storedData ? JSON.parse(storedData) : null;
    });

    useEffect(() => {
        // Register user with socket
        handleSocketRegister(userData?.user?.id);

        // Sync requestData from local storage
        const storedRequestData = localStorage.getItem("requestData");
        if (storedRequestData) {
            try {
                const parsedData = JSON.parse(storedRequestData);
                setRequestData(parsedData);
            } catch (error) {
                console.error("Error parsing requestData from localStorage:", error);
            }
        }

        // Listen for service requests
        handleOnServiceRequest();
    }, [userData]);

    useEffect(() => {
        if (socketData) {
            setRequestData(socketData); // Update requestData when socketData changes
            localStorage.setItem("requestData", JSON.stringify(socketData)); // Sync with local storage
        }
    }, [socketData]);

    // Generate verification code
    const generateVerificationCode = (): string => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let verificationCode = "";

        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            verificationCode += characters[randomIndex];
        }
        return verificationCode;
    };

    const [isRequsetAccept, setIsRequsetAccept] = useState<boolean>(false);

    const handleServiceResponse = async (status: 'accepted' | 'declined') => {
        const verificationCode = generateVerificationCode();
        const newRequestData = {
            userId: requestData.requestData.user.id,
            providerId: userData.user.id,
            location: userData.user.address,
            serviceType: userData.user.service,
            price: userData.user.price,
            status: status === 'accepted' ? 'Accepted' : 'Canceled',
            verificationCode,
        };

        try {
            const response = await axios.post(
                `${baseUrl}api/user/createNewRequest`,
                newRequestData,
                { withCredentials: true }
            );

            if (status === 'accepted' && response.data.success) {
                setIsRequsetAccept(true);
                showToast("Request accepted successfully!", "success");
                navigate("/provider-dashboard/verify-code")
                localStorage.setItem("takerId", requestData.requestData.user.id);
            }

            localStorage.setItem('requestId', response.data.requestId);

            // Emit service request response
            handleEmitServiceRequestResponse(
                userData.user.id, // toUserId
                requestData.requestData.user.id,   // fromUserId
                status,           // status
                verificationCode  // verificationCode
            );

            // Clear requestData from state and local storage
            localStorage.removeItem('requestData');
            setRequestData(null);
        } catch (error) {
            console.error("Error creating new request:", error);
        }
    };

    // Logout function
    const providerLogout = (): void => {
        handleLogout();
        navigate('/');
    };

    // Redirect if user is not logged in or not a service provider
    useEffect(() => {
        if (!isLoading && (!userData?.user || userData?.user?.role !== "serviceProvider")) {
            showToast("Login first to access your dashboard", "error");
            navigate('/');
        }
    }, [userData, isLoading, navigate, showToast]);

    // Do not render if user is invalid
    if (!userData?.user || userData?.user?.role !== "serviceProvider") {
        return null;
    }

    return (
        <>
            <section className='w-full h-screen flex'>
                <div className='w-[250px] py-4 px-3 border-gray-300 border-r shadow-xl'>
                    <nav className='dashboard-main-nav relative h-full'>
                        <img src={Logo} className='w-10 mb-5 mx-auto' alt="FixItNow Logo" />
                        <ul className='space-y-3'>
                            <NavLink
                                to="/provider-dashboard"
                                className={({ isActive }) =>
                                    `block py-2 px-3 rounded ${isActive && location.pathname === '/provider-dashboard' ? 'bg-black text-white' : 'hover:bg-gray-200 text-black'}`}
                            >
                                <li className='flex items-center font-medium'><i className="ri-dashboard-line mr-2 text-lg"></i>Dashboard</li>
                            </NavLink>
                            <NavLink
                                to="/provider-dashboard/history"
                                className={({ isActive }) =>
                                    `block py-2 px-3 rounded ${isActive ? 'bg-black text-white' : 'hover:bg-gray-200 text-black'}`}
                            >
                                <li className='flex items-center font-medium'><i className="ri-history-line mr-2 text-lg"></i>History</li>
                            </NavLink>
                            <a
                                href="#"
                                className='block py-2 px-3 hover:bg-gray-200 rounded'
                            >
                                <li className='flex items-center'><i className="ri-wallet-3-line mr-2 text-lg"></i>Wallet</li>
                            </a>
                            {
                                isRequsetAccept
                                &&
                                <>
                                    <NavLink
                                        to="/provider-dashboard/chat"
                                        className={({ isActive }) =>
                                            `block py-2 px-3 rounded ${isActive ? 'bg-black text-white' : 'hover:bg-gray-200 text-black'}`}
                                    >
                                        <li className='flex items-center font-medium'><i className="ri-chat-1-line mr-2 text-lg"></i>Message</li>
                                    </NavLink>
                                    <NavLink
                                        to="/provider-dashboard/verify-code"
                                        className={({ isActive }) =>
                                            `block py-2 px-3 rounded ${isActive ? 'bg-black text-white' : 'hover:bg-gray-200 text-black'}`}
                                    >
                                        <li className='flex items-center font-medium'><i className="ri-shield-check-line mr-2 text-lg"></i>User Verification</li>
                                    </NavLink>
                                </>
                            }
                            <a
                                href="#"
                                className='block py-2 px-3 hover:bg-gray-200 rounded'
                            >
                                <li className='flex items-center font-medium'><i className="ri-chat-quote-line mr-2 text-lg"></i>Reviews</li>
                            </a>
                        </ul>

                        <ul className='absolute bottom-5 w-full'>
                            <div className='flex items-center py-2 px-3 hover:bg-gray-200 rounded cursor-pointer mb-3'>
                                <img
                                    src={userData?.user?.avatar}
                                    className='w-10 h-10 rounded-full border mr-1'
                                    alt="User Avatar"
                                />
                                <div>
                                    <h1 className='text-base font-medium'>{userData?.user?.name}</h1>
                                    <p className='text-sm text-slate-500'>{userData?.user?.email}</p>
                                </div>
                            </div>
                            <div
                                onClick={providerLogout}
                                className='py-2 px-3 hover:bg-gray-200 rounded text-black cursor-pointer'
                            >
                                <li className='flex items-center font-medium'><i className="ri-logout-box-line mr-2 text-lg"></i>Logout</li>
                            </div>
                        </ul>
                    </nav>
                </div>
                {/* Main Content */}
                <div className="w-[calc(100%-250px)] py-4 px-3">
                    {location.pathname === '/provider-dashboard' && (
                        <Home />
                    )}

                    {/* Nested Routes */}
                    <Outlet />
                </div>
            </section>

            {requestData && (
                <RequestModal
                    data={requestData}
                    handleServiceResponse={handleServiceResponse}
                />
            )}

            {/* {isShowVerifyCodeModal && <VerifyCodeInput close={() => setIsShowVerifyCodeModal(false)} />} */}

            {
                // <Timmer />
            }
        </>
    );
};

export default LandingPage;