import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { UserContext } from '../context/UserContext';

interface ProviderData {
    _id: string;
    avatar: string;
    name: string;
    address: string;
    price: number;
}

interface Message {
    fromUserId: string;
    toUserId: string;
    message: string;
}

interface ServiceModalProps {
    providerData: ProviderData;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ providerData }) => {
    const { userData, socket, socketData, handleOnServiceRequestResponse, handleChatSendMessage } = useContext(UserContext);

    // Disable scroll and hide scrollbar when the component is mounted
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '0px';

        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '';
        };
    }, []);

    // Verification code state
    const [verificationCode, setVerificationCode] = useState<string | null>(() => {
        return localStorage.getItem("verificationCode") || null;
    });

    useEffect(() => {
        handleOnServiceRequestResponse();
        if (socketData) {
            setVerificationCode(socketData.verificationCode);
            localStorage.setItem("verificationCode", socketData.verificationCode);
        }
    }, [socket, socketData, handleOnServiceRequestResponse]);

    // Chat state and logic
    const [messages, setMessages] = useState<Message[]>([]);
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [chatInput, setChatInput] = useState<string>("");

    // typing message
    const [isTyping, setIsTyping] = useState(false);
    const [typingUserId, setTypingUserId] = useState<string | null>(null);

    useEffect(() => {
        if (socket) {
            const handleTyping = (data: { fromUserId: string }) => {
                if (data.fromUserId === providerData._id) {
                    setIsTyping(true);
                    setTypingUserId(data.fromUserId);
                }
            };

            const handleStopTyping = (data: { fromUserId: string }) => {
                if (data.fromUserId === providerData._id) {
                    setIsTyping(false);
                    setTypingUserId(null);
                }
            };

            socket.on('typing', handleTyping);
            socket.on('stopTyping', handleStopTyping);

            return () => {
                socket.off('typing', handleTyping);
                socket.off('stopTyping', handleStopTyping);
            };
        }
    }, [socket, providerData._id]);

    const toggleChat = useCallback(() => {
        setIsChatVisible((prev) => !prev);
    }, []);

    const sendMessage: React.FormEventHandler<HTMLFormElement> = useCallback(
        (e) => {
            e.preventDefault();
            if (chatInput.trim()) {
                const newMessage: Message = {
                    fromUserId: userData._id,
                    toUserId: providerData._id,
                    message: chatInput,
                };
                handleChatSendMessage(userData._id, providerData._id, chatInput);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                setChatInput("");
            } else {
                console.error("Chat input is empty");
            }
        },
        [chatInput, handleChatSendMessage, providerData._id, userData._id]
    );

    const handleChatInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setChatInput(e.target.value);

        if (socket) {
            // Emit typing event when the user starts typing
            socket.emit('typing', {
                fromUserId: userData._id,
                toUserId: providerData._id,
            });

            // Clear typing event after a delay (e.g., 1 second)
            const timeout = setTimeout(() => {
                socket.emit('stopTyping', {
                    fromUserId: userData._id,
                    toUserId: providerData._id,
                });
            }, 1000);

            // Clear the timeout if the user continues typing
            return () => clearTimeout(timeout);
        }
    }, [socket, userData._id, providerData._id]);

    const handleChatReceiveMessage = useCallback(() => {
        if (socket) {
            const listener = (data: { fromUserId: string; message: string }) => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        fromUserId: data.fromUserId,
                        toUserId: userData._id,
                        message: data.message,
                    },
                ]);
            };

            socket.on('receiveMessage', listener);

            return () => {
                socket.off('receiveMessage', listener);
            };
        }
    }, [socket, userData._id]);

    useEffect(() => {
        return handleChatReceiveMessage();
    }, [handleChatReceiveMessage, socket]);

    const messagesEndRef = useRef<HTMLDivElement | null>(null); // Define ref type explicitly

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-10">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Modal Content */}
            <div className="relative h-full w-full flex items-center justify-center p-5 md:p-10">
                <div className="relative bg-white p-5 rounded-md z-10 w-full md:w-[400px] animate-fade-in max-h-[530px]">
                    {/* Provider Info */}
                    <div className='flex items-center gap-x-3 rounded'>
                        <div className='w-28 h-24 md:w-32 md:h-32 rounded md:rounded-full overflow-hidden'>
                            <img
                                src={providerData.avatar}
                                alt={providerData.name}
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-1 mb-2">
                                <h1 className="text-base md:text-xl font-medium text-black">{providerData.name}</h1>
                                <i className="ri-verified-badge-fill text-lg mr-2"></i>
                            </div>
                            <div className="flex items-start text-gray-500 mb-2">
                                <i className="ri-map-pin-line text-base mr-2"></i>
                                <p className='text-sm md:text-base'>{providerData.address}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <svg
                                        key={index}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        aria-label="Rating"
                                        className="focus:outline-none w-[15px]"
                                    >
                                        <path
                                            d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"
                                            fill={index < 4 ? "rgba(234,113,46,1)" : "#555"}
                                        />
                                    </svg>
                                ))}
                                <div className="text-gray-500 text-sm md:text-base">(4.0)</div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray-300 p-[1px] rounded-full my-5 md:my-10'></div>

                    {/* Verification Code */}
                    <div className="text-sm md:text-base w-full h-10 flex items-center justify-center p-3 rounded-md border border-[#b3b3b3] select-none cursor-pointer group overflow-hidden relative">
                        <p className="text-gray-700 absolute transition-all duration-500 ease-in-out group-hover:-translate-y-[200%]">
                            Hover to know your verification code
                        </p>
                        <p className="text-gray-700 absolute translate-y-[200%] transition-all duration-500 ease-in-out group-hover:translate-y-0">
                            Your verification code is <span className='text-gray-950 font-semibold'>{verificationCode}</span>
                        </p>
                    </div>

                    {/* Service Details */}
                    <div className='mt-3 md:mt-10'>
                        <div className='flex items-center'>
                            <i className="ri-time-line text-lg mr-2"></i>
                            <p className='text-base'>Arriving time : 3 min</p>
                        </div>
                        <div className='flex items-center mt-2'>
                            <i className="ri-money-rupee-circle-line text-lg mr-2"></i>
                            <p className='text-base'>Cash payment : ₹{providerData.price}.00/-</p>
                        </div>
                        <div className='flex items-center mt-2'>
                            <i className="ri-pin-distance-line text-lg mr-2"></i>
                            <p className='text-base'>Distance : 0.2 km</p>
                        </div>
                    </div>
                </div>

                {/* Chat Toggle Button */}
                <div
                    className='fixed bottom-0 right-2 bg-white p-2 rounded-t-md flex items-center cursor-pointer'
                    onClick={toggleChat}
                >
                    <div className='relative mr-2'>
                        <img
                            className='w-10 rounded-full'
                            src={providerData.avatar}
                            alt="Provider Avatar"
                        />
                        <div className='absolute h-3 w-3 bg-green-500 rounded-full bottom-0 right-0 border-white border-2'></div>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-black">{providerData.name}</h1>
                    </div>
                </div>

                {/* Chat Container */}
                <div
                    className={`z-10 w-full md:w-96 fixed bottom-0 right-0 md:right-2 bg-white border rounded-t-md transform transition-transform duration-300 ease-in-out ${isChatVisible ? "translate-y-0" : "translate-y-full"
                        }`}
                >
                    <div className='flex items-center justify-between p-2 border-b'>
                        <div className='flex items-center'>
                            <div className='relative mr-2'>
                                <img
                                    className='w-10 rounded-full'
                                    src={providerData.avatar}
                                    alt="Provider Avatar"
                                />
                                <div className='absolute h-3 w-3 bg-green-500 rounded-full bottom-0 right-0 border-white border-2'></div>
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold text-black">{providerData.name}</h1>
                            </div>
                        </div>
                        <div
                            className='px-1 text-lg bg-black text-white cursor-pointer rounded-md'
                            onClick={toggleChat}
                        >
                            <i className="ri-close-fill"></i>
                        </div>
                    </div>
                    {/* Message Container */}
                    <div className='w-full h-[calc(100vh-180px)] md:h-[calc(100vh-118px)] bg-white overflow-y-auto p-2'>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.fromUserId === userData._id ? "justify-end" : "justify-start"
                                    } mb-4`}
                            >
                                <div
                                    className={`max-w-[70%] p-3 rounded-xl ${msg.fromUserId === userData._id
                                        ? "bg-gray-200 text-black rounded-tr-none" // Sender message
                                        : "bg-black text-white rounded-tl-none" // Receiver message
                                        }`}
                                >
                                    <p>{msg.message}</p>
                                </div>
                            </div>
                        ))}
                        {/* Typing Indicator */}
                        {isTyping && typingUserId === providerData._id && (
                            <div className="flex justify-start">
                                <div className="max-w-[70%] px-2 py-3 flex items-center gap-1 rounded-xl bg-black rounded-tl-none">
                                    <span className="w-1 h-1 bg-white rounded-full animate-bounce"></span>
                                    <span className="w-1 h-1 bg-white rounded-full animate-bounce"></span>
                                    <span className="w-1 h-1 bg-white rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef}></div>
                    </div>
                    {/* Send Message */}
                    <div className='w-full p-2 border-t'>
                        <form onSubmit={sendMessage} className='w-full flex items-center justify-between py-[6px] px-2 bg-[#f3f3f3] cursor-text border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'>
                            <input
                                type="text"
                                autoComplete='off'
                                value={chatInput}
                                onChange={handleChatInputChange}
                                placeholder={`Send a message to ${providerData.name}...`}
                                required
                                className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black pr-2'
                            />
                            <button
                                type="submit"
                                className='px-1 text-lg bg-black text-white rounded-md'
                            >
                                <i className="ri-send-plane-2-fill"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceModal;