<template>
  <div class="mainContanier">
    <Menu />
    <div class="right">
      <TopLine class="top"/>
      <div class="content">
        <div class="part1">
          <div class="infoContent">
            <div class="subPart1">
              <div><img :src="logoUrl" alt="logo"></div>
              <div class="middle">
                <div class="resName">{{resName}}</div>
                <div class="infoLabel">地址<span>{{address}}</span></div>
                <div class="infoLabel">电话<span>{{phone}}</span></div>
              </div>
              <div class="taggle">
                <i-switch size="large" v-model="taggle">
                  <span slot="open">营业</span>
                  <span slot="close">休息</span>
                </i-switch>
              </div>
            </div>
            <div class="infoLine"></div>
            <div class="subPart2">
              <div class="brief">简介</div>
              <div class="description">{{description}}</div>
            </div>
            <div class="hint"><span @click="gotoEditInfo">编辑信息></span></div>
          </div>
          <div class="notice">
            <div class="noticeTitle">公告</div>
            <div class="noticeLine"></div>
            <div class="noticeItem">
              <span>7.21号起商家发票抬头统一</span>
              <span>12-22</span>
            </div>
            <div class="noticeLine"></div>
            <div class="noticeItem">
              <span>请各位商家自觉遵守平台任务措施</span>
              <span>12-22</span>
            </div>
            <div class="noticeLine"></div>
          </div>
        </div>
        <div class="part2">
          <div class="ordering">
            <div class="order">待处理订单</div>
            <div class="subLine"></div>
            <div class="group">
              <div class="item1">
                <div class="label">新订单</div>
                <div class="number">{{numNewOrder}}</div>
              </div>
              <div class="item2">
                <div class="label">进行中</div>
                <div class="number">{{numOrdering}}</div>
              </div>
            </div>
            <div class="hint"><span @click="gotoOrdering">去处理></span></div>
          </div>
          <div class="ordered">
            <div class="order">已结订单</div>
            <div class="subLine"></div>
            <div class="orderNum">{{numOrdered}}</div>
            <div class="hint"><span @click="gotoOrdered">详情></span></div>
          </div>
          <div class="orderall">
            <div class="order">今日订单总数</div>
            <div class="subLine"></div>
            <div class="orderNum">{{numAllOrder}}</div>
            <div class="hint"><span @click="gotoOrderall">详情></span></div>
          </div>
          <div class="hidden"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from './Menu';
import TopLine from './TopLine';
export default {
  name: 'Main',
  data () {
    return {
      isConfirm: this.$store.state.isConfirm,
      resName: this.$store.state.infoObj.name,
      address: this.$store.state.infoObj.address,
      phone: this.$store.state.infoObj.phone,
      description: this.$store.state.infoObj.description,
      logoUrl: this.$store.state.infoObj.logoUrl,
      taggle: true,
      numNewOrder: this.$store.state.countObj.numNewOrder,
      numOrdering: this.$store.state.countObj.numOrdering,
      numOrdered: this.$store.state.countObj.numOrdered,
      numAllOrder: this.$store.state.countObj.numAllOrder
    };
  },
  computed: {
  },
  methods: {
    gotoEditInfo: function () {
      this.$store.commit('UPDATE_INDEX', 4);
      this.$store.commit('SAVE_NEWDISH_IMG', this.$store.state.infoObj.logoUrl);
      this.$router.push('/main/info');
    },
    gotoOrdering: function () {
      this.$store.commit('UPDATE_INDEX', 1);
      this.$store.commit('UPDATE_SUB_INDEX', 1);
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
    },
    gotoOrdered: function () {
      this.$store.commit('UPDATE_INDEX', 1);
      this.$store.commit('UPDATE_SUB_INDEX', 2);
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
    },
    gotoOrderall: function () {
      this.$store.commit('UPDATE_INDEX', 1);
      this.$store.commit('UPDATE_SUB_INDEX', 3);
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
  },
  beforeMount () {
    this.$store.commit('UPDATE_INDEX', 0);
  },
  components: {
    Menu,
    TopLine
  }
};
</script>

<style lang="scss">
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
      flex: 10;
      background-color:#f6f6f6;
      flex-direction: column;
    }
  }
}

.part1 {
  display: flex;
  flex: 6;
  .infoContent {
    flex: 26.3;
    background: #ffffff;
    border-radius:4px;
    margin: 18px;
    margin-right: 0px;
  }

  .notice {
    flex: 12;
    background: #ffffff;
    border-radius:4px;
    margin: 18px;
  }
}

.part2 {
  flex: 4;
  display: flex;
  margin-bottom: 30px;
  .ordering {
    flex: 2;
    background: #ffffff;
    margin-left: 18px;
    display: flex;
    flex-direction: column;
  }

  .ordered {
    flex: 1;
    background: #ffffff;
    margin: 0px 18px;
    display: flex;
    flex-direction: column;
  }

  .orderall {
    flex: 1;
    background: #ffffff;
    margin-right: 18px;
    display: flex;
    flex-direction: column;
  }

  .hidden {
    flex: 2;
  }

  .order {
    font-family:PingFangSC-Medium;
    font-size:14px;
    color:#493f3a;
    letter-spacing:1px;
    text-align:left;
    margin: 16px;
  }

  .subLine {
    width: 92%;
    border-top:1px solid #e6e6e6;
    margin: auto;
    margin-top: 0;
    margin-bottom: 0;
  }

  .orderNum {
    flex: 1;
    font-family:PingFangTC-Semibold;
    font-size:70px;
    color:#929292;
    letter-spacing:1px;
    text-align:center;
    margin-top: 45px;
  }
}

.ordering {
  .group {
    flex: 1;
    display: flex;

    .item1 {
      border-right: 1px #979797 dashed;
      flex: 1;
      margin-top: 25px;

      .number {
        font-family:PingFangTC-Semibold;
        font-size:70px;
        color:#ff8b18;
        letter-spacing:1px;
        text-align:center;
      }
    }

    .item2 {
      flex: 1;
      margin-top: 25px;

      .number {
        font-family:PingFangTC-Semibold;
        font-size:70px;
        color:#3f3f3f;
        letter-spacing:1px;
        text-align:center;
      }
    }
  }

  .label {
    font-family:PingFangTC-Regular;
    font-size:14px;
    color:#9b9b9b;
    letter-spacing:1px;
    text-align:center;
    margin-bottom: 0;
  }
}

.notice {
  .noticeTitle {
    font-family:PingFangSC-Medium;
    font-size:14px;
    letter-spacing:1.12px;
    text-align: left;
    margin: 20px 15px 10px 15px;
  }

  .noticeLine {
    border-top:1px solid #e6e6e6;
    width: 92%;
    margin: auto;
  }

  .noticeItem {
    display: flex;
    justify-content: space-between;
    font-family:PingFangSC-Regular;
    margin: 8px 15px;
  }
}

.infoContent {
  display: flex;
  flex-direction: column;
  .subPart1 {
    display: flex;

    img {
      border-radius:4px;
      width:140px;
      height:140px;
      margin: 30px 30px 20px 30px;
    }

    .middle {
      flex: 3;
      text-align: left;
      margin: 30px 0px 20px 0px;

      .resName {
        font-family:PingFangSC-Semibold;
        font-size:25px;
      }

      .infoLabel {
        font-family:PingFangSC-Medium;
        font-size:18px;
        margin: 10px 0;

        span {
          font-family:PingFangSC-Regular;
          font-size:14px;
          padding: 18px;
        }
      }
    }

    .taggle {
      flex: 1;
      margin: 20px;
    }
  }

  .infoLine {
    width: 96%;
    border-top:1px solid #e6e6e6;
    margin: auto;
    margin-top: 0;
    margin-bottom: 0;
  }

  .subPart2 {
    text-align: left;
    flex: 1;
    padding: 20px 30px;

    .brief {
      font-family:PingFangSC-Medium;
      font-size:15px;
      letter-spacing:1.12px;
      margin-bottom: 5px;
    }

    .description {
      font-family:PingFangSC-Regular;
      font-size:14px;
    }
  }
}
.hint {
  text-align: right;
  font-family:PingFangTC-Regular;
  font-size:13px;
  color:#9b9b9b;
  margin: 28px;
  >span {
    cursor: pointer;
  }
}
</style>
