import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { InfinitySpin } from "react-loader-spinner";

const MessageInput = () => {
	const [message, setMessage] = useState("");
    const {loading, sendMessage} = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(!message){
		   return;
		} 
		await sendMessage(message);
		setMessage("")
	}

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full flex gap-2'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='flex items-center text-white'>
				{loading ? <InfinitySpin visible={true} width="100" color="white" ariaLabel="infinity-spin-loading"/> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;