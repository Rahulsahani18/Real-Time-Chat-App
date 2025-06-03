import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';

const Message = ({message}) => {
    const scroll = useRef();
    const {authUser, selectedUser} = useSelector(state => state.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    })
  return (
   <>
    
<div ref={scroll} className={`chat ${authUser?._id === message.senderId ? 'chat-end' : 'chat-start'}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="chat bubble component"
        src={authUser?._id === message?.senderId ? authUser?.profilePhoto : selectedUser?.profilePhoto} />
    </div>
  </div>

  <div className={`chat-bubble text-white  ${authUser?._id === message.senderId ? '' : 'chat-bubble-primary'}`}>{message.message}</div>
  {/* <div className="chat-footer opacity-50">Sent at </div> */}
</div>
   </>
  )
}

export default Message