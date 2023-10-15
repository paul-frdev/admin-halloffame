import React from 'react'
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";


interface QuillEditorProps {
  theme: string;
  name?: string;
  onChange?: () => void;
  value: string;
  formikTouched?: any;
  formikErrors?: any;
}
export const QuillEditor: React.FC<QuillEditorProps> = ({ theme, name, onChange, value, formikTouched, formikErrors }) => {
  return (
    <div className='relative'>
      <ReactQuill theme={theme} onChange={onChange} value={value} />
      <span className='absolute -bottom-[18px] left-[8px] text-[#ef090d]'>{formikTouched && formikErrors}</span>
    </div>
  )
}
