import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { Link } from 'react-router-dom';
import { Modal } from '../modals/Modal';
import { toast } from 'react-toastify';
import { getBrands, resetState, deleteBrandById } from '../store/brandSlice';


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

export const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");

  const dispatch = useAppDispatch()
  const brandState = useAppSelector((state: RootState) => state.brands.brands)
  const { isError, isLoading, isSuccess } = useAppSelector((state: RootState) => state.brands)


  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands())
  }, [])

  const data = [];

  for (let i = 0; i < brandState?.length!; i++) {
    const brandArray: any = brandState?.[i];
    data.push({
      key: i + 1,
      title: brandArray.brand_name,
      action: (
        <span className='flex justify-start'>
          <Link
            to={`/admin/brand/${brandArray.brand_id}`}
            className=" fs-3 mr-4 text-[#ef090d]"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-[#ef090d] bg-transparent border-0"
            onClick={() => showModal(brandArray.brand_id!)}
          >
            <AiFillDelete />
          </button>
        </span>
      )
    })
  }


  const showModal = (e: string) => {
    setOpen(true);
    setBrandId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };


  const deleteBrand = (e: string) => {
    dispatch(deleteBrandById(e));
    setOpen(false);
    if (isSuccess) {
      toast.success('Brand deleted successfully')
      setTimeout(() => {
        dispatch(getBrands());
      }, 100);
    } else {
      toast.error('Something went wrong')
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Brand List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
        <Modal
          hideModal={hideModal}
          open={open}
          performAction={() => { deleteBrand(brandId) }}
          title="Are you sure you want to delete Brand?"
        />
      </div>
    </div>
  )
}