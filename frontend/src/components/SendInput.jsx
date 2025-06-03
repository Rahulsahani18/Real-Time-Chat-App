import { IoMdSend } from "react-icons/io";
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { setMessages } from "../redux/messagesSlice";


const SendInput = () => {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const {selectedUser} = useSelector(state => state.user)
  const {messages} = useSelector(state => state.message)
  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`/api/v1/message/send/${selectedUser?._id}`, {
         message,
         headers: {
          'Content-Type': 'application/json',
      }, 
        withCredentials: true,
      });
      console.log(response.data);
      dispatch(setMessages([
        ...messages, response.data
      ]))
      setMessage('');
    }catch(err){
      console.log(err);
    }
  }

  return (
   <form onSubmit={onSubmitHandler} action="" className='px-4 my-3'>
    <div className='w-full relative '>
        <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className='bordered rounded-lg block w-full p-2 border bg-state-500 text-white'
            placeholder='Type a message...'
        />
        <button type="submit" className='pr-4 absolute items-center  flex inset-y-0 end-0'><IoMdSend /></button>
    </div>
   </form>
  )
}

export default SendInput
