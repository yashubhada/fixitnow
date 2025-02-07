import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const Home: React.FC = () => {

    const { baseUrl, userData, showToast } = useContext(UserContext);
    const [id, setId] = useState<string | null>(null);
    const [historyData, setHistoryData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalEarning, setTotalEarning] = useState<number>(0);
    const [complete, setComplete] = useState<number>(0);
    const [cancel, setCancel] = useState<number>(0);

    useEffect(() => {
        if (userData?._id) {
            setId(userData._id);
        }
    }, [userData]);

    const fetchHistory = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseUrl}api/user/fetchProviderHistory/${id}`);
            if (response.data.success) {
                setHistoryData(response.data.history);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    console.error("API Error:", err.response.data); // Log the error
                    showToast(err.response.data.message, "error");
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchHistory();
        }
    }, [id]);

    useEffect(() => {
        const fetchComplete = () => {
            const count = historyData.filter(ary => ary.status === "Completed");
            setComplete(count.length);
            setTotalEarning(count.length * userData?.price);
        }
        fetchComplete();
    }, [historyData, userData]);

    useEffect(() => {
        const fetchComplete = () => {
            const count = historyData.filter(ary => ary.status === "Canceled");
            setCancel(count.length);
        }
        fetchComplete();
    }, [historyData]);

    const formatNumber = (num: number): string => {
        return num.toLocaleString("en-US");
    };

    if (isLoading) {
        return (
            <div className='flex justify-center items-center w-full h-full'>
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
        );
    }

    return (
        <div className="min-h-full">
            <h1 className="text-2xl font-bold text-black mb-7 text-center md:text-left">Dashboard Overview</h1>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center justify-between bg-white shadow rounded-lg p-5 border-t-4 border-green-500">
                    <div>
                        <h2 className="font-semibold text-gray-500">Completed Requests</h2>
                        <p className="text-2xl font-bold text-gray-800">{complete}</p>
                    </div>
                    <div className='h-7 w-7 text-center bg-green-500 rounded-full text-xl text-white'>
                        <i className="ri-check-fill leading-7"></i>
                    </div>
                </div>
                <div className="flex items-center justify-between bg-white shadow rounded-lg p-5 border-t-4 border-red-500">
                    <div>
                        <h2 className="font-semibold text-gray-500">Canceld Requests</h2>
                        <p className="text-2xl font-bold text-gray-800">{cancel}</p>
                    </div>
                    <div className='h-7 w-7 text-center bg-red-500 rounded-full text-xl text-white'>
                        <i className="ri-close-fill leading-7"></i>
                    </div>
                </div>
                <div className="flex items-center justify-between bg-white shadow rounded-lg p-5 border-t-4 border-blue-500">
                    <div>
                        <h2 className="font-semibold text-gray-500">Total Earnings in INR</h2>
                        <p className="text-2xl font-bold text-gray-800">{formatNumber(totalEarning)}</p>
                    </div>
                    <div className='h-7 w-7 text-center bg-blue-500 rounded-full text-xl text-white'>
                        <span className="leading-7 font-serif">₹</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
