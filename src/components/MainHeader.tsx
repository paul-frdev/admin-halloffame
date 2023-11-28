import React from 'react'
import { Layout, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { IoIosNotifications } from "react-icons/io";
import { cn } from '../lib/utils';



const { Header } = Layout;

interface MainHeaderProps {
  name: string;
  email: string;
  setCollapsed: (data: boolean) => void;
  setVisible: (data: any) => void;
  colorBgContainer: any;
  logOut: (e: any) => void;
  visible: boolean,
  collapsed: boolean
}

export const MainHeader: React.FC<MainHeaderProps> = ({ name, email, colorBgContainer, setCollapsed, logOut, setVisible, visible, collapsed }) => {

  const logOutUser = (e: any) => {
    logOut(e)
  }
  return (
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
        <div className="flex gap-x-4 items-center relative cursor-pointer shadow-md rounded-sm" onClick={() => setVisible((prev: any) => !prev)}>
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
              <h5 className="mb-1">{name}</h5>
              <p className="mb-0">{email}</p>
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
                  onClick={logOutUser}
                >
                  SignOut
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
  )
}
