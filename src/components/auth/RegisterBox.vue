<template>
  <div class="registerBox">
    <div class="headline">
      <img id="logo" src="@/assets/images/baoleme_logo_cat.svg" alt="logo">
      <div class="appName">
        <div id="formal">饱了么</div>
        <div id="deputy">商家端</div>
      </div>
    </div>
    <header>注册商家账号</header>
    <div class="inputline">
      <Input class="input" v-model="username" placeholder="使用邮箱作为用户名"
      clearable autofocus size="large" @on-change="clearErrMsg"/>
      <Icon v-show="isNameRight" class="icons" type="checkmark-circled" color="#409EFF" size="22"/>
    </div>
    <div class="inputline">
      <Input class="input" v-model="password" placeholder="6位字符以上密码"
      clearable type="password" size="large" v-on:on-change="clearErrMsg"/>
      <Icon v-show="isPWRight" class="icons" type="checkmark-circled" color="#409EFF" size="22"/>
    </div>
    <div class="inputline">
      <Input class="input" v-model="restname" placeholder="店铺名"
        clearable size="large" v-on:on-change="clearErrMsg" />
    </div>
    <div id="errorHintLine" v-show="errorMsg">
      <Icon type="close-circled" color="#FE8966" size="14" />
      <span>{{errorMsg}}</span>
    </div>
    <div>
      <div class="qualification">企业资质</div>
      <progress value="" max="100"></progress>
    </div>
    <div id="uploadHintLine">
      <Icon type="close-circled" color="#FE8966" size="14" />
      <span>{{hintMsg}}</span>
    </div>
    <div></div>
    <div>
      <button @click="register" id="registerBtn">同意以下协议并注册</button>
    </div>
    <div id="agreement">《饱了么商家用户协议》</div>
    <div class="fileMsg">{{fileMsg}}</div>
    <span class="file" @click="taggle">{{taggleHint}}
      <input type="file" id="uploadFile" accept=".doc,.pdf,.jpg" @change="fileName"/>
    </span>
  </div>
</template>

<script>
let regMail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
let regPW = /[`~!@#$%^&*()_+-={}[\]\\|;:'",<.>/?0-9a-zA-Z]{6,32}/;
export default {
  name: 'LoginBox',
  data () {
    return {
      username: '',
      password: '',
      restname: '',
      fileMsg: '支持pdf/doc格式，10M以内',
      errorMsg: '',
      myfile: '',
      taggleHint: '选择文件',
      hintMsg: '文件大小超出限制',
      isNameRight: false,
      isPWRight: false
    };
  },
  methods: {
    register () {
      // this.$emit('showModal', this.username);
      if (!this.username) {
        this.errorMsg = '用户名不为空!';
      } else if (!this.password) {
        this.errorMsg = '密码不为空!';
      } else if (!this.restname) {
        this.errorMsg = '店铺名不为空!';
      } else {
        this.$store.dispatch('registerAction', {
          username: this.username,
          restname: this.restname,
          password: this.password
        }).then((err) => {
          if (err) {
            this.errorMsg = err;
          } else {
            this.$store.dispatch('sendConfirmEmail');
            this.$emit('showModal', this.username);
            // this.$router.replace('/emailConfirm');
          }
        });
      }
    },
    clearErrMsg () {
      if (this.errorMsg !== '') {
        this.errorMsg = '';
        console.log(this.errorMsg);
      }
      if (!(regMail.test(this.username))) {
        this.isNameRight = false;
        this.errorMsg = '用户名请使用正确的邮箱格式';
      } else {
        this.isNameRight = true;
        if (this.password && !(regPW.test(this.password))) {
          this.isPWRight = false;
          this.errorMsg = '密码应该由6-32位数字/字母/字符组成';
        } else if (this.password) {
          this.isPWRight = true;
        }
      }
    },
    fileName () {
      let myfile = document.getElementById('uploadFile');
      // 获取文件上传文件的文件名
      if (myfile.files[0] === undefined) {
        this.fileMsg = '支持pdf/doc格式，10M以内';
        this.taggleHint = '选择文件';
      } else {
        this.fileMsg = myfile.files[0].name;
        document.getElementsByClassName('fileMsg')[0].style.color = 'black';
        console.log(myfile.files[0].name);
      }
    },
    taggle () {
      if (this.taggleHint === '选择文件') {
        this.taggleHint = '重新选择';
        document.getElementsByClassName('file')[0].style.background = 'white';
        document.getElementsByClassName('file')[0].style.color = '#f88d6c';
      }
    }
  }
};
</script>

<style lang="scss">
.registerBox {
  .headline {
    .appName {
      display: inline-block;
      #formal {
        font-size: 34px;
        letter-spacing: 13px;
        font-weight: bold;
      }
      #deputy {
        font-size: 15px;
        letter-spacing: 6px;
        color: #929292;
        padding-left: 58px;
      }
    }

    #logo {
      width: 28%;
      height: 28%;
      margin-right: 13px;
    }
  }
  header {
    font-size: 22px;
    letter-spacing: 1px;
    margin: 40px 0 22px 0;
  }
  .inputline {
    position: relative;

    .input {
      width: 100%;
      margin-bottom: 10px;
      /*box-shadow:X-Offset T-Offset Blur Blur-Offset Color*/
      box-shadow: 0px 5px 25px -9px rgb(248, 155, 6);
      font-size: 15px;
    }
    .icons {
      position: absolute;
      bottom: 21px;
      right: -35px;
    }
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

  .qualification {
    font-size: 16px;
    letter-spacing: 2px;
    display: flex;
    margin-bottom: 3px;
    padding-left: 3px;
  }

  progress {
    width: 100%;
    height: 46px;
    border-radius: 4px;
    border: 1px solid rgba(252, 211, 115, 0.521);
    box-shadow: 0px 5px 25px -9px rgb(248, 155, 6);
    background-color:transparent;
  }
  progress::-webkit-progress-bar { background: transparent; }
  progress::-webkit-progress-inner-element { border-radius: 4px; }
  progress::-webkit-progress-value {
    border-radius: 4px;
    background-color: rgba(254, 138, 102, 0.76);
  }
  progress::-webkit-progress-bar { border-radius: 4px; }

  #uploadHintLine {
    display: flex;
    margin: 5px 0 10px 2px;
    color: #fd6e6a;
    opacity: 0;

    span {
      line-height: 1;
      padding-left: 6px;
      letter-spacing: 1px;
      font-size: 14px;
    }
  }

  .fileMsg {
    display: flex;
    position: relative;
    bottom: 142px;
    font-size: 14px;
    color: #929292;
    padding-left: 10px
  }

  .file {
    position: relative;
    display: inline-block;
    background: #f88d6c;
    border: #f88d6c 1px solid;
    border-radius: 3px;
    padding: 11px 15px;
    color: #ffffff;
    cursor: pointer;
    font-size: 15px;
    bottom: 176px;
    left: 200px;
  }
  .file input {
    position: absolute;
    right: 0px;
    top: 0px;
    opacity: 0;
    height: 44px;
    width: 387px;
  }

  #registerBtn {
    width: 100%;
    font-size: 16px;
    padding: 11px 0;
    color: #ffffff;
    border: none;
    background: linear-gradient(to right, #fccf31 , #fd6e6a);
    outline: none;
    cursor: pointer;
    border-radius: 3px;
  }

  #agreement {
    color: #fccf31;
    letter-spacing: 2px;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    margin-top: 8px;
  }
}
</style>
