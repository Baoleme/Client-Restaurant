<template>
  <div id="container">
      <label for="username">用户名</label>
      <input
        type="text" name="username" id="username"
        placeholder="请输入邮箱" autofocus v-model="username">
      <label for="password">密码</label>
      <input
        type="password" name="password" id="password"
        placeholder="请输入密码" v-model="password">
      <button @click="login">登录</button>
    <a href="">新用户注册</a>
    <a href="">忘记密码</a>
  </div>
</template>

<script>
export default {
  name: 'LoginBox',
  data () {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login () {
      if (!this.username) {
        alert('用户名不为空');
      } else if (!this.password) {
        alert('密码不为空');
      } else {
        this.$store.dispatch('loginAction', {
          username: this.username,
          password: this.password
        }).then((err) => {
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
