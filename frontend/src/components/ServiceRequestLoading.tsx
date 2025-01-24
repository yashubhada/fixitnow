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
                    <div className='flex items-center justify-center w-16 h-16 mx-auto my-16'>
                        <svg
                            className="animate-spin"
                            viewBox="25 25 50 50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                className="fill-none stroke-black stroke-[2] stroke-dasharray-[1_200] stroke-dashoffset-[0] stroke-linecap-round animate-dash"
                                r="20"
                                cy="50"
                                cx="50"
                            ></circle>
                        </svg>
                    </div>
                    <p className='mt-5 text-center text-black text-lg'>Please wait until your request is accepted by <span className='font-bold'>{providerName}</span></p>
                </div>
            </div>
        </div>
    );
}

export default ServiceRequestLoading
