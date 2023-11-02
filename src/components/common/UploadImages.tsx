import React, { useEffect } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from '../../store/uploadImageSlice';
import { AiOutlineClose } from 'react-icons/ai';
import { FieldError, FieldErrors, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from 'react-hook-form';
import { cn } from '../../lib/utils';
import { Text } from '../ui/Text';


export type ImagesProps = {
  asset_id?: string;
  public_id?: string;
  url?: string;
}
interface UploadImagesProps {
  name?: string;
  uploadedImages?: (img: ImagesProps[]) => void;
  register?: UseFormRegister<FieldValues>;
  errors?: Merge<FieldError, FieldErrorsImpl<{}>>;
}

export const UploadImages = ({ name, uploadedImages, register, errors }: UploadImagesProps) => {

  const dispatch = useAppDispatch();
  const imageState = useAppSelector((state: RootState) => state.uploadImages.images)

  useEffect(() => {
    uploadedImages?.(imageState)
  }, [imageState])

  return (
    <div className='flex relative flex-col justify-start items-start w-full'>
      {errors?.message ? <Text className='absolute -top-[31px] right-0 uppercase' type="danger">{errors.message}</Text> : null}
      <div className={cn(`relative bg-white border p-5 text-center mt-3 rounded-md w-full`, errors ? 'border-[#ef090d]' : ' border-transparent')}>
        <Dropzone
          onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()} className=' rounded-sm'>
                <input ref={(el: any) => register?.(el)} name={name} {...getInputProps()} />
                <p className='mb-0 p-4 text-lg border-2 border-[#999999] border-dashed rounded-sm cursor-pointer bg-white'>
                  Drag 'n' drop some files here, or click to select files
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
      <div className="showimages flex flex-wrap mt-3 gap-3  w-full">
        {imageState?.map((image, j) => {
          return (
            <div className="relative max-w-[900px]" key={j}>
              <button
                type="button"
                onClick={() => dispatch(deleteImg(image.public_id))}
                className="btn-close absolute top-0 right-0 bg-white rounded-full p-1 hover:text-white hover:bg-black transition-all duration-200"
                style={{ top: "10px", right: "10px" }}
              >
                <AiOutlineClose size={24} />
              </button>
              <img src={image.url} alt="img" style={{ width: '100%', height: 400 }} />
            </div>
          );
        })}
      </div>
    </div>
  )
}
