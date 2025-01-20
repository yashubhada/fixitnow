import React, { useContext, useEffect } from 'react'
import UserImage from '../images/user-image.jpg'
import { UserContext } from '../context/UserContext';

interface ServiceInformation {
    serviceAddress: string | undefined;
    serviceType: string | undefined;
    openServiceModal: () => void;
    closeClick: () => void;
}

const ServiceProviderList: React.FC<ServiceInformation> = ({ serviceAddress, serviceType, openServiceModal, closeClick }) => {

    const { getLoggedInUserData, userData, showToast } = useContext(UserContext);

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

    useEffect(() => {
        getLoggedInUserData();
    }, []);

    if (!userData) {
        closeClick();
        showToast("Please log in first to book your service", "error");
    }

    const provideresInfo = [
        {
            "_id": "provider_1",
            "name": "Mike's Plumbing",
            "email": "mike.plumbing@example.com",
            "phone": "+1234567890",
            "serviceType": "Plumber",
            "location": {
                "type": "Point",
                "coordinates": [-74.006, 40.7128]
            },
            "rating": 4.5,
            "isAvailable": true,
            "reviews": [
                {
                    "userId": "user_1",
                    "rating": 5,
                    "comment": "Excellent service!",
                    "createdAt": "2024-12-01T10:00:00Z"
                }
            ],
            "createdAt": "2024-12-01T10:00:00Z",
            "updatedAt": "2024-12-01T10:00:00Z"
        },
        {
            "_id": "provider_2",
            "name": "Samantha's Electricals",
            "email": "samantha.electrical@example.com",
            "phone": "+1234567891",
            "serviceType": "Electrician",
            "location": {
                "type": "Point",
                "coordinates": [-73.935242, 40.73061]
            },
            "rating": 4.8,
            "isAvailable": true,
            "reviews": [
                {
                    "userId": "user_2",
                    "rating": 5,
                    "comment": "Very professional and timely!",
                    "createdAt": "2024-12-02T09:30:00Z"
                }
            ],
            "createdAt": "2024-12-02T09:30:00Z",
            "updatedAt": "2024-12-02T09:30:00Z"
        },
        {
            "_id": "provider_3",
            "name": "John's Carpentry",
            "email": "john.carpentry@example.com",
            "phone": "+1234567892",
            "serviceType": "Carpenter",
            "location": {
                "type": "Point",
                "coordinates": [-118.2437, 34.0522]
            },
            "rating": 4.7,
            "isAvailable": false,
            "reviews": [
                {
                    "userId": "user_3",
                    "rating": 4,
                    "comment": "Great work but a bit late.",
                    "createdAt": "2024-12-03T11:00:00Z"
                }
            ],
            "createdAt": "2024-12-03T11:00:00Z",
            "updatedAt": "2024-12-03T11:00:00Z"
        },
        {
            "_id": "provider_4",
            "name": "Linda's Home Cleaning",
            "email": "linda.cleaning@example.com",
            "phone": "+1234567893",
            "serviceType": "Cleaner",
            "location": {
                "type": "Point",
                "coordinates": [-80.1918, 25.7617]
            },
            "rating": 3.9,
            "isAvailable": true,
            "reviews": [
                {
                    "userId": "user_4",
                    "rating": 5,
                    "comment": "Spotless cleaning, highly recommend!",
                    "createdAt": "2024-12-04T08:45:00Z"
                }
            ],
            "createdAt": "2024-12-04T08:45:00Z",
            "updatedAt": "2024-12-04T08:45:00Z"
        },
        {
            "_id": "provider_5",
            "name": "Emily's Appliance Repair",
            "email": "emily.repair@example.com",
            "phone": "+1234567894",
            "serviceType": "Appliance Repair",
            "location": {
                "type": "Point",
                "coordinates": [-122.4194, 37.7749]
            },
            "rating": 4.6,
            "isAvailable": false,
            "reviews": [
                {
                    "userId": "user_5",
                    "rating": 4,
                    "comment": "Fixed my fridge quickly!",
                    "createdAt": "2024-12-05T13:20:00Z"
                }
            ],
            "createdAt": "2024-12-05T13:20:00Z",
            "updatedAt": "2024-12-05T13:20:00Z"
        }
    ];

    return (
        <>
            <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Modal Content */}
                <div className="relative h-full w-full flex items-center justify-center px-5 md:px-0">
                    <div className="relative bg-white p-5 rounded-md z-10 w-full md:w-[500px] animate-fade-in">
                        <div className='grid grid-cols-2 gap-5'>
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
                            <h1 className='my-5 text-xl md:text-2xl font-poppins font-semibold'>Service Provider List</h1>
                            <div className='grid grid-cols-1 gap-y-5 max-h-[350px] md:max-h-[400px] overflow-y-scroll'>
                                {
                                    provideresInfo.map((provider, idx) =>
                                        <div key={idx} className='flex items-center gap-x-3 border border-[#dfdfdf] p-2 rounded'>
                                            <div className='w-28 h-24 md:w-36 md:h-36 rounded md:rounded-full overflow-hidden'>
                                                <img
                                                    src={UserImage}
                                                    className='w-full h-full object-cover'
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-x-1 mb-1">
                                                    <h1 className="text-base md:text-xl font-medium text-black">{provider.name}</h1>
                                                    <i className="ri-verified-badge-fill text-lg mr-2"></i>
                                                </div>

                                                <div className="flex items-center text-gray-500 mb-1">
                                                    <i className="ri-map-pin-line text-lg mr-2"></i>
                                                    <p className='text-sm md:text-base'>{provider.location.type}</p>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    {Array.from({ length: 5 }, (_, index) => (
                                                        <svg
                                                            key={index}
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            aria-label="Rating"
                                                            className="focus:outline-none w-[13px] md:w-[15px]"
                                                        >
                                                            <path
                                                                d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"
                                                                fill={index < provider.rating ? "rgba(234,113,46,1)" : "#555"}
                                                            />
                                                        </svg>
                                                    ))}
                                                    <div className="text-gray-500 text-sm md:text-base">({provider.rating})</div>
                                                </div>

                                                <button
                                                    onClick={openServiceModal}
                                                    className="bg-black hover:bg-[#333] text-white rounded px-2 py-1 text-sm mt-1"
                                                >
                                                    Send Request
                                                </button>
                                            </div>
                                        </div>
                                    )
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
        </>
    )
}

export default ServiceProviderList
