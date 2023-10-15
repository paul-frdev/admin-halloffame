import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from "formik";
import { CustomInput } from '../ui/CustomInput';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { createNewBlogCategory, resetState } from '../../store/blogCategorySlice';
import { Button } from '../ui/Button';

const schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});


export const BlogCategoryForm = () => {

  const dispatch = useAppDispatch()
  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[3];
  const { bCategories, isError, isLoading, isSuccess } = useAppSelector((state: RootState) => state.blogCategory)

  
  useEffect(() => {
    dispatch(resetState());
  }, [])
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const data = { title: values.title }
      dispatch(createNewBlogCategory(data));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState())
      }, 300);
    },
  });
  return (
    <div>
      <h3 className="mb-4  title">
        {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
            label="Enter Blog Category"
            id="blogcat"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <Button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
          </Button>
        </form>
      </div>

    </div>
  )
}
