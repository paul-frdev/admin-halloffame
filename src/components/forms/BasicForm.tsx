import React from 'react';
import * as yup from 'yup';
import { cn } from '../../lib/utils';
import { Form } from 'antd';

interface FormProps {
  handleSubmit: (data: any) => void;
  validationSchema: yup.ObjectSchema<any>;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const BasicForm = ({ handleSubmit, validationSchema, children, title, className, ...rest }: FormProps) => {

  return (
    <>
      <h2>{title}</h2>
      <Form {...rest} onFinish={(data) => {
        handleSubmit(data); // Handle form submission
        console.log(data); // Perform additional actions
      }}>
        {children}
      </Form>
    </>
  );
};



