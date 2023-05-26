/**
 * Module dependencies.
 */

import axios from 'axios';
import qs from 'qs';

/**
 * Axios instance.
 */

const axiosInstance = axios.create({
  paramsSerializer: {
    serialize: params => qs.stringify(params)
  }
});

/**
 * Export `axiosInstance`.
 */

export default axiosInstance;
