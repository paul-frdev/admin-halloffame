import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { CustomButton } from '../ui/CustomButton';
import { CustomInput } from '../ui/CustomInput';


const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

export const LoginForm = () => {
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
        if (response.ok) {
          navigate('/')
        } else {
          throw new Error('Ошибка сети');
        }
      } catch (error) {
        console.log(error);
      }
    },
  });


  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <div className='relative pb-4'>
        <CustomInput
          type="text"
          label="Email Address"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={formik.touched.email && formik.errors.email ? 'border-2 border-[#ef090d]' : ''}
        />
        <div className="absolute -bottom-[8px] left-[8px] text-[#ef090d]">
          {formik.touched.email && formik.errors.email}
        </div>
      </div>
      <div className='relative pb-4'>
        <CustomInput
          type="password"
          label="Password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={formik.touched.email && formik.errors.email ? 'border-2 border-[#ef090d]' : ''}
        />
        <div className="absolute -bottom-[8px] left-[8px] text-[#ef090d]">
          {formik.touched.password && formik.errors.password}
        </div>
      </div>
      <div className="flex justify-between mt-4 mb-8 text-md text-end w-full items-center">
      <Link to="register" className="text-[#64748b] hover:text-[#788191]">
          Register
        </Link>
        <Link to="forgot-password" className="text-[#64748b] hover:text-[#788191]">
          Forgot Password ?
        </Link>
      </div>
      <button
        className='h-[60px] text-lg border-0 px-3 py-2 text-white fw-bold w-full max-w-[400px] mx-auto flex justify-center items-center text-center bg-black rounded-md'
        type="submit"
      >
        Login
      </button>
    </form>
  )
}
