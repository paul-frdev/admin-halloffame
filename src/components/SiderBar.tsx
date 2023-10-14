import React, { memo } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import { AiOutlineDashboard, AiOutlineUsergroupAdd, AiOutlineFolderAdd, AiOutlineBgColors } from 'react-icons/ai'
import { BiCartAdd } from 'react-icons/bi'
import { BsCartCheck } from 'react-icons/bs'
import { GiBoxingGloveSurprise, GiBoxingRing } from 'react-icons/gi'
import { RiCalendarEventLine } from "react-icons/ri"
import { MdOutlineEmojiEvents } from 'react-icons/md'
import { PiFoldersBold } from 'react-icons/pi'
import { ImBlog } from "react-icons/im";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { TbWeight } from 'react-icons/tb'
import { RiCouponLine } from 'react-icons/ri'
import { Logo } from '../icons/Logo';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

interface SiderBarProps {
  collapsed: boolean;
}

const SiderBar: React.FC<SiderBarProps> = ({ collapsed }) => {

  const navigate = useNavigate();

  console.log('render');



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
                icon: <TbWeight size={20} />,
                label: "Add Size",
              },
              {
                key: "size-list",
                icon: <TbWeight size={20} />,
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
                icon: <MdOutlineEmojiEvents size={20} />,
                label: 'Event List',
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
