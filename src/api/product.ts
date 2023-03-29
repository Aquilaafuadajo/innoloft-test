import { Product } from '../types';
import axiosClient from './axiosClient';

export const productApi = {
  getProduct: async (id: string) => {
    const url = `product/${id}/`;
    return await axiosClient.get(url);
  },

  updateProduct: async (data: Product) => {
    const url = `product/${data.id}/`;
    return await axiosClient.put(url, data);
  },
};

export default productApi;
