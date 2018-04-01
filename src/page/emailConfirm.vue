<template>
  <div id="contanier">
    <div>注册成功！验证码已发送至您的邮箱，请前往邮箱查看验证码。</div>
    <label for="confirmCode">邮箱验证码: </label>
    <input type="text" id="confirmCode" v-model="confirmCode">
    <button @click="confirm">验证</button>
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
    confirm () {
      if (!this.confirmCode) {
        alert('验证码不为空!');
      } else {
        this.$store.dispatch('emailConfirm', this.confirmCode)
          .then((err) => {
            if (err) {
              alert(err);
            } else {
              this.$store.dispatch('getRestInfo');
              this.$router.replace('/main');
            }
          });
      }
    }
  }
};
</script>

<style lang="scss">

</style>
