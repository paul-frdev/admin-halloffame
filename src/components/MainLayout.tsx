import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { AiOutlineDashboard, AiOutlineUsergroupAdd, AiOutlineFolderAdd, AiOutlineBgColors } from 'react-icons/ai'
import { BiCartAdd } from 'react-icons/bi'
import { BsCartCheck } from 'react-icons/bs'
import { GiBoxingGloveSurprise, GiBoxingRing } from 'react-icons/gi'
import { RiCalendarEventLine } from "react-icons/ri"
import { MdOutlineEmojiEvents } from 'react-icons/md'
import { PiFoldersBold } from 'react-icons/pi'
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { TbWeight } from 'react-icons/tb'
import { RiCouponLine } from 'react-icons/ri'




import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Logo } from '../icons/Logo';
import { cn } from '../lib/utils';

const { Header, Sider, Content } = Layout;

export const MainLayout = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate()

  return (
    <Layout>
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
                  label: "Color",
                },
                {
                  key: "list-color",
                  icon: <AiOutlineBgColors size={20} />,
                  label: "Color List",
                },
                {
                  key: "size",
                  icon: <TbWeight size={20} />,
                  label: "Size",
                },
                {
                  key: "list-size",
                  icon: <TbWeight size={20} />,
                  label: "Size List",
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
                  key: "article",
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
                  key: "blog-category-list",
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
      <Layout className='side-layout'>
        <Header style={{ background: colorBgContainer }} className='flex justify-between p-0 pr-4'>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined size={24} /> : <MenuFoldOutlined size={24} />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '18px',
              width: 64,
              height: 64,
            }}
          />
          <div className='flex justify-start gap-x-4 items-center'>
            <div className="flex gap-x-4 items-center relative cursor-pointer shadow-md rounded-sm" onClick={() => setVisible(prev => !prev)}>
              <div className='flex gap-x-4 items-center p-2 hover:bg-[#ecebeb]'>
                <div>
                  <img
                    width={32}
                    height={32}
                    src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                    alt="avatar"
                    className='rounded-full'
                  />
                </div>
                <div>
                  <h5 className="mb-1">Navdeep</h5>
                  <p className="mb-0">navdeepdahiya753@gmail.com</p>
                </div>
              </div>
              <div className={cn(`absolute top-[60px] border-2 border-[#ecebeb]  left-0 shadow-md rounded-md bg-white w-[252px]`, visible ? 'visible ' : 'hidden')}>
                <div className='flex flex-col justify-start items-start p-4 text-lg font-normal'>
                  <li className=' list-none mb-2'>
                    <Link
                      to="/"
                    >
                      View Profile
                    </Link>
                  </li>
                  <li className=' list-none'>
                    <Link
                      to="/"
                    >
                      Signout
                    </Link>
                  </li>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-[40px] h-full items-center ml-4">
              <IoIosNotifications size={24} />
              <span className="badge bg-warning rounded-circle p-1">
                3
              </span>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
