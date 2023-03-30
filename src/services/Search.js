import axios from "axios";

export const search = async (value) => {
  try {
    const response = await axios.get(
      `http://168.181.186.118:9093/search/fseach2/${value}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const handleGetItemDetails = async (legajoId) => {
  try {
    const response = await axios.get(
      `http://168.181.186.118:9093/mpasearch/getUnExpe/${legajoId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
