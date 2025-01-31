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

    // Number of spinner blades
    const blades = Array.from({ length: 12 }, (_, i) => i);

    return (
        <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="h-full w-full flex items-center justify-center px-5 md:px-0">
                <div className='bg-white p-5 rounded-md z-10 w-full md:w-[520px] animate-fade-in'>
                    <div className="spinner center">
                        {blades.map((index) => (
                            <div
                                key={index}
                                className="spinner-blade"
                                style={{
                                    animationDelay: `${index * 0.083}s`,
                                    transform: `rotate(${index * 30}deg)`,
                                }}
                            ></div>
                        ))}
                    </div>
                    <p className='mt-36 text-center text-black text-lg'>Please wait until your request is accepted by <span className='font-bold'>{providerName}</span></p>
                </div>
            </div>
        </div>
    );
}

export default ServiceRequestLoading
