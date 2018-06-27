<template>
  <div class="mainContanier">
    <MyMenu class="menu"/>
    <div class="right">
      <TopLine class="top"/>
      <div class="content">
        <order-menu :filterIndex="1" class="orderMenu" @filter="filter"/>
        <div class="orderList">
          <div v-for="(order, index) in filterList" :key="index" class="orderItem" @click="showDetail(index)">
            <p>{{order.order_id}}</p>
            <p>¥{{order.price}}</p>
            <p>{{order.table}}</p>
            <p :class="{newOrder: order.curState === '新订单', lastOrder: order.curState === '进行中'}">
              <span :class="{newIcon: order.curState === '新订单'}"></span> {{order.curState}}
            </p>
            <p>{{order.createTime}}</p>
            <p>{{order.waitTime}}</p>
            <p><span class="note" :class="{null_: order.remark === '无'}">{{order.remark}}</span></p>
            <p v-show="order.curState === '新订单'">
              <Button type="info" class="newGroupBtn" @click.stop="dealTheOrder(order.order_id, 'accepted')">接单</Button>
              <Button type="ghost" class="newGroupBtn ghost" @click.stop="dealTheOrder(order.order_id, 'cancelled')">拒绝</Button>
            </p>
            <p v-show="order.curState === '进行中'">
              <Button type="success" class="newGroupBtn" @click.stop="dealTheOrder(order.order_id, 'completed')">完成</Button>
              <Button type="ghost" class="newGroupBtn cancelGhost" @click.stop="dealTheOrder(order.order_id, 'cancelled')">取消</Button>
            </p>
          </div>
        </div>
        <Page class="pages" :total="total" :current.sync="current" show-elevator size="small" @on-change="change"></Page>
        <OrderDetail id="orderDetail" @close="closeDetail"/>
      </div>
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
        // console.log('computed', this.$store.state.orderList);
        return this.$store.state.orderList;
      },
      set: function () {
        // console.log(test);
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
    },
    closeDetail (sign) {
      console.log(sign);
      document.getElementById('orderDetail').style.display = 'none';
      if (sign === 1) {
        this.$store.dispatch('restaurantSelfOrder', {
          page: this.current - 1,
          stateArr: this.$store.state.filters
        }).then((err) => {
          if (err) {
            this.errorMsg = err;
          } else {
          }
        });
      }
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
    },
    dealTheOrder: function (orderId, newState) {
      this.$store.dispatch('dealOrder', {
        id: orderId,
        state: newState
      }).then((err) => {
        if (err) {
          this.errorMsg = err;
        } else {
          console.log('deal succeed!');
          this.$store.dispatch('restaurantSelfOrder', {
            page: this.current - 1,
            stateArr: this.$store.state.filters
          }).then((err) => {
            if (err) {
              this.errorMsg = err;
            } else {
            }
          });
        }
      });
    }
  },
  beforeMount () {
    this.$store.commit('UPDATE_INDEX', 1);
    this.$store.commit('UPDATE_SUB_INDEX', 1);

    var self = this.$store;
    var that = this;
    this.intervalid = setInterval(function () {
      self.dispatch('restaurantSelfOrder', {
        page: that.current - 1,
        stateArr: self.state.filters
      });
    }, 1000);
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
      background-color:#f6f6f6;;
      padding: 22px 22px 0 22px;
      position: relative;
      top: 79px;
      left: 163px;
      width: 89%;

      .orderMenu {
        z-index: 10;
      }

      .orderList {
        background: #ffffff;

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
          }
          p:nth-child(9) {
            flex:4;
            justify-content: center;
          }

          .newOrder {
            color:#ff8b18;
          }

          .lastOrder {
            color:#67c6ff;
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

          .newGroupBtn {
            width:55px;
            height:26px;
            line-height: 1;
            z-index: 20;
          }

          .ghost {
            font-family:PingFangSC-Regular;
            color:#493f3a;
            margin-left: 20px;
          }

          .cancelGhost {
            font-family:PingFangSC-Regular;
            border:1px solid #67c6ff;
            border-radius:3px;
            color:#493f3a;
            margin-left: 20px;
          }

          .newIcon {
            background:#ff8b18;
            border:1px solid #fdc543;
            width:8px;
            height:8px;
            border-radius:100%;
            margin-right: 2px;
          }
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
#orderDetail {
  overflow: scroll;
}
</style>
