import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Message {
    fromUserId: string;
    toUserId: string;
    message: string;
}

const ChatComponent: React.FC = () => {
    const { userData, baseUrl, showToast, socket, handleChatSendMessage } = useContext(UserContext);

    const navigate = useNavigate();

    const [takerData, setTakerData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [chatInput, setChatInput] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    // typing message
    const [isTyping, setIsTyping] = useState(false);
    const [typingUserId, setTypingUserId] = useState<string | null>(null);

    // Fetch taker data
    const fetchTakerData = async () => {
        setIsLoading(true);
        const id = localStorage.getItem("takerId");
        if (!id) {
            navigate("/provider-dashboard/not-found");
            return;
        }
        try {
            const response = await axios.get(`${baseUrl}api/user/fetchSingleTaker/${id}`);
            if (response.data.taker) {
                setTakerData(response.data.taker);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    showToast(err.response.data.message, "error");
                } else if (err.request) {
                    showToast("No response received from the server", "error");
                } else {
                    showToast("Error setting up the request", "error");
                }
            } else {
                showToast("An unexpected error occurred", "error");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!takerData) {
            fetchTakerData();
        }
    }, [takerData]);

    // Handle sending messages
    const sendMessage: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const takerId = localStorage.getItem("takerId");
        if (takerId && chatInput.trim()) {
            const newMessage: Message = {
                fromUserId: userData._id,
                toUserId: takerId,
                message: chatInput,
            };
            handleChatSendMessage(userData._id, takerId, chatInput);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setChatInput("");
        } else {
            showToast("Message cannot be empty", "error");
        }
    };

    useEffect(() => {
        if (socket) {
            const handleTyping = (data: { fromUserId: string }) => {
                if (data.fromUserId === takerData?._id) {
                    setIsTyping(true);
                    setTypingUserId(data.fromUserId);
                }
            };

            const handleStopTyping = (data: { fromUserId: string }) => {
                if (data.fromUserId === takerData?._id) {
                    setIsTyping(false);
                    setTypingUserId(null);
                }
            };

            socket.on('typing', handleTyping);
            socket.on('stopTyping', handleStopTyping);

            // Cleanup listeners
            return () => {
                socket.off('typing', handleTyping);
                socket.off('stopTyping', handleStopTyping);
            };
        }
    }, [socket, takerData?._id]);

    const handleChatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChatInput(e.target.value);

        if (socket) {
            const takerId = localStorage.getItem("takerId");
            if (takerId) {
                // Emit typing event when the user starts typing
                socket.emit('typing', {
                    fromUserId: userData._id,
                    toUserId: takerId,
                });

                // Clear typing event after a delay (e.g., 1 second)
                const timeout = setTimeout(() => {
                    socket.emit('stopTyping', {
                        fromUserId: userData._id,
                        toUserId: takerId,
                    });
                }, 1000);

                // Clear the timeout if the user continues typing
                return () => clearTimeout(timeout);
            }
        }
    };

    // Handle receiving messages
    const handleChatReceiveMessage = () => {
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

            // Cleanup listener
            return () => {
                socket.off('receiveMessage', listener);
            };
        }
    };

    useEffect(() => {
        return handleChatReceiveMessage();
    }, [socket]);

    const messagesEndRef = useRef<HTMLDivElement | null>(null); // Define ref type explicitly

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Loading spinner
    if (isLoading) {
        return (
            <div className='flex justify-center items-center w-full h-full'>
                <div className="spinner">
                    {Array.from({ length: 12 }, (_, i) => (
                        <div
                            key={i}
                            className="spinner-blade"
                            style={{
                                animationDelay: `${i * 0.083}s`,
                                transform: `rotate(${i * 30}deg)`,
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        );
    }

    // Fallback UI if takerData is not available
    if (!takerData) {
        return <div className="text-center p-4">No user data available.</div>;
    }

    return (
        <div className='w-full md:w-[600px] bg-white rounded-t-md mx-auto'>
            {/* Chat Header */}
            <div className='flex items-center pb-2 border-b justify-center md:justify-start'>
                <div className='relative mr-2'>
                    <img
                        className='w-10 rounded-full'
                        src={takerData.avatar}
                        alt={`${takerData.name}'s avatar`}
                    />
                    <div className='absolute h-3 w-3 bg-green-500 rounded-full bottom-0 right-0 border-white border-2'></div>
                </div>
                <div>
                    <h1 className="text-lg font-semibold text-black">{takerData.name}</h1>
                </div>
            </div>

            {/* Message Container */}
            <div className='w-full h-[calc(100vh-130px)] bg-white overflow-y-auto py-4'>
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
                {isTyping && typingUserId === takerData._id && (
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

            {/* Send Message Form */}
            <div className='w-full pt-2 border-t'>
                <form
                    onSubmit={sendMessage}
                    className='flex items-center justify-between py-[6px] px-2 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                >
                    <input
                        type="text"
                        autoComplete='off'
                        value={chatInput}
                        onChange={handleChatInputChange}
                        placeholder={`Send a message to ${takerData.name}...`}
                        required
                        className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black pr-2'
                    />
                    <button
                        type="submit"
                        className='px-1 text-lg bg-black text-white cursor-pointer rounded-md'
                        aria-label="Send message"
                    >
                        <i className="ri-send-plane-2-fill"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatComponent;