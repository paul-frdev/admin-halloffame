import React, { useEffect, useState } from 'react'
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { getBrands } from '../../store/brandSlice';
import { getCategories } from '../../store/categorySlice';
import { getColors } from '../../store/colorSlice';
import { getWeights } from '../../store/weightSlice';
import { getSizes } from '../../store/sizeSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { BrandsData, ColorsData, ImageUrls, WeightsData } from '../../types/store';
import { cn } from '../../lib/utils';
import { ImagesProps, UploadImages } from '../common/UploadImages';
import { Title } from '../ui/Title';

//react-hook-form 
import { FormItem } from '../ui/FormItem';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Form, Input, Select, Checkbox } from 'antd';
import ReactQuill from 'react-quill';
import { createProduct, getTags, resetStateProduct } from '../../store/productSlice';


const validationSchema = yup.object().shape({
  title: yup.string().required('Required field'),
  description: yup.string().required('Required field').min(14, 'Minimum length is 14 characters'),
  price: yup.number().required('price field is required'),
  isDiscount: yup.boolean(),
  discount: yup.number().required('discount field is required'),
  quantity: yup.number().required('quantity field is required'),
  category: yup.string().required('category field is required'),
  brands: yup.array(),
  colors: yup.array(),
  weights: yup.array(),
  sizes: yup.array(),
  tags: yup.array(),
  images: yup.array().of(
    yup.object().shape({
      public_id: yup.string().required('Public ID is required'),
      url: yup.string().required('Image URL is required'),
    })
  ).test('at-least-one-image', 'One image is required', function (value) {
    if (!value || value.length === 0) {
      return false;
    }
    return true;
  }).required('At least one image is required'),

});

interface FormikProps {
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  quantity: number;
  category: string;
  brands: string[];
  colors: string[];
  tags: string[];
  images: ImageUrls[];
  discount?: number;
  isDiscount: boolean;
  weights?: string[];
  sizes?: string[];

}

type OptionType = {
  value?: string;
  label?: string;
}



export const ProductForm = () => {


  const [optionBrands, setOptionBrands] = useState<OptionType[] | undefined>([])
  const [optionColors, setOptionColors] = useState<OptionType[] | undefined>([])
  const [optionWeights, setOptionWeights] = useState<OptionType[] | undefined>([])
  const [optionSizes, setOptionSizes] = useState<OptionType[] | undefined>([])
  const [optionCategory, setOptionCategory] = useState<OptionType[] | undefined>([])
  const [optionTags, setOptionTags] = useState<OptionType[] | undefined>([])

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { brands } = useAppSelector((state: RootState) => state.brands)
  const { categories } = useAppSelector((state: RootState) => state.categories)
  const { colors } = useAppSelector((state: RootState) => state.colors)
  const { weights } = useAppSelector((state: RootState) => state.weights)
  const { sizes } = useAppSelector((state: RootState) => state.sizes)
  const { images } = useAppSelector((state: RootState) => state.uploadImages)

  const { isError, isLoading, isSuccess, createdProduct, tags } = useAppSelector((state: RootState) => state.products)

  const { control, handleSubmit, formState: { errors }, setValue, getValues, register, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      price: 0,
      isDiscount: false,
      discount: 0,
      quantity: 0,
      images: [],
      sizes: [],
      weights: [],
      colors: [],
      brands: []
    },
    resolver: yupResolver(validationSchema),
  });


  useEffect(() => {
    const mappedBrands = brands?.map((item) => ({
      value: item.brand_id,
      label: item.brand_name
    }));
    setOptionBrands(mappedBrands);
    const mappedColors = colors?.map((item) => ({
      value: item.color_id,
      label: item.color_name
    }));
    setOptionColors(mappedColors);
    const mappedWeights = weights?.map((item) => ({
      value: item.weight_id,
      label: item.weight_name
    }));
    setOptionWeights(mappedWeights);
    const mappedSizes = sizes?.map((item) => ({
      value: item.size_id,
      label: item.size_name
    }));
    setOptionSizes(mappedSizes);
    const mappedCategories = categories?.map((item) => ({
      value: item.category_id,
      label: item.category_name
    }));
    setOptionCategory(mappedCategories);
    const mappedTags = tags?.map((item) => ({
      value: item.tag_id,
      label: item.tag_name
    }));
    setOptionTags(mappedTags);
  }, [brands, colors, weights, sizes, categories, tags]);

  const productId = location.pathname.split("/")[3];

  const productImages: ImageUrls[] = [];
  images.forEach((i) => {
    productImages.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
    dispatch(getWeights())
    dispatch(getSizes())
    dispatch(getTags())
  }, []);

  useEffect(() => {
    if (isSuccess && createdProduct?.length! > 0) {
      toast.success("Product Added Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const onImageUpload = (uploadedImages: ImagesProps[]) => {
    const simplifiedImagesUrls = uploadedImages.map(i => ({ public_id: i.public_id, url: i.url }) as any);
    setValue('images', simplifiedImagesUrls, { shouldValidate: true });

    return simplifiedImagesUrls
  }

  const onSubmit: SubmitHandler<any> = (data) => {
    try {
      dispatch(createProduct(data))
      reset();
      toast.success('Product added successfully')
    } catch (error) {
      toast.error(`Something went wrong, ${error}`)
    }
  }

  console.log('getValues', getValues(), 'colors', colors);
  return (
    <div>
      <Title level={4} className="mb-4">Add Product</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <UploadImages
          register={register('images')}
          name='images'
          uploadedImages={onImageUpload}
          errors={errors.images}
        />
        <FormItem name='title' control={control} label='Enter title' help>
          <Input size="large" />
        </FormItem>
        <FormItem name='category' control={control} label='Select product category' help>
          <Select size="large" options={optionCategory} />
        </FormItem>
        <div className='relative'>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <div>
                <Title level={5}>Add a description about the event</Title>
                <ReactQuill
                  theme="snow"
                  className={cn(`my-4 border-[1.5px] rounded-md`, errors.description ? 'border-[#ef090d]' : ' border-transparent')}
                  {...field}
                  onChange={(text) => {
                    field.onChange(text);
                  }}
                />
              </div>
            )}
          />
          {errors.description && <p className='absolute -bottom-[35px] left-[8px] text-[#ef090d]'>{errors.description.message}</p>}
        </div>
        <FormItem name='price' control={control} label='Enter price' help>
          <Input type='number' size="large" />
        </FormItem>
        <FormItem name='quantity' control={control} label='Enter how many quantity of products do you have in stock' help>
          <Input type='number' size="large" />
        </FormItem>
        <FormItem name='isDiscount' control={control} label='press button if you want to add discount' help>
          <Checkbox name='isDiscount' />
        </FormItem>
        <FormItem name='discount' control={control} label='Enter discount' help>
          <Input type='number' size="large" />
        </FormItem>
        <FormItem name='brands' control={control} label='Select Brand' help>
          <Select size="large" mode="multiple" options={optionBrands} />
        </FormItem>
        <FormItem name='colors' control={control} label='Select Colors' help>
          <Select size="large" mode="multiple" options={optionColors} />
        </FormItem>
        <FormItem name='weights' control={control} label='Select Weights' help>
          <Select size="large" mode="multiple" options={optionWeights} />
        </FormItem>
        <FormItem name='sizes' control={control} label='Select Sizes' help>
          <Select size="large" mode="multiple" options={optionSizes} />
        </FormItem>
        <FormItem name='tags' control={control} label='Select Tags' help>
          <Select size="large" mode="multiple" options={optionTags} />
        </FormItem>
        <Form.Item>
          <Button className='w-[150px] mt-4' size="large" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
