import React from 'react'
import { useAppDispatch } from '../../store/store';
import Dropzone from "react-dropzone";
import { uploadImg } from '../../store/uploadImageSlice';


interface UploadImagesProps {

}
export const UploadImages = () => {

  const dispatch = useAppDispatch();
  return (
    <div className=" relative bg-white border-1 p-5 text-center mt-3 rounded-md">
      <Dropzone
        onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} className=' rounded-sm'>
              <input {...getInputProps()} />
              <p className='mb-0 p-4 text-lg border-2 border-[#999999] border-dashed rounded-sm cursor-pointer bg-white'>
                Drag 'n' drop some files here, or click to select files
              </p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  )
}
