import React from 'react'
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";


interface QuillEditorProps {
  theme: string;
  onChange: (e: any) => void;
  value: string;
}
export const QuillEditor: React.FC<QuillEditorProps> = ({ theme , onChange, value, }) => {
  return (
    <div className='relative w-full'>
      <ReactQuill theme={theme} onChange={(e) =>onChange(e)} value={value} />
    </div>
  )
}
