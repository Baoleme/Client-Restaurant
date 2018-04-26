<template>
  <div id='contanier'>
    <div>注册成功！验证邮件已发送至您的邮箱，请前往邮箱验证。十分钟内有效。</div>
    <button @click='gotoMail'>前往验证</button>
  </div>
</template>

<script>
export default {
  name: 'EmailConfirm',
  data () {
    return {
      confirmCode: ''
    };
  },
  methods: {
    gotoMail () {
      // 根据邮箱地址跳转到对应的登录页面
      var url = this.$store.state.email.split('@')[1];
      window.open('http://mail.' + url);
    }
  }
};
</script>

<style lang="scss">

</style>
