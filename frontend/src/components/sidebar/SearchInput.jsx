import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConverstaion";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState();
	const {setSelectedConversation} = useConversation();
	const { conversations } = useGetConversation();

	const handleSubmit = (e) => {
		e.preventDefault();
		if(!search) return;
		if(search.length < 3){
			return toast.error('Search term Must be at least 3 character long')
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	}
	return (
		<form onSubmit={handleSubmit} className='flex items-center justify-between px-2 gap-2'>
			<input type='text' placeholder='Search…' className='input text-white input-bordered rounded-full p-2 bg-slate-600' 
			value={search}
			onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle  text-white'>
				<IoSearch className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;