import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { Modal } from '../modals/Modal';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { getArticles, resetState } from '../store/articleSlice';


const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "name",
  },
  {
    title: "Content",
    dataIndex: "description",
  },
  {
    title: "Category title",
    dataIndex: "title",
  },
  {
    title: "Created at",
    dataIndex: "created_at",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

export const ArticleList = () => {

  const [open, setOpen] = useState(false);
  const [articleId, setArticleId] = useState("");

  const dispatch = useAppDispatch();
  const location = useLocation()
  const getArticleState = useAppSelector((state: RootState) => state.articles.articles);

  const data = [];


  useEffect(() => {
    dispatch(resetState());
    dispatch(getArticles());
  }, []);

  for (let i = 0; i < getArticleState.length; i++) {

    const content = getArticleState[i].description.replace(/<\/?[a-zA-Z]+>/gi, '')

    const originalDate = getArticleState[i].created_at && new Date(getArticleState[i].created_at!);
    const formattedDate = `${originalDate?.getFullYear()}-${(originalDate?.getMonth()! + 1).toString().padStart(2, '0')}-${originalDate?.getDate().toString().padStart(2, '0')}`;

    data.push({
      key: i + 1,
      name: getArticleState[i].title,
      description: content.length > 100 ? content.slice(50) + '...' : content,
      title: getArticleState[i].cat_title,
      created_at: formattedDate,
      action: (
        <span className='flex justify-start'>
          <Link
            to={`/admin/article/${getArticleState[i].article_id}`}
            className="ms-3 fs-3 text-[#ef090d] bg-transparent border-0"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-[#ef090d] bg-transparent border-0"
            onClick={() => showModal(getArticleState[i].article_id!)}
          >
            <AiFillDelete />
          </button>
        </span>
      ),
    })
  }

  const showModal = (e: string) => {
    setOpen(true);
    setArticleId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteArticle = (e: string) => {
    // dispatch(deleteABlog(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getArticles());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">List of articles</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <Modal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          // deleteBlog(blogId);
        }}
        title="Are you sure you want to delete this Article?"
      />
    </div>
  )
}
