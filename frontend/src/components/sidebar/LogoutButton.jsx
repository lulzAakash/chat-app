import React from 'react'
import { BiLogOut } from "react-icons/bi";
import useLogout from '../../hooks/useLogout';
import { InfinitySpin } from 'react-loader-spinner'

const LogoutButton = () => {

  const { loading, logout } = useLogout();
  return (
    <div className='mt-auto'>
      {!loading ? (
        <BiLogOut className='w-6 h-6 text-white cursor-pointer'
          onClick={logout}
        />
      ) : (
        <InfinitySpin visible={true} width="100" color="black" ariaLabel="infinity-spin-loading"/>
      )

      }

    </div>
  )
}

export default LogoutButton
