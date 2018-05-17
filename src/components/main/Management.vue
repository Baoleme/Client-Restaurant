<template>
  <div class="mainContanier">
    <Menu />
    <div class="right">
      <TopLine class="top"/>
      <div class="content">content</div>
    </div>
  </div>
</template>

<script>
import Menu from './Menu';
import TopLine from './TopLine';
export default {
  components: {
    Menu,
    TopLine
  }
};
</script>

<style lang="scss" scoped>
</style>
