import 'antd/dist/reset.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { ResetPassword } from '../pages/ResetPassword';
import { ForgotPassword } from '../pages/ForgotPassword';
import { MainLayout } from '../components/MainLayout';
import { Dashboard } from '../pages/Dashboard';
import { AddArticle } from '../pages/AddArticle';
import { Register } from '../pages/Register';
import { useEffect, useState } from 'react';



export const AppRoutes = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthenticatedUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    checkAuthenticatedUser();
  }, []);


  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route
          path='/admin'
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
          <Route path='article' element={<AddArticle />} />
        </Route>
        <Route
          path='/'
          element={!isAuthenticated ? <Login /> : <Navigate to="/admin" />}
        />
      </Routes>
    </Router>
  )
}