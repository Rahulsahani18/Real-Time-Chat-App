import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'


const OtherUser = ({user}) => {
    const dispatch = useDispatch()
    const {selectedUser,onlineUsers } = useSelector(state => state.user)
    const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user?._id); // check if user is online or not
    const selectedUserHandler = (user) => {
        console.log('Selected user:', user);
        dispatch(setSelectedUser(user))
    }
    return (
        <div className='p-1'>
            <div onClick={()=>selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-zinc-200' : '' } flex items-center gap-2 p-1 hover:bg-zinc-200 hover:text-black rounded  cursor-pointer`}>
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className='rounded-full w-10 h-10'>
                        <img src={user?.profilePhoto}
                            alt="avatar"
                        />
                    </div>
                </div>
                <div className=''>
                    <div className=''>
                        <p className={` ${selectedUser?._id === user?._id ? 'text-zinc-950' : '' }`}>{user?.fullName}</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-2 h-1'></div>
        </div>
    )
}

export default OtherUser