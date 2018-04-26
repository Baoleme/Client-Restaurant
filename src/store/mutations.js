export default {
  LOGIN (state, username) {
    state.isLogin = true;
    state.email = username;
  },
  GET_SELF_INFO (state, data) {
    state.email = data.email;
    state.restaurantName = data.name;
    state.restaurantId = data.restaurant_id;
    state.isConfirm = data.confirm_email;
  }
};
