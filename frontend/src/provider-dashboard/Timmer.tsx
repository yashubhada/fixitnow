import React, { useEffect, useState } from 'react';
import HourGlass from '../images/hourGlass.gif';

const Timmer: React.FC = () => {
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    // Load the timer from localStorage on component mount
    useEffect(() => {
        const savedTime = localStorage.getItem('stopwatchTime');
        if (savedTime) {
            setTimeElapsed(parseInt(savedTime, 10));
            setIsRunning(true);
        }
    }, []);

    // Start the timer when the modal is shown
    useEffect(() => {
        if (!isRunning) {
            setIsRunning(true);
        }
    }, [isRunning]);

    // Update the timer every second
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTimeElapsed((prevTime) => {
                    const newTime = prevTime + 1;
                    localStorage.setItem('stopwatchTime', newTime.toString());
                    return newTime;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    // Format the time (HH:MM:SS)
    const formatTime = (time: number): string => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // Handle "End Task" button click
    const handleEndTask = () => {
        setIsRunning(false);
        localStorage.removeItem('stopwatchTime');
        alert(`Task ended. Time spent: ${formatTime(timeElapsed)}`);
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="relative h-full w-full flex items-center justify-center px-5 md:px-0">
                <div className="bg-white p-5 rounded-md z-10 w-full md:w-[400px] animate-fade-in">
                    <h1 className="text-black text-center text-2xl font-semibold font-poppins">Request Timer</h1>
                    <div className="flex items-center justify-center">
                        <img src={HourGlass} alt="Hourglass" />
                    </div>
                    <div className="text-center">
                        {formatTime(timeElapsed)}
                    </div>
                    <button
                        className="w-full bg-black hover:bg-[#333] text-white py-2 rounded mt-5"
                        onClick={handleEndTask}
                    >
                        End Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Timmer;