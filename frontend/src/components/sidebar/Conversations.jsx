import { InfinitySpin } from "react-loader-spinner";
import useGetConverstaion from "../../hooks/useGetConverstaion";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConverstaion();
	// console.log(conversations)
	return (
		<div className='py-2 flex sm:flex-col flex-row overflow-auto scroll'>

			{
				conversations.map((conversation,idx) => (
					<Conversation
						key={conversation._id}
						conversation={conversation}
						emojis = {getRandomEmoji()}
						lastIdx = {idx === (conversations.length-1)}
					/>
				))
			}

			{loading ? <InfinitySpin visible={true} width="100" color="black" ariaLabel="infinity-spin-loading" /> : null}
		</div>
	);
};
export default Conversations;