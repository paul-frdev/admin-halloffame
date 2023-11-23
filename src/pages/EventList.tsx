import React, { useEffect, useState } from "react";
import { Empty, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { Modal } from '../modals/Modal';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { cn } from '../lib/utils';
import { toast } from 'react-toastify';
import { deleteEventById, getEvents, resetStateEvent } from '../store/eventSlice';
import { Title } from '../components/ui/Title';
import { Loader } from '../components/ui/Loader';

export const EventList = () => {

  const [open, setOpen] = useState(false);
  const [eventId, seEventId] = useState("");

  const dispatch = useAppDispatch();
  const location = useLocation()
  const { eventsData, isLoading } = useAppSelector((state: RootState) => state.events);

  useEffect(() => {
    dispatch(resetStateEvent());
    dispatch(getEvents());
  }, []);

  const data = [];

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
      title: "Date of Event",
      dataIndex: "date",
    },
    {
      title: "Publish date",
      dataIndex: "publishDate",
    },
    {
      title: "Text",
      dataIndex: "text",
    },
    {
      title: "Main image",
      dataIndex: "image",
    },
    {
      title: "location",
      dataIndex: "address",
    },
    {
      title: "t for adults",
      dataIndex: "adult_quantity_tickets",
    },
    {
      title: "t for children",
      dataIndex: "children_quantity_tickets",
    },
    {
      title: "adult price",
      dataIndex: "adult_price",
    },
    {
      title: "child price",
      dataIndex: "child_price",
    },
    {
      title: "ticket image",
      dataIndex: "ticket_image",
    },
    {
      title: "status",
      dataIndex: "status",
      render: (text: string) => <span className={cn(`h-full w-full p-4 font-normal text-[12px] tracking-wider uppercase text-white flex items-center justify-center`, text === "published" ? 'bg-[#3db339]' : 'bg-[#f6474a]')}>{text}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  let locale = {
    emptyText: <Empty />
  };

  if (eventsData !== undefined) {

    for (let i = 0; i < eventsData.length; i++) {

      const content = eventsData[i].descriptiontext.replace(/<\/?[a-zA-Z]+>/gi, '');

      const originalDate = eventsData[i].event_date && new Date(eventsData[i].event_date!);
      const formattedDate = `${originalDate?.getFullYear()}-${(originalDate?.getMonth()! + 1).toString().padStart(2, '0')}-${originalDate?.getDate().toString().padStart(2, '0')}`;
      const originalPublishDate = eventsData[i].publish_date && new Date(eventsData[i].publish_date!);

      const formattedPublishDate = `${originalPublishDate?.getFullYear()}-${(originalPublishDate?.getMonth()! + 1).toString().padStart(2, '0')}-${originalPublishDate?.getDate().toString().padStart(2, '0')}`;

      data.push({
        key: i + 1,
        title: eventsData[i].title,
        date: formattedDate,
        publishDate: formattedPublishDate,
        text: content.length > 100 ? content.slice(0, 100) + '...' : content,
        image: eventsData[i].images.length ? 'YES' : 'NO',
        address: eventsData[i].location,
        adult_quantity_tickets: eventsData[i].adult_quantity_tickets,
        children_quantity_tickets: eventsData[i].children_quantity_tickets,
        adult_price: eventsData[i].adult_price,
        child_price: eventsData[i].child_price,
        ticket_image: eventsData[i].ticket_img.length ? 'YES' : 'NO',
        status: eventsData[i].status,
        action: (
          <span className='flex justify-center items-center'>
            <Link
              to={`/admin/event/${eventsData[i].event_id}`}
              className="ms-3 fs-3 text-[#ef090d] bg-transparent border-0"
            >
              <BiEdit size={20} />
            </Link>
            <button
              className="ms-3 fs-3 text-[#ef090d] bg-transparent border-0"
              onClick={() => showModal(eventsData[i].event_id!)}
            >
              <AiFillDelete size={20} />
            </button>
          </span>
        ),
      })
    }

  }
  const showModal = (e: string) => {
    setOpen(true);
    seEventId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteEvent = (e: string) => {
    try {
      dispatch(deleteEventById(e));
      setOpen(false);
      toast.success('Event deleted successfully')
      setTimeout(() => {
        dispatch(getEvents());
      }, 100);
    } catch (error) {
      toast.error(`Something went wrong, ${error}`)
    }
  };

  return (
    <div>
      <Title level={3}>List of events</Title>
      <Table
        style={{ whiteSpace: 'pre-wrap' }}
        columns={columns}
        dataSource={data}
        loading={{ indicator: <Loader />, spinning: isLoading }}
        locale={locale}
      />
      <Modal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEvent(eventId);
        }}
        title="Are you sure you want to delete this Event?"
      />
    </div>
  )
}