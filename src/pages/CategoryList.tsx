import React, { useEffect, useState } from "react";
import { Empty, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { Link } from 'react-router-dom';
import { Modal } from '../modals/Modal';
import { toast } from 'react-toastify';
import { deleteCategoryById, getCategories, resetState } from '../store/categorySlice';
import { Loader } from '../components/ui/Loader';


const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

let locale = {
  emptyText: <Empty />
};


export const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const dispatch = useAppDispatch()
  const categoriesState = useAppSelector((state: RootState) => state.categories.categories)
  const { isError, isLoading, isSuccess } = useAppSelector((state: RootState) => state.categories)


  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories())
  }, [])

  const data = [];

  for (let i = 0; i < categoriesState?.length!; i++) {
    const categoriesArray: any = categoriesState?.[i];
    data.push({
      key: i + 1,
      title: categoriesArray.category_name,
      action: (
        <span className='flex justify-start'>
          <Link
            to={`/admin/category/${categoriesArray.category_id}`}
            className=" fs-3 mr-4 text-[#ef090d]"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-[#ef090d] bg-transparent border-0"
            onClick={() => showModal(categoriesArray.category_id!)}
          >
            <AiFillDelete />
          </button>
        </span>
      )
    })
  }


  const showModal = (e: string) => {
    setOpen(true);
    setCategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };


  const deleteCategory = (e: string) => {
    dispatch(deleteCategoryById(e));
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
      <h3 className="mb-4 title">Blogs List</h3>
      <Table
        columns={columns}
        dataSource={data}
        loading={{ indicator: <Loader />, spinning: isLoading }}
        locale={locale}
      />
      <Modal
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteCategory(categoryId) }}
        title="Are you sure you want to delete category?"
      />
    </div>
  )
}
