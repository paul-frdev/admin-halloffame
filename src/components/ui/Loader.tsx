import React from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { cn } from '../../lib/utils'

export const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={cn(`flex justify-center items-center w-full h-full pt-12`, className)}>
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
