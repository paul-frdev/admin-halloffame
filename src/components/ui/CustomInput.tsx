import React from 'react'
import { cn } from '../../lib/utils';


interface CustomInputProps {
  type?: string;
  label?: string;
  id?: string;
  name?: string;
  value?: string;
  className?: string;
  onChange?: (data: any) => void;
  onBlur?: (data: any) => void;
}
export const CustomInput: React.FC<CustomInputProps> = ({ type = 'text', label, name, value, onChange, onBlur, className, id }) => {
  return (
    <div className='flex justify-start items-start flex-col mt-4 w-full'>
      <label htmlFor={label} className='mb-1 text-sm pl-2'>{label}</label>
      <input
        id={id}
        className={cn(`text-md py-4 w-full px-2 outline-none border-2 border-[#999999] rounded-md`, className)}
        type={type}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}
