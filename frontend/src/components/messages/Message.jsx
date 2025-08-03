import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({message}) => {
    const {authUser} = useAuthContext();
    const {selectedConversation} = useConversation();
    const formatTime = extractTime(message.createdAt)
    const fromMe = message.senderId === authUser._id;
    const chatClassName = fromMe ? 'justify-end' : 'justify-start';
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bgColor = fromMe ? 'bg-blue-500' : 'bg-gray-800'

    return (
        <div className={`flex items-end ${chatClassName}`}>
            <div className='mb-8'>
                <div className="w-10 rounded-full">
                    <img
                        src={profilePic}
                        alt='user avatar'
                    />
                </div>
            </div>
            <div>
                <div className={`text-white ${bgColor} max-w-60 text-sm p-2 m-1 rounded-lg`}>{message.message}</div>
                <span className='text-slate-200 text-xs'>{formatTime}</span>
            </div>
        </div>
    )
}

export default Message
