import React, { useEffect } from 'react'
import * as yup from "yup";
import ReactQuill from "react-quill";
import Dropzone from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";

import "react-quill/dist/quill.snow.css";
import { RootState, useAppSelector, useAppDispatch } from "../../store/store";
import { getCategories, resetState } from '../../store/blogCategorySlice';
import { ImageUrls } from '../../types/store';
import { CustomInput } from '../../components/ui/CustomInput';
import { uploadImg } from '../../store/uploadImageSlice';
import { Button } from '../ui/Button';
import { createArticle } from '../../store/ArticleSlice';


let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
});

export const AddArticleForm = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ImageState = useAppSelector((state: RootState) => state.uploadImages.images);
  const blogCategories = useAppSelector((state: RootState) => state.blogCategory.bCategories);
  const { articles, articleImages } = useAppSelector((state: RootState) => state.articles);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      description: "",
      categoryId: "",
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log('values', values);
      dispatch(createArticle(values))
    }
  })

  const getBlogId = location.pathname.split("/")[3];
  const images: ImageUrls[] = [];

  ImageState.forEach((i) => {
    images.push({
      public_id: i.public_id,
      url: i.url,
    });
  });


  console.log('formik.values', formik.values);
  
  useEffect(() => {
    formik.values.images = images as any
  }, [blogCategories])

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories())
  }, []);

  useEffect(() => {
    formik.values.images = images as any;
  }, [articleImages]);

  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogId !== undefined ? "Edit" : "Add"} Blog
        <div>
          <form action="" onSubmit={formik.handleSubmit}>
            <div className=' relative mt-8'>
              <CustomInput
                type="text"
                label="Enter Blog Title"
                name="title"
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                value={formik.values.title}
              />
              <div className="absolute -bottom-[18px] left-[8px] text-[#ef090d]">
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
            <div className='relative'>
              <select
                name="categoryId"
                onChange={formik.handleChange("categoryId")}
                onBlur={formik.handleBlur("categoryId")}
                value={formik.values.categoryId}
                className=" border px-4 border-[#999999] rounded-md form-control py-3  mt-8"
                id=""
              >
                <option>Select Blog Category</option>
                {blogCategories.map((i, j) => {
                  return (
                    <option key={j} value={i.category_id}>
                      {i.title}
                    </option>
                  );
                })}
              </select>
              <span className="absolute -bottom-[18px] left-[8px] text-[#ef090d]">
                {formik.touched.categoryId && formik.errors.categoryId}
              </span>
            </div>
            <div className='relative mt-8'>
              <ReactQuill
                theme="snow"
                className="my-8"
                onChange={formik.handleChange("description")}
                value={formik.values.description}
              />
              <div className="absolute -bottom-[18px] left-[8px] text-[#ef090d]">
                {formik.touched.description && formik.errors.description}
              </div>
            </div>
            <div className="bg-white border-1 p-5 text-center mt-3">
              <Dropzone
                onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="showimages d-flex flex-wrap mt-3 gap-3">
              {ImageState?.map((i, j) => {
                return (
                  <div className=" position-relative" key={j}>
                    <button
                      type="button"
                      onClick={() => { }}
                      className="btn-close position-absolute"
                      style={{ top: "10px", right: "10px" }}
                    ></button>
                    <img src={i.url} alt="" width={200} height={200} />
                  </div>
                );
              })}
            </div>

            <Button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              {getBlogId !== undefined ? "Edit" : "Add"} Blog
            </Button>
          </form>
        </div>
      </h3>
    </div>
  )
}
