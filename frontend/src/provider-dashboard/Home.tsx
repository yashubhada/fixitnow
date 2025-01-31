import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="min-h-full">
            <h1 className="text-2xl font-bold text-black mb-7">Dashboard Overview</h1>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white shadow rounded-lg p-5 border-t-4 border-green-500">
                    <h2 className="font-semibold text-gray-500">Completed Requests</h2>
                    <p className="text-2xl font-bold text-gray-800">23</p>
                </div>
                <div className="bg-white shadow rounded-lg p-5 border-t-4 border-yellow-500">
                    <h2 className="font-semibold text-gray-500">Pending Requests</h2>
                    <p className="text-2xl font-bold text-gray-800">7</p>
                </div>
                <div className="bg-white shadow rounded-lg p-5 border-t-4 border-red-500">
                    <h2 className="font-semibold text-gray-500">Canceld Requests</h2>
                    <p className="text-2xl font-bold text-gray-800">15</p>
                </div>
                <div className="bg-white shadow rounded-lg p-5 border-t-4 border-blue-500">
                    <h2 className="font-semibold text-gray-500">Total Earnings</h2>
                    <p className="text-2xl font-bold text-gray-800">₹3,400</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
