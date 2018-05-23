import axios from '@/lib/axios';
// const baseUrl = 'https://baoleme.andiedie.cn/';
const baseUrl = 'http://127.0.0.1:8520/';

export default {
  loginAction ({ commit }, data) {
    return axios.post(baseUrl + 'restaurant/session', {
      email: data.username.trim(),
      password: data.password.trim()
    }).then((value) => {
      commit('LOGIN');
      console.log('Login succeed!');
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
    let fd = new FormData();
    fd.append('email', data.username.trim());
    fd.append('password', data.password.trim());
    fd.append('name', data.restname.trim());
    fd.append('license', data.license);
    return axios.post(baseUrl + 'restaurant', fd).then((value) => {
      commit('LOGIN');
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
  },
  restaurantSelfOrder ({ commit }, pageNum) {
    axios.get(baseUrl + 'restaurant/self/order?page=' + pageNum + '&number=10').then((res) => {
      if (res.status === 200) {
        // console.log(res.data);
        commit('UPDATE_ORDER_LIST', res.data);
        return false;
      }
    });
  }
};
