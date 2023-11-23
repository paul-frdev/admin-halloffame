import React, { useEffect } from 'react'
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import { RootState, useAppSelector, useAppDispatch } from "../../store/store";
import { getCategories } from '../../store/blogCategorySlice';
import { ImagesProps, UploadImages } from '../common/UploadImages';
import { FormItem } from '../ui/FormItem';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Form, Input, Checkbox } from 'antd';
import ReactQuill from 'react-quill';
import { cn } from '../../lib/utils';
import { Title } from '../ui/Title';
import { toast } from 'react-toastify';
import { createTestimonial, getTestimonial, resetStateTestimonial } from '../../store/testimonialSlice';



const validationSchema = yup.object().shape({
  desriptiontext: yup.string().required('Required field').min(14, 'Minimum length is 14 characters'),
  image: yup.array().of(yup.object()),
  author: yup.string().required('Author field is required'),
  dignity: yup.string(),
  is_active: yup.boolean()
});

export const TestimonialForm = () => {

  const location = useLocation();
  const dispatch = useAppDispatch();
  const { images } = useAppSelector((state: RootState) => state.uploadImages);
  const { testimonial, testimonials } = useAppSelector((state: RootState) => state.testimonials);

  const testimonialId = location.pathname.split("/")[3] || undefined;
  const imagesCloudinary: { public_id: string | undefined; url: string | undefined }[] = [];


  const { control, handleSubmit, formState: { errors }, setValue, getValues, reset, register } = useForm({
    defaultValues: {
      desriptiontext: '',
      image: [],
      author: '',
      dignity: '',
      is_active: false
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    // console.log('useeefect testimonial');
    
    setValue('desriptiontext', testimonial?.desriptiontext!)
    setValue('author', testimonial?.author!)
    setValue('dignity', testimonial?.dignity!)
    setValue('is_active', testimonial?.is_active! ?? false)
  }, [testimonial])

  useEffect(() => {
    if (images && images !== undefined) {
      images.forEach((i) => {
        imagesCloudinary.push({
          public_id: i.public_id,
          url: i.url,
        });
      });
    }
  }, [images])

  useEffect(() => {
    if (testimonialId !== undefined) {
      dispatch(getTestimonial(testimonialId));
    } else {
      dispatch(resetStateTestimonial());
    }
  }, [testimonialId]);

  useEffect(() => {
    dispatch(resetStateTestimonial());
    dispatch(getCategories())
  }, [dispatch]);


  const onSubmit: SubmitHandler<any> = (data) => {
    if (testimonialId === undefined) {
      dispatch(createTestimonial(data))
      dispatch(resetStateTestimonial())
      reset();
      toast.success('Testimonial added successfully')
    } else {
      // TODO update Testimonial
    }
  }

  const onImageUpload = (uploadedImages: ImagesProps[]) => {
    const simplifiedImagesUrls = images ? uploadedImages.map(i => ({ public_id: i.public_id, url: i.url }) as any) : [];
    setValue('image', simplifiedImagesUrls, { shouldValidate: true });
    return simplifiedImagesUrls
  }

  return (
    <div>
      <Title> {testimonialId !== undefined ? "Edit" : "Add"} Testimonial</Title>
      <Form action="" layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <UploadImages
          register={register('image')}
          name='image'
          uploadedImages={onImageUpload}
          errors={errors.image}
          publicId={testimonial?.image?.[0].public_id!}
        />
        <div className='relative'>
          <Controller
            control={control}
            name="desriptiontext"
            render={({ field }) => (
              <div>
                <Title level={5}>Add description</Title>
                <ReactQuill
                  theme="snow"
                  className={cn(`my-4 border-[1.5px] rounded-md`, errors.desriptiontext ? 'border-[#ef090d]' : ' border-transparent')}
                  {...field}
                  onChange={(text) => {
                    field.onChange(text);
                  }}
                />
              </div>
            )}
          />
          {errors.desriptiontext && <p className='absolute -bottom-[35px] left-[8px] text-[#ef090d]'>{errors.desriptiontext.message}</p>}
        </div>
        <FormItem name='author' control={control} label='Enter author' help>
          <Input type='text' size="large" />
        </FormItem>
        <FormItem name='dignity' control={control} label='Enter dignity' help>
          <Input type='text' size="large" />
        </FormItem>
        <FormItem control={control} name='is_active' valuePropName="is_active">
          <Checkbox
            defaultChecked={false}
            className='!text-[16px]' >Publish review on website</Checkbox>
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
