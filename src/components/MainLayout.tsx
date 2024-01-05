import React, { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SiderBarWithMemo } from './SiderBar';
import { MainHeader } from './MainHeader';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { authorize } from '../store/authSlice';


const { Content } = Layout;


interface MainLayoutProps {
  setAuth?: (data: boolean) => void;
}
export const MainLayout: React.FC<MainLayoutProps> = ({ setAuth }) => {

  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false)

  const dispatch = useAppDispatch()

  const { authCurUser, isAuth, isSuccess, isError, isLoading, user } = useAppSelector((state: RootState) => state.auth)

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  useEffect(() => {
    if (user) {
      dispatch(authorize())
    }
  }, [user])


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

  return (
    <Layout>
      <SiderBarWithMemo collapsed={collapsed} />
      <Layout className='side-layout'>
        <MainHeader
          name={authCurUser?.first_name}
          email={authCurUser?.email}
          setCollapsed={setCollapsed}
          setVisible={setVisible}
          logOut={logout}
          colorBgContainer={colorBgContainer}
          visible={visible}
          collapsed={collapsed}
        />
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
