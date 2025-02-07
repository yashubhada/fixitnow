import React, { useEffect, useState } from 'react';
import GooglePay from '../images/google-pay-icon.svg';
import PhonePe from '../images/phone-pe-icon.svg';
import Paytm from '../images/paytm-icon.svg';
import PaymentSuccessAnimation from '../images/payment-success.mp4';

const Payment: React.FC<{ onClose: () => void; }> = ({ onClose }) => {
    useEffect(() => {
        // Disable scroll and hide scrollbar when the component is mounted
        document.body.style.overflow = 'hidden';

        return () => {
            // Restore scroll behavior on unmount
            document.body.style.overflow = 'auto';
        };
    }, []);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('GooglePay');
    const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

    const handlePaymentChange = (method: string) => {
        setSelectedPaymentMethod(method);
    };

    const handlePaymentSuccess = () => {
        setIsBtnLoading(true);
        setTimeout(() => {
            setIsBtnLoading(false);
            setIsPaymentSuccess(true);
        }, 3000);
    }

    useEffect(() => {
        if (isPaymentSuccess) {
            setTimeout(() => {
                setIsPaymentSuccess(false);
                onClose();
            }, 7000);
        }
    }, [isPaymentSuccess]);

    return (
        <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="relative h-full w-full flex items-center justify-center px-5 md:px-0">
                <div className="relative bg-white p-5 rounded-md z-10 w-full md:w-[400px] animate-fade-in">
                    {
                        isPaymentSuccess
                            ?
                            <div>
                                <video autoPlay loop muted className="w-40 mx-auto">
                                    <source src={PaymentSuccessAnimation} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <h1 className='text-center mt-3 font-semibold'>Payment successful</h1>
                            </div>
                            :
                            <>
                                <h1 className="text-black text-center text-lg md:text-2xl font-semibold font-poppins mb-5">Payment</h1>

                                {/* Payment Methods */}
                                <div className="grid grid-cols-3 gap-x-5">
                                    <label
                                        className={`inline-block p-2 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all ${selectedPaymentMethod === 'GooglePay' ? 'border-black bg-gray-50' : 'border-gray-300'
                                            }`}
                                        onClick={() => handlePaymentChange('GooglePay')}
                                    >
                                        <div className="w-full">
                                            <img src={GooglePay} className="mx-auto" alt="Google Pay" />
                                        </div>
                                    </label>

                                    <label
                                        className={`inline-block p-2 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all ${selectedPaymentMethod === 'PhonePe' ? 'border-black bg-gray-50' : 'border-gray-300'
                                            }`}
                                        onClick={() => handlePaymentChange('PhonePe')}
                                    >
                                        <div className="w-full">
                                            <img src={PhonePe} className="mx-auto" alt="PhonePe" />
                                        </div>
                                    </label>

                                    <label
                                        className={`inline-block p-2 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedPaymentMethod === 'Paytm' ? 'border-black bg-gray-50' : 'border-gray-300'
                                            }`}
                                        onClick={() => handlePaymentChange('Paytm')}
                                    >
                                        <div className="w-full">
                                            <img src={Paytm} className="mx-auto" alt="Paytm" />
                                        </div>
                                    </label>
                                </div>

                                {/* Selected Payment Method */}
                                <p className="my-5 text-center font-semibold">Pay with {selectedPaymentMethod}</p>

                                {/* Proceed Button */}
                                <button
                                    disabled={isBtnLoading}
                                    onClick={handlePaymentSuccess}
                                    className="flex justify-center items-center bg-black hover:bg-[#333] text-white rounded w-full py-2 font-poppins disabled:bg-[#333] disabled:cursor-not-allowed"
                                >
                                    {
                                        isBtnLoading
                                            ?
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                                                Processing...
                                            </>
                                            :
                                            'Proceed to Pay'
                                    }
                                </button>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Payment;
