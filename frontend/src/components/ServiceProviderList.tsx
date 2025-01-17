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

    const { getLoggedInUserData, userData, openLoginModal } = useContext(UserContext);

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
    }), [];

    if (!userData) {
        closeClick();
        openLoginModal();
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
                                <div className='mr-3'>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        aria-label="Service location"
                                        className='focus:outline-none w-[20px]'
                                    >
                                        <path
                                            d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
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
                                <div className='mr-3'>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className='focus:outline-none w-[20px]'
                                    >
                                        <path
                                            d="M5.32943 3.27158C6.56252 2.8332 7.9923 3.10749 8.97927 4.09446C10.1002 5.21537 10.3019 6.90741 9.5843 8.23385L20.293 18.9437L18.8788 20.3579L8.16982 9.64875C6.84325 10.3669 5.15069 10.1654 4.02952 9.04421C3.04227 8.05696 2.7681 6.62665 3.20701 5.39332L5.44373 7.63C6.02952 8.21578 6.97927 8.21578 7.56505 7.63C8.15084 7.04421 8.15084 6.09446 7.56505 5.50868L5.32943 3.27158ZM15.6968 5.15512L18.8788 3.38736L20.293 4.80157L18.5252 7.98355L16.7574 8.3371L14.6361 10.4584L13.2219 9.04421L15.3432 6.92289L15.6968 5.15512ZM8.97927 13.2868L10.3935 14.7011L5.09018 20.0044C4.69966 20.3949 4.06649 20.3949 3.67597 20.0044C3.31334 19.6417 3.28744 19.0699 3.59826 18.6774L3.67597 18.5902L8.97927 13.2868Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
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
                                                    <div>
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            aria-label="Verified"
                                                            className="focus:outline-none w-[15px]"
                                                        >
                                                            <path
                                                                d="M10.007 2.10377C8.60544 1.65006 7.08181 2.28116 6.41156 3.59306L5.60578 5.17023C5.51004 5.35763 5.35763 5.51004 5.17023 5.60578L3.59306 6.41156C2.28116 7.08181 1.65006 8.60544 2.10377 10.007L2.64923 11.692C2.71404 11.8922 2.71404 12.1078 2.64923 12.308L2.10377 13.993C1.65006 15.3946 2.28116 16.9182 3.59306 17.5885L5.17023 18.3942C5.35763 18.49 5.51004 18.6424 5.60578 18.8298L6.41156 20.407C7.08181 21.7189 8.60544 22.35 10.007 21.8963L11.692 21.3508C11.8922 21.286 12.1078 21.286 12.308 21.3508L13.993 21.8963C15.3946 22.35 16.9182 21.7189 17.5885 20.407L18.3942 18.8298C18.49 18.6424 18.6424 18.49 18.8298 18.3942L20.407 17.5885C21.7189 16.9182 22.35 15.3946 21.8963 13.993L21.3508 12.308C21.286 12.1078 21.286 11.8922 21.3508 11.692L21.8963 10.007C22.35 8.60544 21.7189 7.08181 20.407 6.41156L18.8298 5.60578C18.6424 5.51004 18.49 5.35763 18.3942 5.17023L17.5885 3.59306C16.9182 2.28116 15.3946 1.65006 13.993 2.10377L12.308 2.64923C12.1078 2.71403 11.8922 2.71404 11.692 2.64923L10.007 2.10377ZM6.75977 11.7573L8.17399 10.343L11.0024 13.1715L16.6593 7.51465L18.0735 8.92886L11.0024 15.9999L6.75977 11.7573Z"
                                                                fill="black"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-x-1 md:gap-x-2 text-gray-500 mb-1">
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        aria-label="Location"
                                                        className="focus:outline-none w-[15px] md:w-[20px]"
                                                    >
                                                        <path
                                                            d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
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
