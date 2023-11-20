import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import { RootState, useAppSelector, useAppDispatch } from "../../store/store";
import { getCategories } from '../../store/blogCategorySlice';
import { resetStateArticle } from '../../store/articleSlice';
import { ImagesProps, UploadImages } from '../common/UploadImages';
import { FormItem } from '../ui/FormItem';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Form, Input, Select } from 'antd';
import { Title } from '../ui/Title';
import { toast } from 'react-toastify';
import { createSlide, resetStateSlide } from '../../store/slideSlice';


const validationSchema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  slideType: yup.string().required("Slide Type is Required"),
  image: yup.array().of(
    yup.object().shape({
      public_id: yup.string().required('Public ID is required'),
      url: yup.string().required('Image URL is required'),
    })
  ).test('at-least-one-image', 'One image is required', function (value) {
    if (!value || value.length === 0) {
      return false;
    }
    return true;
  })
});

export const SlideForm = () => {
  const [slideId, setSlideId] = useState<any>();

  const location = useLocation();
  const dispatch = useAppDispatch();
  const ImageState = useAppSelector((state: RootState) => state.uploadImages.images);
  const { slides } = useAppSelector((state: RootState) => state.slides)

  const curSlideId = location.pathname.split("/")[3];
  const imagesCloudinary: { public_id: string | undefined; url: string | undefined }[] = [];

  const { control, handleSubmit, formState: { errors }, setValue, getValues, reset, register } = useForm({
    defaultValues: {
      title: '',
      slideType: '',
      image: []
    },
    resolver: yupResolver(validationSchema),
  });

  ImageState.forEach((i) => {
    imagesCloudinary.push({
      public_id: i.public_id,
      url: i.url,
    });
  });


  useEffect(() => {
    dispatch(resetStateArticle());
    dispatch(getCategories())
  }, []);


  const onSubmit: SubmitHandler<any> = (data) => {
    try {
      dispatch(createSlide(data))
      dispatch(resetStateSlide())
      reset();
      toast.success('Ticket images added successfully')
    } catch (error) {
      toast.error(`Something went wrong, ${error}`)
    }

  }


  const SlideType: any = [{ value: 'main_slide', label: 'main_slide' }, { value: 'shop_slide', label: 'shop_slide' },];

  const onImageUpload = (uploadedImages: ImagesProps[]) => {
    const simplifiedImagesUrls = uploadedImages.map(i => ({ public_id: i.public_id, url: i.url }) as any);
    setValue('image', simplifiedImagesUrls, { shouldValidate: true });
    return simplifiedImagesUrls
  }

  console.log('slides', getValues().slideType);


  return (
    <div>
      <Title> {curSlideId !== undefined ? "Edit" : "Add"} Slide</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <UploadImages
          register={register('image')}
          name='images'
          uploadedImages={onImageUpload}
          errors={errors.image}
        />
        <FormItem name='title' control={control} label='Enter title' help>
          <Input type='text' size="large" />
        </FormItem>
        <FormItem name="slideType" control={control} label='Select type of Slide' help>
          <Select size="large" options={SlideType} />
        </FormItem>
        <Form.Item className='mt-4'>
          <Button className='w-[150px] mt-4' size="large" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
