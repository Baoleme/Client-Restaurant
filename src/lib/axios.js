import axios from 'axios';
import store from '../store';

const ax = axios.create({
  // timeout: 3000,
  withCredentials: true,
  // baseURL: config.axiosBase
  baseURL: '/api'
});
ax.interceptors.response.use(
  res => res,
  err => {
    // Network Error
    if (err.message === 'Network Error') {
      store.commit('SET_NETWORK_ERR');
    }
    console.log(err.message);
    if (err.message && err.message.match(/timeout/)) {
      const config = err.config;
      if (config.method !== 'get') return Promise.reject(err); // only retry GET methods
      if (config.leftRetry) config.leftRetry--;
      else config.leftRetry = 3; // default retry times

      if (config.leftRetry) {
        return ax(config);
      } else {
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }
);

export default ax;
