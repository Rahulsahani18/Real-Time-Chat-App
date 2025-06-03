import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import  {setOtherUsers}  from '../redux/userSlice';

const useGetOtherUsers = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        
        const fetchOtherUsers = async () => {
       try {
        // Fetch other users
        axios.defaults.withCredentials = true;
        const response = await axios.get('/api/v1/user/')
        dispatch(setOtherUsers(response.data));
         }
         catch (error) {
              console.log(error)
            }
        }
        fetchOtherUsers()
    }, [])

}

export default useGetOtherUsers
