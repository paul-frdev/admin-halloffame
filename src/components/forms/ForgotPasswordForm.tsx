import React from 'react'
import { CustomInput } from '../ui/CustomInput'
import { CustomButton } from '../ui/CustomButton'

export const ForgotPasswordForm = () => {
  return (
    <form action="">
      <div className='mb-8'>
        <CustomInput type="password" label="Email Address" id="email" />
      </div>

      <CustomButton
        className='w-full h-[60px] text-lg'
        type="submit"
      >
        Send Link
      </CustomButton>
    </form>
  )
}
