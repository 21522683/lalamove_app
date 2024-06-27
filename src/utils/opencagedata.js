import axios from 'axios';

const OPEN_CAGEDATA_KEY = 'QaDHsyMVJAx8DeAIGLvYbciKZpHEh9on';

export const GetInfoFromCoordinates = async (latitude, longitude) => {
  try {
    console.log(latitude, longitude);
    const apiLink = `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${OPEN_CAGEDATA_KEY}&radius=100`;
    console.log(apiLink);
    const response = await axios.get(apiLink);
    if (
      response.data &&
      response.data.addresses &&
      response.data.addresses.length > 0
    ) {
      const result = response.data.addresses[0];
      console.log(result);
      let stringArr = result.address.freeformAddress.split(',');
      stringArr = stringArr.slice(0, stringArr.length - 1).join(',');
      return stringArr;
    } else {
      throw new Error('No location found');
    }
  } catch (error) {
    console.error('Error fetching location:', error.message);
    return null;
  }
};

export const GetCoordinatesFromInfo = async (ward, district, province) => {
  try {
    const query = encodeURIComponent(`${province} ${district} ${ward}`);

    const apiLink = `https://api.tomtom.com/search/2/geocode/${query}.json?key=${OPEN_CAGEDATA_KEY}`;
    console.log(apiLink);
    const response = await axios.get(apiLink);

    if (
      response.data &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const result = response.data.results[0];
      const {lat, lon} = result.position;
      return {latitude: lat, longitude: lon};
    }
  } catch (error) {
    console.error('Error fetching location:', error.message);
    return null;
  }
};
