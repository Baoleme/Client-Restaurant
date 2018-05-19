<template>
<div class="order">
  <div class="title">订单</div>
  <div class="subMenu">
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
  <div class="divLine"></div>
  <div class="orderFilter">
    <span>订单状态</span>
    <CheckboxGroup v-model="orderFilter" class="orderFilterGroup" v-for="(filter, index) in orderFilter" :key="index">
      <Checkbox class="filterItem" :label="filter"><span>{{filter}}</span></Checkbox>
    </CheckboxGroup>
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
    };
  },
  props: {
    filterList: {
      type: Number,
      required: true
    }
  },
  computed: {
    activeSubIndex () {
      return this.$store.state.subIndex;
    },
    orderFilter () {
      if (this.filterList === 1) {
        return ['新订单', '进行中'];
      } else if (this.filterList === 2) {
        return ['已完成', '已取消'];
      } else if (this.filterList === 3) {
        return ['新订单', '进行中', '已完成', '已取消'];
      }
    }
  },
  methods: {
    goto (index) {
      console.log('goto:', index);
      this.$store.commit('UPDATE_SUB_INDEX', index);
      if (index === 1) {
        this.$router.push('/main/order/dealing');
      } else if (index === 2) {
        this.$router.push('/main/order/dealed');
      } else if (index === 3) {
        this.$router.push('/main/order/all');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.order {
  background: #ffffff;
  flex: 1;
  height: 230px;
  box-shadow:0px 13px 32px -18px rgba(252, 193, 56, 0.7);
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
    margin: 30px 40px 0 31px;

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
  }
}
</style>
