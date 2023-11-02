import React from 'react'
import { cn } from '../../lib/utils'


interface TextareaProps {
  className?: string;
  children?: string;
  value: string;
  disabled?: boolean;
  onChange?: (data: any) => void;
  onBlur?: (data: any) => void;
  formikTouched?: any;
  formikErrors?: any;
  label?: string;
  isLabel?: boolean;
  name?: string;
  id?: string
  readOnly?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({ onChange, onBlur, className, id, name, children, value, disabled = false, isLabel = false, label, readOnly = true }) => {
  return (
    <>
      {isLabel && <label className=''>{label}</label>}
      <textarea onChange={onChange} onBlur={onBlur} id={id} name={name} disabled={disabled} style={{ resize: "none" }} value={value} readOnly={readOnly} className={cn(`bg-transparent font-bold text-lg w-full border-[2px] border-[#acacac] rounded-md outline-none`, className, disabled && 'pointer-events-none opacity-60')}>{children}</textarea>
    </>
  )
}
