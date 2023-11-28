import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { toast } from 'react-toastify';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Title } from '../ui/Title';
import { Button, Form } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import ReactQuill, { Quill } from 'react-quill';
import { cn } from '../../lib/utils';
import { createRefund, getRefund, getRefundId, updateRefund } from '../../store/contentSlice';
import { useEffect, useState } from 'react';
import { formats, container } from '../editor/constants';


const validationSchema = yup.object().shape({
  refund_text: yup.string().required('Field description is required'),
  refund_id: yup.string()
});



export const RefundForm = () => {

  const [refundId, setRefundId] = useState('')
  const dispatch = useAppDispatch()

  const { refund, isError, message } = useAppSelector((state: RootState) => state.content)

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      refund_text: '',
      refund_id: ''
    },
    resolver: yupResolver(validationSchema),
  });

  const modules = { toolbar: { container } }


  useEffect(() => {
    if (isError === true) {
      toast.warn(`ERROR: ${message}`)
    }
  }, [isError])


  useEffect(() => {
    dispatch(getRefund())
  }, [])

  useEffect(() => {
    setRefundId(refund?.refund_id!)
  }, [refund])


  useEffect(() => {
    setRefundId(refund?.refund_id!)
    if (refundId !== undefined) {
      dispatch(getRefundId(refundId))
    }
  }, [refundId])


  useEffect(() => {
    setValue('refund_id', refund?.refund_id!)
    setValue('refund_text', refund?.refund_text!)
  }, [refund])

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log('refundId', refundId);
    
    try {
      if (refundId === undefined) {
        await dispatch(createRefund(data))
        toast.success('Refund information added successfully')
      } else {
        await dispatch(updateRefund(data));
        await dispatch(getRefund())
      }
    } catch (error) {
      toast.error(`Something went wrong, ${error}`)
    }
  }

  return (
    <div>
      <Title level={3}>{refundId !== undefined ? "Edit" : "Add"} information about getting a refund back</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}
      >
        <div className='relative'>
          <Controller
            control={control}
            name="refund_text"
            render={({ field }) => (
              <div>
                <ReactQuill
                  theme="snow"
                  placeholder='Write text'
                  modules={modules}
                  formats={formats}
                  className={cn(`my-4 border-[1.5px] rounded-md`, errors.refund_text ? 'border-[#ef090d]' : ' border-transparent')}
                  {...field}
                  onChange={(text) => {
                    field.onChange(text);
                  }}
                />
              </div>
            )}
          />
          {errors.refund_text && <p className='absolute -bottom-[35px] left-[8px] text-[#ef090d]'>{errors.refund_text.message}</p>}
        </div>
        <Form.Item>
          <Button className='w-[150px] mt-4' size="large" type="primary" htmlType="submit">
            {refundId === undefined ? "Create" : "Edit and save"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}