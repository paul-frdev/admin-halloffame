import React, { useEffect, useState } from "react";
import { Empty, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { Link } from 'react-router-dom';
import { Modal } from '../modals/Modal';
import { toast } from 'react-toastify';
import { deleteSizeById, getSizes, resetState } from '../store/sizeSlice';
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

export const SizeList = () => {
  const [open, setOpen] = useState(false);
  const [sizeId, setSizeId] = useState("");

  const dispatch = useAppDispatch()
  const sizeState = useAppSelector((state: RootState) => state.sizes.sizes)
  const { isError, isLoading, isSuccess } = useAppSelector((state: RootState) => state.sizes)


  useEffect(() => {
    dispatch(resetState());
    dispatch(getSizes())
  }, [])

  const data = [];

  for (let i = 0; i < sizeState?.length!; i++) {
    const sizeArray: any = sizeState?.[i];
    data.push({
      key: i + 1,
      title: sizeArray.size_name,
      action: (
        <span className='flex justify-start'>
          <Link
            to={`/admin/size/${sizeArray.sizes_id}`}
            className=" fs-3 mr-4 text-[#ef090d]"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-[#ef090d] bg-transparent border-0"
            onClick={() => showModal(sizeArray.sizes_id!)}
          >
            <AiFillDelete />
          </button>
        </span>
      )
    })
  }


  const showModal = (e: string) => {
    setOpen(true);
    setSizeId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };


  const deleteSize = (e: string) => {
    dispatch(deleteSizeById(e));
    setOpen(false);
    if (isSuccess) {
      toast.success('Size deleted successfully')
      setTimeout(() => {
        dispatch(getSizes());
      }, 100);
    } else {
      toast.error('Something went wrong')
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Size List</h3>
      <div>
        <Table
          columns={columns}
          dataSource={data}
          loading={{ indicator: <Loader />, spinning: isLoading }}
          locale={locale}
        />
        <Modal
          hideModal={hideModal}
          open={open}
          performAction={() => { deleteSize(sizeId) }}
          title="Are you sure you want to delete size?"
        />
      </div>
    </div>
  )
}