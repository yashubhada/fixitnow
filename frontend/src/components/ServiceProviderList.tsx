import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import ServiceRequestLoading from './ServiceRequestLoading';
import SingleProviderModel from './SingleProviderModel';

interface ServiceInformation {
    serviceAddress: string | undefined;
    serviceType: string | undefined;
    handleAcceptedService: (providerData: any) => void;
    closeClick: () => void;
}

const ServiceProviderList: React.FC<ServiceInformation> = ({ serviceAddress, serviceType, handleAcceptedService, closeClick }) => {
    const { baseUrl, userData, showToast, socketData, setSocketData, handleSocketRegister, handleEmitServiceRequest, handleOnServiceRequestResponse } = useContext(UserContext);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '0px';

        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '';
        };
    }, []);

    useEffect(() => {
        if (userData) {
            handleSocketRegister(userData?._id);
        }
    }, [userData]);

    useEffect(() => {
        if (!userData || userData.userRole !== "serviceTaker") {
            closeClick();
            showToast("Login first to book your service", "error");
        }
    }, [userData, closeClick]);

    interface Provider {
        _id: string;
        name: string;
        email: string;
        service: string;
        price: number;
        address: string;
        avatar: string;
        identityProof: string;
        isAvailable: boolean;
        userRole: string;
        reviews: any;
        createdAt: string;
        updatedAt: string;
    }

    const [loading, setLoading] = useState<boolean>(true);
    const [providers, setProviders] = useState<Provider[]>([]);
    const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${baseUrl}api/user/fetchAllProviders`);
                setProviders(response.data.providers);
            } catch (error) {
                console.error('Error fetching providers:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProviders();
    }, []);

    const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false);
    const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

    const sendRequest = (provider: Provider) => {
        if (userData) {
            setSelectedProvider(provider);
            handleEmitServiceRequest(
                userData._id,
                provider._id,
                userData
            );
            setIsRequestLoading(true);
        }
    };

    const [isShowSingleProvider, setIsShowSingleProvider] = useState<boolean>(false);
    const [singleProvider, setSingleProvider] = useState<Provider[]>([]);

    const openSingleServiceProviderModel = (provider: any): void => {
        setSingleProvider(provider);
        setIsShowSingleProvider(true);
    }

    const closeSingleServiceProviderModel = () => {
        setSelectedProvider(null);
        setIsShowSingleProvider(false);
    }

    useEffect(() => {
        if (isRequestLoading) {
            const timeoutId = setTimeout(() => {
                setIsRequestLoading(false);
                showToast("Service provider not responding. Please try again later", "error");
            }, 30000);

            return () => clearTimeout(timeoutId);
        }
    }, [isRequestLoading]);

    const selectedProviderRef = useRef(selectedProvider);
    useEffect(() => {
        selectedProviderRef.current = selectedProvider;
    }, [selectedProvider]);

    useEffect(() => {
        handleOnServiceRequestResponse();
        if (socketData) {
            if (socketData.status === "declined") {
                showToast("Sorry, your request has been declined. Please try again later", "error");
                setIsRequestLoading(false);
            }

            if (socketData.status === "accepted") {
                showToast("Your request has been successfully accepted", "success");
                handleAcceptedService(selectedProviderRef.current);
            }

            const timeout = setTimeout(() => setSocketData(null), 500);
            return () => clearTimeout(timeout);
        }
    }, [socketData]);

    const calculateAverageRating = (reviews: any) => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
        return totalRating / reviews.length;
    };

    useEffect(() => {
        if (loading === false && providers) {
            const filtered = providers.filter(
                (provider) => provider.service === serviceType
                    && provider.address === serviceAddress
                    && provider.isAvailable === true
            );
            setFilteredProviders(filtered);
        }
    }, [providers, loading]);

    if (!userData || userData?.userRole !== "serviceTaker") {
        return null;
    }

    return (
        <>
            <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative h-full w-full flex items-center justify-center px-5 md:px-0">
                    <div className="relative bg-white p-5 rounded-md z-10 w-full md:w-[500px] animate-fade-in">
                        <div className='grid grid-cols-2 gap-5 mb-5'>
                            <div className='flex items-center justify-between py-[10px] px-3 bg-white cursor-text w-full border-2 rounded-md border-black'>
                                <i className="ri-map-pin-line text-lg mr-2"></i>
                                <div className='text-black w-full'>
                                    <input
                                        value={serviceAddress}
                                        type="text"
                                        readOnly
                                        className='outline-none border-0 w-full'
                                    />
                                </div>
                            </div>
                            <div className='flex items-center justify-between py-[10px] px-3 bg-white cursor-text w-full border-2 rounded-md border-black'>
                                <i className="ri-tools-fill text-lg mr-2"></i>
                                <div className='text-black w-full'>
                                    <input
                                        value={serviceType}
                                        type="text"
                                        readOnly
                                        className='outline-none border-0 w-full'
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='grid grid-cols-1 gap-y-5 max-h-[350px] md:max-h-[400px] overflow-y-auto'>
                                {
                                    loading
                                        ?
                                        <>
                                            <div className="flex items-center gap-x-3 border border-[#dfdfdf] p-2 rounded animate-pulse">
                                                <div className="bg-gray-300 w-36 h-36 rounded"></div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="bg-gray-300 h-5 w-2/3 rounded"></div>
                                                    <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
                                                    <div className="flex items-center gap-1">
                                                        {Array.from({ length: 5 }, (_, index) => (
                                                            <div key={index} className="bg-gray-300 w-4 h-4 rounded-full"></div>
                                                        ))}
                                                    </div>
                                                    <div className="bg-gray-300 h-6 w-1/3 rounded"></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-x-3 border border-[#dfdfdf] p-2 rounded animate-pulse">
                                                <div className="bg-gray-300 w-36 h-36 rounded"></div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="bg-gray-300 h-5 w-2/3 rounded"></div>
                                                    <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
                                                    <div className="flex items-center gap-1">
                                                        {Array.from({ length: 5 }, (_, index) => (
                                                            <div key={index} className="bg-gray-300 w-4 h-4 rounded-full"></div>
                                                        ))}
                                                    </div>
                                                    <div className="bg-gray-300 h-6 w-1/3 rounded"></div>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        filteredProviders.length !== 0
                                            ?
                                            filteredProviders.map((provider, idx) =>
                                                <div key={idx} className='flex items-center gap-x-3 border border-[#dfdfdf] p-2 rounded'>
                                                    <img
                                                        src={provider.avatar}
                                                        className='w-28 md:w-36 rounded cursor-pointer'
                                                        onClick={() => openSingleServiceProviderModel(provider)}
                                                    />
                                                    <div>
                                                        <div
                                                            onClick={() => openSingleServiceProviderModel(provider)}
                                                            className="flex items-center gap-x-1 mb-1 cursor-pointer"
                                                        >
                                                            <h1 className="text-base md:text-xl font-medium text-black">{provider.name}</h1>
                                                            <i className="ri-verified-badge-line text-lg mr-2"></i>
                                                        </div>

                                                        <div className="flex items-center mb-1">
                                                            <p>₹{provider.price}.00</p>
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

                                                        <button
                                                            onClick={() => sendRequest(provider)}
                                                            className="bg-black hover:bg-[#333] text-white rounded w-[120px] px-3 py-2 text-sm mt-1"
                                                        >
                                                            Send Request
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                            :
                                            <div className='text-red-600 text-center'>No <span className='font-bold'>{serviceType}</span> was found in <span className='font-bold'>{serviceAddress}</span></div>
                                }
                            </div>
                        </div>
                        <div
                            onClick={closeClick}
                            className='bg-black p-1 rounded-full absolute -top-3 -right-3 cursor-pointer'
                        >
                            <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                tabIndex={0}
                                className="focus:outline-none"
                            >
                                <path
                                    d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {
                isRequestLoading && <ServiceRequestLoading providerName={selectedProvider?.name} />
            }

            {
                isShowSingleProvider &&
                <SingleProviderModel
                    provider={singleProvider}
                    closeModel={closeSingleServiceProviderModel}
                />
            }
        </>
    );
};

export default ServiceProviderList;