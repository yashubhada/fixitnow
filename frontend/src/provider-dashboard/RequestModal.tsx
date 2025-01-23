import React from 'react'

interface propsData {
    data: any;
    handleServiceResponse: (status: 'accepted' | 'declined') => void;
}

const RequestModal: React.FC<propsData> = ({ data, handleServiceResponse }) => {
    return (
        <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="relative h-full w-full flex items-center justify-center px-5 md:px-0">
                <div className="bg-white p-5 rounded-md z-10 w-full md:w-[400px] animate-fade-in">
                    <h1 className="text-black text-center text-2xl font-semibold font-poppins mb-5">New Request Alert</h1>
                    <div>
                        <img
                            src={data?.avatar}
                            className='w-20 h-20 rounded-full border shadow-md mx-auto'
                        />
                        <p className='mt-3 text-center text-lg font-semibold '>{data?.name}</p>
                        <p className='mt-1 text-center text-gray-500 text-sm font-medium'>{data?.email}</p>
                    </div>
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
                </div>
            </div>
        </div>
    )
}

export default RequestModal
