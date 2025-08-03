import { useEffect } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";

const MessageContainer = () => {

    const {selectedConversation,setSelectedConversation} = useConversation()
    //cleaup function
    useEffect(() => {
        return () => setSelectedConversation(null)
    },[setSelectedConversation])

	return (
		<div className='md:min-w-[450px] w-full flex flex-col'>
            {!selectedConversation ? (
                <NoChatSelected/>
            ) : (
			<>
				{/* Header */}
				<div className='bg-stone-900 text-white px-4 py-2 mb-2'>
					<span className='label-text'>To:</span> <span className='text-white font-bold'>{selectedConversation.fullName}</span>
				</div>

				<Messages />
				<MessageInput />
			</>
            )}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
    const data = (JSON.parse(localStorage.getItem('chat-user')))
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="text-center flex flex-col items-center text-white sm:text-lg md:text-xl font-semibold gap-2">
                <p>Welcome 👋 {data.fullName}</p>
                <p>Select a Chat to start messeging</p>
                <TiMessages className='text-3xl md:text-5xl my-2' />
            </div>
        </div>
    )
}