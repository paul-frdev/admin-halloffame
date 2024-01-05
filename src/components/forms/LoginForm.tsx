import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { CustomInput } from '../ui/CustomInput';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { login } from '../../store/authSlice';
import { FormItem } from '../ui/FormItem';
import { Button, Form, Input, Select, message } from 'antd';


const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

interface LoginFormProps {
  setAuth: (data: boolean) => void;
}
export const LoginForm: React.FC<LoginFormProps> = ({ setAuth }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()


  const { user, isError, isLoading, isSuccess, message } = useAppSelector((state: RootState) => state.auth)
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (!user) {
      await dispatch(login(data))
      setAuth(true);
      toast.success("Logged in Successfully");
      navigate("/admin");
    } else {
      setAuth(false);
      toast.error(message as any);
    }
  }

  return (
    <Form action="" layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <FormItem name='email' control={control} label='Enter Email' help>
        <Input type='text' size="large" className='h-[50px]' />
      </FormItem>
      <FormItem name='password' control={control} label='Enter password' help>
        <Input type='password' size="large" className='h-[50px]' />
      </FormItem>
      <div className="flex justify-between mt-4 mb-8 text-md text-end w-full items-center">
        <Link to="register" className="text-[#64748b] hover:text-[#788191]">
          Register
        </Link>
        <Link to="forgot-password" className="text-[#64748b] hover:text-[#788191]">
          Forgot Password ?
        </Link>
      </div>
      <Form.Item className='mt-4'>
        <Button className='w-full !h-[50px] uppercase mt-4' size="large" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
