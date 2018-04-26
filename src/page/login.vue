<template>
  <div id="loginContainer" :style="backgroundDiv">
    <div id="topLine">
      <span>注册</span>
      <span>微信关注</span>
    </div>
    <div id="parent">
      <LoginBox id='LoginBox'></LoginBox>
    </div>
    <footer>
      <span>关注微信</span>
      <span> | </span>
      <span>©️2018 饱了么 all rights reserved.</span>
    </footer>
  </div>
</template>

<script>
import LoginBox from '@/component/LoginBox';
export default {
  name: 'Login',
  data () {
    return {
      backgroundDiv: {
        backgroundImage: 'url(' + require('../assets/images/bg.png') + ')',
        // 拉伸背景图像完全覆盖屏幕
        backgroundSize: '100% 100%'
      }
    };
  },
  components: {
    LoginBox
  }
};
</script>

<style lang="scss">
#loginContainer {
  position:absolute;
  width:100%;
  height:100%;
}
#parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
#LoginBox {
  transform: translateY(-50%);
  position: absolute;
  top: 45%;
  width: 20%;
}
#topLine {
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
  /* margin: 15px 25px 0 0; */
}
#topLine span {
  margin: 20px 35px 0 0;
}
footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 15px;
  margin-bottom: 15px;
  color: #929292;
}
footer span {
  margin: 0 15px 0 15px;
}
</style>
