import React, { useEffect, useState } from "react";
import { Empty, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { Link } from 'react-router-dom';
import { Modal } from '../modals/Modal';
import { toast } from 'react-toastify';
import { deleteWeightById, getWeights, resetState } from '../store/weightSlice';
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


export const WeightList = () => {
  const [open, setOpen] = useState(false);
  const [weightId, setWeightId] = useState("");

  const dispatch = useAppDispatch()
  const weightState = useAppSelector((state: RootState) => state.weights.weights)
  const { isError, isLoading, isSuccess } = useAppSelector((state: RootState) => state.weights)


  useEffect(() => {
    dispatch(resetState());
    dispatch(getWeights())
  }, [])

  const data = [];

  for (let i = 0; i < weightState?.length!; i++) {
    const weightArray: any = weightState?.[i];
    data.push({
      key: i + 1,
      title: weightArray.weight_name,
      action: (
        <span className='flex justify-start'>
          <Link
            to={`/admin/weight/${weightArray.weights_id}`}
            className=" fs-3 mr-4 text-[#ef090d]"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-[#ef090d] bg-transparent border-0"
            onClick={() => showModal(weightArray.weights_id!)}
          >
            <AiFillDelete />
          </button>
        </span>
      )
    })
  }


  const showModal = (e: string) => {
    setOpen(true);
    setWeightId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };


  const deleteWeight = (e: string) => {
    dispatch(deleteWeightById(e));
    setOpen(false);
    if (isSuccess) {
      toast.success('Weight deleted successfully')
      setTimeout(() => {
        dispatch(getWeights());
      }, 100);
    } else {
      toast.error('Something went wrong')
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Weights List</h3>
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
          performAction={() => { deleteWeight(weightId) }}
          title="Are you sure you want to delete weight?"
        />
      </div>
    </div>
  )
}