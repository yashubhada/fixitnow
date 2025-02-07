import React, { useEffect } from 'react'

const SingleProviderModel: React.FC<{
    provider: any;
    closeModel: () => void;
}> = ({ provider, closeModel }) => {

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

    const calculateAverageRating = (reviews: any) => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
        return totalRating / reviews.length;
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="relative h-full w-full flex items-center justify-center px-5 md:px-0">
                <div className="relative bg-white p-5 rounded-md z-10 w-full md:w-[400px] animate-fade-in">
                    {/* Provider Info */}
                    <div className='flex items-center gap-x-3 rounded'>
                        <div className='w-28 h-24 md:w-32 md:h-32 rounded md:rounded-full overflow-hidden'>
                            <img
                                src={provider.avatar}
                                alt={provider.name}
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-1 mb-1">
                                <h1 className="text-base md:text-xl font-medium text-black">{provider.name}</h1>
                                <i className="ri-verified-badge-fill text-lg mr-2"></i>
                            </div>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <i
                                        key={index}
                                        className={`ri-star-${index < Math.round(calculateAverageRating(provider.reviews)) ? 'fill' : 'line'}`}
                                    ></i>
                                ))}
                                <div className="text-gray-500 text-sm md:text-base">
                                    ({calculateAverageRating(provider.reviews).toFixed(1)})
                                </div>
                            </div>
                            <div className='flex items-center mt-1'>
                                <p className='text-base'>₹{provider.price}.00/-</p>
                            </div>
                        </div>
                    </div>
                    <div className='p-[1px] bg-gray-200 my-5'></div>
                    <div className='max-h-[300px] overflow-y-auto'>
                        {
                            provider.reviews.map((ary: any, i: number) => {
                                return (
                                    <div key={i} className='border-b pb-5 my-5'>
                                        <div className='flex items-center mb-2'>
                                            <img
                                                src={ary.userAvatar}
                                                className='w-14 h-14 rounded-full border mr-2'
                                            />
                                            <div>
                                                <h1 className='text-lg font-medium'>{ary.userName}</h1>
                                                <div className='flex items-center'>
                                                    {Array.from({ length: 5 }, (_, i) => (
                                                        <i
                                                            key={i}
                                                            className={`ri-star-${i < ary.rating ? 'fill' : 'line'}`}
                                                        ></i>
                                                    ))}
                                                    <div className='ml-2'>({ary.rating}/5)</div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className='pl-[64px] text-base'>{ary.message}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div
                        onClick={closeModel}
                        className='bg-black w-7 h-7 text-center rounded-full absolute -top-3 -right-3 cursor-pointer'
                    >
                        <i className="ri-close-line text-white leading-7 text-xl"></i>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SingleProviderModel
