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
            <Button type="info" class="generBtn" @click="generate">生成</Button>
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
      number: ''
    };
  },
  methods: {
    generate: function () {
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
            this.$store.dispatch('getDeskQR').then((err) => {
              if (err) {
                this.$Modal.warning({
                  title: '生成二维码提示',
                  content: '生成成功但获取失败，未知错误!'
                });
              } else {
              }
            });
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
