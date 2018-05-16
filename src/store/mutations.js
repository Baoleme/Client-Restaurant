export default {
  LOGIN (state) {
    state.isLogin = true;
  },
  GET_SELF_INFO (state, data) {
    state.email = data.email;
    state.restaurantName = data.name;
    state.restaurantId = data.restaurant_id;
    state.isConfirm = data.confirm_email;
  },
  SET_NETWORK_ERR (state) {
    state.isNetworkErr = true;
    setTimeout(() => { state.isNetworkErr = false; }, 1300);
  },
  UPDATE_INDEX (state, index) {
    state.index = index;
  }
};
