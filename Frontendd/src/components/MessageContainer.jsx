import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'



const MessageContainer = () => {

const dispatch = useDispatch()
 const {selectedUser, authUser, onlineUsers } = useSelector(state => state.user)
    const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(selectedUser?._id); // check if user is online or not

// useEffect(() => {
//  return () => {
//   dispatch(setSelectedUser(null))
//  }
// },[])

  return (
    <>

    {
      selectedUser != null ? (
        <div className=' md:min-w-[500px] flex flex-col'>
        <div className='flex items-center gap-2  bg-zinc-900 text-white px-4 py-2 mb-2 '>
          <div  className={`avatar ${isOnline ? 'online' : ''}`}>
            <div className='rounded-full w-10 h-10'>
              <img src={selectedUser?.profilePhoto}
                alt="avatar"
              />
            </div>
          </div>
          <div >
            <div >
              <p>{selectedUser?.fullName}</p>
            </div>
          </div>
        </div>
        <Messages />
        <SendInput />
      </div>
      ): (
        <div className='md:min-w-[500px] flex flex-col justify-center items-center '>
          <h1 className='text-xl text-zinc-300'>Hi, {authUser?.fullName}</h1>
          <p className='text-2xl text-zinc-300'>Select a user to start chatting</p>
        </div>
      )
    }
  
  
  </>
  )
}

export default MessageContainer