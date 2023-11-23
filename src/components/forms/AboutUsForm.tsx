import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { toast } from 'react-toastify';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Title } from '../ui/Title';
import { Button, Form, Input } from 'antd';
import { FormItem } from '../ui/FormItem';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation } from 'react-router-dom';
import * as yup from "yup";
import { createTicket } from '../../store/ticketSlice';
import { resetStateImages } from '../../store/uploadImageSlice';
import ReactQuill from 'react-quill';
import { cn } from '../../lib/utils';
import { createAbout, getAboutUs, resetStateContent } from '../../store/contentSlice';
import { useEffect } from 'react';


const validationSchema = yup.object().shape({
  about_title: yup.string().required('Field title is required'),
  about_description: yup.string().required('Field title is required')
});


export const AboutUsForm = () => {
  const dispatch = useAppDispatch()

  const location = useLocation()
  const { aboutUs } = useAppSelector((state: RootState) => state.content)

  const { control, handleSubmit, formState: { errors }, setValue, getValues, register, reset } = useForm({
    defaultValues: {
      about_title: '',
      about_description: ''
    },
    resolver: yupResolver(validationSchema),
  });


  const aboutUsId = location.pathname.split("/")[3];

  useEffect(() => {
    if (aboutUsId !== undefined) {
      dispatch(getAboutUs(aboutUsId))
    }
  }, [])

  const onSubmit: SubmitHandler<any> = (data) => {
    try {
      dispatch(createAbout(data))
      dispatch(resetStateContent())
      reset();
      toast.success('About us added successfully')
    } catch (error) {
      toast.error(`Something went wrong, ${error}`)
    }
  }

  console.log('aboutUs', aboutUs);
  

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
                <Title level={5}>Add text about your organization</Title>
                <ReactQuill
                  theme="snow"
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
