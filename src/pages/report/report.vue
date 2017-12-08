<template>
  <div class="report-wrapper">
    <div class="split-bar border-bottom-1px">基本信息</div>
    <div class="split-bar border-bottom-1px">职业信息</div>
    <div class="split-bar border-bottom-1px">紧急联系人</div>
    <div class="split-bar border-bottom-1px">身份证照片</div>
    <div class="split-bar border-bottom-1px">通讯录认证</div>
    <div class="split-bar border-bottom-1px">运营商认证</div>
    <div class="split-bar border-bottom-1px">芝麻分认证</div>
    <hygz-list :data="hygzList"></hygz-list>
    <div class="split-bar border-bottom-1px">欺诈三接口</div>
    <div class="split-bar border-bottom-1px">同盾认证</div>
  </div>
</template>
<script>
  import HygzList from 'components/hygz-list/hygz-list';
  import {setTitle} from 'common/js/util';
  import testData from './data';
  export default {
    data() {
      return {
        hygzList: []
      };
    },
    created() {
      setTitle('调查报告');
      setTimeout(() => {
        this.hygzList = testData;
      }, 300);
    },
    methods: {
    },
    components: {
      HygzList
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .report-wrapper {
    .split-bar {
      padding: 0 0.3rem;
      line-height: 0.8rem;
      font-size: $font-size-medium;
      background: $primary-color;
      color: #fff;
      @include border-bottom-1px(#fff);
    }
  }
</style>
