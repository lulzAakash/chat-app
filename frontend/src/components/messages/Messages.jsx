import { InfinitySpin } from "react-loader-spinner";
import useGetMessage from "../../hooks/useGetMessages";
import Message from "./Message";
import { useEffect, useRef } from "react";
import useListenMessage from "../../hooks/useListenMessages";

const Messages = () => {
	const { messages, loading } = useGetMessage();
	useListenMessage()
	const lastMessageRef = useRef();
	
	useEffect(() => {
		setTimeout (() => {
			lastMessageRef.current?.scrollIntoView({behavior: 'smooth'}); 
		}, 100)
	},[messages])

	return (
		<div className='px-4 flex-1 overflow-auto scroll'>
			{!loading && messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id}  ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))
			}
			{
				loading && [...Array(3)].map((_, idx) => <InfinitySpin visible={true} width="100" color="white" ariaLabel="infinity-spin-loading" key={idx}  />)
			}
			{
				!loading && messages.length === 0 && (
					<p className="text-center text-white">Send a mesage to start the conversation</p>
				)
			}
		</div>
	);
};
export default Messages;