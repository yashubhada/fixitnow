import React, { useEffect, useState } from 'react'

const ServiceRequestLoading: React.FC<{ providerName: string | undefined; }> = ({ providerName }) => {

    useEffect(() => {
        // Disable scroll and hide scrollbar when the component is mounted
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '0px';

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '';
        }
    }, []);

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
        <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="h-full w-full flex items-center justify-center px-5 md:px-0">
                <div className='bg-white p-5 rounded-md z-10 w-full md:w-[520px] animate-fade-in'>
                    <div className='flex justify-center my-14'>
                        <div className="relative w-20 h-20">
                            <svg className="inset-0 w-full h-full" viewBox="0 0 120 120">
                                <circle
                                    cx="60"   // Center x
                                    cy="60"   // Center y
                                    r="55"    // Radius increased
                                    fill="none"
                                    stroke="#ccc"
                                    strokeWidth="5"
                                />
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="55"
                                    fill="none"
                                    stroke={strokeColor}
                                    strokeWidth="5"
                                    strokeDasharray="345"
                                    strokeDashoffset={345 - (345 * progress) / 100}
                                    transform="rotate(-90 60 60)"
                                    style={{ transition: 'stroke-dashoffset 1s linear, stroke 1s linear' }}
                                />
                            </svg>
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold ${textColor}`}>
                                {timeLeft}
                            </div>
                        </div>
                    </div>
                    <p className='text-center text-black text-lg'>Please wait until your request is accepted by <span className='font-bold'>{providerName}</span></p>
                </div>
            </div>
        </div>
    );
}

export default ServiceRequestLoading
