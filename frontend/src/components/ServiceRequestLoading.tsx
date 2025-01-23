import React, { useEffect } from 'react'

const ServiceRequestLoading: React.FC<{ providerName: string | undefined; }> = ({ providerName }) => {

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
            <div className="h-full w-full flex items-center justify-center px-5 md:px-0">
                <div className='bg-white p-5 rounded-md z-10 w-full md:w-[520px] animate-fade-in'>
                    <svg className="animate-spin h-20 w-20 text-black mx-auto my-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                    </svg>
                    <p className='mt-5 text-center text-black text-lg'>Please wait until your request is accepted by <span className='font-bold'>{providerName}</span></p>
                </div>
            </div>
        </div>
    );
}

export default ServiceRequestLoading
