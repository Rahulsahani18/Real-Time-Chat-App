import {useState} from 'react'
import { MdSearch } from "react-icons/md";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';
import { setAuthUser } from '../redux/userSlice';


const Siderbar = () => {

  const [search, setSearch] = useState('');
  const {otherUsers} = useSelector(store => store.user);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async() => {
    try{
     const res = await axios.get('/api/v1/user/logout');
      navigate('/login');
      toast.success('Logged out successfully');
      dispatch(setAuthUser(null)); // clear other users from redux store
    }
    catch(error){
      toast.error('Could not logout')
    }
  }

  const searchSubmitHandler = async(e) => {
    e.preventDefault();
      const conversationUser = otherUsers?.find(user => user.fullName.toLowerCase().includes(search.toLowerCase()));
      if(conversationUser) {
       dispatch(setOtherUsers([conversationUser]));
      }else{
        toast.error('User not found')
      }

  }
  return (
    <div className='border-r border-state-500 p-4 flex flex-col'>
      <form onSubmit={searchSubmitHandler} action="" className='flex items-center space-x-2 p-2'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='input input-bordered rounded-md' type="text"
          placeholder='Search...'
        />
        <button type='submit' className='btn btn-square text-white'>
          <MdSearch size="25px" />
        </button>
      </form>

      <div className="divider px-2"></div>
        <OtherUsers />
        
        <div className='mt-2 p-1 '>
          <button className='btn btn-outline  btn-sm btn-error'
          onClick={logoutHandler}
          >Logout</button>
        </div>
    </div>
  )
}

export default Siderbar
