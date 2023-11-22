import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { Modal } from '../modals/Modal';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { deleteArticleById, getBlogArticles, resetStateArticle } from '../store/articleSlice';
import { cn } from '../lib/utils';
import { toast } from 'react-toastify';

export const ArticleList = () => {

  const [open, setOpen] = useState(false);
  const [articleId, setArticleId] = useState("");

  const dispatch = useAppDispatch();
  const location = useLocation()
  const { articles, isLoading } = useAppSelector((state: RootState) => state.articles);

  useEffect(() => {
    dispatch(resetStateArticle());
    dispatch(getBlogArticles());
  }, []);


  const data = [];


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
      title: "Publish date",
      dataIndex: "publishDate",
    },
    {
      title: "status",
      dataIndex: "status",
      render: (text: string) => <span className={cn(`h-full w-full p-4 font-normal text-[12px] tracking-wider uppercase text-white flex items-center justify-center`, text === "published" ? 'bg-[#3db339]' : 'bg-[#f6474a]')}>{text}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  if (articles !== undefined) {

    for (let i = 0; i < articles.length; i++) {

      const content = articles[i].description.replace(/<\/?[a-zA-Z]+>/gi, '')

      const originalDate = articles[i].created_at && new Date(articles[i].created_at!);
      const formattedDate = `${originalDate?.getFullYear()}-${(originalDate?.getMonth()! + 1).toString().padStart(2, '0')}-${originalDate?.getDate().toString().padStart(2, '0')}`;
      const originalPublishDate = articles[i].publish_date && new Date(articles[i].publish_date!);

      const formattedPublishDate = `${originalPublishDate?.getFullYear()}-${(originalPublishDate?.getMonth()! + 1).toString().padStart(2, '0')}-${originalPublishDate?.getDate().toString().padStart(2, '0')}`;

      data.push({
        key: i + 1,
        name: articles[i].title,
        description: content.length > 100 ? content.slice(0, 50) + '...' : content,
        title: articles[i].cat_title,
        created_at: formattedDate,
        publishDate: formattedPublishDate,
        status: articles[i].status,
        action: (
          <span className='flex justify-center items-center'>
            <Link
              to={`/admin/article/${articles[i].article_id}`}
              className="ms-3 fs-3 text-[#ef090d] bg-transparent border-0"
            >
              <BiEdit size={20} />
            </Link>
            <button
              className="ms-3 fs-3 text-[#ef090d] bg-transparent border-0"
              onClick={() => showModal(articles[i].article_id!)}
            >
              <AiFillDelete size={20} />
            </button>
          </span>
        ),
      })
    }

  }
  const showModal = (e: string) => {
    setOpen(true);
    setArticleId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteArticle = (e: string) => {
    try {
      dispatch(deleteArticleById(e));
      setOpen(false);
      toast.success('Article deleted successfully')
      setTimeout(() => {
        dispatch(getBlogArticles());
      }, 100);
    } catch (error) {
      toast.error(`Something went wrong, ${error}`)
    }
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
          deleteArticle(articleId);
        }}
        title="Are you sure you want to delete this Article?"
      />
    </div>
  )
}
