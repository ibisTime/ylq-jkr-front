<template>
  <div class="full-screen-wrapper investigation-wrapper">
    <img src="./suc.png"/>
    <div class="tips">恭喜您，已完成测评</div>
    <!--<div class="btn-wrapper"><button @click="goReport">确认完成</button></div>-->
  </div>
</template>
<script>
  export default {
    methods: {
      goReport() {
        this.$router.push('/report');
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";

  .investigation-wrapper {
    background-color: #fff;
    text-align: center;
    img {
      margin-top: 1.42rem;
      width: 1.06rem;
    }
    .tips {
      margin-top: 0.56rem;
      font-size: $font-size-medium;
    }
    .btn-wrapper {
      margin-top: 1.5rem;
      padding: 0 0.3rem;
      button {
        width: 100%;
        line-height: 0.9rem;
        border-radius: 0.1rem;
        font-size: $font-size-large-s;
        color: #fff;
        background-color: $primary-color;
      }
    }
  }
</style>
