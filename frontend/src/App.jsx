import React, { useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },
  {
    path: '/HomePage',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  const {authUser} = useSelector((state) => state.user);
  const {socket} = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  useEffect(() => {
    if(authUser){
      const socket = io("http://localhost:8080", {
        withCredentials: true,
        query: {
          userId: authUser._id,
        },
      });
     dispatch(setSocket(socket));
      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
        console.log("OnlineUsers",onlineUsers);
      });
      return () => {
        socket.close();
        dispatch(setSocket(null));
      };
    }else{
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }

  }, [authUser]);

  return (
    <>
      <div className='p-4 h-screen flex items-center justify-center'>
        <Toaster />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
