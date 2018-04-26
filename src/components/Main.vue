<template>
  <div id="contanier">
    email: {{email}}
    <!-- isConfirm: {{isConfirm}}
    <button @click='test'>confirm</button> -->
  </div>
</template>

<script>
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
  }
};
</script>

<style lang="scss">

</style>
