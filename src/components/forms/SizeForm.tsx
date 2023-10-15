import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from "formik";
import { CustomInput } from '../ui/CustomInput';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';

import { Button } from '../ui/Button';
import { toast } from 'react-toastify';
import { createSize, getSize, resetState, updateSize } from '../../store/sizeSlice';

const schema = yup.object().shape({
  size_name: yup.string().required("Category Name is Required"),
});


export const SizeForm = () => {

  const dispatch = useAppDispatch()
  const location = useLocation();
  const { isError, isLoading, isSuccess, createdSize, updatedSize, sizeName } = useAppSelector((state: RootState) => state.sizes)

  
  const navigate = useNavigate();
  
  const getSizeId = location.pathname.split("/")[3];


  useEffect(() => {
    if (getSizeId !== undefined) {
      dispatch(getSize(getSizeId));
    } else {
      dispatch(resetState());
    }
  }, [getSizeId]);


  useEffect(() => {
    if (isSuccess && createdSize?.length! > 0) {
      toast.success("Size Added Successfully!");
    }
    if (isSuccess && updatedSize?.length! > 0) {
      toast.success("Size Updated Successfully!");
      navigate("/admin/size-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdSize, updatedSize]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      size_name: sizeName?.size_name || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (getSizeId !== undefined) {
        const data = { sizes_id: getSizeId, size_name: values.size_name }
        dispatch(updateSize(data))
      } else {
        dispatch(createSize(values));
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
        {getSizeId !== undefined ? "Edit" : "Add"} Size
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="size_name"
            onChange={formik.handleChange("size_name")}
            onBlur={formik.handleBlur("size_name")}
            value={formik.values.size_name}
            label="Enter Size"
            id="blogcat"
          />
          <div className="error">
            {formik.touched.size_name && formik.errors.size_name}
          </div>
          <Button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
            disabled={isLoading}
          >
            {getSizeId !== undefined ? "Edit" : "Add"} Size
          </Button>
        </form>
      </div>
    </div>
  )
}