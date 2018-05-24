<template>
<div class="order">
  <div class="title" v-show="filterIndex !== 0">订单</div>
  <div class="title" v-show="filterIndex === 0">订单查询</div>
  <div class="subMenu" v-show="filterIndex !== 0">
    <div class="subMenuItem" @click="goto(1)" :class="{subActive: activeSubIndex === 1}">
      <span>正在处理中</span>
      <div :class="{activeLine: activeSubIndex === 1}"></div>
    </div>
    <div class="subMenuItem" @click="goto(2)" :class="{subActive: activeSubIndex === 2}">
      <span>已结束</span>
      <div :class="{activeLine: activeSubIndex === 2}"></div>
    </div>
    <div class="subMenuItem" @click="goto(3)" :class="{subActive: activeSubIndex === 3}">
      <span>全部订单</span>
      <div :class="{activeLine: activeSubIndex === 3}"></div>
    </div>
  </div>
  <div class="divLine" v-show="filterIndex !== 0"></div>
  <div class="orderFilter">
    <span>订单状态</span>
    <div v-for="(filter, index) in orderFilter" :key="index" class="orderFilterGroup">
      <Checkbox class="filterItem" v-model="filterArr[index]"><span>{{filter}}</span></Checkbox>
    </div>
  </div>
  <div class="tableTitle">
    <p>订单号</p>
    <p>金额</p>
    <p>餐桌号</p>
    <p>当前状态</p>
    <p>形成时间</p>
    <p>等待时间</p>
    <p>备注</p>
    <p>操作</p>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      filterArr: [true, true, true, true]
    };
  },
  props: {
    filterIndex: {
      type: Number,
      required: true
    }
  },
  watch: {
    filterArr: function (val, oldVal) {
      let thisStateArr = [];
      if (this.filterIndex === 0 || this.filterIndex === 1 || this.filterIndex === 3) {
        if (this.filterArr[0] === true) {
          thisStateArr.push('paid');
        }
        if (this.filterArr[1] === true) {
          thisStateArr.push('accepted');
        }
      } else if (this.filterIndex === 2) {
        if (this.filterArr[0] === true) {
          thisStateArr.push('completed');
        }
        if (this.filterArr[1] === true) {
          thisStateArr.push('cancelled');
        }
      }
      if (this.filterIndex === 0 || this.filterIndex === 3) {
        if (this.filterArr[2] === true) {
          thisStateArr.push('completed');
        }
        if (this.filterArr[3] === true) {
          thisStateArr.push('cancelled');
        }
      }
      if (thisStateArr.length === 0) {
        this.$store.commit('UPDATE_FILTERS', []);
        this.$store.commit('UPDATE_ORDER_LIST', {
          number_of_pages: 1,
          order: []
        });
      } else {
        this.$store.dispatch('restaurantSelfOrder', {
          page: 0,
          stateArr: thisStateArr
        }).then((err) => {
          if (err) {
            this.errorMsg = err;
          } else {
            this.$emit('filter', val);
          }
        });
      }
    }
  },
  computed: {
    activeSubIndex () {
      return this.$store.state.subIndex;
    },
    orderFilter: {
      get: function () {
        if (this.filterIndex === 1) {
          return ['新订单', '进行中'];
        } else if (this.filterIndex === 2) {
          return ['已完成', '已取消'];
        } else {
          return ['新订单', '进行中', '已完成', '已取消'];
        }
      },
      set: function (test) {
        // console.log(test);
      }
    }
  },
  methods: {
    goto (index) {
      this.$store.commit('UPDATE_SUB_INDEX', index);
      if (index === 1) {
        this.$store.dispatch('restaurantSelfOrder', {
          page: 0,
          stateArr: ['paid', 'accepted']
        }).then((err) => {
          if (err) {
            this.errorMsg = err;
          } else {
            this.$router.push('/main/order/dealing');
          }
        });
      } else if (index === 2) {
        this.$store.dispatch('restaurantSelfOrder', {
          page: 0,
          stateArr: ['completed', 'cancelled']
        }).then((err) => {
          if (err) {
            this.errorMsg = err;
          } else {
            this.$router.push('/main/order/dealed');
          }
        });
      } else if (index === 3) {
        this.$store.dispatch('restaurantSelfOrder', {
          page: 0,
          stateArr: ['paid', 'accepted', 'completed', 'cancelled']
        }).then((err) => {
          if (err) {
            this.errorMsg = err;
          } else {
            this.$router.push('/main/order/all');
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.order {
  background: #ffffff;
  // height: 224px;
  box-shadow:0px 20px 32px -18px rgba(252, 193, 56, 0.7);
  border-radius:4px;

  .title {
    font-family:PingFangSC-Light;
    font-size:28px;
    letter-spacing:2.24px;
    display: flex;
    margin: 21px 0 5px 31px;
  }

  .subMenu {
    margin-top: 25px;
    display: flex;

    .subMenuItem {
      font-family:PingFangSC-Medium;
      font-size:13px;
      color:#9b9b9b;
      letter-spacing:1.34px;
      padding: 0 31px;
      cursor: default;
      display: flex;
      flex-direction: column;

      .activeLine {
        border:1px solid #ff8b18;
        margin-top: 13px;
      }
    }

    .subActive {
      color: #000000;
    }
  }

  .divLine {
    border-top:1px solid #e6e6e6;
    height:1px;
    margin: 0 20px;
  }

  .orderFilter {
    display: flex;
    margin: 18px 0 0 31px;
    font-family:PingFangSC-Regular;
    font-size:13px;

    .orderFilterGroup {
      display: inline-block;
      line-height: 1;

      .filterItem {
        span {
          font-size: 13px;
          padding-left: 5px;
        }
      }

      .filterItem:nth-child(1) {
        padding-left: 40px;
      }
      .filterItem:nth-child(2) {
        padding-left: 22px;
      }
    }
  }

  .tableTitle {
    display: flex;
    margin: 30px 40px 16px 31px;

    p {
      font-family:PingFangSC-Medium;
      font-size:13px;
      color:#9b9b9b;
      display: flex;
    }

    p:nth-child(1) {
      flex:3;
    }
    p:nth-child(2) {
      flex:3;
    }
    p:nth-child(3) {
      flex:2.5;
    }
    p:nth-child(4) {
      flex:3;
    }
    p:nth-child(5) {
      flex:5;
    }
    p:nth-child(6) {
      flex:3;
    }
    p:nth-child(7) {
      flex:5;
    }
    p:nth-child(8) {
      flex:4;
      justify-content: center;
    }
  }
}
</style>
