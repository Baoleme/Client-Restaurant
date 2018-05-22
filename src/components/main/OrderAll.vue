<template>
  <div class="mainContanier">
    <MyMenu />
    <div class="right">
      <TopLine class="top"/>
      <div class="content">
        <order-menu :filterList="3" class="orderMenu" @filter="filter"/>
        <div class="orderList">
          <div v-for="(order, index) in filterList" :key="index" class="orderItem" @click="showDetail(index)">
            <p><span :class="{cancel: order.curState === '已取消'}">{{order.number}}</span></p>
            <p><span :class="{cancel: order.curState === '已取消'}">¥{{order.totalPrice}}</span></p>
            <p><span :class="{cancel: order.curState === '已取消'}">{{order.table}}</span></p>
            <p :class="{newOrder: order.curState === '新订单', lastOrder: order.curState === '进行中'}">
              <span :class="{newIcon: order.curState === '新订单'}"></span>
              <span :class="{cancel: order.curState === '已取消'}">{{order.curState}}</span>
            </p>
            <p><span :class="{cancel: order.curState === '已取消'}">{{order.createTime}}</span></p>
            <p><span :class="{cancel: order.curState === '已取消'}">{{order.waitTime}}</span></p>
            <p><span class="note" :class="{null_: order.note === '无', cancel: order.curState === '已取消'}">{{order.note}}</span></p>
            <p v-show="order.curState === '新订单'">
              <Button type="info" class="newGroupBtn">接单</Button>
              <Button type="ghost" class="newGroupBtn ghost">拒绝</Button>
            </p>
            <p v-show="order.curState === '进行中'">
              <Button type="success" class="newGroupBtn">完成</Button>
              <Button type="ghost" class="newGroupBtn cancelGhost">取消</Button>
            </p>
            <p v-show="order.curState === '已完成' || order.curState === '已取消'">查看</p>
          </div>
        </div>
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
      orderList: [
        {
          number: '21937135281',
          totalPrice: '291.1',
          table: '23',
          curState: '新订单',
          createTime: '2017.2.5 09:30',
          waitTime: '20:23',
          note: '不要放葱姜蒜也不要放辣椒，多加陈醋，最好有，不要放葱姜蒜也不要放辣椒，多加陈醋，最好有，不要放葱姜蒜也不要放辣椒，多加陈醋，最好有'
        },
        {
          number: '21937135281',
          totalPrice: '291.1',
          table: '23',
          curState: '进行中',
          createTime: '2017.2.5 09:30',
          waitTime: '20:23',
          note: '无'
        },
        {
          number: '21937135281',
          totalPrice: '291.1',
          table: '23',
          curState: '进行中',
          createTime: '2017.2.5 09:30',
          waitTime: '20:23',
          note: '不要放葱姜蒜也不要放辣椒，多加陈醋，最好有'
        },
        {
          number: '21937135281',
          totalPrice: '291.1',
          table: '23',
          curState: '已完成',
          createTime: '2017.2.5 09:30',
          waitTime: '20:23',
          note: '不要放葱姜蒜也不要放辣椒，多加陈醋，最好有，不要放葱姜蒜也不要放辣椒，多加陈醋，最好有，不要放葱姜蒜也不要放辣椒，多加陈醋，最好有'
        },
        {
          number: '21937135281',
          totalPrice: '291.1',
          table: '23',
          curState: '已取消',
          createTime: '2017.2.5 09:30',
          waitTime: '20:23',
          note: '无'
        }
      ],
      filterList: []
    };
  },
  mounted: function () {
    this.filterList = this.orderList;
  },
  methods: {
    filter (filterArr) {
      let list1 = this.orderList.filter(order => (order.curState === '新订单'));
      let list2 = this.orderList.filter(order => (order.curState === '进行中'));
      let list3 = this.orderList.filter(order => (order.curState === '已完成'));
      let list4 = this.orderList.filter(order => (order.curState === '已取消'));
      this.filterList = [];
      if (filterArr[0] === true) {
        this.filterList = this.filterList.concat(list1);
      }
      if (filterArr[1] === true) {
        this.filterList = this.filterList.concat(list2);
      }
      if (filterArr[2] === true) {
        this.filterList = this.filterList.concat(list3);
      }
      if (filterArr[3] === true) {
        this.filterList = this.filterList.concat(list4);
      }
    },
    showDetail (index) {
      console.log(this.filterList[index]);
      this.$store.commit('UPDATE_CUR_ORDER', this.filterList[index]);
      document.getElementById('orderDetail').style.display = 'block';
    },
    closeDetail () {
      document.getElementById('orderDetail').style.display = 'none';
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
      background-color:#f6f6f6;;
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
            flex:4;
          }
          p:nth-child(6) {
            flex:4;
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
          p:nth-child(10) {
            flex:4;
            justify-content: center;
            cursor: default;
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

        .cancel {
          color:#9b9b9b;
        }
      }
    }
  }
}
</style>
