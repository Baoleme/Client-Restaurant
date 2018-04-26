<template>
  <div id="topLine">
    <span>注册</span>
    <Tooltip id="Tooltip" content="Bottom Right text" placement="bottom-end">
      <span>微信关注</span>
      <div slot="content">
        <img src="@/assets/images/QRCode.jpeg" alt="QRCode">
      </div>
    </Tooltip>
  </div>
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
#topLine {
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
}
#topLine > span:nth-child(1) {
  margin: 20px 35px 0 0;
  cursor: pointer;
}
#Tooltip {
  margin: 20px 35px 0 0;
  cursor: default;
}
#topLine img {
  width: 140px;
}
</style>
