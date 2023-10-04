import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { CustomButton } from '../ui/CustomButton';
import { CustomInput } from '../ui/CustomInput';
import { toast } from "react-toastify";


const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  firstName: yup
    .string()
    .required("First Name is Required"),
  mobilePhone: yup
    .string()
    .required("Mobile Phone is Required"),
  password: yup.string().required("Password is Required"),
  confirmPassword: yup.string()
    .required("Confirm Password is Required")
    .oneOf([yup.ref('password')], 'Passwords must match'),
});


export const RegisterForm = () => {
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobilePhone: ""
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log('values', values);

      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        console.log('response', response);

        const parseRes = await response.json();

        console.log('parseRes', parseRes);
        
        if (parseRes.jwtToken) {
          localStorage.setItem("token", parseRes.jwtToken);
          toast.success("Register Successfully");
        } else {
          toast.error(parseRes);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });


  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <div className='relative mb-2'>
        <CustomInput
          type="text"
          label="First name"
          id="firstName"
          name="firstName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          className={formik.touched.firstName && formik.errors.firstName ? 'border-2 border-[#ef090d]' : ''}
        />
        <div className="absolute -bottom-[20px] left-[8px] text-[#ef090d]">
          {formik.touched.firstName && formik.errors.firstName}
        </div>
      </div>
      <div className='relative mb-2'>
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
        <div className="absolute -bottom-[20px] left-[8px] text-[#ef090d]">
          {formik.touched.email && formik.errors.email}
        </div>
      </div>
      <div className='relative mb-2'>
        <CustomInput
          type="text"
          label="Mobile number"
          id="mobilePhone"
          name="mobilePhone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.mobilePhone.toString()}
          className={formik.touched.mobilePhone && formik.errors.mobilePhone ? 'border-2 border-[#ef090d]' : ''}
        />
        <div className="absolute -bottom-[20px] left-[8px] text-[#ef090d]">
          {formik.touched.mobilePhone && formik.errors.mobilePhone}
        </div>
      </div>
      <div className='relative mb-2'>
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
        <div className="absolute -bottom-[20px] left-[8px] text-[#ef090d]">
          {formik.touched.password && formik.errors.password}
        </div>
      </div>
      <div className='relative mb-2'>
        <CustomInput
          type="password"
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-2 border-[#ef090d]' : ''}
        />
        <div className="absolute -bottom-[20px] left-[8px] text-[#ef090d]">
          {formik.touched.confirmPassword && formik.errors.confirmPassword}
        </div>
      </div>
      <div className="mt-4 mb-8 text-md text-end w-full items-center">
        <Link to="/" className="text-[#64748b] hover:text-[#788191] mr-2">
          Login
        </Link>
      </div>
      <button
        className='h-[60px] text-lg border-0 px-3 py-2 text-white fw-bold w-full max-w-[420px] mx-auto flex justify-center items-center text-center bg-black rounded-md'
        type="submit"
      >
        Register
      </button>
    </form>
  )
}
