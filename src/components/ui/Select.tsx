import React from 'react'
import { Select as AppSelect } from "antd";
import { BaseOptionType } from 'antd/es/select';
import { cn } from '../../lib/utils';

interface SelectProps {
  items: BaseOptionType[];
  item?: string;
  name: string;
  onChange: () => void;
  onBlur: () => void;
  valueSelect?: string;
  valueOption?: string;
  className?: string;
  mode: "multiple" | "tags" | undefined;
  formikTouched?: any;
  formikErrors?: any;
}

export const Select: React.FC<SelectProps> = ({ items, name, onChange, onBlur, valueSelect, valueOption, className, mode = "tags", item, formikTouched, formikErrors }) => {
  return (
    <div className='relative'>
      <AppSelect mode={mode} defaultValue={item} options={items} onChange={onChange} onBlur={onBlur} className={cn('', className)} />
      <span className='absolute -bottom-[8px] left-[8px] text-[#ef090d]'>{formikTouched && formikErrors}</span>
    </div>
  )
}
