import 'antd/dist/reset.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { ResetPassword } from '../pages/ResetPassword';
import { ForgotPassword } from '../pages/ForgotPassword';
import { MainLayout } from '../components/MainLayout';
import { Dashboard } from '../pages/Dashboard';
import { Article } from '../pages/Article';
import { Register } from '../pages/Register';
import { useCheckUserContext } from '../providers/checkUserContext';
import { BlogCategory } from '../pages/BlogCategory';
import { BlogCategoryList } from '../pages/BlogCategoryList';



export const AppRoutes = () => {
  const { isAuthenticated, setAuth } = useCheckUserContext();


  return (
    <Routes>
      <Route path='/' element={<Login setAuth={setAuth} />} />
      <Route path='/register' element={<Register setAuth={setAuth} />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route
        path='/admin'
        element={isAuthenticated ? <MainLayout setAuth={setAuth} /> : <Navigate to="/" />}
      >
        <Route index element={<Dashboard />} />
        <Route path='add-article' element={<Article />} />
        <Route path='blog-category' element={<BlogCategory />} />
        <Route path="blog-category/:id" element={<BlogCategory />} />
        <Route path='blog-list' element={<BlogCategoryList />} />
      </Route>
      <Route
        path='/'
        element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/admin" />}
      />
    </Routes>
  )
}