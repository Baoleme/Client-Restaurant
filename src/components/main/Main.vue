<template>
  <div class="mainContanier">
    <Menu />
    <div class="right">
      <TopLine class="top"/>
      <div class="content">content</div>
    </div>
    <!-- email: {{email}} -->
    <!-- isConfirm: {{isConfirm}}
    <button @click='test'>confirm</button> -->
  </div>
</template>

<script>
import Menu from './Menu';
import TopLine from './TopLine';
export default {
  name: 'Main',
  data () {
    return {
      isConfirm: this.$store.state.isConfirm
    };
  },
  computed: {
    email () {
      return this.$store.state.email;
    }
  },
  methods: {
    test () {
      this.$store.dispatch('sendConfirmEmail');
    }
  },
  components: {
    Menu,
    TopLine
  }
};
</script>

<style lang="scss">
.mainContanier {
  display: flex;
  min-height: 100vh;

  .right {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    width: 100%;

    .top {
      width: 100%;
    }

    .content {
      display: flex;
      flex: 10;
      background-color:#f6f6f6;;
    }
  }
}
</style>
