import { useFormik } from 'formik';
import React from 'react'
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { CustomInput } from '../ui/CustomInput';
import { QuillEditor } from '../ui/QuillEditor';
import { Select } from '../ui/Select';


let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

export const ProductForm = () => {

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log('values', values);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <form action="" onSubmit={formik.handleSubmit} className='flex flex-col gap-3'>
        <CustomInput
          type='text'
          label='Enter Product title'
          name='title'
          onChange={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
          value={formik.values.title}
          formikTouched={formik.touched.title}
          formikErrors={formik.errors.title}
        />
        <QuillEditor
          theme='snow'
          onChange={() => formik.handleChange("description")}
          value={formik.values.description}
          formikErrors={formik.errors.description}
          formikTouched={formik.touched.description}
        />
        <CustomInput
          type="number"
          label="Enter Product Price"
          name="price"
          onChange={formik.handleChange("price")}
          onBlur={formik.handleBlur("price")}
          value={formik.values.price}
          formikTouched={formik.touched.price}
          formikErrors={formik.errors.price}
        />
        {/* <Select
          name='brand'
          onChange={() => formik.handleChange("brand")}
          onBlur={() => formik.handleBlur("brand")}
          valueSelect={formik.values.brand}
          className='form-control py-3 mb-3'
        /> */}
      </form>
    </div>
  )
}
