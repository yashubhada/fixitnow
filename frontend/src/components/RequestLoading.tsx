import React, { useEffect } from 'react'
import LoadingGif from '../images/loading-gif.gif';

const RequestLoading: React.FC = () => {

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
                <div className="absolute inset-0 bg-black opacity-70"></div>

                {/* Modal Content */}
                <div className="relative h-full w-full flex items-center justify-center">
                    <div>
                        <div className='w-[200px] md:w-[300px] mx-auto'>
                            <img className='w-full' src={LoadingGif} draggable={false} />
                        </div>
                        <div className='text-white text-sm md:text-base font-normal text-center'>
                            Wait for your request to be accepted by Mike's Plumbing...
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RequestLoading
