import React from 'react'
import { Select as AppSelect } from "antd";
import { BaseOptionType } from 'antd/es/select';
import { cn } from '../../lib/utils';

interface SelectProps {
  optionItems: BaseOptionType[];
  defaultValue?: any;
  name: string;
  onChange: (e: string[]) => void;
  valueSelect?: string;
  valueOption?: string;
  className?: string;
  mode?: "multiple" | "tags" | undefined;
  formikTouched?: any;
  formikErrors?: any;
  label?: string;
}

export const Select: React.FC<SelectProps> = ({ optionItems, label, onChange, valueSelect, valueOption, className, mode = undefined, defaultValue, formikTouched, formikErrors }) => {
  return (
    <div className='relative inline-flex flex-col -mb-2'>
      <label className=' text-sm'>{label}</label>
      <AppSelect mode={mode} allowClear defaultValue={defaultValue} options={optionItems} onChange={onChange} className={cn('', className)} />
      <span className='absolute -bottom-[8px] left-[8px] text-[#ef090d]'>{formikTouched && formikErrors}</span>
    </div>
  )
}
