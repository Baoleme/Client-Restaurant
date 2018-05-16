<template>
  <div class="main_contanier">
    <Menu />
    <!-- email: {{email}} -->
    <!-- isConfirm: {{isConfirm}}
    <button @click='test'>confirm</button> -->
  </div>
</template>

<script>
import Menu from './Menu';
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
    Menu
  }
};
</script>

<style lang="scss">
.main_contanier {
  background-color: #e7e7e7;
}
</style>
