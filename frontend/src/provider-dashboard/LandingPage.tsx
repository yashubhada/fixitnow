import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../images/fixitnow-logo-black.png';
import Home from './Home';

const LandingPage: React.FC = () => {

    const { userData, getLoggedInUserData, handleLogout, showToast } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsPageLoading(true);
                await getLoggedInUserData();
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsPageLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (!isPageLoading && (!userData?.user || userData?.user?.role !== "serviceProvider")) {
            showToast("Log in to access your dashboard", "error");
            navigate('/');
        }
    }, [userData, isPageLoading, navigate, showToast]);

    // Logout function
    const providerLogout = (): void => {
        handleLogout();
        navigate('/');
    };

    if (isPageLoading) {
        return (
            <div className='h-screen w-full flex items-center justify-center bg-white'>
                <svg className="animate-spin h-7 w-7 text-black mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                </svg>
            </div>
        )
    }

    if (!userData?.user || userData?.user?.role !== "serviceProvider") {
        return null; // Avoid rendering anything if user is invalid
    }

    return (
        <>
            <section className='w-full h-screen flex'>
                <div className='w-[250px] py-4 px-3 border-gray-300 border-r shadow-xl'>
                    <nav className='dashboard-main-nav relative h-full'>
                        <img src={Logo} className='w-10 mb-5 mx-auto' />
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
                            <a
                                href="#"
                                className='block py-2 px-3 hover:bg-gray-200 rounded'
                            >
                                <li className='flex items-center font-medium'><i className="ri-message-2-line mr-2 text-lg"></i>Message</li>
                            </a>
                            <a
                                href="#"
                                className='block py-2 px-3 hover:bg-gray-200 rounded'
                            >
                                <li className='flex items-center font-medium'><i className="ri-sparkling-2-line mr-2 text-lg"></i>Reviews</li>
                            </a>
                        </ul>

                        <ul className='absolute bottom-5 w-full'>
                            <div className='flex items-center py-2 px-3 hover:bg-gray-200 rounded cursor-pointer mb-3'>
                                <img
                                    src={userData?.user?.avatar}
                                    className='w-10 h-10 rounded-full border mr-1'
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
        </>
    )
}

export default LandingPage
