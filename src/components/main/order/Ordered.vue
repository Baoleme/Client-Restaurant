<template>
  <div class="mainContanier">
    <MyMenu />
    <div class="right">
      <TopLine class="top"/>
      <div class="content">
        <order-menu :filterIndex="2" class="orderMenu" @filter="filter"/>
        <div class="orderList">
          <div v-for="(order, index) in filterList" :key="index" class="orderItem" @click="showDetail(index)">
            <p><span :class="{cancel: order.curState === '已取消'}">{{order.order_id}}</span></p>
            <p><span :class="{cancel: order.curState === '已取消'}">¥{{order.price}}</span></p>
            <p><span :class="{cancel: order.curState === '已取消'}">{{order.table}}</span></p>
            <p><span :class="{cancel: order.curState === '已取消'}">{{order.curState}}</span></p>
            <p><span :class="{cancel: order.curState === '已取消'}">{{order.createTime}}</span></p>
            <p><span :class="{cancel: order.curState === '已取消'}">{{order.waitTime}}</span></p>
            <p><span class="note" :class="{null_: order.remark === '无', cancel: order.state === '已取消'}">{{order.remark}}</span></p>
            <p>查看</p>
          </div>
        </div>
        <Page class="pages" :total="total" :current.sync="current" show-elevator size="small" @on-change="change"></Page>
        <OrderDetail id="orderDetail" @close="closeDetail"/>
      </div>
      <div id="mask"></div>
    </div>
  </div>
</template>

<script>
import MyMenu from './../Menu';
import TopLine from './../TopLine';
import OrderMenu from './OrderMenu';
import OrderDetail from './OrderDetail';
export default {
  data () {
    return {
      // pagesNum: 0,
      total: this.$store.state.numberOfPages * 10,
      current: 1,
      filterList: []
    };
  },
  computed: {
    orderList: {
      get: function () {
        return this.$store.state.orderList;
      },
      set: function () {
      }
    },
    pagesNum: {
      get: function () {
        return this.$store.state.numberOfPages;
      },
      set: function () {
      }
    }
  },
  watch: {
    orderList: function (newList, oldList) {
      this.filterList = newList;
    },
    pagesNum: function (newValue, oldValue) {
      this.total = newValue * 10;
    }
  },
  methods: {
    filter (filterArr) {
      this.current = 1;
    },
    showDetail (index) {
      // console.log(this.filterList[index]);
      this.$store.commit('UPDATE_CUR_ORDER', this.filterList[index]);
      document.getElementById('orderDetail').style.display = 'block';
      document.getElementById('mask').style.opacity = 1;
      document.getElementById('mask').style.zIndex = 20;
    },
    closeDetail () {
      document.getElementById('mask').style.opacity = 0;
      document.getElementById('mask').style.zIndex = -1;
      document.getElementById('orderDetail').style.display = 'none';
    },
    change: function (newPage) {
      this.$store.dispatch('restaurantSelfOrder', {
        page: newPage - 1,
        stateArr: this.$store.state.filters
      }).then((err) => {
        if (err) {
          this.errorMsg = err;
        } else {
        }
      });
    }
  },
  beforeMount () {
    this.$store.commit('UPDATE_INDEX', 1);
    this.$store.commit('UPDATE_SUB_INDEX', 2);

    this.$store.dispatch('restaurantSelfOrder', {
      page: this.current - 1,
      stateArr: this.$store.state.filters
    });
  },
  beforeDestroy () {
    clearInterval(this.intervalid);
  },
  components: {
    MyMenu,
    TopLine,
    OrderMenu,
    OrderDetail
  }
};
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  z-index: 99999;
}
.mainContanier {
  display: flex;
  min-height: 100vh;

  .right {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    width: 100%;
    overflow: hidden;

    .top {
      position: fixed;
      right: 0;
      z-index: 9999;
      padding-left: 168px;
    }

    .content {
      display: flex;
      flex-direction: column;
      flex: 10;
      background-color:#f6f6f6;
      padding: 22px 22px 0 22px;
      // position: relative;
      margin-top: 79px;
      margin-left: 163px;
      width: 89%;

      .orderMenu {
        z-index: 10;
      }

      .orderList {
        background: #ffffff;
        flex: 1;

        .orderItem {
          display: flex;
          height:38px;
          padding: 0px 40px 0 31px;

          p {
            font-family:PingFangSC-Medium;
            font-size:12px;
            display: flex;
            align-items: center;
            color:#493f3a;
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
            cursor: default;
          }

          .note {
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            width: 14vw;
            text-align: left;
          }

          .null_ {
            color:#9b9b9b;
            font-family:PingFangSC-Regular;
          }
        }

        .cancel {
          color:#9b9b9b;
        }

        .orderItem:nth-child(2n+1) {
          background:#fff8e3;
        }
      }

      .pages {
        background: #ffffff;
        padding: 10px 0 13px 0;
        text-align: center;
      }
    }
  }
}
#mask {
  background: rgba(0, 0, 0, 0.55);
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: -1;
  opacity: 0;
}
#orderDetail::-webkit-scrollbar {
  display: none;
}
#orderDetail {
  overflow-y: auto;
  overflow-x: auto;
}
</style>
