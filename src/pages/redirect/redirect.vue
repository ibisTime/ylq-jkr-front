<template>
  <div class="redirect-wrapper">
    <loading v-show="laadingFlag" class="loading-wrapper"></loading>
  </div>
</template>
<script>
  import Loading from 'base/loading/loading';
  export default {
    data() {
      return {
        loadingFlag: true
      };
    },
    created() {
      /**
       * 1、获取调查单详情
       * 2、获取未完成的接口，并跳转到指定页面 this.getNextPage('F1', [])
       * 3、如果已经填写完成，则提示已经填写完成 this.$router.replace('/investigation-suc')
       */
    },
    methods: {
      getInvestigation() {}
    },
    components: {
      Loading
    }
  };
</script>
<style lang="scss" scoped>
  .redirect-wrapper {
    .loading-wrapper {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
