<template>
  <div id="contanier">
    <h1>商家注册</h1>
    <RegisterBox></RegisterBox>
  </div>
</template>

<script>
import RegisterBox from '@/component/RegisterBox';
export default {
  name: 'Register',
  data () {
    return {
      msg: 'This is register page!'
    };
  },
  components: {
    RegisterBox
  }
};
</script>

<style lang="scss">

</style>
