<template>
  <div class="topLine">
    <span v-show="isLogin" @click="goto(1)">注册</span>
    <div v-show="!isLogin" class="loginHintPart">
      <span>已有账号？</span>
      <span @click="goto(0)">登录</span>
    </div>
    <!-- <Tooltip id="Tooltip" content="Bottom Right text" placement="bottom-end">
      <span>微信关注</span>
      <div slot="content">
        <img src="@/assets/images/QRCode.jpeg" alt="QRCode">
      </div>
    </Tooltip> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  props: {
    isLogin: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  methods: {
    goto (index) {
      if (index === 0) {
        this.$router.push('/login');
      } else if (index === 1) {
        this.$router.push('/register');
      }
    }
  }
};
</script>

<style lang="scss">
.topLine {
  display: flex;
  justify-content: flex-end;
  font-size: 16px;

  > span:nth-child(1) {
    margin: 20px 35px 0 0;
    cursor: pointer;
  }

  // #Tooltip {
  //   margin: 20px 35px 0 0;
  //   cursor: default;
  // }

  // img {
  //   width: 140px;
  // }

  .loginHintPart {
    margin: 20px 35px 0 0;

    > span:nth-child(1) {
      color: #929292;
    }

    > span:nth-child(2) {
      cursor: pointer;
    }
  }
}
</style>
