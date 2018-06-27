<template>
  <div class="loginBoxContainer">
    <div id="imgline">
      <!-- <img id="logo" src="@/assets/images/logo.png" alt="logo"> -->
      <img id="logo" src="@/assets/images/baoleme_logo_cat.svg" alt="logo">
    </div>
    <div id="appName">
      <div id="formal">饱了么</div>
      <div id="deputy">商家端</div>
    </div>
    <div>
      <Input class="input" v-model="username" placeholder="用户名"
        clearable autofocus size="large" v-on:on-change="clearErrMsg" />
    </div>
    <div>
      <Input class="input" v-model="password" placeholder="密码"
        clearable type="password" size="large" v-on:on-change="clearErrMsg" />
    </div>
    <div id="errorHintLine" v-show="errorMsg">
      <Icon type="close-circled" color="#FE8966" size="14" />
      <span>{{errorMsg}}</span>
    </div>
    <div id="line1">
      <div id="autoLogin">
          <Checkbox v-model="autoLogin"><span id="autoLoginHint">7天内自动登录</span></Checkbox>
      </div>
      <a id="forgetPW" href="www.baidu.com">忘记密码?</a>
    </div>
    <div>
      <button @click="login" id="loginBtn">登录</button>
    </div>
    <div id="line2">
      <span id="hint">还没有账户？</span>
      <span @click="register" id="registerBtn">立即注册</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginBox',
  data () {
    return {
      username: '8016@zyuco.com',
      password: '',
      autoLogin: false,
      errorMsg: '',
      userInCookie: false
    };
  },
  methods: {
    login () {
      if (!this.username) {
        this.errorMsg = '用户名不为空';
      } else if (!this.password) {
        this.errorMsg = '密码不为空';
      } else {
        this.$store.dispatch('loginAction', {
          username: this.username,
          password: this.password
        }).then((err) => {
          if (err) {
            this.errorMsg = err;
          } else {
            if (this.autoLogin === true && !this.userInCookie) {
              this.setCookie(this.username, this.password, 7);
            } else if (this.autoLogin === false) {
              this.clearCookie();
            }
            this.$store.dispatch('getRestInfo').then((err) => {
              if (err) {
                this.errorMsg = err;
              } else {
                this.$store.dispatch('getOrderCounts').then((err) => {
                  if (err) {
                    this.errorMsg = err;
                  } else {
                    this.$router.replace('/main');
                  }
                });
              }
            });
            this.$store.dispatch('getDish');
          }
        });
      }
    },
    setCookie (username, password, days) {
      let date = new Date();
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days);
      window.document.cookie = 'username=' + username + ';path=/;expires=' + date.toGMTString();
      window.document.cookie = 'password=' + password + ';path=/;expires=' + date.toGMTString();
    },
    getCookie () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=');
          if (arr2[0] === 'userName') {
            this.username = arr2[1];
          } else if (arr2[0] === 'password') {
            this.password = arr2[1];
          }
        }
      }
    },
    clearCookie () {
      this.setCookie('', '', -1);
    },
    register () {
      this.$router.push('/register');
    },
    clearErrMsg () {
      if (this.errorMsg !== '') {
        this.errorMsg = '';
        console.log(this.errorMsg);
      }
    }
  },
  mounted () {
    this.getCookie();
    if (this.username && this.password) {
      this.userInCookie = true;
      this.autoLogin = true;
      this.login();
      console.log('mounted', 'getCookie ture');
    } else {
      this.userInCookie = false;
      this.autoLogin = false;
      console.log('mounted', 'getCookie false');
    }
  }
};
</script>

<style lang="scss">
.loginBoxContainer {
  #logo {
    width: 36%;
    margin: 26px;
  }
  #appName {
    #formal {
      font-size: 34px;
      letter-spacing: 12px;
      font-weight: bold;
    }
    #deputy {
      padding-left: 48px;
      font-size: 18px;
      letter-spacing: 8px;
      margin-bottom: 30px;
    }
  }

  .input {
    width: 100%;
    margin-bottom: 8px;
    /*box-shadow:X-Offset T-Offset Blur Blur-Offset Color*/
    box-shadow: 0px 5px 25px -9px rgb(248, 155, 6);
    font-size: 15px;
  }

  #errorHintLine {
    display: flex;
    margin: 5px 0 10px 2px;
    color: #fd6e6a;

    span {
      line-height: 1;
      padding-left: 6px;
      letter-spacing: 1px;
      font-size: 14px;
    }
  }

  #line1 {
    display: flex;
    justify-content: space-between;

    #autoLogin {
      margin-top: 7px;
      display: inline-block;

      #autoLoginHint {
        color: #929292;
        font-size: 14px;
        margin: 3px;
      }
    }

    #forgetPW {
      color:#FCC138;
      font-size: 14px;
      margin-top: 7px;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }

  #loginBtn {
    width: 100%;
    font-size: 16px;
    padding: 11px 0;
    color: #ffffff;
    margin-top: 26px;
    border: none;
    background: linear-gradient(to right, #fccf31 , #fd6e6a);
    outline: none;
    cursor: pointer;
    border-radius: 3px;
  }

  #line2 {
    display: flex;
    letter-spacing: 1px;
    padding-top: 8px;
    font-size: 14px;

    #hint {
      color: #929292;
    }

    #registerBtn {
      margin-left: 23px;
      color: #FCC138;
      font-weight: 600;
      cursor: pointer;
    }
  }
}
</style>
