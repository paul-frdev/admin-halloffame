export interface BasicState {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: unknown;
}

export interface BlogCategoryState {
  category_id?: string;
  title: string;
}

export interface BlogCategoriesState extends BasicState {
  bCategories: BlogCategoryState[];
}

export interface ArticleProps {
  id?: string;
  cat_title?: string;
  created_at?: Date;
  categoryId?: string;
  images?: ImageUrls[];
  article_id?: string;
  description: string;
  title: string;
}

export interface ArticleById {
  title?: string;
  Images?: ImageUrls;
  description?: string;
  cat_title: string;
  category_id: string;
}

export interface ArticlesState extends BasicState {
  articles: ArticleProps[];
  articleImages: ImageUrls[];
}

export interface ImageUrls {
  img?: string;
  public_id?: string;
  url?: string;
}

export interface ImageProps extends BasicState {
  images: ImageUrls[];
}

export interface ColorsData {
  colors_id?: string;
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
  sizes_id?: string;
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
  weights_id?: string;
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
