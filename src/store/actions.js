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
        console.log(res.data.err);
        return true;
      } else {
        commit('LOGIN');
        return false;
      }
    });
  },
  getRestInfo ({ commit }) {
    axios.get(baseUrl + '/restaurant/self').then((res) => {
      if (res.status === 200) {
        commit('GET_SELF_INFO', res.data);
      }
    });
  }
};
