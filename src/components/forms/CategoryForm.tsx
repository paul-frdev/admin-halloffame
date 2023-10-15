import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from "formik";
import { CustomInput } from '../ui/CustomInput';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';

import { Button } from '../ui/Button';
import { toast } from 'react-toastify';
import { createCategory, getCategory, resetState, updateCategory } from '../../store/categorySlice';

const schema = yup.object().shape({
  category_name: yup.string().required("Category Name is Required"),
});


export const CategoryForm = () => {

  const dispatch = useAppDispatch()
  const location = useLocation();
  const { isError, isLoading, isSuccess, createdCategory, updatedCategory, categoryName } = useAppSelector((state: RootState) => state.categories)

  
  const navigate = useNavigate();
  
  const getCategoryId = location.pathname.split("/")[3];


  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getCategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId]);


  useEffect(() => {
    if (isSuccess && createdCategory?.length! > 0) {
      toast.success("Category Added Successfully!");
    }
    if (isSuccess && updatedCategory?.length! > 0) {
      toast.success("Category Updated Successfully!");
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdCategory, updatedCategory]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      category_name: categoryName?.category_name || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (getCategoryId !== undefined) {
        const data = { category_id: getCategoryId, category_name: values.category_name }
        dispatch(updateCategory(data))
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState())
        }, 300);
      }
    },
  });


  return (
    <div>
      <h3 className="mb-4  title">
        {getCategoryId !== undefined ? "Edit" : "Add"} getCategoryId
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="category_name"
            onChange={formik.handleChange("category_name")}
            onBlur={formik.handleBlur("category_name")}
            value={formik.values.category_name}
            label="Enter Category"
            id="category"
            formikErrors={formik.touched.category_name}
            formikTouched={formik.errors.category_name}
          />
          <Button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
            disabled={isLoading}
          >
            {getCategoryId !== undefined ? "Edit" : "Add"} Category
          </Button>
        </form>
      </div>
    </div>
  )
}