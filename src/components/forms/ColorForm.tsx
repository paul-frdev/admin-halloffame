import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from "formik";
import { CustomInput } from '../ui/CustomInput';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';

import { Button } from '../ui/Button';
import { createColor, getAColor, resetState, updateColor } from '../../store/colorSlice';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  color_name: yup.string().required("Category Name is Required"),
});


export const ColorForm = () => {

  const dispatch = useAppDispatch()
  const location = useLocation();
  const { isError, isLoading, isSuccess, createdColor, updatedColor, colorName } = useAppSelector((state: RootState) => state.colors)

  const navigate = useNavigate();

  const getColorId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);


  useEffect(() => {
    if (isSuccess && createdColor?.length! > 0) {
      toast.success("Color Added Successfully!");
    }
    if (isSuccess && updatedColor?.length! > 0) {
      toast.success("Color Updated Successfully!");
      navigate("/admin/color-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdColor, updatedColor]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      color_name: colorName?.color_name || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (getColorId !== undefined) {
        const data = { colors_id: getColorId, color_name: values.color_name }
        dispatch(updateColor(data))
      } else {
        dispatch(createColor(values));
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
        {getColorId !== undefined ? "Edit" : "Add"} Color
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="color_name"
            onChange={formik.handleChange("color_name")}
            onBlur={formik.handleBlur("color_name")}
            value={formik.values.color_name}
            label="Enter Color"
            id="color"
          />
          <div className="error">
            {formik.touched.color_name && formik.errors.color_name}
          </div>
          <Button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
            disabled={isLoading}
          >
            {getColorId !== undefined ? "Edit" : "Add"} Color
          </Button>
        </form>
      </div>
    </div>
  )
}
