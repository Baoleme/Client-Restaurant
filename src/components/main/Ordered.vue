<template>
  <div class="mainContanier">
    <MyMenu />
    <div class="right">
      <TopLine class="top"/>
      <div class="content">
        <order-menu :filterIndex="2" class="orderMenu" @filter="filter"/>
        <div class="orderList">
          <div v-for="(order, index) in filterList" :key="index" class="orderItem" @click="showDetail(index)">
            <p><span :class="{cancel: order.state === '已取消'}">{{order.order_id}}</span></p>
            <p><span :class="{cancel: order.state === '已取消'}">¥{{order.price}}</span></p>
            <p><span :class="{cancel: order.state === '已取消'}">{{order.table}}</span></p>
            <p><span :class="{cancel: order.state === '已取消'}">{{order.state}}</span></p>
            <p><span :class="{cancel: order.state === '已取消'}">{{order.time}}</span></p>
            <p><span :class="{cancel: order.state === '已取消'}">{{order.waitTime}}</span></p>
            <p><span class="note" :class="{null_: order.remark === '无', cancel: order.state === '已取消'}">{{order.remark}}</span></p>
            <p>查看</p>
          </div>
        </div>
        <Page class="pages" :total="pagesNum" :current.sync="current" show-elevator size="small" @on-change="change"></Page>
        <OrderDetail id="orderDetail" @close="closeDetail"/>
      </div>
    </div>
  </div>
</template>

<script>
import MyMenu from './Menu';
import TopLine from './TopLine';
import OrderMenu from './OrderMenu';
import OrderDetail from './OrderDetail';
export default {
  data () {
    return {
      // pagesNum: 0,
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
    }
  },
  methods: {
    filter (filterArr) {
      this.current = 1;
    },
    showDetail (index) {
      console.log(this.filterList[index]);
      this.$store.commit('UPDATE_CUR_ORDER', this.filterList[index]);
      document.getElementById('orderDetail').style.display = 'block';
    },
    closeDetail () {
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
  components: {
    MyMenu,
    TopLine,
    OrderMenu,
    OrderDetail
  }
};
</script>

<style lang="scss" scoped>
.mainContanier {
  display: flex;
  min-height: 100vh;

  .right {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    width: 100%;

    .top {
      width: 100%;
    }

    .content {
      display: flex;
      flex-direction: column;
      flex: 10;
      background-color:#f6f6f6;
      padding: 22px 22px 0 22px;
      position: relative;

      .orderMenu {
        z-index: 10;
      }

      .orderList {
        background: #ffffff;
        flex: 1;

        .orderItem {
          display: flex;
          height:45px;
          padding: 0px 40px 0 31px;

          p {
            font-family:PingFangSC-Medium;
            font-size:13px;
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
        padding-bottom: 20px;
        text-align: center;
      }
    }
  }
}
</style>
