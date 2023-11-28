import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { toast } from 'react-toastify';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Title } from '../ui/Title';
import { Button, Form, Input } from 'antd';
import { FormItem } from '../ui/FormItem';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import ReactQuill from 'react-quill';
import { cn } from '../../lib/utils';
import { createAbout, getAboutUs, getCurAbout, updateAboutUs } from '../../store/contentSlice';
import { useEffect, useState } from 'react';
import { formats, container } from '../editor/constants';


const validationSchema = yup.object().shape({
  about_title: yup.string().required('Field title is required'),
  about_description: yup.string().required('Field description is required'),
  about_id: yup.string()
});


export const AboutUsForm = () => {

  const [aboutUsId, setAboutUsId] = useState('')
  const dispatch = useAppDispatch()

  const { aboutUs, isError, message } = useAppSelector((state: RootState) => state.content)

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      about_title: '',
      about_description: '',
      about_id: ''
    },
    resolver: yupResolver(validationSchema),
  });

  const modules = { toolbar: { container }}


  useEffect(() => {
    if (isError === true) {
      toast.warn(`ERROR: ${message}`)
    }
  }, [isError])


  useEffect(() => {
    dispatch(getCurAbout())
  }, [])

  useEffect(() => {
    setAboutUsId(aboutUs?.about_id!)
  }, [aboutUs])


  useEffect(() => {
    setAboutUsId(aboutUs?.about_id!)
    if (aboutUsId !== undefined) {
      dispatch(getAboutUs(aboutUsId))
    }
  }, [aboutUsId])


  useEffect(() => {
    setValue('about_id', aboutUs?.about_id!)
    setValue('about_title', aboutUs?.about_title!)
    setValue('about_description', aboutUs?.about_description!)
  }, [aboutUs])

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      if (aboutUsId === undefined) {
        await dispatch(createAbout(data))
        toast.success('About us added successfully')
      } else {
        await dispatch(updateAboutUs(data));
        await dispatch(getCurAbout())
      }
    } catch (error) {
      toast.error(`Something went wrong, ${error}`)
    }
  }

  return (
    <div>
      <Title level={3}>{aboutUsId !== undefined ? "Edit" : "Add"} About Us</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}
      >
        <FormItem name='about_title' control={control} label='Enter title' help>
          <Input size="large" />
        </FormItem>
        <div className='relative'>
          <Controller
            control={control}
            name="about_description"
            render={({ field }) => (
              <div>
                <Title level={5}>{aboutUsId === undefined ? 'Add' : 'Modify'} text about your organization</Title>
                <ReactQuill
                  theme="snow"
                  placeholder='Write text'
                  modules={modules}
                  formats={formats}
                  className={cn(`my-4 border-[1.5px] rounded-md`, errors.about_description ? 'border-[#ef090d]' : ' border-transparent')}
                  {...field}
                  onChange={(text) => {
                    field.onChange(text);
                  }}
                />
              </div>
            )}
          />
          {errors.about_description && <p className='absolute -bottom-[35px] left-[8px] text-[#ef090d]'>{errors.about_description.message}</p>}
        </div>
        <Form.Item>
          <Button className='w-[150px] mt-4' size="large" type="primary" htmlType="submit">
          {aboutUsId === undefined ? "Create" : "Edit and save"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
