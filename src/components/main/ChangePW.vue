<template>
  <div class="mainContanier">
    <Menu />
    <div class="right">
      <TopLine class="top"/>
      <div class="contentPW">
        <div class="subTitle">商户信息>更改密码</div>
        <div class="subContent">
          <div class="box">
            <div class="changePW">更改密码</div>
            <div class="username">用户名</div>
            <input type="text" disabled="disabled" class="input disabled" v-model="username">
            <input type="password" placeholder="6位字符以上密码" class="input pwInput" v-model="password">
            <Button type="info" class="confirmBtn" @click="confirmEdit">确认更改</Button>
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
      username: this.$store.state.infoObj.email,
      password: ''
    };
  },
  methods: {
    confirmEdit: function () {
      if (this.password.length < 6) {
        this.$Modal.warning({
          title: '修改商家信息提示',
          content: '密码长度不符合要求!'
        });
      } else {
        this.$store.dispatch('modifyInfo', {
          password: this.password
        }).then((err) => {
          if (err) {
            this.$Modal.warning({
              title: '修改商家信息提示',
              content: '修改失败，未知错误!'
            });
          } else {
            this.$Modal.success({
              title: '修改商家信息提示',
              content: '修改成功!',
              onOk: () => {
                this.$store.dispatch('getRestInfo').then((err) => {
                  if (err) {
                    this.errorMsg = err;
                  } else {
                    this.$store.commit('UPDATE_INDEX', 0);
                    this.$router.push('/main');
                  }
                });
              }
            });
          }
        });
      }
    }
  },
  beforeMount () {
    this.$store.commit('UPDATE_INDEX', 4);
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

.contentPW {
  flex: 10;
  background-color:#f6f6f6;
  text-align: left;
  display: flex;
  flex-direction: column;

  .subTitle {
    margin: 10px 10px 10px 25px;
    opacity:0.55;
    font-family:PingFangSC-Light;
    font-size:14px;
    color:#3f3f3f;
    letter-spacing:1.92px;
  }

  .subContent {
    background: #ffffff;
    width: 96%;
    margin: auto;
    // height: 100%;
    flex: 1;
  }
}

.box {
  width: 258px;
  margin: auto;

  .changePW {
    font-family:PingFangSC-Light;
    font-size:20px;
    color:#493f3a;
    letter-spacing:1.6px;
    text-align:center;
    margin: 40% 0 30px 0;
  }

  .username {
    font-family:PingFangSC-Medium;
    font-size:14px;
    color:#6e6e6e;
    letter-spacing:2.24px;
    text-align:left;
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
  }

  .pwInput {
    outline: none;
  }

  .disabled {
    background:#f6f6f6;
    color:#493f3a;
  }

  .confirmBtn {
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
