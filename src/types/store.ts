export interface BasicState {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: unknown;
}

export interface BlogCategoryState {
  title: string;
}

export interface BlogCategoriesState extends BasicState {
  bCategories: BlogCategoryState[];
}
