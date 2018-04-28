<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <Icon type="android-alert" id="waringIcon" color="#faf9f9" size="70"/>
          <div class="networkErr">
            <p>网络错误，请重试</p>
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
  background-color: transparent;
  display: table;
  transition: opacity .3s ease;

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;

    .modal-container {
      height: 228px;
      width: 22%;
      margin: 0px auto;
      background-color: rgba(0, 0, 0, .5);
      border-radius: 3px;
      color: #faf9f9;
      transition: all .3s ease;

      #waringIcon {
        margin: 52px 0 32px 0;
        width: 59px;
      }

      .networkErr {
        font-size: 20px;
        letter-spacing: 2px;
        padding-left: 9px;
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
