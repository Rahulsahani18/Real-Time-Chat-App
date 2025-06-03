import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messagesSlice";

const useGetRealTimeMsg = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector(state => state.socket);
  const { messages } = useSelector(store => store.message);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      dispatch(setMessages([...(messages || []), newMessage]));
    };

    socket.on("newMessage", handleNewMessage);

    // Clean up listener on unmount
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, messages, dispatch]);
};

export default useGetRealTimeMsg;
