import React, { memo } from 'react';
import { Layout, Menu } from 'antd';
import { AiOutlineDashboard, AiOutlineUsergroupAdd, AiOutlineFolderAdd, AiOutlineBgColors } from 'react-icons/ai'
import { BiCartAdd } from 'react-icons/bi'
import { BsCartCheck } from 'react-icons/bs'
import { GiBoxingGloveSurprise, GiBoxingRing } from 'react-icons/gi'
import { RiCalendarEventLine } from "react-icons/ri"
import { PiFoldersBold } from 'react-icons/pi'
import { ImBlog } from "react-icons/im";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { GiResize } from 'react-icons/gi'
import { MdOutlineReviews } from "react-icons/md";
import { MdHistoryEdu } from "react-icons/md";
import { LuSlidersHorizontal } from "react-icons/lu";
import { RiRefund2Fill } from "react-icons/ri";
import { TfiLayoutMediaLeftAlt } from "react-icons/tfi";
import { TiContacts } from "react-icons/ti";
import { BiBookContent } from "react-icons/bi";
import { FaListOl } from "react-icons/fa6";
import { MdDownloadDone } from "react-icons/md";

import { TbWeight } from 'react-icons/tb'
import { RiCouponLine } from 'react-icons/ri'
import { BsTicketDetailed } from 'react-icons/bs'
import { MdOutlineEventAvailable } from 'react-icons/md'
import { Logo } from '../icons/Logo';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

interface SiderBarProps {
  collapsed: boolean;
}

const SiderBar: React.FC<SiderBarProps> = ({ collapsed }) => {

  const navigate = useNavigate();

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo text-white text-center flex flex-col justify-center items-center mb-4">
        <span className="sm-logo">
          <Logo />
        </span>
        <span className="lg-logo text-2xl uppercase">Hall of Fame</span>
      </div>
      <Menu
        className='mt-8'
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['']}
        onClick={({ key }) => {
          if (key === 'sign-out') {

          } else {
            navigate(key)
          }
        }}
        items={[
          {
            key: '',
            icon: <AiOutlineDashboard size={24} />,
            label: 'Dashboard',
          },
          {
            key: 'content',
            icon: <BiBookContent size={24} />,
            label: 'Content',
            children: [
              {
                key: 'slides',
                icon: <LuSlidersHorizontal size={20} />,
                label: 'Slides',
                children: [
                  {
                    key: 'slide',
                    icon: <MdDownloadDone size={20} />,
                    label: 'Add Slide',
                  },
                  {
                    key: 'slides-list',
                    icon: <FaListOl size={20} />,
                    label: 'Slides List',
                  }
                ]
              },
              {
                key: 'media-news',
                icon: <TfiLayoutMediaLeftAlt size={20} />,
                label: 'Media news',
                children: [
                  {
                    key: 'media',
                    icon: <MdDownloadDone size={20} />,
                    label: 'Add Media',
                  },
                  {
                    key: 'media-list',
                    icon: <FaListOl size={20} />,
                    label: 'Media- list',
                  }
                ]
              },
              {
                key: 'testimonials',
                icon: <MdOutlineReviews size={20} />,
                label: 'Testimonials',
                children: [
                  {
                    key: 'testimonial',
                    icon: <MdDownloadDone size={20} />,
                    label: 'Add Testimonial',
                  },
                  {
                    key: 'testimonials-list',
                    icon: <FaListOl size={20} />,
                    label: 'Testimonials List',
                  }
                ]
              },
              {
                key: 'history',
                icon: <MdHistoryEdu size={20} />,
                label: 'History',
              },
              {
                key: 'about-us',
                icon: <MdHistoryEdu size={20} />,
                label: 'About Us',
              },
              {
                key: 'refund',
                icon: <RiRefund2Fill size={20} />,
                label: 'Get a refund',
              },
              {
                key: 'contacts',
                icon: <TiContacts size={20} />,
                label: 'Contacts',
              },
            ]
          },
          {
            key: 'customers',
            icon: <AiOutlineUsergroupAdd size={24} />,
            label: 'Customers',
            children: [
              {
                key: 'product-cart',
                icon: <BiCartAdd size={20} />,
                label: 'Product Cart',
              },
              {
                key: 'event-cart',
                icon: <RiCalendarEventLine size={20} />,
                label: 'Event Cart',
              },
            ]
          },
          {
            key: 'catalog',
            icon: <BsCartCheck size={24} />,
            label: 'Catalog',
            children: [
              {
                key: 'product',
                icon: <BiCartAdd size={20} />,
                label: 'Add Product',
              },
              {
                key: 'product-list',
                icon: <GiBoxingGloveSurprise size={20} />,
                label: 'Product List',
              },
              {
                key: 'category',
                icon: <AiOutlineFolderAdd size={20} />,
                label: 'Add Category',
              },
              {
                key: 'category-list',
                icon: <PiFoldersBold size={20} />,
                label: 'Category List',
              },
              {
                key: 'brand',
                icon: <AiOutlineFolderAdd size={20} />,
                label: 'Add brand',
              },
              {
                key: 'brand-list',
                icon: <PiFoldersBold size={20} />,
                label: 'Brand List',
              },
              {
                key: "color",
                icon: <AiOutlineBgColors size={20} />,
                label: "Add Color",
              },
              {
                key: "color-list",
                icon: <AiOutlineBgColors size={20} />,
                label: "Color List",
              },
              {
                key: "size",
                icon: <GiResize size={20} />,
                label: "Add Size",
              },
              {
                key: "size-list",
                icon: <GiResize size={20} />,
                label: "Size List",
              },
              {
                key: "weight",
                icon: <TbWeight size={20} />,
                label: "Add Weight",
              },
              {
                key: "weight-list",
                icon: <TbWeight size={20} />,
                label: "Weight List",
              },
            ]
          },
          {
            key: 'events',
            icon: <GiBoxingRing size={24} />,
            label: 'Events',
            children: [
              {
                key: 'event',
                icon: <RiCalendarEventLine size={20} />,
                label: 'Add Event',
              },
              {
                key: 'event-list',
                icon: <MdOutlineEventAvailable size={20} />,
                label: 'Event List',
              },
              {
                key: 'ticket',
                icon: <BsTicketDetailed size={20} />,
                label: 'Add Ticket',
              },
              {
                key: 'ticket-list',
                icon: <BsTicketDetailed size={20} />,
                label: 'Ticket List',
              },
            ]
          },
          {
            key: "orders",
            icon: <FaClipboardList size={24} />,
            label: "Orders",
          },
          {
            key: "marketing",
            icon: <RiCouponLine size={24} />,
            label: "Marketing",
            children: [
              {
                key: "coupon",
                icon: <ImBlog size={20} />,
                label: "Add Coupon",
              },
              {
                key: "coupon-list",
                icon: <RiCouponLine size={20} />,
                label: "Coupon List",
              },
            ],
          },
          {
            key: "blog",
            icon: <FaBloggerB size={24} />,
            label: "Blog",
            children: [
              {
                key: "add-article",
                icon: <ImBlog size={20} />,
                label: "Add Article",
              },
              {
                key: "article-list",
                icon: <FaBloggerB size={20} />,
                label: "Article List",
              },
              {
                key: "blog-category",
                icon: <ImBlog size={20} />,
                label: "Add Blog Category",
              },
              {
                key: "blog-list",
                icon: <FaBloggerB size={20} />,
                label: "Blog Category List",
              },
            ],
          },
          {
            key: "enquiries",
            icon: <FaClipboardList size={24} />,
            label: "Enquiries",
          },
        ]}
      />
    </Sider>
  )
}

export const SiderBarWithMemo = memo(SiderBar);
