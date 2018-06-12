export default {
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
  },
  UPDATE_SUB_INDEX (state, index) {
    state.subIndex = index;
  },
  UPDATE_CUR_ORDER (state, data) {
    state.curOrder = data;
  },
  UPDATE_CLUE (state, clue) {
    console.log('clue', clue);
    state.clue = clue;
  },
  UPDATE_ORDER_LIST (state, data) {
    console.log('UPDATE_ORDER_LIST:', data.order);
    console.log('number_of_pages:', data.number_of_pages);
    state.numberOfPages = data.number_of_pages;
    state.orderList = data.order;
    for (let i = 0, len = state.orderList.length; i < len; i++) {
      state.orderList[i].waitTime = '-';
      state.orderList[i].createTime = state.orderList[i].state_record[0].time;
      state.orderList[i].curState = state.orderList[i].state_record[state.orderList[i].state_record.length - 1].state;
      if (state.orderList[i].curState === 'paid' || state.orderList[i].curState === 'accepted') {
        for (let j = 0, len = state.waitTimeClock.length; j < len; j++) {
          if (state.waitTimeClock[j].id === state.orderList[i].order_id) {
            let h = parseInt(state.waitTimeClock[j].clock / 3600);
            let m = parseInt(state.waitTimeClock[j].clock / 60 % 60);
            let s = parseInt(state.waitTimeClock[j].clock % 60);
            if (m < 10) {
              m = '0' + m;
            }
            if (s < 10) {
              s = '0' + s;
            }
            state.orderList[i].waitTime = h + ':' + m + ':' + s;
            break;
          }
        }
        if (state.orderList[i].waitTime === '-') {
          state.waitTimeClock.push({
            id: state.orderList[i].order_id,
            clock: 0
          });
          state.orderList[i].waitTime = '0:00:01';
        }
      }
    }

    for (let i = 0, len = state.orderList.length; i < len; i++) {
      let temp = new Date(state.orderList[i].createTime);
      state.orderList[i].createTime = temp.toLocaleString();
      for (let j = 0, len2 = state.orderList[i].state_record.length; j < len2; j++) {
        let temp = new Date(state.orderList[i].state_record[j].time);
        state.orderList[i].state_record[j].time = temp.toLocaleString();
        if (state.orderList[i].state_record[j].state === 'paid') {
          state.orderList[i].state_record[j].state = '新订单';
        }
        if (state.orderList[i].state_record[j].state === 'accepted') {
          state.orderList[i].state_record[j].state = '进行中';
        }
        if (state.orderList[i].state_record[j].state === 'cancelled') {
          state.orderList[i].state_record[j].state = '已取消';
        }
        if (state.orderList[i].state_record[j].state === 'completed') {
          state.orderList[i].state_record[j].state = '已完成';
        }
      }
      state.orderList[i].curState = state.orderList[i].state_record[state.orderList[i].state_record.length - 1].state;
      if (!state.orderList[i].remark) {
        state.orderList[i].remark = '无';
      }
    }
  },
  UPDATE_FILTERS (state, data) {
    state.filters = data;
  },
  UPDATE_DISH_LIST (state, data) {
    console.log('UPDATE_DISH_LIST', data);
    state.dishList = data;
    state.categories = [];
    for (let i = 0, len = state.dishList.length; i < len; i++) {
      state.categories.push({
        id: state.dishList[i].category_id,
        name: state.dishList[i].name
      });
      for (let j = 0; j < state.dishList[i].dish.length; ++j) {
        if (state.dishList[i].dish[j].selling) {
          state.dishList[i].dish[j].state = '售卖中';
        } else {
          state.dishList[i].dish[j].state = '已下架';
        }
      }
    }
  },
  UPDATE_TIME_CLOCK (state) {
    for (let i = 0, len = state.waitTimeClock.length; i < len; i++) {
      state.waitTimeClock[i].clock++;
    }
  },
  ADD_CATE (state, data) {
    state.curNewCate = data.category_id;
    state.categories.push({
      id: data.category_id,
      name: data.name
    });
    state.dishList.push({
      category_id: data.category_id,
      name: data.name,
      dish: []
    });
  },
  DEL_CATE (state, data) {
    for (let i = 0, len = state.categories.length; i < len; i++) {
      if (state.categories[i].id === data) {
        state.categories.splice(i, 1);
        break;
      }
    }
  },
  CG_CATE (state, data) {
    for (let i = 0, len = state.categories.length; i < len; i++) {
      if (state.categories[i].id === data.id) {
        state.categories[i].name = data.name;
        break;
      }
    }
  },
  SAVE_NEWDISH_IMG (state, data) {
    state.curImg = data;
    console.log(state.curImg);
  },
  SET_ISEDITDISH (state, data) {
    state.isEditDish = data;
  },
  UPDATE_CUR_DISH (state, data) {
    state.curDish = data;
  },
  UPDATE_DISH_INFO (state, data) {
    state.dishList[data.activeIndex].dish[data.index][data.key] = data.newValue;
    if (data.key === 'state') {
      state.dishList[data.activeIndex].dish.splice(data.index, 1, data.dish);
    }
  }
};
