import React, { useEffect, useState } from "react";
import { Table, Switch, Empty, Typography } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { Link } from 'react-router-dom';
import { Modal } from '../modals/Modal';
import { toast } from 'react-toastify';
import { TestimonialProps } from '../types/store';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

import { deleteTestimonialById, getTestimonials, resetStateTestimonial, updateIsActiveTestimonial } from '../store/testimonialSlice';
import { Loader } from '../components/ui/Loader';
import { Title } from '../components/ui/Title';


const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Text",
    dataIndex: "text",
    sorter: (a: any, b: any) => a.desctipiontext.length - b.desctipiontext.length,
  },
  {
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Author",
    dataIndex: "author",
  },
  {
    title: "Dignity",
    dataIndex: "dignity",
  },
  {
    title: "Action",
    dataIndex: "action",
  },

];

let locale = {
  emptyText: <Empty />
};

export const TestimonialsList = () => {
  const [open, setOpen] = useState(false);
  const [testmId, setTestmId] = useState("");

  const dispatch = useAppDispatch()
  const { testimonials, isSuccess, isLoading } = useAppSelector((state: RootState) => state.testimonials)

  const [testmLoading, setTestmLoading] = useState<string[]>(Array(testimonials?.length || 0).fill(''));


  useEffect(() => {
    dispatch(resetStateTestimonial());
    dispatch(getTestimonials())
  }, [])


  const handleActiveTestm = async (id: string, index: number) => {
    setTestmLoading((prevLoading) => {
      const updatedLoading = [...prevLoading];
      updatedLoading[index] = 'loading';
      return updatedLoading;
    });

    try {
      await dispatch(updateIsActiveTestimonial(id));
      await dispatch(getTestimonials());

      setTestmLoading((prevLoading) => {
        const updatedLoading = [...prevLoading];
        updatedLoading[index] = '';
        return updatedLoading;
      });
    } catch (error) {
      setTestmLoading((prevLoading) => {
        const updatedLoading = [...prevLoading];
        updatedLoading[index] = '';
        return updatedLoading;
      });
      console.log(error);
    }
  };


  const data = [];

  for (let i = 0; i < testimonials?.length!; i++) {
    const testmArray: TestimonialProps = testimonials?.[i];

    const isActiveAdmin = !testmArray.is_active && testmLoading[i] === '';
    const isActiveSuccess = testmArray.is_active;


    data.push({
      key: (
        <span className='flex justify-start gap-x-2'>
          <span className='text-lg w-[20px]'>{i + 1}</span>
          <span className=' pb-[2px] px-[1px] flex justify-center items-center uppercase'>
            {isActiveAdmin ? <Tag color="error">Admin</Tag> : isActiveSuccess ? <Tag color="success">Success</Tag> : null}
          </span>
        </span>
      ),
      text: testmArray.desriptiontext,
      image: testmArray.image.length ? 'YES' : 'NO',
      author: testmArray.author,
      dignity: testmArray.dignity,
      action: (
        <span className='flex justify-center items-center gap-x-2'>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={testmArray.is_active === true}
            loading={testmLoading[i] === 'loading'}
            className=' bg-[#808080]'
            onClick={() => handleActiveTestm(testmArray.testimonial_id!, i)}
          />
          <Link
            to={`/admin/testimonial/${testmArray.testimonial_id}`}
            className="text-[#ef090d] border-0"
          >
            <BiEdit size={20} />
          </Link>
          <button
            className="text-[#ef090d] border-0"
            onClick={() => showModal(testmArray.testimonial_id!)}
          >
            <AiFillDelete size={20} />
          </button>
        </span>
      )
    })
  }


  const showModal = (e: string) => {
    setOpen(true);
    setTestmId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };


  const deleteTestimonial = (e: string) => {
    dispatch(deleteTestimonialById(e));
    setOpen(false);
    if (isSuccess) {
      toast.success('Testimonial deleted successfully')
      setTimeout(() => {
        dispatch(getTestimonials());
      }, 100);
    } else {
      toast.error('Something went wrong')
    }
  };

  return (
    <div>
      <Title level={3}>Testimonial List</Title>
      <Table
        columns={columns}
        dataSource={data}
        loading={{ indicator: <Loader />, spinning: isLoading }}
        locale={locale}
      />
      <Modal
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteTestimonial(testmId) }}
        title="Are you sure you want to delete Testimonial?"
      />
      <div className='flex-col justify-start items-start mt-8'>
        <div className='flex justify-start items-center h-[22px] mb-2'>
          <span className='pb-[2px] px-[1px] flex justify-center items-center mr-4 uppercase'>
            <Tag color="error">Admin</Tag>
          </span>
          <Typography className='text-[#808080]'> - a review was written by admin, but hasn't approved yet</Typography>
        </div>
        <div className='flex justify-start items-center mb-2'>
          <span className='pb-[2px] px-[1px] flex justify-center items-center mr-4 uppercase'>
            <Tag color="error">User</Tag>
          </span>
          <Typography className='text-[#808080]'> - created review by user, but not published on website</Typography>
        </div>
        <div className='flex justify-start items-center'>
          <span className='pb-[2px] px-[1px] flex justify-center items-center mr-4 uppercase'>
            <Tag color="success">Success</Tag>
          </span>
          <Typography className='text-[#808080]'> - approved review by admin and published on website</Typography>
        </div>
      </div>
    </div>
  )
}