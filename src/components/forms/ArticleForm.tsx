import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import ReactQuill from "react-quill";
import Dropzone from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import "react-quill/dist/quill.snow.css";
import { RootState, useAppSelector, useAppDispatch } from "../../store/store";
import { getCategories, resetState } from '../../store/blogCategorySlice';
import { CustomInput } from '../ui/CustomInput';
import { uploadImg, deleteImg } from '../../store/uploadImageSlice';
import { Button } from '../ui/Button';
import { createArticle, getArticleById } from '../../store/articleSlice';
import { AiOutlineClose } from "react-icons/ai";


let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  categoryId: yup.string().required("Category is Required"),
});

const myColors = [
  "purple",
  "#785412",
  "#452632",
  "#856325",
  "#963254",
  "#254563",
  "white"
];
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: ["right", "center", "justify"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: myColors }],
    [{ background: myColors }]
  ]
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "color",
  "background",
  "align"
];

export const ArticleForm = () => {

  const [curArticleId, setCurArticleId] = useState<any>()


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


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: curArticleId ? curArticleId.title as string : "",
      description: curArticleId ? curArticleId.description as string : "",
      categoryId: curArticleId ? curArticleId.cat_title as string : "",
      images: imagesCloudinary,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createArticle(values));
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {articleById !== undefined ? "Edit" : "Add"} Blog
      </h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className='relative mt-8'>
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
            modules={modules}
            formats={formats}
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className="absolute -bottom-[18px] left-[8px] text-[#ef090d]">
            {formik.touched.description && formik.errors.description}
          </div>
        </div>
        <div className=" relative bg-white border-1 p-5 text-center mt-3 rounded-md">
          <Dropzone
            onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()} className=' rounded-sm'>
                  <input {...getInputProps()} />
                  <p className='mb-0 p-4 text-lg border-2 border-[#999999] border-dashed rounded-sm cursor-pointer bg-white'>
                    Drag 'n' drop some files here, or click to select files
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="showimages flex flex-wrap mt-3 gap-3">
          {ImageState?.map((image, j) => {
            return (
              <div className="relative max-w-fit" key={j}>
                <button
                  type="button"
                  onClick={() => dispatch(deleteImg(image.public_id))}
                  className="btn-close absolute top-0 right-0 bg-white rounded-full p-1 hover:text-white hover:bg-black transition-all duration-200"
                  style={{ top: "10px", right: "10px" }}
                >
                  <AiOutlineClose size={24} />
                </button>
                <img src={image.url} alt="img" width={200} height={200} />
              </div>
            );
          })}
        </div>

        <Button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          {articleById !== undefined ? "Edit" : "Add"} Article
        </Button>
      </form>
    </div>
  )
}
