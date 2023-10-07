import React from 'react'
import { LoginForm } from '../components/forms/LoginForm'


interface LoginProps {
  setAuth: (data: boolean) => void;
}
export const Login: React.FC<LoginProps> = ({ setAuth }) => {
  return (
    <div className=' bg-gray py-8 min-h-[100vh] flex justify-center items-center'>
      <div className='my-5 w-[450px] bg-white rounded-lg mx-auto py-8 px-4'>
        <h3 className="text-center text-3xl mb-4">Login</h3>
        <p className="text-center text-lg">Login to your account to continue.</p>
        {/* <div className="mb-2 text-center">
          "You are not an Admin"
        </div> */}
        <LoginForm setAuth={setAuth} />
      </div>
    </div>
  )
}
