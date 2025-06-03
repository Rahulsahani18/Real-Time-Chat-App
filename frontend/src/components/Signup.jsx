import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Signup = () => {

  const [user, setUser] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''

  })
  const navigate = useNavigate()

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/user/register', user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      if(response.data.success) {
        navigate('/login')
        toast.success(response.data.message)
      }
    }catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Something went wrong');
      }
    }
    
   
    setUser({
      fullName: '',
      username: '',
      password: '',
      confirmPassword: '',
      gender: ''
    })
  }

  return (
    <div className='min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-xl font-bold text-center text-white'>Signup</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-4'>
            <label className='block text-sm font-bold mb-2' htmlFor='username'>Full Name</label>
            <input value={user.fullName} onChange={(e) => setUser({ ...user, fullName: e.target.value })} className='appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-white' id='username' type='text' placeholder='Full Name' />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-bold mb-2' htmlFor='username'>Username</label>
            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className='appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-white' id='username' type='text' placeholder='Username' />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-bold mb-2' htmlFor='username'>Password</label>
            <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" className=' appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-white' id='username' placeholder='Password' />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-bold mb-2' htmlFor='username'>Confirm Password</label>
            <input value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} className='appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-white' id='username' type='password' placeholder='Confirm Password' />
          </div>
          <div className='flex items-center my-4'>
            <div className='flex items-center '>
              <p>Male</p>
              <input checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                type="checkbox"
                className="checkbox mx-2" />
            </div>
            <div className='flex items-center '>
              <p>Female</p>
              <input checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                type="checkbox"
                className="checkbox mx-2" />
            </div>


          </div>
          <div className='flex'> <p className="">Already have an account?</p>
            <Link to='/login' className='text-blue-500 ms-2'>Login</Link></div>

          <div>
            <button type='submit' className='w-full mt-2 p-2 bg-blue-500 text-white hover:bg-blue-700 rounded-lg'>Signup</button>
          </div>
        </form>
      </div>

    </div>


  )
}

export default Signup
