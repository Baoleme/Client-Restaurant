import axios from 'axios';
// const baseUrl = 'https://baoleme.andiedie.cn/';
const baseUrl = 'http://127.0.0.1:8520/';

export default {
  loginAction ({ commit }, data) {
    return axios.post(baseUrl + 'restaurant/session', {
      email: data.username,
      password: data.password
    }).then((res) => {
      if (!res || res.status !== 200 || res.data.err) {
        return true;
      } else {
        commit('LOGIN');
        return false;
      }
    });
  },
  getRestInfo ({ commit }) {
    axios.get(baseUrl + 'restaurant/self').then((res) => {
      if (res.status === 200) {
        commit('GET_SELF_INFO', res.data);
        return false;
      }
    });
  },
  registerAction ({ commit }, data) {
    return axios.post(baseUrl + 'restaurant', {
      email: data.username,
      name: data.restname,
      password: data.password
    }).then((res) => {
      if (!res || res.status !== 200 || res.data.err) {
        return true;
      } else {
        commit('LOGIN');
        return false;
      }
    });
  },
  sendConfirmEmail ({ commit }) {
    axios.post(baseUrl + 'restaurant/emailConfirm').then((res) => {
      if (res.status === 200) return false;
      else return true;
    });
  },
  emailConfirm ({ commit }, cipher) {
    axios.get(baseUrl + 'restaurant/emailConfirm?cipher=' + cipher).then((res) => {
      if (res.status === 200) return false;
      else return true;
    });
  }
};
