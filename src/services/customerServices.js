import axiosClient from '@api/axiosClient';

export const searchDrivers = async payload => {
  try {
    console.log('Calling SearchDrivers >>> payload:', payload);

    const res = await axiosClient.post(
      'client/find_drivers_by_client',
      payload,
    );

    console.log('SearchDrivers API response:', res);

    return res.data;
  } catch (error) {
    console.log('SearchDrivers ERROR >>>>', error);
    throw error.response?.data || error;
  }
};
