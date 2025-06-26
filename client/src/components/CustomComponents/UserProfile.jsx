import { UserIcon } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import HeaderForSm from './HeaderForSm'

const UserProfile = () => {
  const user=useSelector((store)=>store.user)
  console.log(user)
  return (
    <div className='w-full'>
      <HeaderForSm currentTab={"Profile"}/>
      

    </div>
  );
}

export default UserProfile