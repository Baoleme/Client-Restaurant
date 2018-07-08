<template>
  <div class="mainContanier">
    <Menu />
    <div class="right">
      <TopLine class="top"/>
      <div class="contentQR">
        <div class="subContent">
          <div class="box">
            <div class="QR">二维码生成</div>
            <input type="number" class="input" v-model="number" placeholder="输入需生成的桌子二维码数量">
            <Button id="btn" type="info" class="generBtn" @click="generate">{{taggleHint}}</Button>
          </div>
          <div class="qrBox">
            <div class="qrItem" v-for="(qrCode, index) in qrCodeList" :key="index">
              <div class="numDesk">{{index + 1}}号桌</div>
              <img :src="qrCode">
            </div>
          </div>
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
      number: '',
      taggleHint: '生成'
    };
  },
  computed: {
    qrCodeList () {
      return this.$store.state.QRList;
    }
  },
  methods: {
    generate: function () {
      if (this.taggleHint === '生成') {
        this.taggleHint = '重新生成';
        document.getElementById('btn').classList.add('reGenerBtn');
        document.getElementById('btn').classList.remove('generBtn');
      }
      if (Number(this.number) <= 0) {
        this.$Modal.warning({
          title: '生成二维码提示',
          content: '输入不合法!'
        });
      } else {
        let tableArr = [];
        for (let i = 0; i < Number(this.number); ++i) {
          tableArr.push(String(i));
        }
        this.$store.dispatch('addDeskQR', tableArr).then((err) => {
          if (err) {
            this.$Modal.warning({
              title: '生成二维码提示',
              content: '生成失败，未知错误!'
            });
          } else {
          }
        });
      }
    }
  },
  beforeMount () {
    this.$store.commit('UPDATE_INDEX', 3);
  },
  components: {
    Menu,
    TopLine
  }
};
</script>

<style lang="scss">
.mainContanier::-webkit-scrollbar {
  display: none;
}
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
  }
}

.contentQR {
  flex: 10;
  background-color:#f6f6f6;
  text-align: left;
  display: flex;
  flex-direction: column;

  .subContent {
    background: #ffffff;
    width: 96%;
    margin: auto;
    margin-top: 20px;
    flex: 1;
  }
}

.box {
  width: 258px;
  margin: auto;

  .QR {
    font-family:PingFangSC-Light;
    font-size:20px;
    color:#493f3a;
    letter-spacing:1.6px;
    text-align:center;
    margin: 40% 0 30px 0;
  }

  .input {
    border:1px solid #e6e6e6;
    font-family:PingFangSC-Regular;
    font-size:14px;
    width:258px;
    height:41px;
    border-radius:3px;
    padding: 10px;
    margin: 5px 0;
    outline: none;
  }

  .generBtn {
    font-family:PingFangSC-Regular;
    background:#fe8966;
    border-radius:4px;
    width:260px;
    height:43px;
    font-size:14px;
    color:#ffffff;
    letter-spacing:2px;
    border: none;
    margin-top: 25px;
  }
  .reGenerBtn {
    background:white;
    color: #fe8966;
    border: #fe8966 1px solid;
    border-radius:4px;
    width:260px;
    height:43px;
    font-size:14px;
    letter-spacing:2px;
    margin-top: 25px;
  }
}
.qrBox {
  display: flex;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  margin: 20px 0;

  .qrItem {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 18px 0;
    .numDesk {
      font-size: 14px;
    }
    img {
      width:168px;
      height:168px;
      margin: 15px;
    }
    .dlBtn {
      width: 35%;
    }
  }
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #dadada;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #dadada;
}

input:-ms-input-placeholder{
  color: #dadada;
}

input::-webkit-input-placeholder{
  color: #dadada;
}
</style>
