import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

interface Message {
    fromUserId: string;
    toUserId: string;
    message: string;
}

const ChatComponent: React.FC = () => {
    const { userData, socket, handleChatSendMessage } = useContext(UserContext);

    const [chatInput, setChatInput] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const takerId = localStorage.getItem("takerId");
        if (takerId && chatInput.trim()) {
            const newMessage: Message = {
                fromUserId: userData.user.id,
                toUserId: takerId,
                message: chatInput,
            };
            handleChatSendMessage(userData.user.id, takerId, chatInput);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setChatInput("");
        } else {
            console.error("takerId is null or empty, or chat input is empty");
        }
    };

    const handleChatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChatInput(e.target.value);
    };

    const handleChatReceiveMessage = () => {
        if (socket) {
            const listener = (data: { fromUserId: string; message: string }) => {
                console.log("receive: ", data);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        fromUserId: data.fromUserId,
                        toUserId: userData.user.id,
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

    return (
        <>
            <div className='w-full md:w-[600px] bg-white rounded-t-md mx-auto'>
                <div className='flex items-center pb-2'>
                    <div className='relative mr-2'>
                        <img
                            className='w-10 rounded-full'
                            src="https://res.cloudinary.com/dfcfncp2q/image/upload/v1738250475/fixitnow/id9x8ezfo1lbhqy6yjmi.jpg"
                            alt="Provider Avatar"
                        />
                        <div className='absolute h-3 w-3 bg-green-500 rounded-full bottom-0 right-0 border-white border-2'></div>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-black">yash</h1>
                    </div>
                </div>
                {/* Message Container */}
                <div className='w-full h-[calc(100vh-150px)] bg-white overflow-y-auto p-4'>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.fromUserId === userData.user.id ? "justify-end" : "justify-start"
                                } mb-4`}
                        >
                            <div
                                className={`max-w-[70%] p-3 rounded-lg ${msg.fromUserId === userData.user.id
                                        ? "bg-gray-200 text-black" // Sender message
                                        : "bg-black text-white" // Receiver message
                                    }`}
                            >
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Send Message */}
                <div className='w-full pt-2'>
                    <form
                        onSubmit={sendMessage}
                        className='flex items-center justify-between py-[6px] px-2 bg-[#f3f3f3] cursor-text w-full border-2 border-[#f3f3f3] rounded-md focus-within:border-black focus-within:bg-white'
                    >
                        <input
                            type="text"
                            autoComplete='off'
                            value={chatInput}
                            onChange={handleChatInputChange}
                            placeholder={`Send a message to yash...`}
                            required
                            className='w-full border-none bg-transparent outline-none text-[#5E5E5E] focus:text-black pr-2'
                        />
                        <button
                            type="submit"
                            className='px-1 text-lg bg-black text-white cursor-pointer rounded-md'
                        >
                            <i className="ri-send-plane-2-fill"></i>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChatComponent;