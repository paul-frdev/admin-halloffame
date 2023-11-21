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
import { ProductList } from '../pages/ProductList';
import { Category } from '../pages/Category';
import { CategoryList } from '../pages/CategoryList';
import { Brand } from '../pages/Brand';
import { BrandList } from '../pages/BrandList';
import { TicketList } from '../pages/TicketList';
import { Event } from '../pages/Event';
import { Ticket } from '../pages/Ticket';
import { EventList } from '../pages/EventList';
import { Product } from '../pages/Product';
import { Slides } from '../pages/Slides';
import { SlidesList } from '../pages/SlidesList';
import { MediaArticle } from '../pages/MediaArticle';
import { MediaArticlesList } from '../pages/MediaArticlesList';
import { Testimonial } from '../pages/Testimonial';
import { TestimonialsList } from '../pages/TestimonialsList';
import { History } from '../pages/History';
import { AboutUs } from '../pages/AboutUs';
import { GetRefund } from '../pages/GetRefund';
import { Contacts } from '../pages/Contacts';



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
        <Route path='event' element={<Event />} />
        <Route path='event/:id' element={<Event />} />
        <Route path='event-list' element={<EventList />} />
        <Route path='ticket' element={<Ticket />} />
        <Route path='ticket/:id' element={<Ticket />} />
        <Route path='ticket-list' element={<TicketList />} />
        <Route path='category/:id' element={<Category />} />
        <Route path='category-list' element={<CategoryList />} />
        <Route path='brand' element={<Brand />} />
        <Route path='brand/:id' element={<Brand />} />
        <Route path='brand-list' element={<BrandList />} />
        <Route path='category' element={<Category />} />
        <Route path='product' element={<Product />} />
        <Route path='product/:id' element={<Product />} />
        <Route path='product-list' element={<ProductList />} />
        <Route path='blog-category' element={<BlogCategory />} />
        <Route path="blog-category/:id" element={<BlogCategory />} />
        <Route path='blog-list' element={<BlogCategoryList />} />
        <Route path='slide' element={<Slides />} />
        <Route path="slide/:id" element={<Slides />} />
        <Route path='slides-list' element={<SlidesList />} />
        <Route path='media' element={<MediaArticle />} />
        <Route path='media/:id' element={<MediaArticle />} />
        <Route path='media-list' element={<MediaArticlesList />} />
        <Route path='testimonial' element={<Testimonial />} />
        <Route path='testimonial/:id' element={<Testimonial />} />
        <Route path='testimonials-list' element={<TestimonialsList />} />
        <Route path='history' element={<History />} />
        <Route path='about-us' element={<AboutUs />} />
        <Route path='history' element={<History />} />
        <Route path='refund' element={<GetRefund />} />
        <Route path='contacts' element={<Contacts />} />
      </Route>
      <Route
        path='/'
        element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/admin" />}
      />
    </Routes>
  )
}