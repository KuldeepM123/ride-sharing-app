import axiosClient from './axiosClient';
export const fetchCustomers = async () => {
  const res = await axiosClient.get('/customer');
  return res.data;
};
