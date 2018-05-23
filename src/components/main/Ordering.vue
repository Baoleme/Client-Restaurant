<template>
  <div class="mainContanier">
    <MyMenu />
    <div class="right">
      <TopLine class="top"/>
      <div class="content">
        <order-menu :filterList="1" class="orderMenu" @filter="filter"/>
        <div class="orderList">
          <div v-for="(order, index) in subFilterList" :key="index" class="orderItem" @click="showDetail(index)">
            <p>{{order.order_id}}</p>
            <p>¥{{order.price}}</p>
            <p>{{order.table}}</p>
            <p :class="{newOrder: order.state === '新订单', lastOrder: order.state === '进行中'}">
              <span :class="{newIcon: order.state === '新订单'}"></span> {{order.state}}
            </p>
            <p>{{order.time}}</p>
            <p>{{order.waitTime}}</p>
            <p><span class="note" :class="{null_: order.remark === '无'}">{{order.remark}}</span></p>
            <p v-show="order.state === '新订单'">
              <Button type="info" class="newGroupBtn" @click="takeOrder">接单</Button>
              <Button type="ghost" class="newGroupBtn ghost" @click="cancelOrder">拒绝</Button>
            </p>
            <p v-show="order.state === '进行中'">
              <Button type="success" class="newGroupBtn" @click="finishOrder">完成</Button>
              <Button type="ghost" class="newGroupBtn cancelGhost" @click="cancelOrder">取消</Button>
            </p>
          </div>
        </div>
        <Page class="pages" :total="pagesNum" :current.sync="current" show-elevator size="small" @on-change="change"></Page>
        <OrderDetail id="orderDetail" @close="closeDetail"/>
        <!-- <div>{{orderList}}</div> -->
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
      testList: [
        {
          dish: [
            {
              count: 1,
              image_url: 'https://fuss10.elemecdn.com/2/fc/b6f71e07382631587c74f21e6182cjpeg.jpeg',
              name: '销魂辣子鸡块',
              price: 10,
              specifications: ''
            },
            {
              count: 1,
              image_url: 'https://fuss10.elemecdn.com/d/5f/71e61c66b46517d252c4d02a17059jpeg.jpeg',
              name: '无骨鸡柳',
              price: 7,
              specifications: ''
            }
          ],
          order_id: 27,
          payment: null,
          price: 17,
          remark: null,
          state: 'created',
          table: '44',
          time: '2018-05-17T04:22:50.000Z'
        }
      ],
      pagesNum: 0,
      current: 1,
      filterList: [],
      subFilterList: []
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
    }
  },
  // mounted: function () {
  //   this.orderList = this.orderList.concat(this.orderList);
  //   this.orderList = this.orderList.concat(this.orderList);
  //   this.orderList = this.orderList.concat(this.orderList);
  //   console.log('mounted', this.orderList);
  //   this.filterList = this.orderList;
  //   this.pagesNum = this.filterList.length;
  //   this.subFilterList = this.filterList.slice(0, 10);
  // },
  watch: {
    orderList: function (newList, oldList) {
      console.log('I watch!');
      console.log(newList);
      this.filterList = newList;
      this.subFilterList = this.filterList;
      // for (let i = 0, len = this.subFilterList.length; i < len; i++) {
      //   console.log(this.subFilterList[i]);
      //   if (this.subFilterList[i].state === 'created') {
      //     this.subFilterList[i].state = '新订单';
      //   }
      //   if (!this.subFilterList[i].remark) {
      //     this.subFilterList[i].remark = '无';
      //   }
      // }
    }
  },
  methods: {
    filter (filterArr) {
      // console.log('father', filterArr);
      let list1 = this.orderList.filter(order => (order.curState === '新订单'));
      let list2 = this.orderList.filter(order => (order.curState === '进行中'));
      this.filterList = [];
      if (filterArr[0] === true) {
        this.filterList = this.filterList.concat(list1);
      }
      if (filterArr[1] === true) {
        this.filterList = this.filterList.concat(list2);
      }
      this.pagesNum = this.filterList.length;
      this.current = 1;
      this.subFilterList = this.filterList.slice(0, 10);
    },
    showDetail (index) {
      console.log(this.subFilterList[index]);
      this.$store.commit('UPDATE_CUR_ORDER', this.subFilterList[index]);
      document.getElementById('orderDetail').style.display = 'block';
    },
    closeDetail () {
      document.getElementById('orderDetail').style.display = 'none';
    },
    change: function (page) {
      this.subFilterList = this.filterList.slice((page - 1) * 10, page * 10);
    },
    takeOrder: function () {
    },
    finishOrder: function () {
    },
    cancelOrder: function () {
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
        padding-bottom: 20px;
      }
    }
  }
}
</style>
