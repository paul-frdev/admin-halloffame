import React from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from '../../store/uploadImageSlice';
import { AiOutlineClose } from 'react-icons/ai';


export const UploadImages = () => {

  const dispatch = useAppDispatch();
  const imageState = useAppSelector((state: RootState) => state.uploadImages.images)

  return (
    <div className='flex flex-col justify-start items-start w-full'>
      <div className="relative bg-white border-1 p-5 text-center mt-3 rounded-md w-full">
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
      <div className="showimages flex flex-wrap mt-3 gap-3">
        {imageState?.map((image, j) => {
          return (
            <div className="relative max-w-fit" key={j}>
              <button
                type="button"
                onClick={() => dispatch(deleteImg(image.public_id))}
                className="btn-close absolute top-0 right-0 bg-white rounded-full p-1 hover:text-white hover:bg-black transition-all duration-200"
                style={{ top: "10px", right: "10px" }}
              >
                <AiOutlineClose size={24} />
              </button>
              <img src={image.url} alt="img" width={200} height={200} />
            </div>
          );
        })}
      </div>
    </div>
  )
}
