import React from 'react'
import { CustomInput } from '../ui/CustomInput'
import { Button } from '../ui/Button'

export const ForgotPasswordForm = () => {
  return (
    <form action="">
      <div className='mb-8'>
        <CustomInput type="password" label="Email Address" id="email" />
      </div>

      <Button
        className='w-full h-[60px] text-lg'
        type="submit"
      >
        Send Link
      </Button>
    </form>
  )
}
