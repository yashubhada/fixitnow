import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import RoleImg1 from '../images/service-provider.png'
import RoleImg2 from '../images/user.png'
import { UserContext } from '../context/UserContext';
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
import Address from './address.json'

const SignupForm: React.FC = () => {

    const { baseUrl, closeSignupForm, openLoginModal, showToast } = useContext(UserContext);

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

    // Show and hide password    
    const [showUserPassword, setShowUserPassword] = useState<boolean>(true);
    const handleUserTogglePassword = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowUserPassword((prev) => !prev);
    };

    const [selectedRole, setSelectedRole] = useState('serviceTaker');

    const handleRoleChange = (role: string) => {
        setSelectedRole(role);
    };

    const [isUserSignUpFormLoading, setIsUserSignUpFormLoading] = useState<boolean>(false);

    // image chage
    const [userAvatarImg, setUserAvatarImg] = useState<File | null>(null);

    // user data for sign up

    const [userData, setUserData] = useState<{
        name: string;
        password: string;
        email: string;
        avatar: File | null;
    }>({
        name: "",
        password: "",
        email: "",
        avatar: null,
    });

    const handleUserAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const fileType = file.type;
            const validExtensions = ["image/jpeg", "image/png", "image/jpg"];

            if (validExtensions.includes(fileType)) {
                setUserAvatarImg(file);

                // Update userData state
                setUserData((prevData) => ({
                    ...prevData,
                    avatar: file,
                }));
            } else {
                showToast("Only .jpg, .jpeg, and .png images are allowed", "error");
            }
        }
    };

    const handleUserSignUp: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsUserSignUpFormLoading(true);
        try {
            if (userData.password.length < 8) {
                return showToast("Password length must be 8 characters or longer", "error");
            }

            // Create FormData instance and append the fields
            const userFormData = new FormData();
            userFormData.append("name", userData.name);
            userFormData.append("email", userData.email);
            userFormData.append("password", userData.password);
            if (userData.avatar) {
                userFormData.append("avatar", userData.avatar);
            }

            const response = await axios.post(`${baseUrl}api/user/userSignup`, userFormData);
            showToast(response.data.message, "success");
            if (response.data.success) {
                openLoginModal();
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    if (err.response.status === 400) {
                        showToast(err.response.data.message, "error");
                    }
                }
            }
        } finally {
            setIsUserSignUpFormLoading(false);
        }
    };

    const handleUserSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    // provider form

    const [showProviderPassword, setShowProviderPassword] = useState<boolean>(true);
    const handleProviderTogglePassword = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowProviderPassword((prev) => !prev);
    };

    const [isProviderSignUpFormLoading, setIsProviderSignUpFormLoading] = useState<boolean>(false);

    // image chage
    const [providerAvatarImg, setProviderAvatarImg] = useState<File | null>(null);
    const [providerIdentityProof, setProviderIdentityProof] = useState<File | null>(null);

    // user data for sign up

    const [providerData, setProviderData] = useState<{
        name: string;
        email: string;
        service: string;
        price: number | null;
        address: string;
        password: string;
        avatar: File | null;
        identityProof: File | null;
    }>({
        name: "",
        email: "",
        service: "",
        price: null,
        address: "",
        password: "",
        avatar: null,
        identityProof: null,
    });

    // select service
    const [filteredServiceCategory, setFilteredServiceCategory] = useState<ServiceCategoryType[]>([]);
    const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let word = e.target.value.toLowerCase();
        setProviderData((prevData) => ({
            ...prevData,
            service: word,
        }));
        if (word !== "") {
            let filteredData = serviceCategory.filter(service =>
                service.title.toLowerCase().includes(word)
            );
            setFilteredServiceCategory(filteredData)
        } else {
            setFilteredServiceCategory([]);
        }
    }

    //select service
    interface AddressType {
        address: string;
    };

    const [filteredAddress, setFilteredAddress] = useState<AddressType[]>([]);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let word = e.target.value.toLowerCase();
        setProviderData((prevData) => ({
            ...prevData,
            address: word,
        }));
        if (word !== "") {
            let filteredData = Address.filter(ary =>
                ary.address.toLowerCase().includes(word)
            );
            setFilteredAddress(filteredData)
        } else {
            setFilteredAddress([]);
        }
    }

    const handleProviderAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const fileType = file.type;
            const validExtensions = ["image/jpeg", "image/png", "image/jpg"];

            if (validExtensions.includes(fileType)) {
                setProviderAvatarImg(file);

                // Update setProviderData state
                setProviderData((prevData) => ({
                    ...prevData,
                    avatar: file,
                }));
            } else {
                showToast("Only .jpg, .jpeg, and .png images are allowed", "error");
            }
        }
    };

    const handleProviderIdentityProofChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const fileType = file.type;
            const validExtensions = ["application/pdf"];

            if (validExtensions.includes(fileType)) {
                setProviderIdentityProof(file);

                // Update setProviderData state
                setProviderData((prevData) => ({
                    ...prevData,
                    identityProof: file,
                }));
            } else {
                showToast("Only PDF files are allowed", "error");
            }
        }
    };

    const handleProviderSignUp: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsProviderSignUpFormLoading(true);
        try {
            if (providerData.password.length < 8) {
                return showToast("Password length must be 8 characters or longer", "error");
            }

            // Create FormData instance and append the fields
            const providerFormData = new FormData();
            providerFormData.append("name", providerData.name);
            providerFormData.append("email", providerData.email);
            providerFormData.append("service", providerData.service);
            providerFormData.append("price", providerData.price !== null ? providerData.price.toString() : "");
            providerFormData.append("address", providerData.address);
            providerFormData.append("password", providerData.password);
            if (providerData.avatar) {
                providerFormData.append("avatar", providerData.avatar);
            }
            if (providerData.identityProof) {
                providerFormData.append("identityProof", providerData.identityProof);
            }

            const response = await axios.post(`${baseUrl}api/user/providerSignup`, providerFormData);
            showToast(response.data.message, "success");
            if (response.data.success) {
                openLoginModal();
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    if (err.response.status === 400) {
                        showToast(err.response.data.message, "error");
                    }
                }
            }
        } finally {
            setIsProviderSignUpFormLoading(false);
        }
    };

    const handleProviderSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProviderData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    return (
        <>
            <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Modal Content */}
                <div className="relative h-full w-full flex items-center justify-center px-5 md:px-0">
                    <div className="relative bg-white p-5 rounded-md z-10 w-full md:w-[400px] animate-fade-in max-h-[530px]">
                        <div className="grid grid-cols-2 gap-5 items-stretch justify-items-center mb-5">
                            <label
                                className={`relative flex items-center justify-between p-6 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-all w-full ${selectedRole === 'serviceTaker' ? 'border-black bg-gray-50' : ''
                                    }`}
                                onClick={() => handleRoleChange('serviceTaker')}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    className="sr-only peer"
                                    checked={selectedRole === 'serviceTaker'}
                                    readOnly
                                />
                                <div>
                                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                                        <img src={RoleImg2} alt="ClientRoleImg" className="w-[25px]" />
                                    </div>
                                    <div className="mt-3">
                                        <h3 className="font-semibold text-base text-center">Service Taker</h3>
                                    </div>
                                </div>
                                <span className="absolute top-4 right-4 w-5 h-5 border border-gray-300 rounded-full peer-checked:bg-black peer-checked:border-black flex items-center justify-center transition-all">
                                    <span className="w-2 h-2 bg-white rounded-full peer-checked:block hidden"></span>
                                </span>
                                <div className="absolute inset-0 border-2 rounded-lg border-transparent peer-checked:border-black transition-all"></div>
                            </label>

                            <label
                                className={`relative flex items-center justify-between p-6 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-all w-full ${selectedRole === 'serviceProvider' ? 'border-black bg-gray-50' : ''
                                    }`}
                                onClick={() => handleRoleChange('serviceProvider')}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    className="sr-only peer"
                                    checked={selectedRole === 'serviceProvider'}
                                    readOnly
                                />
                                <div>
                                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                                        <img src={RoleImg1} alt="FreeLancerRoleImg" className="w-[25px]" />
                                    </div>
                                    <div className="mt-3">
                                        <h3 className="font-semibold text-base text-center">Service Provider</h3>
                                    </div>
                                </div>
                                <span className="absolute top-4 right-4 w-5 h-5 border border-gray-300 rounded-full peer-checked:bg-black peer-checked:border-black flex items-center justify-center transition-all">
                                    <span className="w-2 h-2 bg-white rounded-full peer-checked:block hidden"></span>
                                </span>
                                <div className="absolute inset-0 border-2 rounded-lg border-transparent peer-checked:border-black transition-all"></div>
                            </label>
                        </div>

                        <div className='w-full'>

                            {
                                selectedRole === 'serviceTaker'
                                    ?
                                    <form onSubmit={handleUserSignUp} className='w-full max-h-[300px] md:max-h-[350px] overflow-y-scroll overflow-x-hidden custom-scrollbar'>
                                        <div
                                            className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                        >
                                            <i className="ri-user-line text-xl mr-3"></i>
                                            <input
                                                type="text"
                                                onChange={handleUserSignUpChange}
                                                name="name"
                                                value={userData.name}
                                                autoComplete='off'
                                                placeholder='Enter your full name'
                                                required
                                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                            />
                                        </div>
                                        <div
                                            className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 mt-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                        >
                                            <i className="ri-mail-line text-xl mr-3"></i>
                                            <input
                                                type="email"
                                                onChange={handleUserSignUpChange}
                                                name="email"
                                                value={userData.email}
                                                autoComplete='off'
                                                placeholder='Enter your email'
                                                required
                                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                            />
                                        </div>
                                        <div
                                            className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 mt-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                        >
                                            <i className="ri-lock-2-line text-xl mr-3"></i>
                                            <input
                                                type={
                                                    showUserPassword ? 'password' : 'text'
                                                }
                                                placeholder='Enter your password'
                                                onChange={handleUserSignUpChange}
                                                name="password"
                                                value={userData.password}
                                                autoComplete='off'
                                                required
                                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                            />
                                            <div
                                                onClick={handleUserTogglePassword}
                                                className='ml-3'
                                            >
                                                {
                                                    showUserPassword
                                                        ?
                                                        <i className="ri-eye-off-line text-xl mr-3 cursor-pointer"></i>
                                                        :
                                                        <i className="ri-eye-line text-xl mr-3 cursor-pointer"></i>
                                                }
                                            </div>
                                        </div>
                                        <div
                                            className="mt-5 flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] cursor-pointer w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white"
                                        >
                                            <i className="ri-image-line text-xl mr-3"></i>
                                            <label htmlFor="fileUpload" className="w-full text-[#5E5E5E] cursor-pointer bg-transparent outline-none focus:text-black truncate">
                                                {userAvatarImg ? userAvatarImg.name : "Choose a file"}
                                            </label>
                                            <input
                                                id="fileUpload"
                                                type="file"
                                                onChange={handleUserAvatarChange}
                                                className="hidden"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className='w-full mt-5 flex justify-center items-center font-poppins py-[10px] text-white bg-black hover:bg-[#333] rounded-md text-sm font-medium leading-[20px] select-none disabled:bg-[#333] disabled:cursor-not-allowed'
                                            disabled={isUserSignUpFormLoading}
                                        >
                                            {
                                                isUserSignUpFormLoading
                                                    ?
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
                                                    :
                                                    'Sign up'
                                            }
                                        </button>
                                        <div className='my-7 relative'>
                                            <div className='w-full p-[0.1px] bg-[#3333]'></div>
                                            <div className="w-fit bg-white px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                Or
                                            </div>
                                        </div>
                                        <div className="text-center text-base"
                                            onClick={openLoginModal}
                                        >
                                            <span className='cursor-pointer'>
                                                Already have an account? Sign in
                                            </span>
                                        </div>
                                    </form>
                                    :
                                    <form onSubmit={handleProviderSignUp} className='w-full max-h-[300px] md:max-h-[350px] overflow-y-scroll overflow-x-hidden custom-scrollbar'>
                                        <div
                                            className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                        >
                                            <i className="ri-user-line text-xl mr-3"></i>
                                            <input
                                                type="text"
                                                autoComplete='off'
                                                onChange={handleProviderSignUpChange}
                                                name='name'
                                                value={providerData.name}
                                                placeholder='Enter your full name'
                                                required
                                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                            />
                                        </div>
                                        <div
                                            className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 mt-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                        >
                                            <i className="ri-mail-line text-xl mr-3"></i>
                                            <input
                                                type="email"
                                                autoComplete='off'
                                                onChange={handleProviderSignUpChange}
                                                name='email'
                                                value={providerData.email}
                                                placeholder='Enter your email'
                                                required
                                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                            />
                                        </div>
                                        <div
                                            className='relative flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 mt-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                        >
                                            <i className="ri-tools-fill text-xl mr-3"></i>
                                            <input
                                                type="text"
                                                autoComplete='off'
                                                onChange={handleServiceChange}
                                                name='service'
                                                value={providerData.service}
                                                placeholder='Enter your service (e.g., Electrician)'
                                                required
                                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                            />
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
                                                                        setProviderData((prevData) => ({
                                                                            ...prevData,
                                                                            service: service?.title,
                                                                        }));
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
                                        <div
                                            className='relative flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 mt-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                        >
                                            <i className="ri-map-pin-line text-xl mr-3"></i>
                                            <input
                                                type="text"
                                                autoComplete='off'
                                                onChange={handleAddressChange}
                                                name='address'
                                                value={providerData.address}
                                                placeholder='Enter your service address'
                                                required
                                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                            />
                                            {
                                                filteredAddress.length > 0 &&
                                                <ul className='absolute z-10 max-h-[220px] overflow-x-hidden overflow-y-scroll custom-scrollbar top-[50px] py-3 text-base left-0 w-full rounded-md bg-white text-black' style={{ boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.16)' }}>
                                                    {filteredAddress.length > 0 ? (
                                                        filteredAddress.map((ary, index) => (
                                                            <li
                                                                key={index}
                                                                className='flex items-center cursor-pointer hover:bg-[#f3f3f3] p-2 overflow-hidden'
                                                                onClick={
                                                                    (): void => {
                                                                        setProviderData((prevData) => ({
                                                                            ...prevData,
                                                                            address: ary?.address,
                                                                        }));
                                                                        setFilteredAddress([])
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
                                            className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 mt-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                        >
                                            <i className="ri-money-rupee-circle-line text-xl mr-3"></i>
                                            <input
                                                type="number"
                                                autoComplete='off'
                                                onChange={handleProviderSignUpChange}
                                                name='price'
                                                value={providerData.price?.toString()}
                                                placeholder='Enter your hourly price (e.g., 500)'
                                                required
                                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                            />
                                        </div>
                                        <div
                                            className='flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 mt-5 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                                        >
                                            <i className="ri-lock-2-line text-xl mr-3"></i>
                                            <input
                                                type={
                                                    showProviderPassword ? 'password' : 'text'
                                                }
                                                placeholder='Enter your password'
                                                onChange={handleProviderSignUpChange}
                                                name='password'
                                                value={providerData.password}
                                                autoComplete='off'
                                                required
                                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                                            />
                                            <div
                                                onClick={handleProviderTogglePassword}
                                                className='ml-3'
                                            >
                                                {
                                                    showProviderPassword
                                                        ?
                                                        <i className="ri-eye-off-line text-xl mr-3 cursor-pointer"></i>
                                                        :
                                                        <i className="ri-eye-line text-xl mr-3 cursor-pointer"></i>
                                                }
                                            </div>
                                        </div>
                                        <div
                                            className="mt-5 flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] cursor-pointer w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white"
                                        >
                                            <i className="ri-image-line text-xl mr-3"></i>
                                            <label htmlFor="providerAvatar" className="w-full text-[#5E5E5E] cursor-pointer bg-transparent outline-none focus:text-black truncate">
                                                {providerAvatarImg ? providerAvatarImg.name : "Choose your avtar"}
                                            </label>
                                            <input
                                                id="providerAvatar"
                                                type="file"
                                                onChange={handleProviderAvatarChange}
                                                className="hidden"
                                            />

                                        </div>
                                        <div
                                            className="mt-5 flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] cursor-pointer w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white"
                                        >
                                            <i className="ri-id-card-line text-xl mr-3"></i>
                                            <label htmlFor="providerIdentityProof" className="w-full text-[#5E5E5E] cursor-pointer bg-transparent outline-none focus:text-black truncate">
                                                {providerIdentityProof ? providerIdentityProof.name : "Upload your work license"}
                                            </label>
                                            <input
                                                id="providerIdentityProof"
                                                type="file"
                                                onChange={handleProviderIdentityProofChange}
                                                className="hidden"
                                            />

                                        </div>
                                        <button
                                            type="submit"
                                            className='w-full mt-5 flex justify-center items-center font-poppins py-[10px] text-white bg-black hover:bg-[#333] rounded-md text-sm font-medium leading-[20px] select-none disabled:bg-[#333] disabled:cursor-not-allowed'
                                            disabled={isProviderSignUpFormLoading}
                                        >
                                            {
                                                isProviderSignUpFormLoading
                                                    ?
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
                                                    :
                                                    'Sign up'
                                            }
                                        </button>
                                        <div className='my-7 relative'>
                                            <div className='w-full p-[0.1px] bg-[#3333]'></div>
                                            <div className="w-fit bg-white px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                Or
                                            </div>
                                        </div>
                                        <div className="text-center text-base"
                                            onClick={openLoginModal}
                                        >
                                            <span className='cursor-pointer'>
                                                Already have an account? Sign in
                                            </span>
                                        </div>
                                    </form>
                            }
                        </div>
                        <div
                            onClick={closeSignupForm}
                            className='bg-black p-1 rounded-full absolute -top-3 -right-3 cursor-pointer'
                        >
                            <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
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
            </div >
        </>
    )
}

export default SignupForm
