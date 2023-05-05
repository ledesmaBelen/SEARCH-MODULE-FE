import axios from "axios";

export const search = async (value, params) => {
  try {
    let url = `http://168.181.186.118:9093/search/fseach2/${value}?${params}`;
    const response = await axios.get(url);
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

export const handleGetMesExpeDetails = async (legajoId) => {
  try {
    const response = await axios.get(
      `http://168.181.186.118:9093/mpasearch/getUnExpediente/${legajoId}`
      //`http://localhost:9090/mpasearch/getUnExpediente/${legajoId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetMesExpePersons = async (legajoId) => {
  try {
    const response = await axios.get(
      `http://168.181.186.118:9093/mpasearch/getpartesExpe/${legajoId}`
      //`http://localhost:9090/mpasearch/getpartesExpe/${legajoId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetPartes = async (legajoId) => {
  try {
    const response = await axios.get(
      `http://168.181.186.118:9093/mpasearch/getPartesExpe/${legajoId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetExpeconDenun = async (legajoId) => {
  try {
    const response = await axios.get(
      `http://168.181.186.118:9093/mpasearch/getexpecondenun/${legajoId}`
      //`http://localhost:9090/mpasearch/getexpecondenun/${legajoId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetSecuestros = async (legajoId) => {
  try {
    const response = await axios.get(
      `http://168.181.186.118:9093/mpasearch/getsecuestros/${legajoId}`
      //`http://localhost:9090/mpasearch/getsecuestros/${legajoId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetCriterios = async (legajoId) => {
  try {
    const response = await axios.get(
      `http://168.181.186.118:9093/mpasearch/criteriobus`
      //`http://localhost:9090/mpasearch/criteriobus`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
