import React, { useEffect, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from '../../store/uploadImageSlice';
import { AiOutlineClose } from 'react-icons/ai';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '../../lib/utils';
import { Text } from '../ui/Text';
import { toast } from 'react-toastify';
import { Skeleton } from 'antd';


export type ImagesProps = {
  asset_id?: string;
  public_id?: string;
  url?: string;
}
interface UploadImagesProps {
  name?: string;
  uploadedImages?: (img: ImagesProps[]) => void;
  register?: UseFormRegisterReturn<string>;
  errors?: Merge<FieldError, FieldErrorsImpl<{}>>;
}

export const UploadImages = ({ name, uploadedImages, register, errors }: UploadImagesProps) => {

  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useAppDispatch();
  const { isError, isLoading, isSuccess, images } = useAppSelector((state: RootState) => state.uploadImages)

  useEffect(() => {
    uploadedImages?.(images)
  }, [images])
  

  const deleteImage = (id: string | undefined) => {
    try {
      dispatch(deleteImg(id))
    } catch (error) {
      toast.error(`Something went wrong, ${error}`)
    }
  }

  const renderSkeletons = (count: number) => {
    const skeletons = Array.from({ length: count }, (_, index) => (
      <div key={index} className="w-full">
        <div className='max-w-[900px] relative w-full'>
          <Skeleton.Image active />
        </div>
      </div>
    ));

    return skeletons;
  }

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
                <input name={name} {...getInputProps()} />
                <p className='mb-0 p-4 text-lg border-2 border-[#999999] border-dashed rounded-sm cursor-pointer bg-white'>
                  Drag 'n' drop some images here, or click to select ones
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
      <div className="flex flex-wrap my-4 gap-3  w-full">
        {isLoading ? renderSkeletons(2) : (images?.map((image, j) => {
          return (
            <div className="w-full" key={j}>

              <div className='max-w-[900px] relative w-full'>
                <button
                  type="button"
                  onClick={() => deleteImage(image.public_id)}
                  className="btn-close absolute top-0 right-0 bg-white rounded-full p-1 hover:text-white hover:bg-black transition-all duration-200"
                  style={{ top: "10px", right: "10px" }}
                >
                  <AiOutlineClose size={24} />
                </button>
                <img src={image.url} alt="img" style={{ width: '100%', height: 400 }} />
              </div>
            </div>
          );
        }))}
      </div>
    </div>
  )
}
