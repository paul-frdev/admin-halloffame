import React, { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SiderBarWithMemo } from './SiderBar';
import { MainHeader } from './MainHeader';


const { Content } = Layout;


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
        <MainHeader
          name={dataProfile.name}
          email={dataProfile.email}
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
