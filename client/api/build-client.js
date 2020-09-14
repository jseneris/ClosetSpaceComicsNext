import axios from 'axios';

const keys = require('../../config/keys');

export default ({ req }) => {
  //we are on browser
  return axios.create({
    baseURL: keys.redirectDomain,
    // baseURL: 'http://localhost:3001/',
  });
};
