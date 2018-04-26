import axios from '@/lib/axios';
// const baseUrl = 'https://baoleme.andiedie.cn/';
const baseUrl = 'http://127.0.0.1:8520/';

export default {
  loginAction ({ commit }, data) {
    return axios.post(baseUrl + 'restaurant/session', {
      email: data.username,
      password: data.password
    }).then((value) => {
      commit('LOGIN');
      return false;
    }, (error) => {
      console.log(error.response.data.message);
      return error.response.data.message;
    });
  },
  getRestInfo ({ commit }) {
    return axios.get(baseUrl + 'restaurant/self').then((res) => {
      if (res.status === 200) {
        console.log(res.data);
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
    }).then((value) => {
      commit('LOGIN', data.username);
      return false;
    }, (error) => {
      console.log(error.response.data.message);
      return error.response.data.message;
    });
  },
  sendConfirmEmail ({ commit }) {
    axios.post(baseUrl + 'restaurant/emailConfirm')
      .then((value) => { return false; },
        (error) => { return error.response.data.message; });
  },
  emailConfirm ({ commit }, cipher) {
    axios.get(baseUrl + 'restaurant/emailConfirm?cipher=' + cipher)
      .then((value) => { return false; },
        (error) => { return error.response.data.message; });
  }
};
