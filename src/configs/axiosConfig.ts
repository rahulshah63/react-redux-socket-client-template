import axios from 'axios';

export const config = () => {
  //axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;
  axios.defaults.baseURL = 'http://localhost:3000//v1/';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Accept'] = 'application/json';
};
