import axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyBscb7avYwHc3Ahr8WLt5Pp0xU_Ok7JyYk';

export const searchLocation = async text => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
      {
        params: {
          input: text,
          key: GOOGLE_API_KEY,
          components: 'country:in',
          types: 'geocode',
        },
      },
    );

    return response.data.predictions || [];
  } catch (error) {
    console.log('Place search error:', error);
    throw error;
  }
};
export const getPlaceDetails = async placeId => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          place_id: placeId,
          key: GOOGLE_API_KEY,
        },
      },
    );

    const json = response.data;

    const location = json.result?.geometry?.location;
    const address = json.result?.formatted_address;

    if (!location) {
      return null;
    }

    return {
      lat: location.lat,
      lng: location.lng,
      address: address,
    };
  } catch (error) {
    console.log('Place details error:', error);
    throw error;
  }
};
