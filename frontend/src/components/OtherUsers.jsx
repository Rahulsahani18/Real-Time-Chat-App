import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../Hooks/useGetOtherUsers'
import { useSelector } from 'react-redux'

const OtherUsers = () => {
    //custom hook to fetch other users
    useGetOtherUsers()
    const {otherUsers} = useSelector(state => state.user);
    if(!otherUsers) return null; //if other users are not fetched yet, return null
    return (
        <div className='overflow-auto'>
            {
                otherUsers?.map(user => {
                    return <OtherUser key={user.id} user={user} />
                })
            }
 
        </div>
    )
}

export default OtherUsers