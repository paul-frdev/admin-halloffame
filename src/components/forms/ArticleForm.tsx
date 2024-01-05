import React, { useEffect } from 'react'
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import { RootState, useAppSelector, useAppDispatch } from "../../store/store";
import { getCategories } from '../../store/blogCategorySlice';
import { createArticle, getArticleById, resetStateArticle } from '../../store/articleSlice';
import { ImagesProps, UploadImages } from '../common/UploadImages';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormItem } from '../ui/FormItem';
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
  articleType: yup.string().required("Slide Type is Required"),
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

  const location = useLocation();
  const dispatch = useAppDispatch();
  const { images } = useAppSelector((state: RootState) => state.uploadImages);
  const { bCategories } = useAppSelector((state: RootState) => state.blogCategory);
  const { article } = useAppSelector((state: RootState) => state.articles);

  const articleId = location.pathname.split("/")[3] || undefined;
  const imagesCloudinary: { public_id: string | undefined; url: string | undefined }[] = [];
  const articleType: any = [{ value: 'media_news', label: 'media_news' }, { value: 'blog_news', label: 'blog_news' },];

  const { control, handleSubmit, formState: { errors }, setValue, reset, register } = useForm({
    defaultValues: {
      title: '',
      description: '',
      categoryId: '',
      articleType: '',
      publishDate: undefined,
      images: []
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setValue('title', article?.title!)
    setValue('description', article?.description!)
    setValue('categoryId', article?.cat_title!)
    setValue('publishDate', article?.publish_date!)
    setValue('articleType', article?.article_type!)
  }, [article])

  useEffect(() => {
    if (images && images !== undefined) {
      images.forEach((i) => {
        imagesCloudinary.push({
          public_id: i.public_id,
          url: i.url,
        });
      });
    }
  }, [images])

  useEffect(() => {
    if (articleId !== undefined) {
      dispatch(getArticleById(articleId));
    } else {
      dispatch(resetStateArticle());
    }
  }, [articleId]);

  useEffect(() => {
    dispatch(resetStateArticle());
    dispatch(getCategories())
  }, [dispatch]);


  const onSubmit: SubmitHandler<any> = (data) => {
    data.publishDate = format(data.publishDate, 'yyyy-MM-dd', { locale: uk });

    if (articleId === undefined) {
      dispatch(createArticle(data))
      toast.success('Article added successfully')
    } else {
      // TODO update article
    }

    dispatch(resetStateArticle())
    reset();
  }


  const categoryOptions: any = [];
  bCategories?.forEach((i) => {
    categoryOptions.push({
      label: i.title,
      value: i.category_id,
    });
  });

  const onImageUpload = (uploadedImages: ImagesProps[]) => {
    const simplifiedImagesUrls = images ? uploadedImages.map(i => ({ public_id: i.public_id, url: i.url }) as any) : [];
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
          publicId={article?.images?.[0].public_id!}
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
                <Title level={5}>Add text about an article</Title>
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
        <FormItem name="articleType" control={control} label='Select where to post article media or blog' help>
          <Select size="large" options={articleType} />
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
