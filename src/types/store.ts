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
  title: string;
  description: string;
  categoryId?: string;
  images?: ImageUrls[];
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
