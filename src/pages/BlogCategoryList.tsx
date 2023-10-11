import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { getCategories, resetState } from '../store/blogCategorySlice';
import { Link } from 'react-router-dom';
import { Modal } from '../modals/Modal';


const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

export const BlogCategoryList = () => {
  const [open, setOpen] = useState(false);
  const [blogCatId, setBlogCatId] = useState("");

  const dispatch = useAppDispatch()
  const blogCatState = useAppSelector((state: RootState) => state.blogCategory.bCategories)
  
  const data = [];

  for (let i = 0; i < blogCatState.length; i++) {
    const categoryArray: any = blogCatState[i];
    data.push({
      key: i + 1,
      name: categoryArray.title,
      action: (
        <span className='flex justify-start'>
          <Link
            to={`/admin/blog-category/${categoryArray.category_id}`}
            className=" fs-3 mr-4 text-[#ef090d]"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-[#ef090d] bg-transparent border-0"
            onClick={() => showModal(categoryArray.category_id!)}
          >
            <AiFillDelete />
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



  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories())
  }, [])

  return (
    <div>
      <h3 className="mb-4 title">Blogs List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
        <Modal
          hideModal={hideModal}
          open={open}
          title="Are you sure you want to delete this blog category?"
        />
      </div>
    </div>
  )
}
