import axiosClient from './axiosClient';

export const trlApi = {
  getTrl: async () => {
    const url = '/trl/';
    return await axiosClient.get(url);
  },
};
