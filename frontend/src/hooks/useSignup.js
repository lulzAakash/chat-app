import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading,setloading] = useState(false);
    const {authUser,setAuthUser} = useAuthContext();

    const signup = async ({fullName, username, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender})
        if(!success){
            return;
        }
        setloading(true)
        try {
            const res = await fetch('/api/auth/signup', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({fullName, username, password, confirmPassword, gender})
            })

            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }

            //localstorage
            localStorage.setItem('chat-user',JSON.stringify(data))
            //context
            setAuthUser(data);
        } 
        catch (error) {
            toast.error(error.message)
        }
        finally{
            setloading(false)
        }
    }

    return { loading, signup}
}

export default useSignup

function handleInputErrors({fullName, username, password, confirmPassword, gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error('Please fill all feilds')
        return false
    }

    if(password !== confirmPassword){
        toast.error('Passwords do not match')
        return false
    }

    if(password.length < 5){
        toast.error('Password must be at least 5 characters')
        return false
    }

    return true
}