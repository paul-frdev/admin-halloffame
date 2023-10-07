import React from 'react'
import { RegisterForm } from '../components/forms/RegisterForm'


interface RegisterProps {
  setAuth: (data: boolean) => void;
}
export const Register: React.FC<RegisterProps> = ({ setAuth }) => {
  return (
    <div className=' bg-gray py-8 min-h-[100vh] flex justify-center items-center'>
      <div className='my-5 w-[450px] bg-white rounded-lg mx-auto py-8 px-4'>
        <h3 className="text-center text-3xl mb-4">Register</h3>
        <p className="text-center text-lg">Create a new account</p>
        {/* <div className="mb-2 text-center">
          "You are not an Admin"
        </div> */}
        <RegisterForm setAuth={setAuth} />
      </div>
    </div>
  )
}
