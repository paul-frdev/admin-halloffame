import React from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const myColors = [
  "purple",
  "#785412",
  "#452632",
  "#856325",
  "#963254",
  "#254563",
  "white"
];
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: ["right", "center", "justify"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: myColors }],
    [{ background: myColors }]
  ]
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "color",
  "background",
  "align"
];

interface RichEditorProps {
  onChange?: (data: string) => void;
  onBlur?: (data: string) => void;
  value?: string;
}

export const RichEditor: React.FC<RichEditorProps> = ({ onChange, value, onBlur }) => {
  return (
    <div className='relative w-full mt-8'>
      <ReactQuill
        theme="snow"
        className="my-8"
        modules={modules}
        formats={formats}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}
