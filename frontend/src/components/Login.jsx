import {React, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { setAuthUser } from '../redux/userSlice'

const Login = () => {

   const [user, setUser] = useState({
      username: '',
      password: '',

  
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const onSubmitHandler = async(e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/api/v1/user/login', user, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
       
          navigate('/HomePage')
          // toast.success(response.data.message)
          toast.success('Logged in successfully')
          console.log(response)
          dispatch(setAuthUser(response.data))
        
      }catch (err) {
        console.log(err);
        if (err.response && err.response.data && err.response.data.error) {
          toast.error(err.response.data.error);
        } else {
          toast.error('Something went wrong');
        }
      }
      
      console.log(user)
      setUser({
        username: '',
        password: ''
      })
    }

  return (
    <div className='min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-xl font-bold text-center text-white'>Login</h1>
        <form onSubmit={onSubmitHandler}>

          <div className='mb-4'>
            <label className='block text-sm font-bold mb-2' htmlFor='username'>Username</label>
            <input onChange={(e)=> setUser({...user,username:e.target.value})} className='appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-white' id='username' type='text' placeholder='Username' />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-bold mb-2' htmlFor='username'>Password</label>
            <input  onChange={(e)=> setUser({...user,password:e.target.value})} type="password" className=' appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-white' id='username' placeholder='Password' />
          </div>

          <div className='flex'> <p className="">Dont't have an account?</p>
            <Link to='/register' className='text-blue-500 ms-2'>Signup</Link></div>

          <div>
            <button type='submit' className='w-full mt-2 p-2 bg-blue-500 text-white hover:bg-blue-700 rounded-lg'>Login</button>
          </div>
        </form>
      </div>

    </div>


  )
}

export default Login
