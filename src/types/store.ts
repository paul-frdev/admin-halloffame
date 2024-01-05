export type IOption = {
  value: any;
  label: string;
  icon?: string;
};

export interface FullUser {
  first_name: string;
  email: string;
  password: string;
  phone_number: string;
}
export interface User {
  email: string;
  password: string;
}

export type AuthUser = Omit<FullUser, 'password' | 'phone_number'>;
export interface BasicState {
  isError: boolean;
  authCurUser?: AuthUser;
  isLoading: boolean;
  isSuccess: boolean;
  message: unknown;
}

export interface AuthState extends BasicState {
  user: User;
  isAuth: boolean;
}

export interface BlogCategoryState {
  category_id?: string;
  title: string;
}

export interface BlogCategoriesState extends BasicState {
  bCategories: BlogCategoryState[];
  bCategory?: BlogCategoryState;
}

export interface ArticleProps {
  title: string;
  description: string;
  publish_date: Date;
  id?: string;
  cat_title?: string;
  created_at?: Date;
  status?: 'draft' | 'published';
  articleType?: 'media_news' | 'blog_news';
  article_type?: string;
  categoryId?: string;
  images?: ImageUrls[];
  article_id?: string;
}

export interface ArticleById {
  title?: string;
  Images?: ImageUrls;
  description?: string;
  articleType?: string;
  cat_title: string;
  category_id: string;
}

export interface ArticlesState extends BasicState {
  articles: ArticleProps[];
  article?: ArticleProps;
  articleImages: ImageUrls[];
}

export interface ImageUrls {
  img?: string;
  public_id?: string;
  url?: string;
}

export interface ImageProps extends BasicState {
  images: ImageUrls[];
  image?: ImageUrls;
  updatedImage?: any;
}

export interface ColorsData {
  color_id?: string;
  color_name?: string;
}

export interface ColorsState extends BasicState {
  colors?: ColorsData[];
  colorName?: ColorsData;
  createdColor?: ColorsData[];
  updatedColor?: ColorsData[];
  deletedColor?: ColorsData;
}

export interface SizesData {
  size_id?: string;
  size_name?: string;
}

export interface SizesState extends BasicState {
  sizes?: SizesData[];
  sizeName?: SizesData;
  createdSize?: SizesData[];
  updatedSize?: SizesData[];
  deletedSize?: SizesData;
}

export interface WeightsData {
  weight_id?: string;
  weight_name?: string;
}

export interface WeightsState extends BasicState {
  weights?: WeightsData[];
  weightName?: WeightsData;
  createdWeight?: WeightsData[];
  updatedWeight?: WeightsData[];
  deletedWeight?: WeightsData;
}

export interface CategoriesData {
  category_id?: string;
  category_name?: string;
}

export interface CategoriesState extends BasicState {
  categories?: CategoriesData[];
  categoryName?: CategoriesData;
  createdCategory?: CategoriesData[];
  updatedCategory?: CategoriesData[];
  deletedCategory?: CategoriesData;
}

export interface BrandsData {
  brand_id?: string;
  brand_name?: string;
}

export interface TagsProps {
  tag_id: string;
  tag_name: string;
}

export interface BrandsState extends BasicState {
  brands?: BrandsData[];
  brandName?: BrandsData;
  createdBrand?: BrandsData[];
  updatedBrand?: BrandsData[];
  deletedBrand?: BrandsData;
}

export interface ProductData {
  product_id?: string;
  title?: string;
  description?: string;
  quantity?: number;
  price: number;
  discount?: number;
  isDiscount: boolean;
  category: string;
  images: ImageUrls[];
  brands: string[];
  colors?: string[];
  weights?: string[];
  sizes?: string[];
}

export interface ProductState extends BasicState {
  products?: ProductData[];
  productTitle?: ProductData;
  createdProduct?: ProductData[];
  updatedProduct?: ProductData[];
  deletedProduct?: ProductData[];
  tags?: TagsProps[];
}

export interface EventProps {
  title: string;
  descriptiontext: string;
  event_date?: Date;
  publish_date?: Date;
  event_id?: string;
  status?: 'draft' | 'published';
  time: IOption[] | null;
  images: ImageUrls[];
  ticket_img: ImageUrls[];
  location: string;
  adult_price: number;
  child_price: number;
  adult_quantity_tickets: number;
  children_quantity_tickets: number;
}

export interface TimeOptions {
  time_id: string;
  time_label: string;
  time_name: string;
}

export interface EventState extends BasicState {
  eventsData: EventProps[];
  timeOptions?: TimeOptions[];
  createdEvent?: EventProps[];
}

export interface TicketProps {
  title: string;
  ticket_images: ImageUrls[];
  ticket_images_id?: string;
}

export interface TicketState extends BasicState {
  tickets: TicketProps[];
}

export interface SlideProps {
  slide_id?: string;
  slide_image: string;
  title: string;
  type?: string;
  is_active?: boolean;
}
export interface SlideState extends BasicState {
  slides: SlideProps[];
}

export interface TestimonialProps {
  testimonial_id?: string;
  adminTag: string;
  image: ImageUrls[];
  testimonial_image?: ImageUrls[];
  testimonial_author?: string;
  testimonial_description?: string;
  testimonial_dignity?: string;
  desriptiontext: string;
  author: string;
  dignity: string;
  is_active: boolean;
}

export interface TestimonialState extends BasicState {
  testimonials: TestimonialProps[];
  testimonial?: TestimonialProps;
  adminTag?: string;
}

export interface AboutUsProps {
  about_id: string;
  about_title: string;
  about_description: string;
}

export interface ContactsProps {
  contacts_id: string;
  contacts_title: string;
  contacts_address: string;
  contacts_email: string;
  contacts_phone: string;
}

export interface RefundProps {
  refund_id: string;
  refund_text: string;
}

export interface ContentState extends BasicState {
  aboutUs: AboutUsProps | undefined;
  contacts: ContactsProps | undefined;
  refund: RefundProps | undefined;
}
