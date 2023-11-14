import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState, useAppSelector, useAppDispatch } from "../../store/store";
import { getCategories } from '../../store/blogCategorySlice';
import { createArticle, getArticleById, resetStateArticle } from '../../store/articleSlice';
import { ImagesProps, UploadImages } from '../common/UploadImages';
import { FormItem } from '../ui/FormItem';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Form, Input, Select } from 'antd';
import ReactQuill from 'react-quill';
import { cn } from '../../lib/utils';
import { Title } from '../ui/Title';
import { toast } from 'react-toastify';
import { Calendar } from '../calendar/Calendar';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';


const validationSchema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required('Required field').min(14, 'Minimum length is 14 characters'),
  categoryId: yup.string().required("Category is Required"),
  publishDate: yup.date().required('Publish date is required').typeError('Invalid date format'),
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

export const ArticleForm = () => {

  const [curArticleId, setCurArticleId] = useState<any>();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ImageState = useAppSelector((state: RootState) => state.uploadImages.images);
  const { bCategories } = useAppSelector((state: RootState) => state.blogCategory);
  const { articles } = useAppSelector((state: RootState) => state.articles);

  const articleId = location.pathname.split("/")[3];
  const imagesCloudinary: { public_id: string | undefined; url: string | undefined }[] = [];

  const { control, handleSubmit, formState: { errors }, setValue, getValues, reset, register } = useForm({
    defaultValues: {
      title: '',
      description: '',
      categoryId: '',
      publishDate: undefined,
      images: []
    },
    resolver: yupResolver(validationSchema),
  });

  ImageState.forEach((i) => {
    imagesCloudinary.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    const articleWithId = articles.find((item) => item.article_id === articleId)
    setCurArticleId(articleWithId);
    if (articleId !== undefined) {
      dispatch(getArticleById(articleId))
    } else {
      dispatch(resetStateArticle())
    }
  }, [articleId]);

  useEffect(() => {
    dispatch(resetStateArticle());
    dispatch(getCategories())
  }, []);


  const onSubmit: SubmitHandler<any> = (data) => {
    data.publishDate = format(data.publishDate, 'yyyy-MM-dd', { locale: uk });
    try {
      dispatch(createArticle(data))
      dispatch(resetStateArticle())
      reset();
      toast.success('Article added successfully')
    } catch (error) {
      toast.error(`Something went wrong, ${error}`)
    }
  }


  const categoryOptions: any = [];
  bCategories?.forEach((i) => {
    categoryOptions.push({
      label: i.title,
      value: i.category_id,
    });
  });

  const onImageUpload = (uploadedImages: ImagesProps[]) => {
    const simplifiedImagesUrls = uploadedImages.map(i => ({ public_id: i.public_id, url: i.url }) as any);
    setValue('images', simplifiedImagesUrls, { shouldValidate: true });
    return simplifiedImagesUrls
  }

  return (
    <div>
      <Title> {articleId !== undefined ? "Edit" : "Add"} Article</Title>
      <Form action="" layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <UploadImages
          register={register('images')}
          name='images'
          uploadedImages={onImageUpload}
          errors={errors.images}
        />
        <FormItem name='title' control={control} label='Enter title' help>
          <Input type='text' size="large" />
        </FormItem>
        <div className='relative'>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <div>
                <Title level={5}>Add text about the article</Title>
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
        <FormItem name="categoryId" control={control} label='Select category for article' help>
          <Select size="large" options={categoryOptions} />
        </FormItem>
        <FormItem name='publishDate' control={control} help label="Select date when to publish the article">
          <Calendar
            locale={uk.code}
          />
        </FormItem>
        <Form.Item className='mt-4'>
          <Button className='w-[150px] mt-4' size="large" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
