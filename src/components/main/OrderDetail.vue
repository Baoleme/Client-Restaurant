<template>
  <div class="shadow">
    <div class="detailModal">
      <div class="titleLine">
        <div class="modalTitle">订单详情</div>
        <Icon type="ios-close-empty" size="45" class="closeIcon" @click.native="close"></Icon>
      </div>
      <div class="modalLine"></div>
      <div class="modalContent">
        <div class="line1">
          <div class="orderNo border">
            <span class="smallTitle">订单号</span>
            <div class="copy">
              <input id="number" readonly v-model="orderBoject.order_id"></input>
              <Button type="ghost" class="copyBtn" @click="copy()">复制</Button>
            </div>
          </div>
          <div class="orderState">
            <div class="orderStateLeft">
              <span class="leftName">状态</span>
              <span :class="{newIcon: orderBoject.curState === '新订单'}"></span>
              <span :class="{newOrder: orderBoject.curState==='新订单', ordering: orderBoject.curState==='进行中', ordered: orderBoject.curState==='已完成', cancelOrder: orderBoject.curState==='已取消'}">{{orderBoject.curState}}</span>
            </div>
            <p class="orderStateRight" v-show="orderBoject.curState === '新订单'">
              <Button type="info" class="newGroupBtn" @click.stop="dealTheOrder(orderBoject.order_id, 'accepted')">接单</Button>
              <Button type="ghost" class="newGroupBtn ghost" @click.stop="dealTheOrder(orderBoject.order_id, 'cancelled')">拒绝</Button>
            </p>
            <p class="orderStateRight" v-show="orderBoject.curState === '进行中'">
              <Button type="success" class="newGroupBtn" @click.stop="dealTheOrder(orderBoject.order_id, 'completed')">完成</Button>
              <Button type="ghost" class="newGroupBtn cancelGhost" @click.stop="dealTheOrder(orderBoject.order_id, 'cancelled')">取消</Button>
            </p>
          </div>
        </div>
        <div class="line2">
          <div class="line2Left border"><span>餐桌号</span><span>{{orderBoject.table}}</span></div>
          <div class="line2Right border"><span>金额</span><span class="price">¥{{orderBoject.price}}</span></div>
        </div>
        <div class="line4">菜品</div>
        <!-- <div class="line6"></div> -->
        <div class="line6">
          <div class="line5TitleLine line6line">
            <p>名称</p>
            <p>规格</p>
            <p>数量</p>
            <p>价格</p>
          </div>
          <div class="line5Subline"></div>
          <div class="line6Content line6line" v-for="(item, index) in orderBoject.dish" :key="index">
            <p>{{item.name}}</p>
            <p>{{item.specification}}</p>
            <p>{{item.count}}</p>
            <p>¥{{item.price}}</p>
          </div>
        </div>
        <div class="line3">
          <div class="line3Note">备注</div>
          <div class="line3Subline"></div>
          <div class="line3Content">{{orderBoject.remark}}</div>
        </div>
        <div class="line4">订单历史</div>
        <div class="line5">
          <div class="line5TitleLine line5line">
            <p>状态</p>
            <p>形成时间</p>
          </div>
          <div class="line5Subline"></div>
          <div class="line5Content line5line" v-for="(item, index) in orderBoject.state_record" :key="index">
            <p>{{item.state}}</p>
            <p>{{item.time}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      temp: [
        {
          state: '卖家接单',
          createTime: '2017.2.5 09:30'
        },
        {
          state: '客户下单',
          createTime: '2017.2.5 8:30'
        },
        {
          state: '客户下单',
          createTime: '2017.2.5 8:30'
        },
        {
          state: '客户下单',
          createTime: '2017.2.5 8:30'
        },
        {
          state: '客户下单',
          createTime: '2017.2.5 8:30'
        }
      ]
    };
  },
  computed: {
    orderBoject () {
      return this.$store.state.curOrder;
    }
  },
  methods: {
    close () {
      this.$emit('close', 0);
    },
    copy () {
      var number = document.getElementById('number');
      console.log(number);
      number.select();
      document.execCommand('Copy', 'false', null);
    },
    dealTheOrder: function (orderId, newState) {
      this.$store.dispatch('dealOrder', {
        id: orderId,
        state: newState
      }).then((err) => {
        if (err) {
          this.errorMsg = err;
        } else {
          this.$emit('close', 1);
        }
      });
    }
  }
};
</script>
<style lang="scss">
.shadow {
  background: rgba(0, 0, 0, 0.55);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
  display: none;

  .detailModal {
    background:#ffffff;
    border-radius:4px;
    width:740px;
    // height:622px;
    margin: auto;
    margin-top: 46px;
    padding-top: 15px;

    .titleLine {
      display: flex;
      justify-content: space-between;

      .modalTitle {
        font-family:PingFangSC-Light;
        font-size:28px;
        color:#6e6e6e;
        letter-spacing:2.24px;
        text-align: left;
        margin: 0 0 15px 33px;
      }
      .closeIcon{
        margin-right: 40px;
        cursor: pointer;
      }
    }

    .modalLine {
      border-top:1px solid #e6e6e6;
      width:100%;
      height:0px;
    }

    .modalContent {
      .border {
        border:1px solid #e6e6e6;
        border-radius:3px;
        width:323px;
        height:48px;
        display: flex;
        justify-content: space-between;
      }
      .line1 {
        display: flex;
        justify-content: space-between;
        margin: 18px 33px 10px 33px;

        .orderNo {
          font-family:PingFangSC-Medium;
          font-size:14px;
          color:#493f3a;
          letter-spacing:1.12px;

          .smallTitle {
            display: inline-block;
            margin: 13px 14px;
          }

          .copy {
            display: flex;

            .copyBtn {
              border-radius:3px;
              width:61px;
              height:24px;
              line-height: 1;
              margin: 11px 14px;
            }

            > input {
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#493f3a;
              letter-spacing:0.5px;
              border: none;
              width: 104px;
              text-align: right;
            }
          }
        }

        .orderState {
          display: flex;
          justify-content: space-between;
          width:323px;
          height:48px;

          .orderStateLeft {
            display: flex;
            font-family:PingFangSC-Medium;
            font-size:14px;
            color:#493f3a;
            margin: 13px 10px;

            .leftName {
              margin-right: 20px;
            }

            .newIcon {
              background:#ff8b18;
              border:1px solid #fdc543;
              width:8px;
              height:8px;
              border-radius:100%;
              display: inline-block;
              margin: 6px 3px 0 0px;
            }

            .newOrder {
              color:#ff8b18;
            }

            .ordered {
              color:#493f3a;
            }

            .ordering {
              color:#67c6ff;
            }

            .cancelOrder {
              color:#9b9b9b;
            }
          }

          .orderStateRight {
            display: flex;
            margin: 11px 0px;

            .newGroupBtn {
              margin-left: 10px;
              font-family:PingFangSC-Regular;
            }

            .ghost {
              color:#493f3a;
            }

            .cancelGhost {
              border:1px solid #67c6ff;
              border-radius:3px;
              color:#493f3a;
            }
          }
        }
      }

      .newGroupBtn {
        width:55px;
        height:26px;
        line-height: 1;
      }

      .line2 {
        display: flex;
        font-family:PingFangSC-Medium;
        font-size:14px;
        color:#493f3a;
        letter-spacing:1.12px;
        display: flex;
        justify-content: space-between;
        margin: 10px 33px;

        .line2Left {
          padding: 14px;
        }

        .line2Right {
          padding: 14px;

          .price {
            font-family:PingFangSC-Regular;
            color:#493f3a;
          }
        }
      }

      .line3 {
        background:#ffffff;
        border:1px solid #e6e6e6;
        border-radius:3px;
        width:673px;
        height:121px;
        margin: 10px 33px;
        text-align:left;

        .line3Note {
          font-family:PingFangSC-Medium;
          font-size:14px;
          color:#493f3a;
          letter-spacing:1.12px;
          margin: 12px 11px;
        }

        .line3Subline {
          border-top:1px solid #e6e6e6;
          width:630px;
          height:0px;
          margin: auto;
        }

        .line3Content {
          font-family:PingFangSC-Regular;
          font-size:12px;
          color:#9a9592;
          margin: 12px 15px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }

      .line4 {
        font-family:PingFangSC-Light;
        font-size:20px;
        color:#6e6e6e;
        letter-spacing:2.24px;
        text-align:left;
        margin: 10px 33px;
      }

      .line5 {
        background:#ffffff;
        border:1px solid #e6e6e6;
        border-radius:3px;
        width:673px;
        height:193px;
        margin: 10px 33px;

        .line5line {
          display: flex;
          // justify-content: space-between;
          text-align: left;
          font-family:PingFangSC-Medium;
          font-size:12px;
          letter-spacing:0.96px;

          p:nth-child(1) {
            flex: 10;
          }
          p:nth-child(2) {
            flex: 10;
          }
        }

        .line5Content {
          font-family:PingFangSC-Regular;
          color:#493f3a;
          height: 29px;
          padding: 6px 0 5px 33px;
        }

        .line5Content:nth-child(2n+1) {
          background:#fffbed;
        }
      }

      .line5TitleLine {
        color:#9b9b9b;
        font-family:PingFangSC-Medium;
        padding: 13px 0 5px 33px;
      }

      .line5Subline {
        border-top:1px solid #e6e6e6;
        width:100%;
        height:0px;
      }

      .line6 {
        background:#ffffff;
        border:1px solid #e6e6e6;
        border-radius:3px;
        width:673px;
        margin: 10px 33px 15px 33px;

        .line6line {
          display: flex;
          text-align: left;
          font-family:PingFangSC-Medium;
          font-size:12px;
          letter-spacing:0.96px;

          p:nth-child(1) {
            flex: 1;
          }
          p:nth-child(2) {
            flex: 1;
          }
          p:nth-child(3) {
            flex: 1;
          }
          p:nth-child(4) {
            flex: 1;
          }
        }

        .line6Content {
          font-family:PingFangSC-Regular;
          color:#493f3a;
          padding: 6px 0 5px 33px;
        }

        .line6Content:nth-child(2n+1) {
          background:#fffbed;
        }
      }
    }
  }
}
</style>
