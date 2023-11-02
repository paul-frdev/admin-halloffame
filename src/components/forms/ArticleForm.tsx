import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { RootState, useAppSelector, useAppDispatch } from "../../store/store";
import { getCategories, resetState } from '../../store/blogCategorySlice';
import { CustomInput } from '../ui/CustomInput';
import { Button } from '../ui/Button';
import { createArticle, getArticleById } from '../../store/articleSlice';
import { UploadImages } from '../common/UploadImages';
import { RichEditor } from '../common/RichEditor';
import { Select } from '../ui/Select';


let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  categoryId: yup.string().required("Category is Required"),
});

export const ArticleForm = () => {

  const [curArticleId, setCurArticleId] = useState<any>()
  const [categories, setCategories] = useState<string[]>([])


  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ImageState = useAppSelector((state: RootState) => state.uploadImages.images);
  const blogCategories = useAppSelector((state: RootState) => state.blogCategory.bCategories);
  const articles = useAppSelector((state: RootState) => state.articles);

  const articleById = location.pathname.split("/")[3];
  const imagesCloudinary: { public_id: string | undefined; url: string | undefined }[] = [];


  ImageState.forEach((i) => {
    imagesCloudinary.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    const articleWithId = articles.articles.find((item) => item.article_id === articleById)
    setCurArticleId(articleWithId);
    if (articleById !== undefined) {
      dispatch(getArticleById(articleById))
    } else {
      dispatch(resetState())
    }
  }, [articleById]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories())
  }, []);


  useEffect(() => {
    formik.values.categoryId = categories && categories.length !== 0 ? categories : []
  }, [categories])


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: curArticleId ? curArticleId.title as string : "",
      description: curArticleId ? curArticleId.description as string : "",
      categoryId: curArticleId ? curArticleId.cat_title as any : "",
      images: imagesCloudinary,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createArticle(values));
      dispatch(resetState())
    },
  });

  const categoryOptions: any = [];
  blogCategories?.forEach((i) => {
    categoryOptions.push({
      label: i.title,
      value: i.category_id,
    });
  });

  const handleCategory = (e: string[]) => {
    setCategories(e)
  }

  console.log('formik', formik.values.description.length);


  return (
    <div>
      <h3 className="mb-4 title">
        {articleById !== undefined ? "Edit" : "Add"} Blog
      </h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <UploadImages />
        <CustomInput
          type="text"
          label="Enter Blog Title"
          name="title"
          onChange={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
          value={formik.values.title}
        />
        <RichEditor
          onChange={formik.handleChange("description")}
          value={formik.values.description}
        />
        <Select
          name='category'
          optionItems={categoryOptions}
          defaultValue={categories}
          onChange={(e: string[]) => handleCategory(e)}
          valueSelect={formik.values.categoryId?.[0]}
          className='min-w-[240px] max-w-[450px] py-3 mb-3'
          formikErrors={formik.errors.categoryId}
          formikTouched={formik.touched.categoryId}
          label='Select Category'
        />
        <div>
          <Button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {articleById !== undefined ? "Edit" : "Add"} Article
          </Button>
        </div>
      </form>
    </div>
  )
}
