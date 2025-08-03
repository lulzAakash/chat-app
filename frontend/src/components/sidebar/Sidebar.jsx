import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";


const Sidebar = () => {
	const data = (JSON.parse(localStorage.getItem('chat-user')))

	return (
		<div className='sm:border-r-2 border-black p-4 flex flex-col w-80 h-full shadow-md '>
			<SearchInput />
			<div className=' sm:p-3 '></div>
			<Conversations />
			<div className=' px-2 sm:py-3 md:pt-40 sm:pt-10 text-white'>
				<p className="my-2">{data.fullName}</p>
				<LogoutButton />
			</div>
		</div>
	);
};
export default Sidebar;