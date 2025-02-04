import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const HistoryPage: React.FC<{ onClose: () => void; }> = ({ onClose }) => {

    const { baseUrl, userData, showToast } = useContext(UserContext);
    const [id, setId] = useState<string | null>(null);
    const [historyData, setHistoryData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (userData?.user?.id) {
            setId(userData.user.id);
        }
    }, [userData]);

    const fetchHistory = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseUrl}api/user/fetchUserHistory/${id}`);
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
            newVal = seconds + "  sec";
        }
        return newVal;
    };

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

    return (
        <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="relative h-full w-full flex items-center justify-center px-5 md:px-0">
                <div className="relative bg-white p-5 rounded-md z-10 w-full md:w-[1000px] animate-fade-in">
                    {
                        isLoading
                            ?
                            <div className='flex justify-center items-center my-20'>
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
                            :
                            historyData.length > 0 ? (
                                <div>
                                    <h1 className="text-black text-center text-2xl font-semibold font-poppins mb-5">History</h1>
                                    <div className="max-h-[403px] overflow-y-auto overflow-x-auto">
                                        <table className="min-w-full bg-white">
                                            <thead className="bg-gray-200 border border-gray-200">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">User</th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Status</th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Total Time</th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Location</th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Price</th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Service Type</th>
                                                </tr>
                                            </thead>
                                            <tbody className="border border-gray-200">
                                                {historyData.map((row, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            <div className='flex items-center'>
                                                                <img
                                                                    src={row.providerAvatar}
                                                                    alt={row.providerName}
                                                                    className='w-10 h-10 rounded-full border mr-2'
                                                                />
                                                                <h1 className='text-base font-medium'>{row.providerName}</h1>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            <span className={`px-2 py-1 ${row.status === "Completed" ? 'bg-green-100 border border-green-600 rounded-full text-green-600' : 'bg-red-100 border border-red-600 rounded-full text-red-600'}`}>
                                                                {row.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{secondsToMinutes(row.totalTime)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.location}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹ {row.price}.00/-</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.serviceType}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                                :
                                (
                                    <p className='text-center text-gray-500 my-20'>No history found</p>
                                )
                    }
                    <div
                        onClick={onClose}
                        className='bg-black w-7 h-7 text-center rounded-full absolute -top-3 -right-3 cursor-pointer'
                    >
                        <i className="ri-close-line text-white leading-7 text-xl"></i>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HistoryPage
