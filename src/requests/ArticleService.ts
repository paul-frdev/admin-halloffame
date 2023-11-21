import { ArticleProps } from '../types/store';
import axios from 'axios';
import { base_url, config } from '../lib/utils';

const createArticle = async (article: ArticleProps) => {
  const response = await axios.post(`${base_url}article/`, article, config);

  return response.data;
};

const getBlogArticles = async () => {
  const response = await axios.get(`${base_url}blog/articles`);

  return response.data;
};

const getMediaArticles = async () => {
  const response = await axios.get(`${base_url}media/articles`);

  return response.data;
};

const getArticle = async (id: string) => {
  const response = await axios.get(`${base_url}article/${id}`, config);

  return response.data;
};

const deleteArticle = async (id: string) => {
  const response = await axios.delete(`${base_url}article/${id}`, config);

  return response.data;
};

const articleService = {
  createArticle,
  getBlogArticles,
  getArticle,
  deleteArticle,
  getMediaArticles,
};

export default articleService;
