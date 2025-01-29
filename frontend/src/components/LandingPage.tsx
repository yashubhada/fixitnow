import React, { useContext, useRef, useState } from 'react'
import LogoBlack from '../images/fixitnow-logo-black.png'
import LogoWhite from '../images/fixitnow-logo-white.png'
import Gardener from '../images/gardener.png'
import Cleaner from '../images/cleaner.png'
import Plumber from '../images/plumber.png'
import Electrician from '../images/electrician.png'
import Carpenter from '../images/carpenter.png'
import Roofing from '../images/roofing.png'
import Painter from '../images/painter.png'
import SmartHome from '../images/smart-home.png'
import HomeRenovation from '../images/renovation.png'
import Flooring from '../images/flooring.png'
import LandingImage from '../images/landingImg.svg'
import RightAngleArrow from '../images/right-angle-arrow.png'
import AboutImg from '../images/about.svg'
import KeyFeatures from '../images/features.svg'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import ServiceProviderList from './ServiceProviderList'
import { UserContext } from '../context/UserContext'
import ServiceModal from './ServiceModal'
import Address from './address.json'
import PageLoading from './PageLoading'

const LandingPage: React.FC = () => {

    const { openLoginModal, isLoading, loginFormModal, isSignupForm, userData, handleLogout } = useContext(UserContext);

    const currentYear = new Date().getFullYear();

    // location input ref
    const locationInputRef = useRef<HTMLInputElement>(null);
    const handleLocationInputRef = (): void => {
        locationInputRef.current?.focus();
    }

    // services input ref
    const servicesInputRef = useRef<HTMLInputElement>(null);
    const handleServicesInputRef = (): void => {
        servicesInputRef.current?.focus();
    }

    type ServiceCategoryType = {
        icon: string;
        title: string;
    };

    const serviceCategory: ServiceCategoryType[] = [
        {
            title: "Cleaning",
            icon: Cleaner
        },
        {
            title: "Plumbing",
            icon: Plumber
        },
        {
            title: "Electrician",
            icon: Electrician
        },
        {
            title: "Carpentry",
            icon: Carpenter
        },
        {
            title: "Garden",
            icon: Gardener
        },
        {
            title: "Painter",
            icon: Painter
        },
        {
            title: "Home Renovation",
            icon: HomeRenovation
        },
        {
            title: "Smart Home Installation",
            icon: SmartHome
        },
        {
            title: "Roofing",
            icon: Roofing
        },
        {
            title: "Flooring Specialist",
            icon: Flooring
        },
    ];

    // select user Address 
    interface AddressType {
        address: string;
    };

    const [userAddress, setUserAddress] = useState<string>("");
    const [filteredUserAddress, setFilteredUserAddress] = useState<AddressType[]>([]);

    const handleUserAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let word = e.target.value.toLowerCase();
        setUserAddress(word);
        if (word !== "") {
            let filteredData = Address.filter(ary =>
                ary.address.toLowerCase().includes(word)
            );
            setFilteredUserAddress(filteredData)
        } else {
            setFilteredUserAddress([]);
        }
    }

    // select service type
    const [serviceProviderValue, setServiceProviderValue] = useState<string | undefined>("");
    const [filteredServiceCategory, setFilteredServiceCategory] = useState<ServiceCategoryType[]>([]);

    const handleServiceProviderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let word = e.target.value.toLowerCase();
        setServiceProviderValue(word);
        if (word !== "") {
            let filteredData = serviceCategory.filter(service =>
                service.title.toLowerCase().includes(word)
            );
            setFilteredServiceCategory(filteredData)
        } else {
            setFilteredServiceCategory([]);
        }
    }

    // service provider list modal handling
    const [isOpenServiceProviderListModal, setIsOpenServiceProviderListModal] = useState<boolean>(false);
    const handleServiceProviderListModal = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (userAddress !== "" && serviceProviderValue !== "") {
            setIsOpenServiceProviderListModal(true);
        }
    }
    const closeServiceProviderListModal = (): void => {
        setIsOpenServiceProviderListModal(false);
    }

    // Key features
    interface KeyFeatures {
        id: number;
        title: string;
        description: string;
    };

    const keyFeatures: KeyFeatures[] = [
        { id: 1, title: 'Find Trusted Service Providers', description: 'Say goodbye to endless searches and uncertainty. With Fixitnow, you get access to verified professionals in your area. Every service provider is reviewed and rated by real users, ensuring you always get the best service.' },
        { id: 2, title: 'Book Services Anytime, Anywhere', description: 'Life happens, and we’re here to help. Whether it’s a late-night plumbing emergency or a weekend home cleaning, our platform lets you book services on-demand, whenever you need them.' },
        { id: 3, title: 'Location-Based Service Matching', description: 'We make it easy to find help nearby. Our platform matches you with skilled professionals closest to your location, so you can save time and get quick assistance.' },
        { id: 4, title: 'Secure Payments', description: 'Your security is our priority. Pay for services conveniently and securely through our platform, with multiple payment options to suit your needs.' },
        { id: 5, title: 'Wide Range of Services', description: 'From home repairs to personal care, automotive needs, and more—our platform covers it all. Whatever you need, we’ve got the right expert for the job.' },
        { id: 6, title: 'Verified and Reliable Professionals', description: 'All service providers go through a strict verification process. We ensure only experienced and trustworthy professionals are listed on our platform, giving you peace of mind.' },
        { id: 7, title: 'Customer Reviews and Ratings', description: 'Make informed decisions with access to genuine customer reviews and ratings. See what others are saying about service providers before you book.' },
        { id: 8, title: 'Affordable and Transparent Pricing', description: 'No hidden charges, no surprises. Get upfront pricing for every service and choose what works best for your budget.' }
    ];
    const [activeId, setActiveId] = useState<number | null>(null);

    const toggleKeyFeatures = (id: number) => {
        setActiveId(activeId === id ? null : id);
    };

    const [requestedProvider, setRequestedProvider] = useState<any | null>(() => {
        const storedProvider = localStorage.getItem("requestedProvider");
        return storedProvider ? JSON.parse(storedProvider) : null;
    });

    const handleAcceptedService = (providerData: any): void => {
        setIsOpenServiceProviderListModal(false);
        setRequestedProvider(providerData); // Update requestedProvider state
        localStorage.setItem("requestedProvider", JSON.stringify(providerData)); // Store in local storage
    };

    if (isLoading) {
        return <PageLoading />
    }

    return (
        <>
            {/* if user is login */}
            <section className='fixed top-3 right-3 w-[130px] z-10'>
                <div className='relative group w-full flex justify-end'>
                    {
                        userData?.user?.role === "serviceTaker"
                            ?
                            <>
                                <div className='w-full cursor-pointer flex items-center justify-center gap-x-3 bg-white p-2 border shadow rounded-lg transition-all duration-300 ease-in-out hover:bg-black hover:text-white'>
                                    <img className='w-10 h-10 shadow rounded-full bg-white' src={userData?.user?.avatar} />
                                    <div className='text-lg font-medium'>
                                        {userData?.user?.name}
                                    </div>
                                </div>
                                <div className='absolute top-full left-0 w-full shadow bg-white p-1 rounded-md hidden group-hover:block'>
                                    <ul>
                                        <li>
                                            <div className='flex items-center justify-center py-2 bg-white rounded-md transition-all duration-300 ease-in-out hover:bg-black hover:text-white cursor-pointer'>
                                                <i className="ri-history-line text-lg mr-3"></i>
                                                <span className='text-lg'>History</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div onClick={handleLogout} className='flex items-center justify-center py-2 bg-white rounded-md transition-all duration-300 ease-in-out hover:bg-black hover:text-white cursor-pointer'>
                                                <i className="ri-logout-box-line text-lg mr-3"></i>
                                                <span className='text-lg'>Logout</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </>
                            :
                            <div
                                onClick={openLoginModal}
                                className='w-full cursor-pointer flex items-center justify-center bg-white p-2 shadow rounded-lg transition-all duration-300 ease-in-out hover:bg-black hover:text-white'
                            >
                                <i className="ri-login-box-line text-xl mr-2"></i>
                                <span className='text-lg'>Login</span>
                            </div>
                    }
                </div>
            </section>

            {/* hero section */}
            <section className='max-w-[1360px] mx-auto flex items-center px-4 pt-10 md:px-10 md:pt-20'>
                <div className='flex items-center w-full'>
                    <div className='w-full md:w-1/2'>
                        <img
                            src={LogoBlack}
                            alt="fixitnow logo"
                            className='w-12 md:w-16'
                        />
                        <h1 className='mt-4 text-black text-[30px] md:text-[52px] font-semibold leading-[44px] md:leading-[64px] font-poppins'>Help is Just Around the Corner</h1>
                        <div className='font-roboto w-full md:w-[400px] mt-8'>
                            <form
                                onSubmit={handleServiceProviderListModal}
                                className='grid grid-cols-1 gap-3'
                            >
                                <div
                                    onClick={handleLocationInputRef}
                                    className='relative flex items-center justify-between py-[10px] px-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                >
                                    <i className="ri-map-pin-line text-xl mr-3"></i>
                                    <input
                                        type="text"
                                        value={userAddress}
                                        onChange={handleUserAddressChange}
                                        ref={locationInputRef}
                                        required
                                        tabIndex={1}
                                        placeholder='Service location'
                                        className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                    />
                                    {/* user address list */}
                                    {
                                        filteredUserAddress.length > 0 &&
                                        <ul className='absolute z-10 max-h-[220px] overflow-x-hidden overflow-y-scroll custom-scrollbar top-[50px] py-3 text-base left-0 w-full rounded-md bg-white text-black' style={{ boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.16)' }}>
                                            {filteredUserAddress.length > 0 ? (
                                                filteredUserAddress.map((ary, index) => (
                                                    <li
                                                        key={index}
                                                        className='flex items-center cursor-pointer hover:bg-[#f3f3f3] p-2 overflow-hidden'
                                                        onClick={
                                                            (): void => {
                                                                setUserAddress(ary?.address)
                                                                setFilteredUserAddress([])
                                                            }
                                                        }
                                                    >
                                                        <i className="ri-map-pin-line text-lg mr-3"></i>
                                                        {ary?.address}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-gray-500 p-2">No results found</li>
                                            )}
                                        </ul>
                                    }
                                </div>
                                <div
                                    onClick={handleServicesInputRef}
                                    className='relative flex items-center justify-between py-[10px] px-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                >
                                    <i className="ri-tools-fill text-xl mr-3"></i>
                                    <input
                                        type="text"
                                        ref={servicesInputRef}
                                        required
                                        tabIndex={2}
                                        placeholder='Service type (e.g., Electrician)'
                                        value={serviceProviderValue}
                                        onChange={handleServiceProviderChange}
                                        className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                    />
                                    {/* serviceCategory list */}
                                    {
                                        filteredServiceCategory.length > 0 &&
                                        <ul className='absolute z-10 max-h-[220px] overflow-x-hidden overflow-y-scroll custom-scrollbar top-[50px] py-3 text-base left-0 w-full rounded-md bg-white text-black' style={{ boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.16)' }}>
                                            {filteredServiceCategory.length > 0 ? (
                                                filteredServiceCategory.map((service, index) => (
                                                    <li
                                                        key={index}
                                                        className='flex items-center gap-x-3 cursor-pointer hover:bg-[#f3f3f3] p-2 overflow-hidden'
                                                        onClick={
                                                            (): void => {
                                                                setServiceProviderValue(service?.title)
                                                                setFilteredServiceCategory([])
                                                            }
                                                        }
                                                    >
                                                        <div>
                                                            <div className='h-[20px] w-[20px]'>
                                                                <img src={service?.icon} className='w-full h-full object-contain' />
                                                            </div>
                                                        </div>
                                                        <div>{service?.title}</div>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-gray-500 p-2">No results found</li>
                                            )}
                                        </ul>
                                    }
                                </div>
                                <div className='w-fit'>
                                    <button
                                        tabIndex={3}
                                        className='font-poppins py-3 px-[25px] text-white bg-black hover:bg-[#333] rounded-md text-base font-medium leading-[20px]'
                                    >
                                        view
                                    </button>
                                </div>
                                <div
                                    onClick={openLoginModal}
                                    tabIndex={4}
                                    className="text-base mt-5 w-fit group relative cursor-pointer"
                                >
                                    <div className="text-sm md:text-base group-hover:text-black transition duration-300">
                                        Already have an account? Sign in
                                    </div>
                                    <div className="w-full h-[1px] bg-[#cbcbcb] relative overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-in-out"
                                            style={{
                                                transformOrigin: 'left',
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='hidden md:block w-1/2'>
                        <div className='w-full h-full'>
                            <img
                                src={LandingImage}
                                draggable='false'
                                className='w-full h-full object-contain'
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* About us  */}

            <section className='max-w-[1360px] mx-auto px-4 pt-10 md:px-10 md:pt-20'>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-10'>
                    <div className=''>
                        <img src={AboutImg} />
                    </div>
                    <div className='text-justify'>
                        <h1 className='text-black text-[36px] md:text-[52px] font-semibold leading-[44px] md:leading-[64px] font-poppins'>About Fixitnow</h1>
                        <p className='text-base mt-5 font-roboto leading-[24px]'>At Fixitnow, we believe that finding the right service professional should be simple, seamless, and stress-free. Our platform connects users with skilled and trusted service providers across a wide range of industries, from home repairs and maintenance to personal care, automotive services, and more.</p>
                        <p className='text-base mt-5 font-roboto leading-[24px]'>We are dedicated to making life easier by bringing expert help right to your doorstep. Whether you need a plumber to fix a leak, a beautician for an at-home makeover, or a handyman for urgent repairs, we've got you covered.</p>
                        <p className='text-base mt-5 font-roboto leading-[24px]'>Our mission is to empower both customers and service providers by creating a trusted space where quality meets convenience. We prioritize safety, reliability, and transparency, ensuring that every service provider on our platform is verified and reviewed by real users. With On Hand Services Provide, help is always within reach—just a few clicks away. Experience a new standard of service with us, where your needs come first, and your satisfaction is our top priority.</p>
                    </div>
                </div>
            </section>

            {/* services section */}
            <section className='max-w-[1360px] mx-auto px-4 pt-10 md:px-10 md:pt-20'>
                <h1 className='text-black text-[36px] md:text-[52px] font-semibold leading-[44px] md:leading-[64px] font-poppins'>Our Services</h1>
                <div className='grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-10 mt-10'>
                    {
                        serviceCategory.map((service, index) =>
                            <div key={index} className='border border-[#CCC] hover:border-black cursor-pointer rounded-md py-3 group'>
                                <div className='h-[80px] w-[50px] mx-auto'>
                                    <img src={service?.icon} className='w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-110' />
                                </div>
                                <div className='text-center text-sm mt-3'>
                                    {service?.title}
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>

            {/* Key features */}
            <section className='max-w-[1360px] mx-auto px-4 pt-10 md:px-10 md:pt-20'>
                <h1 className='text-black text-[36px] md:text-[52px] font-semibold leading-[44px] md:leading-[64px] font-poppins'>Key Features</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>
                    <div className='grid grid-cols-1 gap-5'>
                        {keyFeatures.map(features => (
                            <div key={features.id}>
                                <div
                                    className="flex items-center cursor-pointer"
                                    onClick={() => toggleKeyFeatures(features.id)}
                                >
                                    <img
                                        className={`w-2 mr-5 transform transition-transform duration-500 ${activeId === features.id ? 'rotate-90' : 'rotate-0'
                                            }`}
                                        src={RightAngleArrow}
                                        alt="Arrow"
                                    />
                                    <h1 className="text-lg md:text-2xl font-poppins font-medium">
                                        {features.title}
                                    </h1>
                                </div>
                                <div
                                    className={`ml-7 mt-1 overflow-hidden transition-all duration-500 ease-in-out ${activeId === features.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-base md:text-lg text-justify font-roboto">
                                        {features.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <img src={KeyFeatures} alt="Key features" />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className='bg-black w-full px-4 md:px-10 py-5 mt-10 md:mt-20'>
                <div className='max-w-[1360px] mx-auto block md:flex items-center justify-between'>
                    <div className='flex md:block items-center justify-center'>
                        <img className='w-10' src={LogoWhite} />
                    </div>
                    <div className='text-white text-sm md:text-base text-center md:text-right mt-5 md:mt-0'>
                        <p>© {currentYear} fixitnow, All Rights Reserved</p>
                    </div>
                </div>
            </footer>

            {
                loginFormModal && <LoginForm />
            }

            {
                isSignupForm && <SignupForm />
            }

            {
                isOpenServiceProviderListModal &&
                <ServiceProviderList
                    serviceAddress={userAddress}
                    serviceType={serviceProviderValue}
                    handleAcceptedService={handleAcceptedService}
                    closeClick={closeServiceProviderListModal}
                />
            }

            {requestedProvider && (
                <ServiceModal providerData={requestedProvider} />
            )}
        </>
    )
}

export default LandingPage
