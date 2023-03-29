import axiosClient from './axiosClient';

export const configurationApi = {
  getAppConfiguration: async () => {
    const appId = process.env.REACT_APP_APP_ID;
    const url = `configuration/${appId}/`;
    return await axiosClient.get(url);
  },
};

export default configurationApi;
