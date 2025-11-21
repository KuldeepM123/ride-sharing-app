import axiosClient from './axiosClient';
export const fetchDriverRides = async () => {
  const res = await axiosClient.get('/driver/rides');
  return res.data;
};
