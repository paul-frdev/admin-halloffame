import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { CustomInput } from '../ui/CustomInput';
import { QuillEditor } from '../ui/QuillEditor';
import { Select } from '../ui/Select';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { getBrands } from '../../store/brandSlice';
import { getCategories } from '../../store/categorySlice';
import { getColors } from '../../store/colorSlice';
import { getWeights } from '../../store/weightSlice';
import { getSizes } from '../../store/sizeSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ImageUrls } from '../../types/store';


let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

interface FormikProps {
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string[];
  brands: string[];
  colors: string[];
  tags: string[];
  images: ImageUrls[];
  discount?: number;
  isdiscount?: boolean;
  weights?: string[];
  sizes?: string[];

}

export const ProductForm = () => {

  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [weights, setWeights] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([])

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const brandState = useAppSelector((state: RootState) => state.brands.brands)
  const categoryState = useAppSelector((state: RootState) => state.categories.categories)
  const colorState = useAppSelector((state: RootState) => state.colors.colors)
  const weightsState = useAppSelector((state: RootState) => state.weights.weights)
  const sizeState = useAppSelector((state: RootState) => state.sizes.sizes)
  const imageState = useAppSelector((state: RootState) => state.uploadImages.images)
  const { isError, isLoading, isSuccess, createdProduct, updatedProduct, productTitle } = useAppSelector((state: RootState) => state.products)

  const productId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
    dispatch(getWeights())
    dispatch(getSizes())
  }, []);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);


  const colorOptions: any = [];
  colorState?.forEach((i) => {
    colorOptions.push({
      label: i.color_name,
      value: i.colors_id,
    });
  });

  const sizesOptions: any = [];
  sizeState?.forEach((i) => {
    sizesOptions.push({
      label: i.size_name,
      value: i.sizes_id,
    });
  });

  const weightsOptions: any = [];
  weightsState?.forEach((i) => {
    weightsOptions.push({
      label: i.weight_name,
      value: i.weights_id,
    });
  });

  const brandsOptions: any = [];
  brandState?.forEach((i) => {
    brandsOptions.push({
      label: i.brand_name,
      value: i.brand_id,
    });
  });

  const categoryOptions: any = [];
  categoryState?.forEach((i) => {
    categoryOptions.push({
      label: i.category_name,
      value: i.category_id,
    });
  });

  const images = [];
  imageState.forEach((i) => {
    images.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.colors = colors.length > 0 ? colors : []
    formik.values.sizes = sizes.length > 0 ? sizes : []
    formik.values.brands = brands.length > 0 ? brands : []
    formik.values.category = categories.length > 0 ? categories : []
  }, [colors, sizes, brands, categories])


  const formik = useFormik<FormikProps>({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      quantity: 0,
      category: [],
      brands: [],
      tags: [],
      colors: [],
      sizes: [],
      weights: [],
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log('values', values);
    },
  });

  const handleColor = (e: string[]) => {
    setColors(e)
  }

  const handleSize = (e: string[]) => {
    setSizes(e);
  }

  const handleWeight = (e: string[]) => {
    setWeights(e)
  }

  const handleBrand = (e: string[]) => {
    setBrands(e)
  }

  const handleCategory = (e:  string[]) => {
    setCategories(e)
  }
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
          value={formik.values.price.toString()}
          formikTouched={formik.touched.price}
          formikErrors={formik.errors.price}
        />
        <CustomInput
          type="number"
          label="Enter quantity"
          name="quantity"
          onChange={formik.handleChange("quantity")}
          onBlur={formik.handleBlur("quantity")}
          value={formik.values.quantity.toString()}
          formikTouched={formik.touched.quantity}
          formikErrors={formik.errors.quantity}
        />
        <Select
          name='sizes'
          mode="multiple"
          optionItems={sizesOptions}
          defaultValue={sizes}
          onChange={(e: string[]) => handleSize(e)}
          valueSelect={formik.values.sizes?.[0]}
          className=' min-w-[100px] max-w-[450px] py-3 mb-3'
          formikErrors={formik.errors.sizes}
          formikTouched={formik.touched.sizes}
          label='Select Size'
        />
        <Select
          name='colors'
          mode="multiple"
          optionItems={colorOptions}
          defaultValue={colors}
          onChange={(e: string[]) => handleColor(e)}
          valueSelect={formik.values.colors[0]}
          className=' min-w-[100px] max-w-[450px] py-3 mb-3'
          formikErrors={formik.errors.colors}
          formikTouched={formik.touched.colors}
          label='Select Color'
        />
        <Select
          name='weights'
          mode="multiple"
          optionItems={weightsOptions}
          defaultValue={weights}
          onChange={(e: string[]) => handleWeight(e)}
          valueSelect={formik.values.weights?.[0]}
          className=' min-w-[100px] max-w-[450px] py-3 mb-3'
          formikErrors={formik.errors.weights}
          formikTouched={formik.touched.weights}
          label='Select Weights'
        />
        <Select
          name='brands'
          mode="multiple"
          optionItems={brandsOptions}
          defaultValue={weights}
          onChange={(e: string[]) => handleBrand(e)}
          valueSelect={formik.values.brands?.[0]}
          className=' min-w-[100px] max-w-[450px] py-3 mb-3'
          formikErrors={formik.errors.brands}
          formikTouched={formik.touched.brands}
          label='Select Brands'
        />
        <Select
          name='category'
          optionItems={categoryOptions}
          defaultValue={categories}
          onChange={(e: string[]) => handleCategory(e)}
          valueSelect={formik.values.category?.[0]}
          className=' min-w-[100px] max-w-[450px] py-3 mb-3'
          formikErrors={formik.errors.category}
          formikTouched={formik.touched.category}
          label='Select Category'
        />
        <Button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
          disabled={isLoading}
        >
          {productId !== undefined ? "Edit" : "Add"} Product
        </Button>
      </form>
    </div>
  )
}
