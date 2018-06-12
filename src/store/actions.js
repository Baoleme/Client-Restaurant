import axios from '@/lib/axios';
const baseUrl = 'https://api.baoleme.andiedie.cn/';
// const baseUrl = 'http://127.0.0.1:8520/';

export default {
  loginAction ({ commit }, data) {
    return axios.post(baseUrl + 'restaurant/session', {
      email: data.username.trim(),
      password: data.password.trim()
    }).then((value) => {
      // commit('LOGIN');
      return false;
    }, (error) => {
      console.log(error.response.data.message);
      return error.response.data.message;
    });
  },
  logout ({ commit }) {
    return axios.delete(baseUrl + 'restaurant/session').then((value) => {
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
    return axios.post(baseUrl + 'restaurant/emailConfirm')
      .then((value) => { return false; },
        (error) => { return error.response.data.message; });
  },
  restaurantSelfOrder ({ commit }, data) {
    commit('UPDATE_FILTERS', data.stateArr);
    return axios.get(baseUrl + 'restaurant/self/order?page=' + data.page + '&number=10&state=' + data.stateArr.join(',')).then((res) => {
      if (res.status === 200) {
        // console.log(res.data);
        commit('UPDATE_ORDER_LIST', res.data);
        return false;
      }
    });
  },
  trackSelfOrder ({ commit }, data) {
    commit('UPDATE_FILTERS', data.stateArr);
    return axios.get(baseUrl + 'restaurant/self/order?page=' + data.page + '&number=10&state=' + data.stateArr.join(',') + '&keyword=' + data.keyword).then((res) => {
      if (res.status === 200) {
        commit('UPDATE_ORDER_LIST', res.data);
        return false;
      }
    });
  },
  dealOrder ({ commit }, data) {
    return axios.put(baseUrl + 'order/' + data.id, {
      state: data.state
    }).then((value) => { return false; },
      (error) => {
        console.log('dealOrder', error.response.data.message);
        return error.response.data.message;
      });
  },
  getDish ({ commit }, data) {
    return axios.get(baseUrl + 'dish').then((res) => {
      if (res.status === 200) {
        commit('UPDATE_DISH_LIST', res.data);
        return false;
      }
    });
  },
  addCate ({ commit }, data) {
    return axios.post(baseUrl + 'category', {
      name: data
    }).then((res) => {
      if (res.status === 200) {
        commit('ADD_CATE', res.data);
        return false;
      }
    });
  },
  delCate ({ commit }, data) {
    return axios.delete(baseUrl + 'category/' + data + '?dump=1580').then((res) => {
      if (res.status === 200) {
        console.log('delCate successfully!');
        commit('DEL_CATE', data);
        return false;
      }
    }, (error) => {
      return error.response.data.message;
    });
  },
  changeCate ({ commit }, data) {
    return axios.put(baseUrl + 'category/' + data.id, {
      name: data.name
    }).then((res) => {
      if (res.status === 200) {
        console.log('changeCate successfully!');
        commit('CG_CATE', data);
        return false;
      }
    }, (error) => {
      return error.response.data.message;
    });
  },
  uploadImg ({ commit }, data) {
    let fd = new FormData();
    fd.append('image', data);
    return axios.post(baseUrl + 'image', fd).then((value) => {
      commit('SAVE_NEWDISH_IMG', value.data.url);
      return false;
    }, (error) => {
      console.log(error.response.data.message);
      return error.response.data.message;
    });
  },
  addDish ({ commit }, data) {
    return axios.post(baseUrl + 'dish', data).then((value) => {
      return false;
    }, (error) => {
      return error.response.data.message;
    });
  },
  modifyDish ({ commit }, obj) {
    return axios.put(baseUrl + 'dish/' + obj.id, obj.data).then((value) => {
      return false;
    }, (error) => {
      return error.response.data.message;
    });
  }
};
