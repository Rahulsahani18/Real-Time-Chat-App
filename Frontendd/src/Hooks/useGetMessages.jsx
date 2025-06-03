import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/messagesSlice';

const useGetMessages = () => {
    const { selectedUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!selectedUser?._id) return;

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/message/${selectedUser._id}`, {
                    withCredentials: true,
                });
                    console.log('Fetched messages:', response.data);
                    dispatch(setMessages(response.data));
                

            } catch (error) {
                console.error('Error fetching messages:', error);
                dispatch(setMessages(null));
            }
        };

        fetchMessages();
    }, [selectedUser, dispatch]);
};

export default useGetMessages;
