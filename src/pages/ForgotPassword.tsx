import React from 'react'
import { ForgotPasswordForm } from '../components/forms/ForgotPasswordForm'

export const ForgotPassword = () => {
  return (
    <div className=' bg-gray py-8 min-h-[100vh] flex justify-center items-center'>
      <div className='my-5 w-[450px] bg-white rounded-lg mx-auto py-8 px-4'>
        <h3 className="text-center text-3xl mb-4">forgot-password</h3>
        <p className="text-center text-lg">Please Enter your register email to get reset password mail.</p>
        {/* <div className="mb-2 text-center">
          "You are not an Admin"
        </div> */}
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
