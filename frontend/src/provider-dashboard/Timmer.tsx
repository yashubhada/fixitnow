import React, { useContext, useEffect, useState } from 'react';
import HourGlass from '../images/hourGlass.gif';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const Timmer: React.FC<{ showButton: boolean }> = ({ showButton }) => {
    const { baseUrl, userData, showToast, setIsShowTimmer, handleEmitTimmerComponent } = useContext(UserContext);

    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [requestId, setRequestId] = useState<string | null>(null);
    const [providerId, setProviderId] = useState<string | null>(null);

    // Load the timer from localStorage on component mount
    useEffect(() => {
        const savedTime = localStorage.getItem('stopwatchTime');
        if (savedTime) {
            setTimeElapsed(parseInt(savedTime, 10));
        }
        setIsRunning(true);
    }, []);

    // Update the timer every second
    useEffect(() => {
        let interval: any;
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

    // Set requestId and providerId
    useEffect(() => {
        setRequestId(localStorage.getItem('requestId'));
        setProviderId(userData.user.id);
    }, [userData]);

    const [takerId, setTakerId] = useState<string | null>(null);

    // if taker id not found
    useEffect(() => {
        const id = localStorage.getItem("takerId");
        if (id) {
            setTakerId(id);
        }
    }, []);

    // Handle "End Task" button click
    const handleEndTask = async () => {
        setIsRunning(false);
        setIsShowTimmer(false);
        localStorage.removeItem('stopwatchTime');
        localStorage.removeItem('requestId');
        localStorage.removeItem('providerId');

        if (requestId && providerId) {
            try {
                const response = await axios.post(
                    `${baseUrl}api/user/serviceComplete`,
                    { requestId, providerId, totalTime: timeElapsed },
                    { withCredentials: true }
                );
                if (response.data.success) {
                    showToast(`Task ended. Time spent: ${formatTime(timeElapsed)}`, "success");
                    if (providerId && takerId) {
                        handleEmitTimmerComponent(providerId, takerId, 'close');
                    }
                    localStorage.clear();
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response) {
                        if (err.status === 400) {
                            showToast(err.response.data.message, "error");
                        }
                    }
                }
            }
        }
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
                    {showButton && (
                        <button
                            className="w-full bg-black hover:bg-[#333] text-white py-2 rounded mt-5"
                            onClick={handleEndTask}
                        >
                            End Task
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Timmer;