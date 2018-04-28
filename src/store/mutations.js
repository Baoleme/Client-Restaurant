export default {
  LOGIN (state) {
    state.isLogin = true;
  },
  GET_SELF_INFO (state, data) {
    state.email = data.email;
    state.restaurantName = data.name;
    state.restaurantId = data.restaurant_id;
    state.isConfirm = data.confirm_email;
  }
};
