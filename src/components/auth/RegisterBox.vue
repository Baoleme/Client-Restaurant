<template>
  <div id="container">
    <div>
      <label for="username">用户名: </label>
      <input
        type="text" name="username" id="username"
        placeholder="请输入邮箱" autofocus v-model="username">
    </div>
    <div>
      <label for="password">密码: </label>
      <input
        type="password" name="password" id="password"
        placeholder="请输入密码" v-model="password">
    </div>
    <div>
      <label for="restname">店名: </label>
      <input
        type="text" name="restname" id="restname"
        placeholder="请输入店名" v-model="restname">
    </div>
    <div>
      <label for="qualification">企业资质: </label>
      <input type="file" name="qualification" id="qualification">
    </div>
    <button @click="register">注册</button>
    <button @click="backToLogin">返回</button>
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
      restname: ''
    };
  },
  methods: {
    register () {
      if (!this.username) {
        alert('用户名不为空!');
      } else if (!this.password) {
        alert('密码不为空!');
      } else if (!this.restname) {
        alert('店名不为空!');
      } else if (!(regMail.test(this.username))) {
        alert('用户名格式不正确，用户名应该是一个邮箱!');
      } else if (!(regPW.test(this.password))) {
        alert('密码格式错误!\n密码至少6位数，包括字母数字特殊字符!');
      } else {
        this.$store.dispatch('registerAction', {
          username: this.username,
          restname: this.restname,
          password: this.password
        }).then((err) => {
          if (err) {
            alert(err);
          } else {
            this.$store.dispatch('sendConfirmEmail');
            this.$router.replace('/emailConfirm');
          }
        });
      }
    },
    backToLogin () {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">

</style>
