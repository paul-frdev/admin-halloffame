import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { toast } from 'react-toastify';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Title } from '../ui/Title';
import { Button, Form, Input } from 'antd';
import { FormItem } from '../ui/FormItem';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { createAbout, getAboutUs, getCurAbout, updateAboutUs } from '../../store/contentSlice';
import { useEffect, useState } from 'react';
import "react-quill/dist/quill.snow.css";
import { TextEditor } from '../editor/TextEditor';
import { Loader } from '../ui/Loader';


const validationSchema = yup.object().shape({
  about_title: yup.string().required('Field title is required'),
  about_description: yup.string().required('Field description is required'),
  about_id: yup.string(),
});

export const AboutUsForm = () => {

  const [aboutUsId, setAboutUsId] = useState('')
  
  const dispatch = useAppDispatch()

  const { aboutUs, isError, isLoading, message } = useAppSelector((state: RootState) => state.content)

  const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm<FieldValues>({
    defaultValues: {
      about_title: '',
      about_description: '',
      about_id: ''
    },
    resolver: yupResolver(validationSchema as any),
  });

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
    setValue('about_id', aboutUs?.about_id || ''); 
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
        await dispatch(getCurAbout());
        toast.success('About us updated successfully')
      }
    } catch (error) {
      toast.error(`Something went wrong, ${error}`)
    }
  }


  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <Title level={3}>{aboutUsId !== undefined ? "Edit" : "Add"} About Us</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}
      >
        <FormItem name='about_title' control={control} label='Enter title' help>
          <Input size="large" />
        </FormItem>
        <FormItem name='about_description' control={control}>
          <TextEditor control={control} name='about_description' label='Enter description' />
        </FormItem>
        <Form.Item>
          <Button className='w-[150px] mt-4' size="large" type="primary" htmlType="submit">
            {aboutUsId === undefined ? "Create" : "Edit and save"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
