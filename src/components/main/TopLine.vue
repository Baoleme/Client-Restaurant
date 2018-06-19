<template>
  <div class="topLine">
    <div class="findOrder">
      <Input class="input" v-model="trackClue" placeholder="搜索订单号等信息" clearable size="large"/>
      <button class="findBtn" slot="append" @click="track"><Icon  class="icon" type="ios-search-strong" size="21" color="white"></Icon></button>
    </div>
    <div class="self">
      <Dropdown class="dropdown">
        <img src="@/assets/images/user.svg" alt="avatar" class="avatar">
        <div class="username">{{email}}</div>
        <Icon type="arrow-down-b"></Icon>
        <DropdownMenu slot="list" class="dropdownItem">
          <DropdownItem>更改密码</DropdownItem>
          <DropdownItem @click.native="logout">退出登录<Icon class="logoutIcon" type="android-exit" size="17"></Icon></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      trackClue: ''
    };
  },
  computed: {
    email () {
      return this.$store.state.infoObj.email;
    }
  },
  methods: {
    track () {
      this.$store.dispatch('trackSelfOrder', {
        page: 0,
        stateArr: ['paid', 'accepted', 'completed', 'cancelled'],
        keyword: this.trackClue
      }).then((err) => {
        if (err) {
          this.errorMsg = err;
        } else {
          this.$store.commit('UPDATE_CLUE', this.trackClue);
          this.$store.commit('UPDATE_INDEX', 1);
          this.$router.push('/main/order/trackorder');
        }
      });
    },
    logout () {
      this.$store.dispatch('logout').then((err) => {
        if (err) {
        } else {
          this.$router.push('/login');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.topLine {
  background:#fbfbfb;
  height:80px;
  display: flex;
  justify-content: space-between;

  .findOrder {
    display: flex;
    width: 414px;
    height: 43px;
    margin: 18px 31px;

    .input {
      flex: 1;
      border-right: none;
      border-radius: 4px 0 0 4px;
      box-shadow: 0px 5px 25px -9px rgb(248, 155, 6);
      font-size: 14px;
    }
    .findBtn {
      background:#fe8966;
      width:73px;
      height:45.5px;
      border: none;
      border-radius: 0 4px 4px 0;
      outline: none;
      cursor: pointer;
      position: relative;
      right: 3px;
      text-align: center;

      .icon {
        padding-top: 3px;
      }
    }
  }

  .self {
    display: flex;
    align-items: center;
    margin-right: 45px;

    .avatar {
      height: 31px;
      width: 31px;
      display: inline-block;
    }

    .username {
      font-size: 14px;
      display: inline-block;
      padding: 0 14px 0 17px;
    }

    .dropdownItem {
      width: 230px;

      .logoutIcon {
        padding-left: 5px;
      }
    }
  }
}
</style>
