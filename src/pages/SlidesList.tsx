import React, { useEffect, useState } from "react";
import { Table, Switch } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { Link } from 'react-router-dom';
import { Modal } from '../modals/Modal';
import { toast } from 'react-toastify';
import { deleteSlideById, getAllSlides, resetStateSlide, updateIsActiveSlide } from '../store/slideSlice';
import { SlideProps } from '../types/store';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';


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
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Slide Type",
    dataIndex: "slideType",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

export const SlidesList = () => {
  const [open, setOpen] = useState(false);
  const [slideId, setSlideId] = useState("");

  const dispatch = useAppDispatch()
  const { slides, isSuccess, isLoading } = useAppSelector((state: RootState) => state.slides)


  useEffect(() => {
    dispatch(resetStateSlide());
    dispatch(getAllSlides())
  }, [])

  const data = [];

  for (let i = 0; i < slides?.length!; i++) {
    const slideArray: SlideProps = slides?.[i];
    data.push({
      key: i + 1,
      title: slideArray.title,
      image: slideArray.slide_image.length ? 'YES' : 'NO',
      slideType: slideArray.type,
      action: (
        <span className='flex justify-center items-center gap-x-2'>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
            loading={isLoading}
            className=' bg-[#808080]'
            onClick={() => { dispatch(updateIsActiveSlide(slideArray.slide_id!)) }}
          />
          <Link
            to={`/admin/slide/${slideArray.slide_id}`}
            className="text-[#ef090d] border-0"
          >
            <BiEdit size={20} />
          </Link>
          <button
            className="text-[#ef090d] border-0"
            onClick={() => showModal(slideArray.slide_id!)}
          >
            <AiFillDelete size={20} />
          </button>
        </span>
      )
    })
  }


  const showModal = (e: string) => {
    setOpen(true);
    setSlideId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };


  const deleteSlide = (e: string) => {
    dispatch(deleteSlideById(e));
    setOpen(false);
    if (isSuccess) {
      toast.success('Slide deleted successfully')
      setTimeout(() => {
        dispatch(getAllSlides());
      }, 100);
    } else {
      toast.error('Something went wrong')
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Slide List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
        <Modal
          hideModal={hideModal}
          open={open}
          performAction={() => { deleteSlide(slideId) }}
          title="Are you sure you want to delete Slide?"
        />
      </div>
    </div>
  )
}