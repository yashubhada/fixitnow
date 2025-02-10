import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';

const History: React.FC = () => {

    const { baseUrl, userData, showToast } = useContext(UserContext);
    const [id, setId] = useState<string | null>(null);
    const [historyData, setHistoryData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    const secondsToMinutes = (seconds: number): string => {
        let newVal: string;
        if (seconds >= 60) {
            newVal = Math.floor(seconds / 60) + " mins";
        } else {
            if (seconds !== null) {
                newVal = seconds + "  sec";
            } else {
                newVal = "Request canceld"
            }
        }
        return newVal;
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
        <div>
            {
                historyData.length > 0 ? (
                    <div>
                        <h1 className="text-2xl font-bold mb-7 text-center md:text-left">Dashboard History</h1>
                        <div className="min-w-full bg-white max-h-[550px] overflow-y-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-200 border border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Total Time</th>
                                    </tr>
                                </thead>
                                <tbody className="border border-gray-200">
                                    {historyData.map((row, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div className='flex items-center'>
                                                    <img
                                                        src={row.userAvatar}
                                                        alt={row.userName}
                                                        className='w-10 h-10 rounded-full border mr-2'
                                                    />
                                                    <h1 className='text-base font-medium'>{row.userName}</h1>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <span className={`px-2 py-1 ${row.status === "Completed" ? 'bg-green-100 border border-green-600 rounded-full text-green-600' : 'bg-red-100 border border-red-600 rounded-full text-red-600'}`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{secondsToMinutes(row.totalTime)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
                    :
                    (
                        <p className='text-center text-gray-500 mt-20'>No history found</p>
                    )
            }
        </div>
    )
}

export default History
