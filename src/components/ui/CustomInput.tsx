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
  formikTouched?: any;
  formikErrors?: any;
  disabled?: boolean;
}
export const CustomInput: React.FC<CustomInputProps> = ({ type = 'text', disabled = false, label, name, value, onChange, onBlur, className, id, formikErrors, formikTouched }) => {

  return (
    <div className={cn(`flex relative justify-start items-start flex-col mt-4 w-full mb-4`, className, disabled && 'pointer-events-none opacity-75')}>
      <label htmlFor={label} className={cn(`mb-1 text-sm pl-2`,
        formikTouched && formikErrors ? 'text-[#ef090d]' : '',
        className)
      }>
        {label}
      </label>
      <input
        id={id}
        className={cn(`text-md py-4 w-full px-2 outline-none border-2 rounded-md`,
          formikTouched && formikErrors ? 'border-[#ef090d]' : 'border-[#acacac]',
          className)
        }
        type={type}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span className='absolute -bottom-[18px] left-[8px] text-[#ef090d]'>{formikTouched && formikErrors}</span>
    </div>
  )
}
