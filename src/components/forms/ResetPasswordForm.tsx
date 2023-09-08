import React from 'react'
import { CustomInput } from '../ui/CustomInput'
import { CustomButton } from '../ui/CustomButton'

export const ResetPasswordForm = () => {
  return (
    <form action="">
      <div>
        <CustomInput type="password" label="New Password" id="pass" />
      </div>
      <div className=' mb-8'>
        <CustomInput
          type="password"
          label="Confirm Password"
          id="confirmpass"
        />
      </div>

      <CustomButton
        className='w-full h-[60px] text-lg'
        type="submit"
      >
        Reset Password
      </CustomButton>
    </form>
  )
}
