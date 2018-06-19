<template>
  <div class="menu">
    <div class="logoLine"><img src="@/assets/images/logo_main.png" alt="logo" class="mainLogo"></div>
    <div class="firstPart">
      <div class="menuItem" @click="goto(0)" :class="{active: activeIndex === 0}">
        <img :src="iconHouse" alt="house">
        <span :class="{textActive: activeIndex === 0}">首页</span>
      </div>
      <div class="menuItem" @click="goto(1)" :class="{active: activeIndex === 1}">
        <img :src="iconContract" alt="contract">
        <span :class="{textActive: activeIndex === 1}">订单</span>
      </div>
    </div>
    <div class="secondPart">
      <div class="menuItem management">店铺管理</div>
      <div class="menuItem" @click="goto(2)" :class="{active: activeIndex === 2}">
        <img :src="iconDish" alt="dish">
        <span :class="{textActive: activeIndex === 2}">菜品管理</span>
      </div>
      <div class="menuItem" @click="goto(3)" :class="{active: activeIndex === 3}">
        <img :src="iconQRcode" alt="qr-code">
        <span :class="{textActive: activeIndex === 3}">二维码生成</span>
      </div>
      <div class="menuItem" @click="goto(4)" :class="{active: activeIndex === 4}">
        <img :src="iconInfo" alt="information">
        <span :class="{textActive: activeIndex === 4}">商户信息</span>
      </div>
    </div>
    <ErrorModal v-if="errorMsg"></ErrorModal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      errorMsg: ''
    };
  },
  computed: {
    activeIndex () {
      return this.$store.state.index;
    },
    iconHouse () {
      return (this.$store.state.index === 0)
        ? require('../../assets/images/house-orange.svg')
        : require('../../assets/images/house-grey.svg');
    },
    iconContract () {
      return (this.$store.state.index === 1)
        ? require('../../assets/images/contract-orange.svg')
        : require('../../assets/images/contract-grey.svg');
    },
    iconDish () {
      return (this.$store.state.index === 2)
        ? require('../../assets/images/dish-orange.svg')
        : require('../../assets/images/dish-grey.svg');
    },
    iconQRcode () {
      return (this.$store.state.index === 3)
        ? require('../../assets/images/qr-orange.svg')
        : require('../../assets/images/qr-grey.svg');
    },
    iconInfo () {
      return (this.$store.state.index === 4)
        ? require('../../assets/images/info-orange.svg')
        : require('../../assets/images/info-grey.svg');
    }
  },
  methods: {
    goto (index) {
      this.$store.commit('UPDATE_INDEX', index);
      this.index = index;
      if (index === 0) {
        this.$router.push('/main');
      } else if (index === 1) {
        this.$store.dispatch('restaurantSelfOrder', {
          page: 0,
          stateArr: ['paid', 'accepted']
        }).then((err) => {
          if (err) {
            this.errorMsg = err;
          } else {
            this.$router.push('/main/order/dealing');
          }
        });
      } else if (index === 2) {
        this.$store.dispatch('getDish').then((err) => {
          if (err) {
            this.errorMsg = err;
          } else {
            this.$router.push('/main/dish/management');
          }
        });
      } else if (index === 3) {
        this.$router.push('/main/QRcode');
      } else if (index === 4) {
        this.$store.commit('SAVE_NEWDISH_IMG', this.$store.state.infoObj.logoUrl);
        this.$router.push('/main/info');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  background-color: white;
  width: 168px;
  height: 100vh;
  font-size: 14px;
  font-family:PingFangTC-Medium;
  letter-spacing:1px;
  color:#493f3a;

  .logoLine {
    display: flex;
    .mainLogo {
      margin: 36px 0 0 20px;
      width: 70%;
      height: 100%;
    }
  }

  .firstPart {
    margin-top: 31px;
  }

  .secondPart {
    margin-top: 15px;
    .management {
      font-family:PingFangTC-Regular;
      font-size:13px;
      color:#a6a6a6;
      letter-spacing:0.86px;
      text-align:left;
      margin-left: 25px;
      height: 34px;
      cursor: text;
    }
  }

  .menuItem {
    height: 50px;
    width: 158px;
    display: flex;
    // justify-content: center;
    align-items: center;
    margin: auto;
    cursor: pointer;
    img {
      width: 20px;
      height: 20px;
      display: inline-block;
      margin-left: 25px;
      margin-right: 14px;
    }

    .textActive {
      color: #ff8b18;
    }
  }

  .active {
    background:rgba(255,236,173,0.33);
    border-radius:6px;
  }
}
</style>
