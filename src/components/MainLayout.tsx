import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
import { IoIosNotifications } from "react-icons/io";

import { Link, Outlet } from 'react-router-dom';
import { cn } from '../lib/utils';
import { toast } from 'react-toastify';
import { SiderBarWithMemo } from './SiderBar';

const { Header, Content } = Layout;


interface MainLayoutProps {
  setAuth?: (data: boolean) => void;
}
export const MainLayout: React.FC<MainLayoutProps> = ({ setAuth }) => {

  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false)
  const [dataProfile, setDataProfile] = useState<any>([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: { jwt_token: localStorage.user }
      });

      const parseData = await res.json();

      setDataProfile({ name: parseData.first_name, email: parseData.email })
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const logout = async (e: any) => {
    e.preventDefault();
    try {
      localStorage.removeItem("user");
      setAuth?.(false);
      toast.success("Logout successfully");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Layout>
      <SiderBarWithMemo collapsed={collapsed} />
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
                  <h5 className="mb-1">{dataProfile.name}</h5>
                  <p className="mb-0">{dataProfile.email}</p>
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
                    <button
                      onClick={logout}
                    >
                      Signout
                    </button>
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
            padding: 18,
            paddingLeft: 5,
            paddingRight: 5,
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
