export default {
  LOGIN (state) {
    state.isLogin = true;
  },
  GET_SELF_INFO (state, data) {
    console.log('GET_SELF_INFO', data);
    state.infoObj = {
      email: data.email,
      name: data.name,
      restaurantId: data.restaurant_id,
      isConfirm: data.confirm_email,
      phone: data.phone,
      logoUrl: data.logo_url,
      description: data.description,
      address: data.address
    };
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
    // console.log('UPDATE_ORDER_LIST:', data.order);
    // console.log('number_of_pages:', data.number_of_pages);
    state.numberOfPages = data.number_of_pages;
    state.orderList = data.order;
    for (let i = 0, len = state.orderList.length; i < len; i++) {
      state.orderList[i].table = Number(state.orderList[i].table) + 1;
      state.orderList[i].waitTime = '-';
      state.orderList[i].createTime = state.orderList[i].state_record[0].time;
      state.orderList[i].curState = state.orderList[i].state_record[state.orderList[i].state_record.length - 1].state;
      if (state.orderList[i].curState === 'paid' || state.orderList[i].curState === 'accepted') {
        let start = Date.parse(new Date(state.orderList[i].createTime));
        let cur = Date.parse(new Date());
        let utc = cur - start + 1000;
        let hour = Math.floor(utc / (60 * 60 * 1000));
        let min = Math.floor(utc / (60 * 1000) - hour * 60);
        let second = Math.floor(utc / (1000) - hour * 3600 - min * 60);
        if (second < 10) {
          second = '0' + second;
        }
        if (min < 10) {
          min = '0' + min;
        }
        state.orderList[i].waitTime = hour + ':' + min + ':' + second;
      }
    }

    for (let i = 0, len = state.orderList.length; i < len; i++) {
      // 处理价格精度问题
      if (Math.abs(Number(state.orderList[i].price).toFixed(0) - Number(state.orderList[i].price)) < 0.0001) {
        state.orderList[i].price = Number(state.orderList[i].price).toFixed(0);
      }
      if (Math.abs(Number(state.orderList[i].price).toFixed(1) - Number(state.orderList[i].price)) < 0.0001) {
        state.orderList[i].price = Number(state.orderList[i].price).toFixed(1);
      }
      state.orderList[i].price = Number(state.orderList[i].price).toFixed(2);

      console.log(state.orderList[i].createTime);
      let temp = new Date(state.orderList[i].createTime);
      state.orderList[i].createTime = temp.toLocaleString();
      for (let j = 0, len2 = state.orderList[i].state_record.length; j < len2; j++) {
        let temp = new Date(state.orderList[i].state_record[j].time);
        state.orderList[i].state_record[j].time = temp.toLocaleString();
        if (state.orderList[i].state_record[j].state === 'created') {
          state.orderList[i].state_record[j].state = '未支付';
        }
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
  UPDATE_ORDER_COUNT (state, data) {
    if (data.flag === 1) {
      state.countObj.numOrdered = data.data.cancelled + data.data.completed;
      state.countObj.numAllOrder = data.data.cancelled + data.data.completed + data.data.paid + data.data.accepted;
    } else {
      state.countObj.numNewOrder = data.data.paid;
      state.countObj.numOrdering = data.data.accepted;
    }
    // console.log(state.countObj);
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
      if (state.dishList[i].dish) {
        for (let j = 0; j < state.dishList[i].dish.length; ++j) {
          if (state.dishList[i].dish[j].selling) {
            state.dishList[i].dish[j].state = '售卖中';
          } else {
            state.dishList[i].dish[j].state = '已售罄';
          }
        }
      }
    }
  },
  ADD_CATE (state, data) {
    state.curNewCate = data.category_id;
    state.curCateName = data.name;
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
    let it;
    if (data.dish) {
      for (let i = 0; i < state.dishList[data.activeIndex].dish.length; ++i) {
        if (state.dishList[data.activeIndex].dish[i].dish_id === data.dish.dish_id) {
          it = i;
          break;
        }
      }
    } else {
      it = data.index;
    }
    state.dishList[data.activeIndex].dish[it][data.key] = data.newValue;
    if (data.key === 'state') {
      state.dishList[data.activeIndex].dish.splice(it, 1, data.dish);
    }
  },
  UPDATE_QR_LIST (state, data) {
    state.QRList = data;
  },
  SAVE_CUR_CATENAME (state, data) {
    state.curCateName = data;
  }
};
