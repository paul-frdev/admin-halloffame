import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from "formik";
import { CustomInput } from '../ui/CustomInput';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';

import { Button } from '../ui/Button';
import { toast } from 'react-toastify';
import { createBrand, getBrand, resetState, updateBrand } from '../../store/brandSlice';

const schema = yup.object().shape({
  brand_name: yup.string().required("Category Name is Required"),
});


export const BrandForm = () => {

  const dispatch = useAppDispatch()
  const location = useLocation();
  const { isError, isLoading, isSuccess, createdBrand, updatedBrand, brandName } = useAppSelector((state: RootState) => state.brands)


  const navigate = useNavigate();

  const brandId = location.pathname.split("/")[3];


  useEffect(() => {
    if (brandId !== undefined) {
      dispatch(getBrand(brandId));
    } else {
      dispatch(resetState());
    }
  }, [brandId]);


  useEffect(() => {
    if (isSuccess && createdBrand?.length! > 0) {
      toast.success("Brand Added Successfully!");
    }
    if (isSuccess && updatedBrand?.length! > 0) {
      toast.success("Brand Updated Successfully!");
      navigate("/admin/brand-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBrand, updatedBrand]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      brand_name: brandName?.brand_name || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (brandId !== undefined) {
        const data = { brand_id: brandId, brand_name: values.brand_name }
        dispatch(updateBrand(data))
      } else {
        dispatch(createBrand(values));
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
        {brandId !== undefined ? "Edit" : "Add"} Brand
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="brand_name"
            onChange={formik.handleChange("brand_name")}
            onBlur={formik.handleBlur("brand_name")}
            value={formik.values.brand_name}
            label="Enter Brand"
            id="brand"
            formikErrors={formik.errors.brand_name}
            formikTouched={formik.touched.brand_name}
          />
          <Button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
            disabled={isLoading}
          >
            {brandId !== undefined ? "Edit" : "Add"} brand
          </Button>
        </form>
      </div>
    </div>
  )
}