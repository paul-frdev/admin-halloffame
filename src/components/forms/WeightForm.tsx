import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from "formik";
import { CustomInput } from '../ui/CustomInput';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';

import { Button } from '../ui/Button';
import { toast } from 'react-toastify';
import { createWeight, getWeight, resetState, updateWeight } from '../../store/weightSlice';

const schema = yup.object().shape({
  weight_name: yup.string().required("Category Name is Required"),
});


export const WeightForm = () => {

  const dispatch = useAppDispatch()
  const location = useLocation();
  const { isError, isLoading, isSuccess, createdWeight, updatedWeight, weightName } = useAppSelector((state: RootState) => state.weights)

  const navigate = useNavigate();
  
  const getWeightId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getWeightId !== undefined) {
      dispatch(getWeight(getWeightId));
    } else {
      dispatch(resetState());
    }
  }, [getWeightId]);


  useEffect(() => {
    if (isSuccess && createdWeight?.length! > 0) {
      toast.success("Weight Added Successfully!");
    }
    if (isSuccess && updatedWeight?.length! > 0) {
      toast.success("Weight Updated Successfully!");
      navigate("/admin/weight-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdWeight, updatedWeight]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      weight_name: weightName?.weight_name || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (getWeightId !== undefined) {
        const data = { weights_id: getWeightId, weight_name: values.weight_name }
        dispatch(updateWeight(data))
      } else {
        dispatch(createWeight(values));
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
        {getWeightId !== undefined ? "Edit" : "Add"} Weight
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="weight_name"
            onChange={formik.handleChange("weight_name")}
            onBlur={formik.handleBlur("weight_name")}
            value={formik.values.weight_name}
            label="Enter Weight"
            id="weight"
          />
          <div className="error">
            {formik.touched.weight_name && formik.errors.weight_name}
          </div>
          <Button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
            disabled={isLoading}
          >
            {getWeightId !== undefined ? "Edit" : "Add"} Weight
          </Button>
        </form>
      </div>
    </div>
  )
}