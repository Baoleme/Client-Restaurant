<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <Icon type="checkmark-circled" id="succeedIcon" color="#FCC138" size="59"/>
          <div class="registerSucceed">
            <p>商家注册成功!</p>
            <p>请先完成邮箱验证</p>
          </div>
          <div slot="footer">
            <Button size="large" long id="gotoLogin" @click="$emit('close')">立即验证</Button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
    };
  }
};
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;

    .modal-container {
      height: 296px;
      width: 28%;
      margin: 0px auto;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;

      #succeedIcon {
        margin: 45px 0 19px 0;
      }

      .registerSucceed {
        font-size: 20px;
        letter-spacing: 2px;
        padding-left: 9px;

        p {
          color: rgb(26, 25, 25);
        }
      }

      #gotoLogin {
        background: linear-gradient(to right, #fccf31 , #fd6e6a);
        color: #ffffff;
        height: 44px;
        margin: 25px 45px 45px;
        width: 70%;
        border: 0px;
      }
    }
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
