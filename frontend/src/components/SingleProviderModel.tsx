import React, { useEffect } from 'react'

const SingleProviderModel: React.FC = () => {

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
                <div className="relative bg-white p-5 rounded-md z-10 w-full max-h-[270px] overflow-y-auto md:w-[400px] animate-fade-in">
                    {/* Provider Info */}
                    <div className='flex items-center gap-x-3 rounded'>
                        <div className='w-28 h-24 md:w-32 md:h-32 rounded md:rounded-full overflow-hidden'>
                            <img
                                src="https://res.cloudinary.com/dfcfncp2q/image/upload/v1738847632/fixitnow/newnmv69jrkcn3k5qgyl.png"
                                // alt={providerData.name}
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-1 mb-1">
                                <h1 className="text-base md:text-xl font-medium text-black">Yash</h1>
                                <i className="ri-verified-badge-fill text-lg mr-2"></i>
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
                            <div className='flex items-center mt-1'>
                                <p className='text-base'>₹988.00/-</p>
                            </div>
                        </div>
                    </div>
                    <button className='bg-black hover:bg-[#333] w-full py-2 rounded text-white mt-3'>
                        send request
                    </button>
                    {/* <div className='my-3'>
                        <h1 className='text-lg font-semibold'>Reviews</h1>
                    </div> */}
                    <div className='border-b pb-5 my-5'>
                        <div className='flex items-center mb-2'>
                            <img
                                src="https://res.cloudinary.com/dfcfncp2q/image/upload/v1738847632/fixitnow/newnmv69jrkcn3k5qgyl.png"
                                className='w-14 h-14 rounded-full border mr-2'
                            />
                            <div>
                                <h1 className='text-lg font-medium'>stark</h1>
                                <div>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <i
                                            key={i}
                                            className={`ri-star-${i < 3 ? 'fill' : 'line'}`}
                                        ></i>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className='pl-[64px] text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta neque, maxime sequi accusantium magni iure debitis </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SingleProviderModel
