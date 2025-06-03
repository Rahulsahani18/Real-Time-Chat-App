import React from 'react'
import Message from './Message'
import useGetMessages from '../Hooks/useGetMessages'
import useGetRealTimeMsg from '../Hooks/useGetRealTimeMsg'
import { useSelector } from 'react-redux'

const Messages = () => {
  useGetMessages();
  useGetRealTimeMsg(); // Assuming you have a custom hook for real-time messages
  const { messages } = useSelector(store => store.message);

  console.log('Messages:', messages); // Log the messages to check if they are being fetched correctly

  // if (!messages) return <div className='flex justify-center items-center h-full'>Loading...</div>;

  return (
    <>
      {!messages? (
        <div className='flex justify-center items-center h-full'>No messages yet</div>
      ) : (
        <div className='px-4 flex-1 overflow-auto'>
          {messages.map(message => (
            <Message key={message._id} message={message} />
          ))}
        </div>
      )}
    </>
  );
}

export default Messages;
