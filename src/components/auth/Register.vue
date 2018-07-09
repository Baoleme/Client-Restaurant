<template>
  <div class="register"  :style="backgroundDiv">
    <Header :isLogin="false"></Header>
    <div id="parent">
      <RegisterBox class="registerBox" @showModal="showModal"></RegisterBox>
      <!-- <Button id="show-modal" @click="showModal">Show Modal</Button> -->
      <modal v-if="isShowModal" @close="gotoEmailHome"></modal>
      <!-- <modal v-if="isShowModal" @close="isShowModal=false"></modal> -->
    </div>
    <Footer></Footer>
    <ErrorModal v-if="isNetworkErr"></ErrorModal>
  </div>
</template>

<script>
import Header from './Header';
import RegisterBox from './RegisterBox';
import Footer from './Footer';
import Modal from './Modal';
import ErrorModal from '../ErrorModal';
export default {
  name: 'Register',
  data () {
    return {
      backgroundDiv: {
        backgroundImage: 'url(' + require('../../assets/images/bg.png') + ')',
        backgroundSize: '100% 100%'
      },
      isShowModal: false,
      emailAddress: ''
    };
  },
  methods: {
    showModal (email) {
      this.isShowModal = true;
      this.emailAddress = email;
    },
    gotoEmailHome () {
      // 根据邮箱地址跳转到对应的登录页面
      if (this.emailAddress.split('@')[1] === 'gmail.com') {
        window.open('https://accounts.google.com');
      } else {
        window.open('http://mail.' + this.emailAddress.split('@')[1]);
      }
    }
  },
  computed: {
    isNetworkErr () {
      return this.$store.state.isNetworkErr;
    }
  },
  components: {
    RegisterBox,
    Header,
    Footer,
    Modal,
    ErrorModal
  }
};
</script>

<style lang="scss">
.register {
  position:absolute;
  width:100%;
  height:100%;

  #parent {
    display: flex;
    justify-content: center;
    align-items: center;

    .registerBox {
      transform: translateY(-50%);
      position: absolute;
      top: 52%;
      width: 20%;
    }
  }
}
</style>
