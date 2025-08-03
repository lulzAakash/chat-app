import React from 'react'
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className='flex flex-col sm:flex-row sm:h-[700px] md:h-[700px] rounded-lg overflow-hidden bg-stone-800  md:mx-16 sm:mx-5 mx-1 mt-3'>
			<Sidebar />
			<MessageContainer />
		</div>
  )
}

export default Home
