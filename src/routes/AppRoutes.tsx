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
import { ArticleList } from '../pages/ArticleList';
import { Color } from '../pages/Color';
import { Size } from '../pages/Size';
import { Weight } from '../pages/Weight';
import { ColorList } from '../pages/ColorList';
import { SizeList } from '../pages/SizeList';
import { WeightList } from '../pages/WeightList';
import { ProductForm } from '../components/forms/ProductForm';
import { ProductList } from '../pages/ProductList';
import { Category } from '../pages/Category';
import { CategoryList } from '../pages/CategoryList';



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
        <Route path='article/:id' element={<Article />} />
        <Route path='article-list' element={<ArticleList />} />
        <Route path='color' element={<Color />} />
        <Route path='color/:id' element={<Color />} />
        <Route path='color-list' element={<ColorList />} />
        <Route path='size' element={<Size />} />
        <Route path='size/:id' element={<Size />} />
        <Route path='size-list' element={<SizeList />} />
        <Route path='weight' element={<Weight />} />
        <Route path='weight/:id' element={<Weight />} />
        <Route path='weight-list' element={<WeightList />} />
        <Route path='category' element={<Category />} />
        <Route path='category/:id' element={<Category />} />
        <Route path='category-list' element={<CategoryList />} />
        <Route path='category' element={<Category />} />
        <Route path='product' element={<ProductForm />} />
        <Route path='product/:id' element={<ProductForm />} />
        <Route path='product-list' element={<ProductList />} />
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