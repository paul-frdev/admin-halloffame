import React, { useEffect } from 'react'
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState, useAppSelector, useAppDispatch } from "../../store/store";
import { ImagesProps, UploadImages } from '../common/UploadImages';
import { FormItem } from '../ui/FormItem';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Form, Input, Checkbox } from 'antd';
import ReactQuill from 'react-quill';
import { cn } from '../../lib/utils';
import { Title } from '../ui/Title';
import { toast } from 'react-toastify';
import { createTestimonial, getAdminTag, getTestimonial, resetStateTestimonial, updateTestimonial } from '../../store/testimonialSlice';
import { TextEditor } from '../editor/TextEditor';



const validationSchema = yup.object().shape({
  desriptiontext: yup.string(),
  image: yup.array().of(yup.object()),
  author: yup.string().required('Author field is required'),
  dignity: yup.string(),
  is_active: yup.boolean(),
  adminTag: yup.string(),
  testimonial_id: yup.string(),
});

export const TestimonialForm = () => {

  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const { images } = useAppSelector((state: RootState) => state.uploadImages);
  const { testimonial, adminTag } = useAppSelector((state: RootState) => state.testimonials);

  const testimonialId = location.pathname.split("/")[3] || undefined;
  const imagesCloudinary: { public_id: string | undefined; url: string | undefined }[] = [];


  const { control, handleSubmit, formState: { errors }, setValue, reset, register } = useForm<any>({
    defaultValues: {
      desriptiontext: '',
      image: [],
      author: '',
      dignity: '',
      is_active: false,
      adminTag: '',
      testimonial_id: ''
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    dispatch(getAdminTag())
    dispatch(resetStateTestimonial());
  }, [dispatch]);


  useEffect(() => {
    if (testimonialId) {
      setValue('desriptiontext', testimonial?.testimonial_description!)
      setValue('author', testimonial?.testimonial_author!)
      setValue('dignity', testimonial?.testimonial_dignity!)
      setValue('is_active', testimonial?.is_active!)
      setValue('testimonial_id', testimonial?.testimonial_id)
    }
  }, [testimonial, testimonialId])


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


  const onSubmit: SubmitHandler<any> = (data) => {
    setValue('adminTag', adminTag)

    if (testimonialId === undefined) {
      dispatch(createTestimonial(data))
      dispatch(resetStateTestimonial())
      reset();
      toast.success('Testimonial added successfully')
    } else {
      // TODO update Testimonial
      dispatch(updateTestimonial(data));
      navigate('/admin/testimonials-list')
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
          publicId={testimonial?.testimonial_image?.[0].public_id!}
        />

        <FormItem name='desriptiontext' control={control} label='Enter author' help>
          <TextEditor control={control} name='desriptiontext' />
        </FormItem>

        <FormItem name='author' control={control} label='Enter author' help>
          <Input type='text' size="large" />
        </FormItem>
        <FormItem name='dignity' control={control} label='Enter dignity' help>
          <Input type='text' size="large" />
        </FormItem>
        <FormItem control={control} name='is_active' valuePropName='checked' >
          <Checkbox
            defaultChecked={false}
            className='!text-[16px]' >Publish review on website</Checkbox>
        </FormItem>
        <Form.Item className='mt-4'>
          <Button className='w-[150px] mt-4' size="large" type="primary" htmlType="submit">
            {testimonialId === undefined ? "Create" : "Edit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
