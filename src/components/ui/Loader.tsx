import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

export const Loader = () => {
  return (
    <div className='flex justify-center items-center w-full h-full pt-12'>
      <RotatingLines
        strokeColor="#808080"
        strokeWidth="5"
        animationDuration="1.5"
        width="96"
        visible={true}
      />
    </div>
  )
}
