import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
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
import Address from '../components/address.json'
import { useNavigate } from "react-router-dom";

const ProviderProfile: React.FC = () => {

    const { baseUrl, userData, setUserData, showToast } = useContext(UserContext);

    const navigate = useNavigate();

    interface ProfileType {
        name?: string;
        service?: string;
        price?: number;
        address?: string;
        avatar?: any;
        identityProof?: any;
    }

    const [profile, setProfile] = useState<ProfileType>({
        name: userData?.name,
        avatar: userData?.avatar,
        service: userData?.service,
        price: userData?.price,
        address: userData?.address,
        identityProof: userData?.identityProof
    });

    const [newProfile, setNewProfile] = useState<ProfileType>({});

    const [isDisableBtn, setIsDisableBtn] = useState<boolean>(true);
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
    const [providerIdentityProof, setProviderIdentityProof] = useState<string | null>(null);

    const avatarFileRef = useRef<HTMLInputElement>(null);

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

    // select service
    const [filteredServiceCategory, setFilteredServiceCategory] = useState<ServiceCategoryType[]>([]);

    //select address
    interface AddressType {
        address: string;
    };

    const [filteredAddress, setFilteredAddress] = useState<AddressType[]>([]);

    const handleEditAvatarClick = () => {
        if (avatarFileRef.current) {
            avatarFileRef.current.click();
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsDisableBtn(false);
        const { name, value, files } = e.target;

        if (name === "avatar" && files && files[0]) {
            const selectedFile = files[0];
            const fileType = selectedFile.type;
            const validExtensions = ["image/jpeg", "image/png", "image/jpg"];
            if (validExtensions.includes(fileType)) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setProfile((prevData) => ({
                        ...prevData,
                        avatar: reader.result,
                    }));
                    setNewProfile((prev) => ({
                        ...prev,
                        avatar: selectedFile,
                    }));
                };
                reader.readAsDataURL(selectedFile);
            } else {
                showToast("Only .jpg, .jpeg, and .png images are allowed", "error");
            }
        } else if (name === "identityProof" && files && files[0]) {
            const selectedFile = files[0];
            const fileType = selectedFile.type;
            const validExtensions = ["application/pdf"];
            if (validExtensions.includes(fileType)) {
                setProviderIdentityProof(selectedFile.name);
                setNewProfile((prev) => ({
                    ...prev,
                    identityProof: selectedFile,
                }));
            } else {
                showToast("Only PDF files are allowed", "error");
            }
        } else if (name === "service") {
            setNewProfile((prev) => ({ ...prev, service: value }));
            setProfile((prev) => ({ ...prev, service: value }));
            if (value.trim() !== "") {
                const filteredData = serviceCategory.filter((service) =>
                    service.title.toLowerCase().includes(value.toLowerCase())
                );
                setFilteredServiceCategory(filteredData);
            } else {
                setFilteredServiceCategory([]);
            }
        } else if (name === "address") {
            setNewProfile((prev) => ({ ...prev, address: value }));
            setProfile((prev) => ({ ...prev, address: value }));
            if (value.trim() !== "") {
                const filteredData = Address.filter((ary) =>
                    ary.address.toLowerCase().includes(value.toLowerCase())
                );
                setFilteredAddress(filteredData);
            } else {
                setFilteredAddress([]);
            }
        } else {
            setNewProfile((prev) => ({ ...prev, [name]: value }));
            setProfile((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleUpdateProfile: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        console.log("New profile", newProfile);
        setIsBtnLoading(true);
        try {
            const formData = new FormData();
            if (newProfile.name) {
                formData.append("name", newProfile.name);
            }
            if (newProfile.avatar) {
                formData.append("avatar", newProfile.avatar);
            }
            if (newProfile.service) {
                formData.append("service", newProfile.service);
            }
            if (newProfile.price) {
                formData.append("price", newProfile.price !== null ? newProfile.price.toString() : "");
            }
            if (newProfile.address) {
                formData.append("address", newProfile.address);
            }
            if (newProfile.identityProof) {
                formData.append("identityProof", newProfile.identityProof);
            }
            const response = await axios.patch(`${baseUrl}api/user/handleUpdateProvider/${userData._id}`,
                formData,
                { withCredentials: true }
            );
            if (response.data.success) {
                showToast(response.data.message, "success");
                setUserData(response.data.provider);
                navigate("/provider-dashboard");
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
            setIsBtnLoading(false);
        }
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-[400px]">
                <form onSubmit={handleUpdateProfile} className='w-full'>
                    <div className='flex justify-center mb-5'>
                        <div className='relative'>
                            <img
                                src={profile.avatar}
                                className='w-28 h-28 rounded-full shadow border'
                            />
                            <div
                                onClick={handleEditAvatarClick}
                                className='bg-white w-9 h-9 text-center rounded-full absolute -top-1 -right-1 cursor-pointer shadow'
                            >
                                <i className="ri-pencil-fill leading-9 text-xl"></i>
                            </div>
                            <input
                                type="file"
                                ref={avatarFileRef}
                                onChange={handleFormChange}
                                name="avatar"
                                className='hidden'
                            />
                        </div>
                    </div>
                    <div
                        className='mb-5 flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                    >
                        <i className="ri-user-line text-xl mr-3"></i>
                        <input
                            type="text"
                            autoComplete='off'
                            placeholder='Enter your name'
                            onChange={handleFormChange}
                            value={profile.name}
                            name="name"
                            required
                            className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                        />
                    </div>
                    <div
                        className='mb-5 flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                    >
                        <i className="ri-mail-line text-xl mr-3"></i>
                        <input
                            type="text"
                            autoComplete='off'
                            value={userData?.email}
                            readOnly
                            className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                        />
                    </div>
                    <div
                        className='mb-5 relative flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                    >
                        <i className="ri-tools-fill text-xl mr-3"></i>
                        <input
                            type="text"
                            autoComplete='off'
                            onChange={handleFormChange}
                            name="service"
                            value={profile.service}
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
                                                    setNewProfile((prevData) => ({
                                                        ...prevData,
                                                        service: service?.title,
                                                    }));
                                                    setProfile((prevData) => ({
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
                        className='mb-5 relative flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                    >
                        <i className="ri-map-pin-line text-xl mr-3"></i>
                        <input
                            type="text"
                            autoComplete='off'
                            onChange={handleFormChange}
                            name="address"
                            value={profile.address}
                            placeholder='Enter your service address'
                            required
                            className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                        />
                        {
                            filteredAddress.length > 0 &&
                            <ul className='absolute z-10 max-h-[150px] overflow-x-hidden overflow-y-scroll custom-scrollbar top-[50px] py-3 text-base left-0 w-full rounded-md bg-white text-black' style={{ boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.16)' }}>
                                {filteredAddress.length > 0 ? (
                                    filteredAddress.map((ary, index) => (
                                        <li
                                            key={index}
                                            className='flex items-center cursor-pointer hover:bg-[#f3f3f3] p-2 overflow-hidden'
                                            onClick={
                                                (): void => {
                                                    setNewProfile((prevData) => ({
                                                        ...prevData,
                                                        address: ary?.address,
                                                    }));
                                                    setProfile((prevData) => ({
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
                        className='mb-5 flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                    >
                        <i className="ri-money-rupee-circle-line text-xl mr-3"></i>
                        <input
                            type="number"
                            autoComplete='off'
                            onChange={handleFormChange}
                            value={profile?.price}
                            name="price"
                            required
                            placeholder='Enter service price (e.g., ₹499)'
                            className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black'
                        />
                    </div>
                    <div
                        className="mt-5 flex items-center justify-between py-[6px] md:py-[10px] px-2 md:px-5 bg-[#f3f3f3] w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white"
                    >
                        <i className="ri-id-card-line text-xl mr-3"></i>
                        <label htmlFor="providerIdentityProof" className="w-full text-[#5E5E5E] cursor-pointer bg-transparent mr-3 outline-none focus:text-black truncate">
                            {providerIdentityProof ? providerIdentityProof : "Upload your work license"}
                        </label>
                        <input
                            id="providerIdentityProof"
                            type="file"
                            onChange={handleFormChange}
                            name="identityProof"
                            className="hidden"
                        />
                        <a
                            href={profile?.identityProof}
                            target="_blank"
                            className="bg-black px-3 py-1 rounded text-white"
                        >
                            view
                        </a>
                    </div>
                    <button
                        type="submit"
                        className='w-full mt-5 flex justify-center items-center font-poppins py-[10px] text-white bg-black hover:bg-[#333] rounded-md text-sm font-medium leading-[20px] select-none disabled:bg-[#333] disabled:cursor-not-allowed'
                        disabled={isDisableBtn || isBtnLoading}
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
                                    Saving...
                                </>
                                :
                                'Save Changes'
                        }
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProviderProfile;