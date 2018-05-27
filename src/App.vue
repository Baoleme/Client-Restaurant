<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // 定时更新等待时间，所有订单的等待时间用同一个计时器
  beforeMount () {
    var self = this.$store;
    setInterval(function () {
      self.commit('UPDATE_TIME_CLOCK');
    }, 1000);
  }
};
</script>

<style lang="scss">
@import "./style/global.scss";

#app {
  font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
