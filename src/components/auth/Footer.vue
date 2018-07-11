<template>
  <footer>
    <Tooltip content="Top Right text" placement="top-end">
      <span>微信关注</span>
      <div slot="content">
        <img src="@/assets/images/QRCode.png" alt="QRCode">
      </div>
    </Tooltip>
    <span> | </span>
    <span>©️2018 饱了么 all rights reserved.</span>
  </footer>
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
footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 15px;
  margin-bottom: 15px;
  color: #929292;

  span {
    margin: 0 15px 0 15px;
  }

  span:nth-child(1) {
    cursor: default;
  }
  img {
    width: 140px;
  }
}
</style>
