import React, { useEffect, useState } from "react";
import { Empty, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { Link } from 'react-router-dom';
import { Modal } from '../modals/Modal';
import { deleteAColorById, getColors, resetState } from '../store/colorSlice';
import { toast } from 'react-toastify';
import { Loader } from '../components/ui/Loader';
import { Title } from '../components/ui/Title';


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

export const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");

  const dispatch = useAppDispatch()
  const colorState = useAppSelector((state: RootState) => state.colors.colors)
  const { isError, isLoading, isSuccess } = useAppSelector((state: RootState) => state.colors)


  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors())
  }, [])

  const data = [];

  for (let i = 0; i < colorState?.length!; i++) {
    const colorArray: any = colorState?.[i];
    data.push({
      key: i + 1,
      title: colorArray.color_name,
      action: (
        <span className='flex justify-start'>
          <Link
            to={`/admin/color/${colorArray.colors_id}`}
            className=" fs-3 mr-4 text-[#ef090d]"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-[#ef090d] bg-transparent border-0"
            onClick={() => showModal(colorArray.colors_id!)}
          >
            <AiFillDelete />
          </button>
        </span>
      )
    })
  }


  const showModal = (e: string) => {
    setOpen(true);
    setColorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };


  const deleteColor = (e: string) => {
    dispatch(deleteAColorById(e));
    setOpen(false);
    if (isSuccess) {
      toast.success('Color deleted successfully')
      setTimeout(() => {
        dispatch(getColors());
      }, 100);
    } else {
      toast.error('Something went wrong')
    }
  };

  return (
    <div>
      <Title level={3}>Blogs List</Title>
      <Table
        columns={columns}
        dataSource={data}
        loading={{ indicator: <Loader />, spinning: isLoading }}
        locale={locale}
      />
      <Modal
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteColor(colorId) }}
        title="Are you sure you want to delete color?"
      />
    </div>
  )
}
