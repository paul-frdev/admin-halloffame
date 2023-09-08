import React from 'react'
import { cn } from '../../lib/utils'

interface CustomButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "submit" | "button" | "reset" | undefined;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ children, className, type = 'submit' }) => {
  return (
    <button type={type} className={cn(`border-0 px-3 py-2 fw-bold w-[240px] text-center bg-black text-white rounded-md`, className)}>{children}</button>
  )
}
