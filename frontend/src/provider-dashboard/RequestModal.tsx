import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

interface PropsData {
    data: any;
    handleServiceResponse: (status: 'accepted' | 'declined') => void;
    close: () => void; // Ensure close is included in the props
    isRequestModelBtnLoading: boolean;
}

const RequestModal: React.FC<PropsData> = ({ data, handleServiceResponse, close, isRequestModelBtnLoading }) => {

    const { showToast } = useContext(UserContext);

    const [isAnimating, setIsAnimating] = useState<boolean>(true);
    const [timeLeft, setTimeLeft] = useState<number>(30);

    useEffect(() => {
        if (isAnimating) {
            const timeout = setTimeout(() => {
                setIsAnimating(false); // Stop animation
            }, 5000); // 5 seconds

            return () => clearTimeout(timeout); // Cleanup timeout
        }
    }, [isAnimating]);

    // Countdown timer logic
    useEffect(() => {
        if (timeLeft === 0) {
            showToast("Your time is over to accept the user request", "error");
            localStorage.removeItem('requestData');
            close(); // Call the close function to hide the modal
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, close]); // Add close to the dependency array

    const progress = ((30 - timeLeft) / 30) * 100;

    // Change border color from green to red when 10 seconds are left
    const strokeColor = timeLeft > 10
        ? `rgba(0, 128, 0, 1)` // Green
        : `rgba(255, 0, 0, 1)`; // Red

    // Change text color to red when 10 seconds are left
    const textColor = timeLeft > 10
        ? 'text-black' // Default color
        : 'text-red-500'; // Red

    return (
        <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-20">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="relative h-full w-full flex items-center justify-center px-5 md:px-0">
                <div className="bg-white p-5 rounded-md z-10 w-full md:w-[400px] animate-fade-in">
                    <div className='flex items-center justify-between mb-5'>
                        <h1 className="text-black text-center text-2xl font-semibold font-poppins">New Request Alert</h1>
                        <div className='w-10 h-10'>
                            <div className="relative w-full h-full">
                                <svg className="absolute inset-0" viewBox="0 0 100 100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="#ccc"
                                        strokeWidth="5"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke={strokeColor}
                                        strokeWidth="5"
                                        strokeDasharray="283"
                                        strokeDashoffset={283 - (283 * progress) / 100}
                                        transform="rotate(-90 50 50)"
                                        style={{ transition: 'stroke-dashoffset 1s linear, stroke 1s linear' }}
                                    />
                                </svg>
                                <div className={`flex items-center justify-center w-full h-full text-sm font-bold ${textColor}`}>
                                    {timeLeft}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img
                            src={data?.requestData?.avatar}
                            className='w-20 h-20 rounded-full border shadow-md mx-auto'
                        />
                        <p className='mt-3 text-center text-lg font-semibold '>{data?.requestData?.name}</p>
                        <p className='mt-1 text-center text-gray-500 text-sm font-medium'>{data?.requestData?.email}</p>
                    </div>
                    {
                        isRequestModelBtnLoading
                            ?
                            (
                                <div className='w-full rounded py-2 bg-[#333] flex items-center justify-center cursor-not-allowed mt-5'>
                                    <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                            :
                            (
                                <div className='grid grid-cols-2 gap-5 mt-5'>
                                    <button
                                        onClick={() => handleServiceResponse("accepted")}
                                        className='w-full bg-black hover:bg-[#333] text-white py-2 rounded'
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleServiceResponse("declined")}
                                        className='w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded'
                                    >
                                        Decline
                                    </button>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    );
};

export default RequestModal;