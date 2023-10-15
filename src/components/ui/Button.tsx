import React from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "submit" | "button" | "reset" | undefined;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, className, type = 'submit', disabled }) => {
  return (
    <button disabled={disabled} type={type} className={cn(`border-0 px-3 py-2 fw-bold w-[240px] text-center bg-black text-white rounded-md`, className)}>{children}</button>
  )
}
