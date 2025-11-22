import axiosClient from '@api/axiosClient';
// export const fetchCustomers = async () => {
//   const res = await axiosClient.get('/driver');
//   return res.data;
// };
export const shareRide = async payload => {
  console.log('Calling Share Ride API.. ye', payload);
  try {
    const res = await axiosClient.post('driver/add_route', payload);
    // console.log('Responce of Share Ride API..', res);
    return res.data;
  } catch (error) {
    // console.log('i am heere', error);
    throw error.response?.data || error;
  }
};
export const addRoute = async payload => {
  try {
    const res = await axiosClient.post('driver/add_route', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const searchShareRide = async payload => {
  try {
    const res = await axiosClient.post(
      'client/find_drivers_by_client',
      payload,
    );
    console.log('Responce of Share Ride API..', res.data);
    return res.data;
  } catch (error) {
    console.log('i am heere', error);
    throw error.response?.data || error;
  }
};
