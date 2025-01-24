import React, { useEffect } from 'react';

const ServiceModal: React.FC<{ providerData: any; }> = ({ providerData }) => {

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
        <>
            <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Modal Content */}
                <div className="relative h-full w-full flex items-center justify-center p-5 md:p-10">
                    <div className="relative bg-white p-5 rounded-md z-10 w-full md:w-[400px] animate-fade-in max-h-[530px]">
                        <div className='flex items-center gap-x-3 rounded'>
                            <div className='w-28 h-24 md:w-32 md:h-32 rounded md:rounded-full overflow-hidden'>
                                <img
                                    src={providerData.avatar}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-x-1 mb-2">
                                    <h1 className="text-base md:text-xl font-medium text-black">{providerData.name}</h1>
                                    <i className="ri-verified-badge-fill text-lg mr-2"></i>
                                </div>

                                <div className="flex items-start text-gray-500 mb-2">
                                    <i className="ri-map-pin-line text-base mr-2"></i>
                                    <p className='text-sm md:text-base'>{providerData.address}</p>
                                </div>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <svg
                                            key={index}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            aria-label="Rating"
                                            className="focus:outline-none w-[15px]"
                                        >
                                            <path
                                                d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"
                                                fill={index < 4 ? "rgba(234,113,46,1)" : "#555"}
                                            />
                                        </svg>
                                    ))}
                                    <div className="text-gray-500 text-sm md:text-base">(4.0)</div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-300 p-[1px] rounded-full my-5 md:my-10'></div>
                        <div className="text-sm md:text-base w-full h-10 flex items-center justify-center p-3 rounded-md border border-[#b3b3b3] select-none cursor-pointer group overflow-hidden relative">
                            <p className="text-gray-700 absolute transition-all duration-500 ease-in-out group-hover:-translate-y-[200%]">
                                Hover to know your request code
                            </p>
                            <p className="text-gray-700 absolute translate-y-[200%] transition-all duration-500 ease-in-out group-hover:translate-y-0">
                                Your request code is <span className='text-gray-950'>123456</span>
                            </p>
                        </div>
                        <div className='mt-3 md:mt-10'>
                            <div className='flex items-center'>
                                <i className="ri-time-line text-lg mr-2"></i>
                                <p className='text-base'>Arriving time : 3 min</p>
                            </div>
                            <div className='flex items-center mt-2'>
                                <i className="ri-money-rupee-circle-line text-lg mr-2"></i>
                                <p className='text-base'>Cash payment : ₹{providerData.price}.00/-</p>
                            </div>
                            <div className='flex items-center mt-2'>
                                <i className="ri-pin-distance-line text-lg mr-2"></i>
                                <p className='text-base'>Distance : 0.2 km</p>
                            </div>
                        </div>
                        <div className='mt-5 md:mt-10'>
                            <button className='px-5 py-2 text-white rounded-md bg-black hover:bg-[#333]'>
                                cancel service
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ServiceModal
