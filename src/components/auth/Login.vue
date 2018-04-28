<template>
  <div class="loginContainer" :style="backgroundDiv">
    <Header :isLogin="true"></Header>
    <div id="parent">
      <LoginBox class='LoginBox'></LoginBox>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './Header';
import LoginBox from './LoginBox';
import Footer from './Footer';
export default {
  name: 'Login',
  data () {
    return {
      backgroundDiv: {
        backgroundImage: 'url(' + require('../../assets/images/bg.png') + ')',
        // 拉伸背景图像完全覆盖屏幕
        backgroundSize: '100% 100%'
      }
    };
  },
  components: {
    LoginBox,
    Header,
    Footer
  }
};
</script>

<style lang="scss">
.loginContainer {
  position:absolute;
  width:100%;
  height:100%;

  #parent {
    display: flex;
    justify-content: center;
    align-items: center;

    .LoginBox {
      transform: translateY(-50%);
      position: absolute;
      top: 45%;
      width: 20%;
    }
  }
}
</style>
