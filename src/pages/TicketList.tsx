import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { Modal } from '../modals/Modal';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { resetState } from '../store/articleSlice';
import { deleteTicketById, getTickets } from '../store/ticketSlice';
import { TicketProps } from '../types/store';
import { deleteImg } from '../store/uploadImageSlice';


const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Images",
    dataIndex: "images",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

export const TicketList = () => {

  const [open, setOpen] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [imageId, setImageId] = useState<any>([]);

  const dispatch = useAppDispatch();
  const location = useLocation()
  const { tickets, isLoading } = useAppSelector((state: RootState) => state.tickets);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getTickets());
  }, [dispatch]);

  const data = [];
  
  useEffect(() => {
    if(tickets.length !== undefined) {
      const images =  tickets.map((item: TicketProps) => item.ticket_images_id === ticketId ? item.ticket_images.map((item: any) => item.public_id) : '')
      setImageId(images)
    }
  }, [ticketId, tickets])

  for (let i = 0; i < tickets.length; i++) {

    data.push({
      key: i + 1,
      title: tickets[i].title,
      images: tickets[i].ticket_images.length,
      action: (
        <span className='flex justify-center items-center'>
          <Link
            to={`/admin/ticket/${tickets[i].ticket_images_id}`}
            className="ms-3 fs-3 text-[#ef090d] bg-transparent border-0"
          >
            <BiEdit size={20} />
          </Link>
          <button
            className="ms-3 fs-3 text-[#ef090d] bg-transparent border-0"
            onClick={() => showModal(tickets[i].ticket_images_id!)}
          >
            <AiFillDelete size={20} />
          </button>
        </span>
      ),
    })
  }

  const showModal = (e: string) => {
    setOpen(true);
    setTicketId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteTicket = (e: string) => {
    dispatch(deleteTicketById(e));
    dispatch(deleteImg(imageId.join('')))

    setOpen(false);
    setTimeout(() => {
      dispatch(getTickets());
    }, 100);
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
          deleteTicket(ticketId);
        }}
        title="Are you sure you want to delete this ticket with all images?"
      />
    </div>
  )
}