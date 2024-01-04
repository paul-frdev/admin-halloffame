import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { createNewBlogCategory, getCategoryById, resetStateBlogCategory, updateCategory } from '../../store/blogCategorySlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Title } from '../ui/Title';
import { toast } from 'react-toastify';
import { Button, Form, Input } from 'antd';
import { FormItem } from '../ui/FormItem';

const validationSchema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

export const BlogCategoryForm = () => {

  const dispatch = useAppDispatch()
  const location = useLocation();
  const navigate = useNavigate()
  const { bCategories, isError, isLoading, isSuccess, bCategory } = useAppSelector((state: RootState) => state.blogCategory)

  const blogCatId = location.pathname.split("/")[3] || undefined;

  useEffect(() => {
    dispatch(resetStateBlogCategory());
  }, [])

  useEffect(() => {
    setValue('title', bCategory?.title!)
  }, [bCategory])

  useEffect(() => {
    if (blogCatId !== undefined) {
      dispatch(getCategoryById(blogCatId))
    } else {
      dispatch(resetStateBlogCategory())
    }
  }, [blogCatId])

  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = (data) => {

    if (blogCatId === undefined) {
      dispatch(createNewBlogCategory(data))
      toast.success('blog category added successfully')
    } else {
      const updatedCategory = { category_id: blogCatId, title: data.title }
      dispatch(updateCategory(updatedCategory))
      toast.success('blog category updated successfully')
      navigate('/admin/blog-list')
    }

    dispatch(resetStateBlogCategory())
    reset();
  }

  return (
    <div>
      <Title> {blogCatId !== undefined ? "Edit" : "Add"} Blog Category</Title>
      <Form action="" layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <FormItem name='title' control={control} label='Enter title' help>
          <Input type='text' size="large" />
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
