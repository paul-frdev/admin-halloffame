import React, { useEffect, useState } from "react";
import { Empty, Table, Breakpoint } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { deleteBlogCategoryById, getCategories, resetStateBlogCategory } from '../store/blogCategorySlice';
import { Link } from 'react-router-dom';
import { Modal } from '../modals/Modal';
import { toast } from 'react-toastify';
import { Loader } from '../components/ui/Loader';
import { Title } from '../components/ui/Title';


const columns = [
  {
    title: "SNo",
    dataIndex: "key",
    responsive: ["sm"] as Breakpoint[]
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
    responsive: ["sm"] as Breakpoint[]
  },

  {
    title: "Action",
    dataIndex: "action",
    responsive: ["sm"] as Breakpoint[]
  },
];

let locale = {
  emptyText: <Empty />
};


export const BlogCategoryList = () => {
  const [open, setOpen] = useState(false);
  const [blogCatId, setBlogCatId] = useState("");

  const dispatch = useAppDispatch()
  const { bCategories, isSuccess, isLoading } = useAppSelector((state: RootState) => state.blogCategory)

  useEffect(() => {
    dispatch(resetStateBlogCategory());
    dispatch(getCategories())
  }, [])

  const data = [];

  for (let i = 0; i < bCategories.length; i++) {
    const categoryArray: any = bCategories[i];
    data.push({
      key: i + 1,
      name: categoryArray.title,
      action: (
        <span className='flex justify-center items-center'>
          <Link
            to={`/admin/blog-category/${categoryArray.category_id}`}
            className=" fs-3 mr-4 text-[#ef090d]"
          >
            <BiEdit size={20} />
          </Link>
          <button
            className="ms-3 fs-3 text-[#ef090d] bg-transparent border-0"
            onClick={() => showModal(categoryArray.category_id!)}
          >
            <AiFillDelete size={20} />
          </button>
        </span>
      )
    })
  }

  const showModal = (e: string) => {
    setOpen(true);
    setBlogCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteBlogCategory = (e: string) => {
    dispatch(deleteBlogCategoryById(e));
    setOpen(false);
    if (isSuccess) {
      toast.success('Category deleted successfully')
      setTimeout(() => {
        dispatch(getCategories());
      }, 100);
    } else {
      toast.error('Something went wrong')
    }
  };

  return (
    <div>
      <Title level={3}>Blog category List</Title>
      <Table
        columns={columns}
        dataSource={data}
        loading={{ indicator: <Loader />, spinning: isLoading }}
        locale={locale}
      />
      <Modal
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteBlogCategory(blogCatId) }}
        title="Are you sure you want to delete this blog category?"
      />
    </div>
  )
}
