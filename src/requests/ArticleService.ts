import { ArticleProps } from '../types/store';
import axios from 'axios';
import { base_url, config } from '../lib/utils';

const getArticles = async () => {
  const response = await axios.get(`${base_url}articles/`);

  return response.data;
};

const createArticle = async (article: ArticleProps) => {
  const response = await axios.post(`${base_url}article/`, article, config);

  return response.data;
};

const articleService = {
  createArticle,
  getArticles,
};

export default articleService;
