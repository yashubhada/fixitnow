import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../images/fixitnow-logo-black.png';
import Home from './Home';
import RequestModal from './RequestModal';
import axios from 'axios';
import Timmer from './Timmer';


const LandingPage: React.FC = () => {
    const { baseUrl, userData, handleLogout, showToast, isLoading, socket, socketData, handleSocketRegister, handleOnServiceRequest, handleEmitServiceRequestResponse, handleOnTimmerComponent, isShowTimmer } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    // reaload warning
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            // Prevent the default action (required for some browsers)
            event.preventDefault();
            // Custom message (not all browsers will display this)
            event.returnValue = 'Are you sure you want to leave? Your changes may not be saved.';
        };

        // Add the event listener
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const [requestData, setRequestData] = useState<any>(() => {
        const storedData = localStorage.getItem("requestData");
        return storedData ? JSON.parse(storedData) : null;
    });

    const [toggleMenu, setToggleMenu] = useState<boolean>(false); // Moved to the top

    useEffect(() => {
        handleSocketRegister(userData?._id);

        const storedRequestData = localStorage.getItem("requestData");
        if (storedRequestData) {
            try {
                const parsedData = JSON.parse(storedRequestData);
                setRequestData(parsedData);
            } catch (error) {
                console.error("Error parsing requestData from localStorage:", error);
            }
        }

        handleOnServiceRequest();
    }, [userData]);

    useEffect(() => {
        if (socketData) {
            setRequestData(socketData);
            localStorage.setItem("requestData", JSON.stringify(socketData));
        }
    }, [socketData]);

    useEffect(() => {
        if (!isLoading && (!userData || userData?.userRole !== "serviceProvider")) {
            showToast("Login first to access your dashboard", "error");
            navigate('/');
        }
    }, [userData, isLoading, navigate, showToast]);

    useEffect(() => {
        handleOnTimmerComponent();
    }, [socket]);

    const generateVerificationCode = (): string => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let verificationCode = "";

        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            verificationCode += characters[randomIndex];
        }
        return verificationCode;
    };

    const handleServiceResponse = async (status: 'accepted' | 'declined') => {
        const verificationCode = generateVerificationCode();
        const newRequestData = {
            userId: requestData.requestData._id,
            userName: requestData.requestData.name,
            userAvatar: requestData.requestData.avatar,
            providerId: userData._id,
            providerName: userData.name,
            providerAvatar: userData.avatar,
            location: userData.address,
            serviceType: userData.service,
            price: userData.price,
            status: status === 'accepted' ? 'Completed' : 'Canceled',
            verificationCode,
        };

        try {
            const response = await axios.post(
                `${baseUrl}api/user/createNewRequest`,
                newRequestData,
                { withCredentials: true }
            );

            if (status === 'accepted' && response.data.success) {
                showToast("Request accepted successfully!", "success");
                navigate("/provider-dashboard/verify-code")
                localStorage.setItem("takerId", requestData.requestData._id);
                localStorage.setItem('requestId', response.data.requestId);
            }

            handleEmitServiceRequestResponse(
                userData._id,
                requestData.requestData._id,
                status,
                verificationCode
            );

            localStorage.removeItem('requestData');
            setRequestData(null);
        } catch (error) {
            console.error("Error creating new request:", error);
        }
    };

    const providerLogout = (): void => {
        handleLogout();
        navigate('/');
    };

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu);
    }

    if (!userData || userData?.userRole !== "serviceProvider") {
        return null;
    }

    return (
        <>
            <section className='w-full h-screen flex'>
                <div className={`absolute bg-white h-full md:static z-20 w-[250px] transition-all duration-300 ease-in-out ${toggleMenu ? 'translate-x-0 border-r shadow-xl' : '-translate-x-[250px] md:translate-x-0'} py-4 px-3 border-gray-300 md:border-r md:shadow-xl`}>
                    <nav className='dashboard-main-nav relative h-full'>
                        <img src={Logo} className='w-10 mb-5 mx-auto' alt="FixItNow Logo" />
                        <ul className='space-y-3'>
                            <NavLink
                                to="/provider-dashboard"
                                onClick={handleToggleMenu}
                                className={({ isActive }) =>
                                    `block py-2 px-3 rounded ${isActive && location.pathname === '/provider-dashboard' ? 'bg-black text-white' : 'hover:bg-gray-200 text-black'}`}
                            >
                                <li className='flex items-center font-medium'><i className="ri-dashboard-line mr-2 text-lg"></i>Dashboard</li>
                            </NavLink>
                            <NavLink
                                to="/provider-dashboard/history"
                                onClick={handleToggleMenu}
                                className={({ isActive }) =>
                                    `block py-2 px-3 rounded ${isActive ? 'bg-black text-white' : 'hover:bg-gray-200 text-black'}`}
                            >
                                <li className='flex items-center font-medium'><i className="ri-history-line mr-2 text-lg"></i>History</li>
                            </NavLink>
                            <NavLink
                                to="/provider-dashboard/chat"
                                onClick={handleToggleMenu}
                                className={({ isActive }) =>
                                    `block py-2 px-3 rounded ${isActive ? 'bg-black text-white' : 'hover:bg-gray-200 text-black'}`}
                            >
                                <li className='flex items-center font-medium'><i className="ri-chat-1-line mr-2 text-lg"></i>Message</li>
                            </NavLink>
                            <NavLink
                                to="/provider-dashboard/verify-code"
                                onClick={handleToggleMenu}
                                className={({ isActive }) =>
                                    `block py-2 px-3 rounded ${isActive ? 'bg-black text-white' : 'hover:bg-gray-200 text-black'}`}
                            >
                                <li className='flex items-center font-medium'><i className="ri-shield-check-line mr-2 text-lg"></i>User Verification</li>
                            </NavLink>
                            <NavLink
                                to="/provider-dashboard/review"
                                onClick={handleToggleMenu}
                                className={({ isActive }) =>
                                    `block py-2 px-3 rounded ${isActive ? 'bg-black text-white' : 'hover:bg-gray-200 text-black'}`}
                            >
                                <li className='flex items-center font-medium'><i className="ri-chat-quote-line mr-2 text-lg"></i>Reviews</li>
                            </NavLink>
                        </ul>

                        <ul className='absolute bottom-5 w-full'>
                            <NavLink
                                to="/provider-dashboard/profile"
                                onClick={handleToggleMenu}
                                className='flex items-center py-2 px-3 hover:bg-gray-200 rounded cursor-pointer mb-3'
                            >
                                <img
                                    src={userData?.avatar}
                                    className='w-10 h-10 rounded-full border mr-1'
                                    alt="User Avatar"
                                />
                                <div>
                                    <h1 className='text-base font-medium'>{userData?.name}</h1>
                                    <p className='text-sm text-slate-500'>{userData?.email}</p>
                                </div>
                            </NavLink>
                            <div
                                onClick={providerLogout}
                                className='py-2 px-3 hover:bg-gray-200 rounded text-red-600 cursor-pointer'
                            >
                                <li className='flex items-center font-medium'><i className="ri-logout-box-line mr-2 text-lg"></i>Logout</li>
                            </div>
                        </ul>
                        {/* toggle button */}
                        <div
                            onClick={handleToggleMenu}
                            className='h-10 w-10 absolute bg-gray-200 text-center rounded-br -top-4 -right-[52px] md:hidden'
                        >
                            <i className="ri-menu-line leading-10 text-xl font-bold"></i>
                        </div>
                    </nav>
                </div>
                {/* Main Content */}
                <div className="w-full md:w-[calc(100%-250px)] py-4 px-3">
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
                    close={() => setRequestData(null)}
                    handleServiceResponse={handleServiceResponse}
                />
            )}

            {
                isShowTimmer && <Timmer showButton={true} />
            }
        </>
    );
};

export default LandingPage;